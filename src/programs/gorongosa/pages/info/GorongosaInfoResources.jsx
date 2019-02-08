import React from 'react';
import PropTypes from 'prop-types';

import Anchor from 'grommet/components/Anchor';
import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';
import Image from 'grommet/components/Image';
import Paragraph from 'grommet/components/Paragraph';
import LinkNextIcon from 'grommet/components/icons/base/LinkNext';

import imgResource01 from '../../images/resources/1_ScientificInquiry_thumb.jpg';
import imgResource02 from '../../images/resources/2_BuildingEcologicalPyramids_thumb.jpg';
import imgResource03 from '../../images/resources/3_MeasuringBiodiversity_thumb.jpg';
import imgResource03point5 from '../../images/resources/3.5_HumanImpactOnBiodiversity_thumb.jpg';
import imgResource04 from '../../images/resources/4_TrackingLionRecovery_thumb.jpg';
import imgResource05 from '../../images/resources/5_iTunesUCourse_thumb.jpg';
import imgResource06 from '../../images/resources/6_GorongosaMap_thumb.jpg';
import imgResource07 from '../../images/resources/7_TheGuide_thumb.jpg';
import imgResource08 from '../../images/resources/8_GorongosaTimeline_thumb.jpg';
import imgResource09 from '../../images/resources/9_CreatingChainsWebs_thumb.jpg';
import imgResource10 from '../../images/resources/10_ExploringBiomes_thumb.jpg';
import imgResource11 from '../../images/resources/11_SurveyingBiodiversity_thumb.jpg';
import imgResource12 from '../../images/resources/12_GorongosasWaterCycle_thumb.jpg';

