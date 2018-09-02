import React from 'react';
import PropTypes from 'prop-types';

import Anchor from 'grommet/components/Anchor';
import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';
import Image from 'grommet/components/Image';
import Paragraph from 'grommet/components/Paragraph';

import imgEcology1 from '../../images/ecology-1-climatogram.jpg';
import imgEcology2 from '../../images/ecology-2-snapshot.png';
import imgEcology3 from '../../images/ecology-3-snapshot.png';
import imgEcology4 from '../../images/ecology-4-main-river.jpg';
import imgEcology5 from '../../images/ecology-5-forest.jpg';
import imgEcology6 from '../../images/ecology-6-snapshot.png';
import imgEcology7 from '../../images/ecology-7-cloud-forest.jpg';
import imgEcology8 from '../../images/ecology-8-tapir.jpg';
import imgEcology9 from '../../images/ecology-9-peccary.jpg';
import imgEcology10 from '../../images/ecology-10-jaguar.jpg';
import imgEcology11 from '../../images/ecology-11-anteater.jpg';

function DarienInfoEcology(props) {
  return (
    <Box
      className="wildcam-info-page"
      pad={{ vertical: 'medium', horizontal: 'large' }}
    >
      <Heading tag="h2">Ecology</Heading>
      <Paragraph>Although they differ greatly in size and setting, Soberanía and Darién national parks in Panama are generally similar in climate, vegetation, and fauna. Their differences are mainly due to Soberanía’s location near the two largest urban areas in Panama, while Darién National Park is in a remote and sparsely populated region. In addition, Soberanía contains only lowland environments, while Darién also has mountain ranges with submontane and montane habitats. </Paragraph>
      <Image src={imgEcology1} size="large" caption="" />

      <Heading tag="h3">Geography</Heading>
      <Paragraph>Soberanía National Park (221 square kilometers, or 85 square miles) is located on the eastern side of the Panama Canal in central Panama. The broad Chagres River divides the park into southern and northern sections. The terrain is hilly, especially in the northern part of the park, and the elevation ranges from 30 to 332 meters (100 to 1,100 feet). Many small streams cross the park to drain into the Panama Canal or Lake Gatun, a manmade reservoir that forms the central part of the Panama Canal. </Paragraph>
      <Paragraph>Darién National Park (5,780 square kilometers, or 2,230 square miles), in eastern Panama on the border with Colombia, is the largest protected area in the country and one of the largest in Central America. Its topography is rugged and includes several major mountain ranges, the highest being the Serranía de Tacarcuna (1,875 meters, or 6,151 feet) near the Caribbean coast. The Serranía de Pirre is in the central part of the park about halfway between the Caribbean and the Pacific. Another set of mountain ranges including the Serranía del Sapo, Serranía de Jinguradó, and Cordillera de Juradó lie near the Pacific coast. Several major rivers run through the park in broad valleys, including the Tuira, Balsas, Sambú, and Jaqué. The park reaches sea level along the Pacific coast, where it includes sandy beaches, rocky shores, and mangroves.</Paragraph>

      <Image src={imgEcology2} size="large" caption="" />

      <Heading tag="h3">Climate</Heading>
      <Paragraph>The lowlands of both Soberanía and Darién national parks have a tropical climate that is hot and humid year-round, with little seasonal difference in temperature. However, rainfall varies greatly from one season to another. Most of the rain falls during an eight-month rainy season extending from May through December, when it may rain almost every day. Rain usually takes the form of short but intense downpours in the afternoons. It often rains somewhat less in September, while October and November are the rainiest months. During the dry season from January through April, strong trade winds blow from the northeast and little or no rain may fall for weeks at a time. Smaller rivers and streams may dry up completely.</Paragraph>

      <Image src={imgEcology3} size="large" caption="" />

      <Paragraph>In central Panama, where Soberanía is located, there is a strong rainfall gradient, with annual rainfall almost doubling between the Pacific and Caribbean coasts. Annual rainfall varies from about 1,800 mm (70 inches) in the southern part of the park to over 3,000 mm (118 inches) near its northern end.</Paragraph>
      <Paragraph>In Darién National Park, the driest conditions are found in river valleys which are shielded from moisture-bearing winds by high mountain ranges. Here the annual rainfall can be as little as 1,600 mm (63 inches). The climate is cooler and wetter at higher elevations on the mountain ranges, where annual rainfall exceeds 4,500 mm (177 inches) on Cerro Tacarcuna.</Paragraph>

      <Heading tag="h3">Vegetation</Heading>

      <Paragraph>Tropical forest, often referred to as “tropical rainforest,” is the major biome found in both Soberanía and Darién national parks. Tropical forests have the highest biodiversity of any habitat in the world, equaled only by coral reefs. In Central Panama, an area of just 50 hectares (124 acres) has been found to contain more than 300 species of trees, more than 10 times the number in most temperate forests in the United States. These forests also contain a very high diversity of other plants, mammals, birds, reptiles, amphibians, insects, fungi, and other organisms.</Paragraph>

      <Image src={imgEcology4} size="large" caption="" />

      <Paragraph>Unlike temperate forests, where many trees and other plants depend on wind to spread their pollen or disperse their seeds, most tropical forest trees and other flowering plants depend on animals for their reproduction. Flowers are pollinated by hummingbirds and honeycreepers, bats, bees, butterflies and moths, and many other animals. Animals ranging in size from tapirs to ants disperse seeds by eating or carrying away the fruits provided by plants. The seasonal abundance of flowers and fruits is a major factor in the distribution and movements of many species of animals in a tropical forest.</Paragraph>
      <Paragraph>Tropical forests, especially in lowlands, are typically composed of several layers of vegetation. They have a closed canopy of tall trees (often 30 or more meters, or 100 feet in height), with some large “emergent” trees that tower above the canopy reaching 45 meters (150 feet) or more. Several layers of smaller trees grow beneath the canopy, filtering out much of the sunlight before it reaches the forest floor. Because of this the understory of evergreen forests is often fairly open, since few plants can grow in the dim light. The forest interior is cooler and more humid than outside the forest. Lianas, or woody vines, that climb up trees to reach the sunlit levels of the canopy are a typical feature of tropical forests. Especially in wetter areas, many trees bear large numbers of epiphytes, smaller plants that grow on branches to get more exposure to the sun. These include ferns, bromeliads, orchids, and even cacti.</Paragraph>

      <Image src={imgEcology5} size="large" caption="" />

      <Paragraph>Tropical forests include several different types of forest, depending on local differences in rainfall and elevation. In the lowlands, both Soberanía and Darién national parks contain two major forest types: evergreen forest and semideciduous forest. In addition, Darién National Park contains submontane and montane forest types at higher elevations on the mountain ranges.</Paragraph>

      <Image src={imgEcology6} size="large" caption="" />

      <Paragraph>In lowland evergreen tropical forests, most trees keep their leaves throughout the year. In lowland semideciduous tropical forests, many trees lose their leaves during the dry season to conserve water, replacing them when the rains begin again. In Panama, especially in Darién, such forests are often characterized by massive cuipo (Cavanillisia platanifolia) trees, which are particularly common on drier sites such as well-drained limestone soils or hilltops. In Soberanía, semideciduous forests occur in the drier southern zone of the park, gradually transitioning to evergreen forest at the wetter northern end. In Darién National Park, semideciduous forests are found mainly in the river valleys, while evergreen forests are found around the bases of the mountain ranges. </Paragraph>
      <Paragraph>In Darién, submontane forests are found between about 700 and 1,200 meters in altitude (2,300 to 4,000 feet). These forests are tall but somewhat shorter than lowland forests. Temperatures are cooler, and conditions are generally wetter. Montane forests occur above 1,200 meters (4,000 feet) on the highest peaks of the ranges. In these forests, the canopy is even lower, and epiphytes are plentiful. On ridge tops where clouds linger, stunted cloud forest may occur. Here much of the moisture plants need comes from mist and clouds. The tree trunks and branches and the soil are covered with a dense mat of moss, ferns, and other small plants. </Paragraph>

      <Image src={imgEcology7} size="large" caption="Cloud Forest" />

      <Heading tag="h3">Wildlife</Heading>

      <Paragraph>In Soberanía and Darién national parks, most animals, particularly the larger ones, are not restricted to a single forest type but can be found in several or even all of them. Some species are more common or restricted to lowlands, however, while other species are only found in the cooler submontane or montane forests. </Paragraph>
      <Paragraph>Wildlife, especially large mammals, can be surprisingly scarce and hard to observe in tropical forests. Much of the life in these forests is found in the canopy, where intense sunlight provides energy for the growth of leaves and the production of flowers and fruit. Many species are arboreal, rarely or never coming to the ground. These include monkeys, sloths, squirrels, porcupines, other rodents, and some species of opossums, anteaters, and carnivores. Although relatively few plants grow on the shaded forest floor, fallen fruit can provide important resources for many animals.</Paragraph>
      <Paragraph>Only five species of large herbivores live in most of Panama’s tropical forests: Baird’s tapir, two deer, and two peccaries. Baird’s tapir is the largest animal found in tropical forests in the Americas. It browses on the leaves of understory plants and consumes fallen fruit. It is the only species capable of dispersing the seeds of some large fruits because it swallows the seeds whole. (Peccaries chew seeds up with their strong teeth, while deer digest them.) Tapirs prefer to stay close to water but may be found even in montane forests. </Paragraph>

      <Image src={imgEcology8} size="large" caption="Baird's Tapir" />

      <Paragraph>White-tailed deer also consume leaves but tend to be found in areas of second growth or disturbed areas rather than within mature forest. Red brocket deer are somewhat smaller than white-tailed deer and are found mainly in mature forest, where they feed on leaves and fallen fruit. Peccaries resemble pigs and feed mostly on fallen fruits, seeds, and nuts. They also eat other plant material including tubers and roots, as well as small animals that they find by plowing up the forest floor with their snouts. The smaller collared peccary goes about in small herds of around a dozen, while the larger white-lipped peccary is found in herds of 40 to over 200. </Paragraph>

      <Image src={imgEcology9} size="large" caption="White-lipped Peccary" />

      <Paragraph>Several species of large rodents, especially the paca and agouti, are also important consumers and dispersers of fruit that falls to the forest floor. Agoutis promote seed dispersal by burying seeds for later consumption. These seeds can germinate when the agouti forgets their location or is itself eaten by a predator.</Paragraph>
      <Paragraph>Both Soberanía and Darién national parks have a high diversity of predators. The largest of these are the jaguar, the largest cat in the Americas, and the slightly smaller puma. While both species consume a diversity of prey, jaguars tend to take more peccaries, and puma more deer. Smaller predators include several species of smaller cats, bush dogs, two species of foxes, and a variety of species in the raccoon and weasel families. Three species of anteaters, which feed on ants and termites, are found, as well as two species of armadillos, which eat small animals they find on the forest floor.</Paragraph>

      <Image src={imgEcology10} size="large" caption="Jaguar" />

      <Paragraph>Other mammals include eight species of opossums, two species of sloths, eight primates, many rodents, and over 90 species of bats. More than 400 species of birds have been recorded in each of the parks, as well as many species of reptiles, amphibians, insects, and other invertebrates.</Paragraph>
      <Paragraph>Because of its remoteness, Darién National Park preserves a nearly intact fauna, including large herbivores and predators. Some species found in Darién National Park are absent or rare in Soberanía due to hunting. White-lipped peccaries and Central American spider monkeys became locally extinct in Soberanía by the middle of the past century. Tapirs were also hunted out, but a small population was reintroduced in the 1950s to Barro Colorado Island near Soberanía, and a few are now found in the park. Jaguars and puma are also very rare, and may represent wanderers rather than a permanent population. Giant anteaters are also absent from Soberanía.</Paragraph>

      <Image src={imgEcology11} size="large" caption="Giant Anteater" />

      <Paragraph>Coyotes and northern raccoons are primarily species of North America, and their ranges extend to Soberanía but not Darién. Brown-headed spider monkeys occur mainly in South America and range to Darién National Park but not to Soberanía. Some species found in Darién National Park occur only in submontane or montane areas and are absent from Soberanía due to the absence of this habitat there. These include some endemic species found nowhere else in the world. </Paragraph>

      <Heading tag="h3">Humans</Heading>
      <Paragraph>Humans are an important part of the ecosystems of both Soberanía and Darién national parks. Soberanía is located between Panama’s two largest cities, Panama City and Colón, and major highways between them run just east of the park. The park, particularly its southern zone, is a very popular recreational area, both for Panamanians and for international visitors. Many people visit the park for hiking, mountain biking, bird watching, fishing, and other outdoor activities, and several ecotourism hotels and facilities are in or adjacent to the park. The park is also an important site for scientific studies by the Smithsonian Tropical Research Institute and other organizations. Some illegal hunting takes place by people that come from communities outside the park. Park rangers patrol the park to prevent poaching and the illegal harvest of valuable timber species. The forests of the park help to ensure a steady water supply for the operation of the Panama Canal, one of the most important transportation routes in the world.</Paragraph>
      <Paragraph>Darién National Park is much more remote than Soberanía and can be reached only by boat along the rivers, on foot, or by plane. Three indigenous groups, the Emberá, Wounaan, and Guna, pursue a traditional way of life in villages located mostly along rivers. The area is also inhabited by Dariénitas, an ethnic group descended from African slaves who escaped and took refuge in the region hundreds of years ago. Areas around the park have been settled by colonists who migrated from elsewhere in Panama to establish cattle ranches and farms. Some of the people who live in and near the park hunt animals for food or, in the case of predators, to protect their cattle. The park is visited by tourists as well as by scientists, and is patrolled by park rangers who try to prevent illegal hunting and clearing of forest.</Paragraph>
      <Paragraph>Watch this video about community conservation using drones in Darien:</Paragraph>

      <Heading tag="h3">Mapping the Darién Gap</Heading>
      <Paragraph>
        <Anchor href="https://youtu.be/SD_9J5Ybwt4">https://youtu.be/SD_9J5Ybwt4</Anchor>
      </Paragraph>

    </Box>
  );
};

DarienInfoEcology.defaultProps = {};

DarienInfoEcology.propTypes = {};

export default DarienInfoEcology;
