import React from 'react';
import PropTypes from 'prop-types';

import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';
import Image from 'grommet/components/Image';
import Paragraph from 'grommet/components/Paragraph';
import Section from 'grommet/components/Section';

function DarienInfoEcology(props) {
  return (
    <Box>
      <Box
        className="wildcam-info-page"
        pad={{ vertical: 'medium', horizontal: 'large' }}
      >
        <Heading tag="h2">Description of WildCam Lab Data</Heading>
        <Paragraph>The spreadsheets that you can download from WildCam Lab include data about every photo in the WildCam Lab database. Each row represents a species in a unique photo. For example, if one photo shows only warthogs, there will be only one row of data for that photo. If another photo shows some warthogs and some impalas, there will be two rows of data for that photo. Each column is a piece of information about that photo. This information is based on the location of the camera, the time and date stamp on the photo, or the animal identifications from the citizen scientists that have been aggregated based on an algorithm. Below, you will find additional information about each column in the spreadsheet.</Paragraph>
        <Paragraph>The files are downloaded in CSV format. If you choose to analyze the data using Excel functionality, it is highly recommended that you save the file in Excel (.xls) format before you analyze the data; otherwise you may lose your work. If you choose to analyze the data using R or another statistical software, CSV format is usually best.</Paragraph>

        <Section>
          <Heading tag="h3">Columns</Heading>
          <Heading tag="h4">darien_id</Heading>
          <Paragraph>Unique identifier for each individual photo</Paragraph>
          
          <Heading tag="h4">camera</Heading>
          <Paragraph>Unique identifier for each individual camera</Paragraph>
          
          <Heading tag="h4">longitude</Heading>
          <Paragraph>Longitude for the camera location in decimal degrees</Paragraph>
          
          <Heading tag="h4">latitude</Heading>
          <Paragraph>Latitude for the camera location in decimal degrees</Paragraph>
          
          <Heading tag="h4">date</Heading>
          <Paragraph>Date that the photo was taken based on the time stamp (note that sometimes these time stamps malfunction, so there can be errors)</Paragraph>
          
          <Heading tag="h4">month</Heading>
          <Paragraph>Month that the photo was taken based on the time stamp (see “date” description above)</Paragraph>
          
          <Heading tag="h4">year</Heading>
          <Paragraph>Year that the photo was taken based on the time stamp (see “date” description above)</Paragraph>
          
          <Heading tag="h4">season</Heading>
          <Paragraph>Season that the photo was taken based on the time stamp (see “date” description above). In Panama, there are two distinct seasons, wet and dry</Paragraph>
          <Paragraph>Dry Jan.-Apr.: During the dry season, running from January through April in Panama, strong trade winds blow from the northeast and little or no rain may fall for weeks at a time. Smaller rivers and streams may dry up completely. Temperatures increase slightly and humidity drops during this season.</Paragraph>
          <Paragraph>Wet May-Dec.: During the wet season, running from May through December in Panama, it may rain almost every day. Rain usually takes the form of short but intense downpours in the afternoons. It often rains somewhat less in September, while October and November are the rainiest months.</Paragraph>
          
          <Heading tag="h4">time_period</Heading>
          <Paragraph>The time period that the photo was taken is based on the time stamp (see “date” description above). The times listed in the column headers are in 24-hour clock format (0000 to 2400h). We have grouped the time periods into four categories. Note that the times chosen to represent these time periods are based on the time of sunset and sunrise during July in Panama. Since daylight patterns change throughout the year, these time periods may not be accurate during each month:</Paragraph>
          <Paragraph>Dawn 0555-0616: Dawn is the transition between night and day when the daylight turns from dark to light. This is a very short time period, but it is also a particularly active time for many animals.</Paragraph>
          <Paragraph>Day 0617-1827: Day is the period of complete sunlight from morning to late afternoon. Some animals are active throughout the day, but many animals rest during the heat of the afternoon. Nocturnal animals, like many predators, are not active during the day.</Paragraph>
          <Paragraph>Dusk 1828-1849: Dusk is the transition between day and night when the daylight turns from light to dark. This is a very short time period, but it is also a particularly active time for many animals.</Paragraph>
          <Paragraph>Night 1850-0554: Night is the period of complete darkness from evening to early morning. Nocturnal animals, like many predators, are only active during the night. </Paragraph>

          <Heading tag="h4">veg_type</Heading>
          <Paragraph>We have classified the vegetation in the two national parks into four types. You can see these types color-coded on the map on the data page, and you can find full descriptions on the Ecology page.</Paragraph>
          <Paragraph>Lowland semideciduous tropical forest: In lowland semideciduous tropical forests, many trees lose their leaves during the dry season to conserve water, replacing them when the rains begin again. These forests are often characterized by massive cuipo (Cavanillisia platanifolia) trees, which are particularly common on drier sites such as well-drained limestone soils or hilltops. In Darién National Park, semideciduous forests are found mainly in the river valleys, while in Soberanía, semideciduous forests occur in the drier southern zone of the park.</Paragraph>
          <Paragraph>Lowland evergreen tropical forest: In lowland evergreen tropical forests, most trees keep their leaves throughout the year. In Soberanía National Park, evergreen forests are found at the wetter northern end of the park, while in Darién, evergreen forests are found around the bases of the mountain ranges. </Paragraph>
          <Paragraph>Submontane evergreen tropical forest: Soberanía National Park does not have submontane forest. In Darién, submontane forests are evergreen and are found between about 700 and 1,200 meters (2,300 to 4,000 feet) in elevation. These forests are tall but somewhat shorter than lowland forests. Temperatures are cooler, and conditions are generally wetter.</Paragraph>
          <Paragraph>Montane evergreen tropical forest: Montane forest is only found in Darién National Park. These forests occur above 1,200 meters (4,000 feet) on the highest peaks of the ranges. In these forests, the canopy is even lower, and epiphytes are plentiful. On ridge tops where clouds linger, stunted cloud forest may occur. Here much of the moisture plants need comes from mist and clouds. The tree trunks and branches and the soil are covered with a dense mat of moss, ferns, and other small plants. </Paragraph>
          <Heading tag="h4">human_structure</Heading>
          <Paragraph>The distance from each camera to the nearest human-made infrastructure was recorded. The types of human structures are:</Paragraph>
          <Paragraph>Road: Roads inside Soberanía park are made of dirt or gravel and are traveled by tourists and park staff. There are no official roads in Darién, but there are some small dirt walking paths.</Paragraph>
          <Paragraph>Village: In Darién, local indigenous communities live in and around the national park. Their villages are small and are usually located along rivers, as canoes are the main mode of transportation here.</Paragraph>
          <Paragraph>Farm or Ranch: Local indigenous people do small-scale farming near their villages. Larger farms and ranches are typically established by people from other parts of Panama who colonize the area.</Paragraph>
          <Heading tag="h4">distance_human_m</Heading>
          <Paragraph>The distance from each camera to the nearest human-made infrastructure was recorded in meters. See the human_structure category above.</Paragraph>
          <Heading tag="h4">water_type</Heading>
          <Paragraph>For each camera, the distance to the nearest water body was recorded. The types of water bodies are:</Paragraph>
          <Paragraph>Lake: A lake is a freshwater body of water that is larger than a pond.</Paragraph>
          <Paragraph>River: Rivers are freshwater channels of flowing water. Rivers originate at higher elevations, such as Mount Pirre in Darién National Park. Rivers flow into lakes and are an important source of water in the Darién and Soberanía ecosystems.</Paragraph>
          <Heading tag="h4">distance_water_m</Heading>
          <Paragraph>The distance from each camera to the nearest body of water was recorded in meters. See the water_type category above.</Paragraph>
          <Heading tag="h4">species</Heading>
          <Paragraph>Each photo is identified by a group of citizen scientists and the answers are aggregated into the most likely species and numbers of animals (see species_count below). There are 48 options including humans, vehicles, and “nothing here.” Many of the large mammal options are individual species, but in some cases the species is actually a group of species (e.g., bird, reptile/amphibian, rodent, etc.). This list does not include many of the smaller organisms, like insects, which cannot be captured on trail cameras.</Paragraph>
          <Heading tag="h4">species_count</Heading>
          <Paragraph>This represents the approximate number of members of a particular species that are identified in a photo. Each photo is identified by a group of citizen scientists, and the answers are aggregated into the most likely species and how many individuals (see species above). Please note that for large numbers of animals, the number "15" actually corresponds to the range of "11-20" animals, and the number "?" actually corresponds to "21+" animals. While the researchers use ranges, the downloaded CSV uses the mean values to allow you to use species counts in calculations and graphs.</Paragraph>
          <Heading tag="h4">image_url</Heading>
          <Paragraph>Each image is hosted on a server and can be viewed by pasting this url into a web browser. This is the image that all the data in this row is derived from.</Paragraph>
          <Heading tag="h4">land_use</Heading>
          <Paragraph>Land use is the way that humans use the land. The land use types are:</Paragraph>
          <Paragraph>Tourism: Soberanía National Park is much closer to major cities and thus is visited by tourists more often than Darién National Park. Therefore, the primary land use for Soberanía is tourism.</Paragraph>
          <Paragraph>Wilderness: Darién National Park is very remote and much of the area is untouched by humans; therefore, the primary land use is wilderness.</Paragraph>
          <Paragraph>Farm or Ranch: Some areas on the edges of Darién are impacted by humans doing illegal farming or ranching. These farms and ranches are typically established by people from other parts of Panama who colonize the area.</Paragraph>
          <Heading tag="h4">park</Heading>
          <Paragraph>This represents whether the camera is in (or near) Soberanía or Darién National Park.</Paragraph>
          </Section>

      </Box>
    </Box>
  );
};

DarienInfoEcology.defaultProps = {};

DarienInfoEcology.propTypes = {};

export default DarienInfoEcology;