function GorongosaInfoResources(props) {
  return (
    <Box
      className="wildcam-info-page"
      pad={{ vertical: 'medium', horizontal: 'large' }}
    >
      <Heading tag="h2">Educator Resources</Heading>

      <Paragraph>
        WildCam Lab allows students to filter data generated through the WildCam Gorongosa citizen science project, to ask questions and test hypotheses. We have developed a number of activities to guide educators and students through this exploration. Existing WildCam Lab Activities are listed below; we will continue to update the list with new activities.
      </Paragraph>
      <Paragraph>
        To support further exploration of ecological topics using Gorongosa National Park as a case study, HHMI BioInteractive provides a wealth of additional free educational resources, all aligned to national curriculum standards. These are listed below under "Related Resources".
      </Paragraph>
      
      <Heading tag="h3">WildCam Lab Activities</Heading>

      <Heading tag="h4">Scientific Inquiry Using WildCam Gorongosa (ACTIVITY)</Heading>
      <Box direction="row" align="start" margin={{ bottom: 'small' }}>
        <Image className="thumbnail" src={imgResource01} />
        <Paragraph>
          In this activity, students will be guided through the investigation of a scientific question, using data from trail cameras in Gorongosa National Park.
          &nbsp; <Anchor label="View Activity" target="_blank" icon={<LinkNextIcon/>} reverse={true} href="http://www.hhmi.org/biointeractive/scientific-inquiry-using-wildcam-gorongosa" />
        </Paragraph>
      </Box>

      <Heading tag="h4">Building Ecological Pyramids (ACTIVITY)</Heading>
      <Box direction="row" align="start" margin={{ bottom: 'small' }}>
        <Image className="thumbnail" src={imgResource02} />
        <Paragraph>
          In this activity, students will build biomass pyramids depicting trophic levels of various habitat types using data from trail cameras in Gorongosa National Park.
          &nbsp; <Anchor label="View Activity" target="_blank" icon={<LinkNextIcon/>} reverse={true} href="http://www.hhmi.org/biointeractive/building-ecological-pyramids" />
        </Paragraph>
      </Box>
      
      <Heading tag="h4">Measuring Biodiversity in Gorongosa (ACTIVITY)</Heading>
      <Box direction="row" align="start" margin={{ bottom: 'small' }}>
        <Image className="thumbnail" src={imgResource03} />
        <Paragraph>
          In this activity, students will calculate species richness, evenness, and the Shannon diversity index for various habitat types using data from trail cameras in Gorongosa National Park.
          &nbsp; <Anchor label="View Activity" target="_blank" icon={<LinkNextIcon/>} reverse={true} href="http://www.hhmi.org/biointeractive/measuring-biodiversity-gorongosa" />
        </Paragraph>
      </Box>
      
      <Heading tag="h4">Human Impacts on Biodiversity (ACTIVITY)</Heading>
      <Box direction="row" align="start" margin={{ bottom: 'small' }}>
        <Image className="thumbnail" src={imgResource03point5} />
        <Paragraph>
          In this activity, students will use trail camera data to answer a scientific research question about the impacts of humans on species diversity in Gorongosa.
          &nbsp; <Anchor label="View Activity" target="_blank" icon={<LinkNextIcon/>} reverse={true} href="http://www.hhmi.org/biointeractive/human-impacts-biodiversity" />
        </Paragraph>
      </Box>
      
      <Heading tag="h3">Related Resources</Heading>
      
      <Heading tag="h4">Tracking Lion Recovery in Gorongosa National Park (SCIENTIST AT WORK VIDEO)</Heading>
      <Box direction="row" align="start" margin={{ bottom: 'small' }}>
        <Image className="thumbnail" src={imgResource04} />
        <Paragraph>
          See how scientists in Gorongosa National Park are using GPS satellite collars and motion-sensitive cameras to gather data about the recovery of the park’s lion population.
          &nbsp; <Anchor label="View Resource" target="_blank" icon={<LinkNextIcon/>} reverse={true} href="http://www.hhmi.org/biointeractive/tracking-lion-recovery-gorongosa-national-park" />
        </Paragraph>
      </Box>
      
      <Heading tag="h4">iTunes U Course: Using Citizen Science to Study Ecology (SHORT COURSE)</Heading>
      <Box direction="row" align="start" margin={{ bottom: 'small' }}>
        <Image className="thumbnail" src={imgResource05} />
        <Paragraph>
          This iTunes U course teaches concepts in ecology and scientific inquiry through a citizen science project in Gorongosa National Park, Mozambique.
          &nbsp; <Anchor label="View Resource" target="_blank" icon={<LinkNextIcon/>} reverse={true} href="http://www.hhmi.org/biointeractive/itunes-u-course-gorongosa-using-citizen-science-study-ecology" />
        </Paragraph>
      </Box>
      
      <Heading tag="h4">Gorongosa National Park Interactive Map (INTERACTIVE)</Heading>
      <Box direction="row" align="start" margin={{ bottom: 'small' }}>
        <Image className="thumbnail" src={imgResource06} />
        <Paragraph>
          This interactive map of Gorongosa National Park allows users to explore different features of the park, including key components of the conservation strategy.
          &nbsp; <Anchor label="View Resource" target="_blank" icon={<LinkNextIcon/>} reverse={true} href="http://www.hhmi.org/biointeractive/gorongosa-national-park-interactive-map" />
        </Paragraph>
      </Box>
      
      <Heading tag="h4">The Guide: A Biologist in Gorongosa (SHORT FILM)</Heading>
      <Box direction="row" align="start" margin={{ bottom: 'small' }}>
        <Image className="thumbnail" src={imgResource07} />
        <Paragraph>
          Set against the restoration of war-torn Gorongosa National Park in Mozambique, The Guide tells the story of a young man from the local community who discovers a passion for science after meeting world-renowned biologist E.O. Wilson.
          &nbsp; <Anchor label="View Resource" target="_blank" icon={<LinkNextIcon/>} reverse={true} href="http://www.hhmi.org/biointeractive/guide-biologist-gorongosa" />
        </Paragraph>
      </Box>
      
      <Heading tag="h4">Gorongosa Timeline (INTERACTIVE)</Heading>
      <Box direction="row" align="start" margin={{ bottom: 'small' }}>
        <Image className="thumbnail" src={imgResource08} />
        <Paragraph>
          A highly visual interactive timeline for exploring the history of Gorongosa National Park, from its beginnings as a hunting reserve and decline in the wake of a civil war, to its return to being one of the world’s foremost wildlife treasures and case studies in conservation biology.
          &nbsp; <Anchor label="View Resource" target="_blank" icon={<LinkNextIcon/>} reverse={true} href="http://www.hhmi.org/biointeractive/gorongosa-timeline" />
        </Paragraph>
      </Box>
      
      <Heading tag="h4">Creating Chains and Webs to Model Ecological Relationships (ACTIVITY)</Heading>
      <Box direction="row" align="start" margin={{ bottom: 'small' }}>
        <Image className="thumbnail" src={imgResource09} />
        <Paragraph>
          Students use cards to build model food webs and evaluate how ecological disturbances affect each trophic level.
          &nbsp; <Anchor label="View Resource" target="_blank" icon={<LinkNextIcon/>} reverse={true} href="http://www.hhmi.org/biointeractive/creating-chains-and-webs-model-ecological-relationships" />
        </Paragraph>
      </Box>
      
      <Heading tag="h4">Exploring Biomes in Gorongosa National Park (ACTIVITY)</Heading>
      <Box direction="row" align="start" margin={{ bottom: 'small' }}>
        <Image className="thumbnail" src={imgResource10} />
        <Paragraph>
          Gorongosa National Park in Mozambique is a region with high ecological diversity that encompasses two distinct biomes. This activity introduces students to the concept of biomes in conjunction with the Gorongosa National Park interactive map click and learn.
          &nbsp; <Anchor label="View Resource" target="_blank" icon={<LinkNextIcon/>} reverse={true} href="http://www.hhmi.org/biointeractive/exploring-biomes-gorongosa-national-park" />
        </Paragraph>
      </Box>
      
      <Heading tag="h4">Surveying Gorongosa’s Biodiversity (SCIENTIST AT WORK VIDEO)</Heading>
      <Box direction="row" align="start" margin={{ bottom: 'small' }}>
        <Image className="thumbnail" src={imgResource11} />
        <Paragraph>
          Biologists Piotr Naskrecki and Jennifer Guyton identify and record the diversity of species in Gorongosa National Park’s Cheringoma Plateau.
          &nbsp; <Anchor label="View Resource" target="_blank" icon={<LinkNextIcon/>} reverse={true} href="http://www.hhmi.org/biointeractive/surveying-gorongosas-biodiversity" />
        </Paragraph>
      </Box>
      
      <Heading tag="h4">Gorongosa’s Water Cycle (ANIMATION)</Heading>
      <Box direction="row" align="start" margin={{ bottom: 'small' }}>
        <Image className="thumbnail" src={imgResource12} />
        <Paragraph>
          This animation illustrates the main stages of the water cycle in the setting of Gorongosa National Park.
          &nbsp; <Anchor label="View Resource" target="_blank" icon={<LinkNextIcon/>} reverse={true} href="http://www.hhmi.org/biointeractive/gorongosas-water-cycle" />
        </Paragraph>
      </Box>
      
      <Box margin={{ top: 'small' }} colorIndex="light-1" pad="small">
        <Anchor label="Explore All Resources" target="_blank" icon={<LinkNextIcon/>} reverse={true} href="https://www.hhmi.org/biointeractive/gorongosa-national-park" />
      </Box>
      
    </Box>
  );
};

GorongosaInfoResources.defaultProps = {};

GorongosaInfoResources.propTypes = {};

export default GorongosaInfoResources;
