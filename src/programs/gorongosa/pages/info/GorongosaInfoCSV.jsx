import React from 'react';
import PropTypes from 'prop-types';

import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';
import Image from 'grommet/components/Image';
import Paragraph from 'grommet/components/Paragraph';
import Section from 'grommet/components/Section';

function GorongosaInfoCSV(props) {
  return (
    <Box>
      <Box
        className="wildcam-info-page"
        pad={{ vertical: 'medium', horizontal: 'large' }}
      >
        <Heading tag="h2">Description of WildCam Lab Data</Heading>
        <Paragraph>The spreadsheets that you can download from WildCam Lab include data from a set of photos that have been classified by volunteers. Each row represents a species in a unique photo. For example, if one photo has only warthogs in the photo, there will only be one row of data for that photo. If another photo has some warthogs and some impalas in the photo, there will be two rows of data for that photo. Each column is a piece of information about that photo. This information is based on the location of the camera, the time and date stamp on the photo, or the animal identifications from up to 25 citizen scientists that have been aggregated based on an algorithm. Below, you will find additional information about each column in the spreadsheet.</Paragraph>
        <Paragraph>The files are downloaded in CSV format. If you choose to analyze the data using Excel functionality, it is highly recommended that you save the file in Excel (.xlsx) format before you analyze the data, otherwise you may lose your work. If you choose to analyze the data using R or another statistical software, CSV format is usually best.</Paragraph>

        <Section>
          <Heading tag="h3">Columns</Heading>
          <Heading tag="h4">image_id</Heading>
          <Paragraph>Unique identifier for each individual photo</Paragraph>
          
          <Heading tag="h4">camera</Heading>
          <Paragraph>Unique identifier for each individual camera</Paragraph>
          
          <Heading tag="h4">longitude</Heading>
          <Paragraph>Longitude for the camera location in decimal degrees</Paragraph>
          
          <Heading tag="h4">latitude</Heading>
          <Paragraph>Latitude for the camera location in decimal degrees</Paragraph>
          
          <Heading tag="h4">date</Heading>
          <Paragraph>Date that the photo was taken based on the time stamp of the photo (note that sometimes these time stamps malfunction, so there can be errors)</Paragraph>
          
          <Heading tag="h4">month</Heading>
          <Paragraph>Month that the photo was taken based on the time stamp of the photo (see “date” description above)</Paragraph>
          
          <Heading tag="h4">year</Heading>
          <Paragraph>Month that the photo was taken based on the time stamp of the photo (see “date” description above)</Paragraph>
          
          <Heading tag="h4">season</Heading>
          <Paragraph>
            Season that the photo was taken based on the time stamp of the photo (see “date” description above). In Gorongosa, there are two distinct seasons (wet and dry) and there are transition periods in between:
            <ul>
              <li><b>Dry Jul-Sep:</b> The dry season, running from July through September in Gorongosa, typically has hot, sunny days with almost no humidity or rainfall and cool nights. Vegetation turns from mostly green to mostly brown during this season. Fires are common as the grass becomes drier. Larger lakes and rivers shrink while smaller ponds and streams completely dry up.</li>
              <li><b>Dry Wet Oct-Dec:</b> During the months of October through December, the dry season transitions to the wet season. In October, most days are still dry and fires are common but rain storms begin and days gradually become more humid. By December, rainfall is common, days and nights become hot and humid, and vegetation begins to green.</li>
              <li><b>Wet Jan-Mar:</b> January through March is the height of the wet season. Major rainfall is common in January and February and flooding occurs. Vegetation becomes completely green and grasses grow tall. Days and nights are very hot and humid.</li>
              <li><b>Wet Dry Apr-Jun:</b> During the months of April through June, the wet season transitions to the dry season. In April, rain showers still occur occasionally but flooded areas begin to recede as dry days become more common. By June, rainfall is very rare and flooded areas completely recede. Days are warm but less humid and nights begin to get cooler. Vegetation is green and lush.</li>
            </ul>
          </Paragraph>
          
          <Heading tag="h4">time_period</Heading>
          <Paragraph>
            The time period that the photo was taken based on the time stamp of the photo (see “date” description above). The times listed in the column headers are in 24 hour clock format (0000 to 2400h). We have grouped time period into four categories:
            <ul>
              <li><b>Dawn 0557-0622:</b> Dawn is the transition between night and day when the daylight turns from dark to light. This is a very short time period but it is also a particularly active time for many animals.</li>
              <li><b>Day 0623-1709:</b> Day is the period of complete sunlight from morning to late afternoon. Some animals are active throughout the day, but many animals rest during the heat of the afternoon. Nocturnal animals, like many predators, are not active during the day.</li>
              <li><b>Dusk 1710-1735:</b> Dusk is the transition between day and night when the daylight turns from light to dark. This is a very short time period but it is also a particularly active time for many animals.</li>
              <li><b>Night 1736-0556:</b> Night is the period of complete darkness from evening to early morning. Nocturnal animals, like many predators, are only active during the night. Note that the times chosen to represent these time periods are based on the time of sunset and sunrise during July in Mozambique. Since daylight patterns change throughout the year, these time periods may not be accurate during each month.</li>
            </ul>
          </Paragraph>
          
          <Heading tag="h4">veg_type</Heading>
          <Paragraph>
            We have classified the vegetation in the main park area into four types. You can see these types color-coded on the map on the data page and you can find full descriptions on the Ecology page.
            <ul>
              <li><b>Floodplain Grassland:</b> Grassland is an open grassy area with no trees or shrubs. Grasses may be tall or short. Grassland is found in the valley around Lake Urema and around rivers where seasonal flooding occurs.</li>
              <li><b>Mixed Savanna and Woodland:</b> Mixed savanna and woodland is a patchy mosaic of different types of savanna and woodland. Savanna is an open landscape with some trees and shrubs but sparse enough that sun reaches the ground to support grass growth. Woodland is a forest with a mostly closed canopy that does not allow grasses to cover the ground. There are different types of savanna and woodland depending on the dominant tree species.</li>
              <li><b>Limestone Gorge:</b> The limestone gorges are ravines that were carved out of the eastern plateau of the rift valley by rivers over millennia. Rivers typically flow through these gorges and vegetation is usually lush, riverine forest that opens to sandy river banks. Caves, boulders, and narrow passageways are common.</li>
              <li><b>Miombo Woodland:</b> Miombo woodland is a mostly closed forest dominated by miombo trees (Brachystegia spp.). Little or no grass and herbs cover the forest floor. Miombo woodland is common on the higher elevation and poor soils of the plateaus on the eastern and western sides of the park.</li>
            </ul>
          </Paragraph>
          
          <Heading tag="h4">human_structure</Heading>
          <Paragraph>
            The distance from each camera to the nearest human-made infrastructure was recorded. The types of human structures are:
            <ul>
              <li><b>Road:</b> Roads inside the park are made of dirt or gravel and are traveled by tourists and park staff.</li>
              <li><b>Ranger Outpost:</b> A ranger outpost is a small building where park rangers are stationed while they go out on daily foot patrols.</li>
              <li><b>School:</b> A school is usually a small building made of local wood or brick. Schools are usually in or near a village.</li>
            </ul>
          </Paragraph>
          
          <Heading tag="h4">distance_human_m</Heading>
          <Paragraph>The distance from each camera to the nearest human-made infrastructure was recorded in meters. See the human_structure category above.</Paragraph>
          
          <Heading tag="h4">water_type</Heading>
          <Paragraph>
            For each camera, the distance from that camera to the nearest water body was recorded. The types of water bodies are:
            <ul>
              <li><b>Lake:</b> A lake is a freshwater body of water that is larger than a pond. The largest lake is Lake Urema in the center of the park.</li>
              <li><b>Pond:</b> A pond is a freshwater body of water that is smaller than a lake. Most ponds are seasonal, drying up in the dry season. Ponds throughout the park are important water sources for animals and many different species can be found congregating around them.</li>
              <li><b>River:</b> Rivers are freshwater channel of flowing water. Rivers originate in higher elevation, such as Mount Gorongosa, to the northwest or the Cheringoma plateau to the east. Rivers flow into lakes and are an important source of water in the Gorongosa ecosystem.</li>
            </ul>
          </Paragraph>
          
          <Heading tag="h4">distance_water_m</Heading>
          <Paragraph>The distance from each camera to the nearest water body was recorded in meters. See the water_type category above.</Paragraph>
          
          <Heading tag="h4">species</Heading>
          <Paragraph>Each photo is identified by up to 25 citizen scientists and the answers are aggregated into the most likely species and numbers of animals (see species_count below). There are 52 options including humans, fire, and “nothing here”. Many of the large mammal options are individual species, but in some cases the species is actually a group of species (e.g. bird, reptile, rodent, etc). This list does not include many of the smaller organisms, like insects, which cannot be captured on trail cameras.</Paragraph>
          
          <Heading tag="h4">species_count</Heading>
          <Paragraph>This represents the approximate number of a particular species that is identified in a photo. Each photo is identified by up to 25 citizen scientists and the answers are aggregated into the most likely species and how many (see species above). Please note that for large numbers of animals, the number "25" actually corresponds to the range of "11-50" animals, and the number "75" actually corresponds to the range of "50+" animals. While the researchers use ranges, the downloaded CSV uses the mean values to allow you to use species counts in calculations and graphs.</Paragraph>
          
          <Heading tag="h4">percentage_resting</Heading>
          <Paragraph>Citizen science identifications for behavior are not always as accurate as they are for species and animal numbers. As a result, this data is not aggregated in the same way. This column shows the proportion of citizen scientists who selected “resting” for the species in this photo. Please note that multiple behaviors can be selected, so the proportions may not add up to 1.</Paragraph>
          
          <Heading tag="h4">percentage_standing</Heading>
          <Paragraph>Citizen science identifications for behavior are not always as accurate as they are for species and animal numbers. As a result, this data is not aggregated in the same way. This column shows the proportion of citizen scientists who selected “standing” for the species in this photo. Please note that multiple behaviors can be selected, so the proportions may not add up to 1.</Paragraph>
          
          <Heading tag="h4">percentage_moving</Heading>
          <Paragraph>Citizen science identifications for behavior are not always as accurate as they are for species and animal numbers. As a result, this data is not aggregated in the same way. This column shows the proportion of citizen scientists who selected “moving” for the species in this photo. Please note that multiple behaviors can be selected, so the proportions may not add up to 1.</Paragraph>
          
          <Heading tag="h4">percentage_eating</Heading>
          <Paragraph>Citizen science identifications for behavior are not always as accurate as they are for species and animal numbers. As a result, this data is not aggregated in the same way. This column shows the proportion of citizen scientists who selected “eating” for the species in this photo. Please note that multiple behaviors can be selected, so the proportions may not add up to 1.</Paragraph>
          
          <Heading tag="h4">percentage_interacting</Heading>
          <Paragraph>Citizen science identifications for behavior are not always as accurate as they are for species and animal numbers. As a result, this data is not aggregated in the same way. This column shows the proportion of citizen scientists who selected “interacting” for the species in this photo. Please note that multiple behaviors can be selected, so the proportions may not add up to 1.</Paragraph>
          
          <Heading tag="h4">young_present</Heading>
          <Paragraph>If any young animals are present in the photo (regardless of how many), this field is marked with "YES". If no young animals are present, this field is marked with "NO".</Paragraph>
          
          <Heading tag="h4">horns</Heading>
          <Paragraph>For some animals with horns (the antelopes), males have horns and females do not. For this group, horns are a good way for scientists to analyze how many males and females are in groups. If any animals with horns are present in the photo (regardless of how many), this field is marked with "YES". If no animals with horns are present, this field is marked with "NO". For species that don’t have horns, this question is not included, so the field is blank.</Paragraph>
          
          <Heading tag="h4">image_url</Heading>
          <Paragraph>Each image has a unique url. Paste this url into a browser to see the image that this data corresponds to.</Paragraph>

        </Section>

      </Box>
    </Box>
  );
};

GorongosaInfoCSV.defaultProps = {};

GorongosaInfoCSV.propTypes = {};

export default GorongosaInfoCSV;
