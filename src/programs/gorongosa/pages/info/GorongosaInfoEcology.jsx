import React from 'react';
import PropTypes from 'prop-types';

import Anchor from 'grommet/components/Anchor';
import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';
import Image from 'grommet/components/Image';
import Paragraph from 'grommet/components/Paragraph';
import Video from 'react-youtube';

import imgGraphs from '../../images/ecology/graphs.png';
import imgParkMap from '../../images/ecology/park-map.png';
import imgVegetation from '../../images/ecology/vegetation.png';

function GorongosaInfoEcology(props) {
  return (
    <Box
      className="wildcam-info-page"
      pad={{ vertical: 'medium', horizontal: 'large' }}
    >
      <Heading tag="h2">Ecology</Heading>
      
      <Heading tag="h3">Geography</Heading>
      <Box margin={{ bottom: 'medium' }}>
        <Paragraph>Gorongosa National Park in central Mozambique is a 4,067-square-kilometer (1,570-square-mile) protected area at the southern end of the African Rift Valley. The rift valley extends through the center of the park, and plateaus rise to the east and west. The western plateau includes a series of granite hills, called inselbergs, that are used by raptors and wildlife that live at high elevations. The eastern plateau includes a series of limestone gorges that were carved by rivers. The park also includes the section of Mount Gorongosa that is above 700 meters, located to the northwest of the main park area.</Paragraph>
        <Paragraph>The current boundaries of the park are defined by various natural and human-made features. For example, the Pungue River forms the southern boundary of the park, and a major road forms part of the northern boundary.</Paragraph>
        <Image className="full-image" src={imgParkMap} size="large" caption="" />
        <Paragraph>Two terrestrial biomes are found within the boundaries of Gorongosa National Park. Mount Gorongosa is part of the tropical rainforest biome, characterized by high rainfall, temperatures, and humidity year-round. The rest of the park is part of the savanna biome, characterized by high temperatures and extreme seasonal rainfall. In Mozambique, the wet season lasts from December to April and the dry season lasts from May to October.</Paragraph>
        <Image className="full-image" src={imgGraphs} size="large" caption="" />
      </Box>
      
      <Heading tag="h3">Water</Heading>
      <Box margin={{ bottom: 'medium' }}>
        <Paragraph>Water flows through rivers from Mount Gorongosa into Lake Urema in the center of the valley. During the wet season, Lake Urema expands to over 10 times its size, covering the grassland. During the dry season, the lake contracts, exposing nutritious grass on the floodplain that is grazed by many of the park’s herbivores. As the dry season continues, the grass throughout the park slowly turns brown and dies. This dry grass can fuel large wildfires that burn sections of the park in the late dry season until the rains come again in the wet season. Watch the animation below to learn more about Gorongosa’s water cycle.</Paragraph>
        <Box>
          <Video videoId="7PD_UIxF07c"/>
        </Box>
      </Box>
      
      <Heading tag="h3">Vegetation</Heading>
      <Box margin={{ bottom: 'medium' }}>
        <Paragraph>Five major vegetation types make up the Gorongosa ecosystem: grassland, mixed savanna and woodland, miombo woodland, limestone gorge forest, and tropical rainforest.</Paragraph>
        <Image className="full-image" src={imgVegetation} size="large" caption="" />
        <Paragraph>Grasslands cover almost 20% of the park and are maintained by the seasonal flooding of Lake Urema and its rivers, natural fires during the dry season, and grazing by herbivores. Elephants also play a part by knocking down trees along the edge of the floodplain to reach leaves and fruit. Grasslands support a vast diversity of species. Large grazers such as hippos, buffalo, wildebeest, zebra, and waterbuck eat a staggering amount of grass each day and help “mow” tall grasses, creating patches of short grass. Smaller antelope, like impala, reedbuck, and oribi, feed on the lush, green grass shoots that grow in these short patches. These herbivores attract large predators, like lions.</Paragraph>
        <Paragraph>The mixed savanna and woodland vegetation type is a patchwork of different types of forest in the rift valley. Savanna has an open tree canopy, allowing enough light to reach the ground for grasses and herbs to blanket the ground, whereas woodland is closed canopy forest with sparse ground vegetation. This diversity of forests provides habitats for many different wildlife species, from the smallest creatures, like insects, to the largest, like elephants. The diversity of forest patches across the landscape, as well as the diversity in vertical habitats, allows nearly all of Gorongosa’s species to be able to live in this vegetation type.</Paragraph>
        <Paragraph>The most common type of forest in Gorongosa is called miombo woodland. Miombo is the Swahili name for the most prevalent type of tree from the genus Brachystegia. The small-leaved Brachystegia trees can grow in poor soils and are commonly found in the rocky plateaus on the eastern and western sides of the park. Miombo woodlands are home to many of Gorongosa’s antelopes that feed on leaves (browsers), including impala, bushbuck, nyala, kudu, eland, and sable antelope. Some of these antelopes are mixed feeders that also eat grass. Primates, like baboons, vervet monkeys, and bushbabies, are commonly found in woodland habitat, foraging on the ground or high in the trees. Birds, reptiles, amphibians, and insects are an important food source for small carnivores, like mongooses, genets, and civets. Because this forest is dominated by a single tree type, biodiversity is typically less here than in the patchy woodland/savanna habitat.</Paragraph>
        <Paragraph>The limestone gorges were formed over many millions of years as erosion from rivers and rain carved out deep gorges in the side of the plateau in the eastern side of the park. Many of these gorges still contain small rivers surrounded by lush, riparian forest. The gorge stays cool and moist, even in the dry season, and provides nutritious green vegetation for a variety of animals year-round, including antelopes, baboons, birds, and carnivores.</Paragraph>
        <Paragraph>Mount Gorongosa is topped with a tropical rainforest that can only grow in areas that receive high rainfall. The huge tropical trees of this rainforest tower to heights of 20 to 30 meters (about 60 to 100 feet) and form a closed canopy that creates a cool, dark, moist environment for mosses and ferns that cover the ground and rocks. Some of the animal species on Mount Gorongosa are found nowhere else on Earth, such as the Mount Gorongosa pygmy chameleon and the green-headed oriole. While the larger mammals of the rift valley are not found here, this rainforest is home to many species of birds, insects, reptiles, amphibians, and rodents.</Paragraph>
      </Box>
      
      <Heading tag="h3">Wildlife</Heading>
      <Box margin={{ bottom: 'medium' }}>
        <Paragraph>Herbivores are animals that primarily eat plants. Gorongosa‘s most conspicuous residents are the large herbivores that can be seen feeding on grass and leaves throughout the park. These herbivores can be divided into grazers, browsers, or mixed feeders based on what they eat. The strict grazers eat only grass and spend most of their time in the grassland in the center of the park. Some of the prominent grazers in Gorongosa are waterbuck, buffalo, wildebeest, zebra, and hippos. As Lake Urema floods and the grassland becomes inundated during the wet season, these grazers move to higher ground away from the lake. Browsers, such as kudu, bushbuck, and nyala, spend nearly all of their time in the savanna and woodland areas. Mixed feeders, such as elephants, spend time in both grassland and woodland.</Paragraph>
        <Box>
          <Video videoId="8eH6X2rAQEs"/>
        </Box>
        <Paragraph>Lions are the largest predator in Gorongosa. They are highly territorial and form prides that typically consist of one male and several females and their young. Lions can be found in any part of Gorongosa except the mountain, but are most common in the grassland and savanna/woodland habitats of the valley. The other large predators that once existed in the park, including leopards, hyenas, and wild dogs, have not been seen in decades. Smaller predators, such as civets and serval, are common and eat small mammals, reptiles, and birds.</Paragraph>
        <Box>
          <Video videoId="VPP_COhvzn0"/>
        </Box>
        <Paragraph>Smaller wildlife in Gorongosa include warthogs, three primate species (the most common of which are baboons), birds, reptiles, amphibians, and insects. The birdlife of Gorongosa is extremely diverse and includes large raptors such as vultures and eagles as well as small songbirds. Crocodiles are the largest reptile in Gorongosa and are extremely abundant in lakes and rivers. Insects are also a very important part of Gorongosa’s ecosystem and are being studied by Gorongosa’s scientists.</Paragraph>
        <Box>
          <Video videoId="gSqkzqedW4g"/>
        </Box>
      </Box>
      
      <Heading tag="h3">Wildlife</Heading>
      <Box margin={{ bottom: 'medium' }}>
        <Paragraph>Humans are a part of the ecosystem in Gorongosa. Tourists travel in vehicles on the park roads while viewing wildlife, park rangers protect wildlife by patrolling the area, and local people live in villages and on farms surrounding the park. Humans may have either a positive or negative impact on wildlife. Some animals are afraid of humans, while some are attracted to food that they can find on farms or in villages. Some local people set traps and hunt wildlife, while park rangers protect wildlife by removing traps.</Paragraph>
      </Box>
    </Box>
  );
};

GorongosaInfoEcology.defaultProps = {};

GorongosaInfoEcology.propTypes = {};

export default GorongosaInfoEcology;
