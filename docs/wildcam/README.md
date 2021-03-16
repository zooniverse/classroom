# Processing WildCam Lab Data

This is a guide on how to process data for the map database (Carto.com) used by
Zooniverse's WildCam Labs educational programs.

Prepared by
@shaun.a.noordin 2018.07.24

For use with
[WildCam Gorongosa & Darien Lab](https://github.com/zooniverse/classroom)
and the [Carto](https://wildcam-darien.carto.com/) map database.

## Overview

For a WildCam-type "Map Explorer" component to work, we need the following
things:

1. a map explorer system - the actual component we code.
2. a map layer service - provides the visuals for our geographic map.
3. a map data service - what we query when we want the data in 4-7. 
4. **Camera** data - shows us where the camera traps are on the geomap.
5. **Subjects** data - shows us individual photos from camera traps.
6. **Aggregations** data - tells us what's in each photo.
7. **Supplementary** map data - defines park boundaries, vegetation maps, etc.

Item 1 is what we build (that's easy) and Item 2 and 3 are just external
dependencies we need to set up.

The tricky part is in getting Items 4 to 7 - the actual data or content -
properly formatted for our educational map. There's usually no one consistent
format that works across different systems, so for example, the Subjects data we
get from Panoptes/Zooniverse needs to be processed before it can go into the map
data service.

## Converting Map Data (Cameras, Park Boundaries, etc)

**Frequently Encountered Issue 1**

Problem: You have geographical map data (e.g. the boundaries a national
park, camera trap locations) in files that aren't supported by the map database.

Analysis: Most likely, your geographical map data was produced by some sort
of mapping software (producing files likes .SHP) while the map database requires
the data to be in a familiar web format (e.g. GeoJSON)

Solution: Convert .SHP files to .GEOJSON files using a program like QGIS.
There's usually an "Export Data" or (in the case of QGIS, right-click on the
data layer and click) "Save As" function.

**Frequently Encountered Issue 2**

Problem: After exporting the map data as a .GEOJSON, you don't see markers where
they're supposed to be. OR, you see the markers, but they're in wildly incorrect
locations (e.g. camera traps in Gorongosa National Park are appearing the the
Arctic Ocean).

Analysis: The map data you received might be using a coordinate system that's
different from the one used by your map database.

Solution: During the export process, double check the coordinate system being
used. If it's not the same as the target map database, you'll need to find the
option in the export process to change the coordinate system.

## Converting Zooniverse Data

**Getting Aggregations Data**

Without a table of Aggregations, we have no idea whether a specific Subject has
any animals in them. Here's how we get Aggregations:

1. Download the latest Classification and Workflow data from the Zooniverse
   project page. (Here's an [example data export page](https://www.zooniverse.org/lab/3525/data-exports)
  for WildCam Darien)
2. Note the Workflow id (e.g. 3033) and version (e.g. 579.9)
3. Download [Coleman's Aggregations for Caesar](https://github.com/zooniverse/aggregation-for-caesar/)
   repo and set it up. (See the Readme on that project.)

We'll run Coleman's Aggregations code to turn Classification + Workflow data
into Aggregations data. (Refer to the project's Readme for full instructions.)

4. Run the extractor, e.g. `extract_panoptes_csv.py --version 579 --output WILDCAM_EXTRACTED ./darien-classifications.csv ./darien-workflows.csv 3033`
5. Run the reducer, e.g. `reduce_panoptes_csv.py --output WILDCAM_REDUCED ./WILDCAM_EXTRACTED.csv`
6. Now, you should have a file called `WILDCAM_REDUCED.csv` which contains all
   your Aggregations.

NOTE: at this point, you might also want to rename certain columns in the
aggregations CSV. This is because Coleman's aggregated data may refer to
certain columns under a generic name (e.g. `data.choice`) while the WildCam Lab
expects something like `species`. These name changes can be done manually,
either in the CSV file or in the map database.

A few more small notes:
- You only need the major number of the the workflow version.
- The workflow version number is important because different workflows produce
  different classification values in different formats.
- Keep an eye out for how the aggregator produces the filenames; in practice, I
  think you might actually get a prefix attached to `WILDCAM_EXTRACTED.csv` and
  `WILDCAM_REDUCED.csv`

**Massaging Subjects Data**

The Subjects data we get from Panoptes/Zooniverse isn't well suited to be
plonked directly into a queryable database, mostly because the important
map-specific information (e.g. which camera this Subject photo was taken, the
URL of the Subject photo, etc) are all buried in the metadata.

We can 'massage' the raw Subject CSV exports from Panoptes/Zooniverse into a
form that the map database can use, but good luck! You'll need to use some code
written by Shaun, and as a certified Shaun myself, I can tell you that you're
in for a ride.

1. Download the latest Subjects data from the Zooniverse project page.
2. Run `node wildcam-subject-processor.js darien darien-subjects.csv`
3. You should now have a Subjects CSV with the Zooniverse value fields properly
   mapped to value fields that are compatible with the map database.

WARNING: be aware that the raw Subject CSV exports has one entry PER Subject ID
PER associated Workflow PER associated Subject Set. This matters because every
new Classroom Assignment created will have a Subject with a new associated
Workflow/Subject Set; if we don't filter the raw Subject CSV exports for only
the ORIGINAL WildCam Darien workflow, we'll have a lot of duplicates.

NOTE: `wildcam-subject-processor.js` should be located in the same folder as
this README. It's a simple CSV field re-mapping tool, and while it only works on
WildCam Darien Lab at the moment (hence the `darien` argument in the example
above), it can be upgraded to work on different WildCam Programs.

## More Caveats

- When importing a new set of data (usually in the form of a CSV) into the map
  database, make sure the new data has the correct **columns/field names.**
  - For example, we've had situations where the existing camera data had a field
    for `vegetation_type`, but the new data called it `veg_type`. This is often
    non-standard actions done by human processes. Remember to manually fix this
    (often by using a standard spreadsheet program, or just hacking the CSV)
    when such an incompatibility is detected.
- Similarly, when importing, be sure to review the **field values.**
  - Sometimes, the new data might introduce inconsistencies - e.g. the old data
    might have values like `TGR` but the new data uses values like `tiger` to
    indicate the same thing. This needs to be manually standardised.
  - Sometimes, the new data might purposely introduce new values in a set of
    previously known values, e.g. adding a new species. When this happens, the
    Map Explorer component needs to be appropriately updated to reflect the new
    data range.
- After importing, make sure the updated data has the correct **column/field types.**
  - When new data is imported in the map database, the database often uses the
    best guess for what each field type should be. Sometimes this isn't always
    correct, e.g. `subject_id` might need to be a string instead of an integer.
