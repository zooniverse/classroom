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
import imgResource04 from '../../images/resources/4_TrackingLionRecovery_thumb.jpg';
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

      <Paragraph>WildCam Lab allows students to filter data generated through the WildCam Gorongosa citizen science project, to ask questions and test hypotheses. We have developed a number of activities to guide educators and students through this exploration. Existing WildCam Lab Activities are listed below; we will continue to update the list with new activities.</Paragraph>
      <Paragraph>To support further exploration of ecological topics using Gorongosa National Park as a case study, HHMI BioInteractive provides a wealth of additional free educational resources, all aligned to national curriculum standards. These are listed below under "Related Resources".</Paragraph>
      
      <Heading tag="h3">WildCam Lab Activities</Heading>

      <Heading tag="h4">Scientific Inquiry and Data Analysis Using WildCam Gorongosa (ACTIVITY)</Heading>
      <Box direction="row" align="start" margin={{ bottom: 'small' }}>
        <Image className="thumbnail" src={imgResource01} />
        <Paragraph>
          In this activity, students will be guided through making observations using trail camera data collected in Gorongosa National Park, developing and investigating a scientifically testable question, and analyzing their results.
          &nbsp; <Anchor label="View Activity" target="_blank" icon={<LinkNextIcon/>} reverse={true} href="https://www.biointeractive.org/classroom-resources/scientific-inquiry-and-data-analysis-using-wildcam-gorongosa" />
        </Paragraph>
      </Box>

      <Heading tag="h4">Building Ecological Pyramids (ACTIVITY)</Heading>
      <Box direction="row" align="start" margin={{ bottom: 'small' }}>
        <Image className="thumbnail" src={imgResource02} />
        <Paragraph>
          In this activity, students build biomass pyramids using data from trail camera photos of animals in Gorongosa National Park.
          &nbsp; <Anchor label="View Activity" target="_blank" icon={<LinkNextIcon/>} reverse={true} href="https://www.biointeractive.org/classroom-resources/building-ecological-pyramids" />
        </Paragraph>
      </Box>
      
      <Heading tag="h4">Measuring Biodiversity in Gorongosa (ACTIVITY)</Heading>
      <Box direction="row" align="start" margin={{ bottom: 'small' }}>
        <Image className="thumbnail" src={imgResource03} />
        <Paragraph>
          In this activity, students calculate species richness, evenness, and the Shannon diversity index for various habitat types using data from trail cameras in Gorongosa National Park.
          &nbsp; <Anchor label="View Activity" target="_blank" icon={<LinkNextIcon/>} reverse={true} href="https://www.biointeractive.org/classroom-resources/biodiversity-studies-gorongosa" />
        </Paragraph>
      </Box>
      
      <Heading tag="h3">Related Resources</Heading>
      
      <Heading tag="h4">Tracking Lion Recovery in Gorongosa National Park (SCIENTIST AT WORK VIDEO)</Heading>
      <Box direction="row" align="start" margin={{ bottom: 'small' }}>
        <Image className="thumbnail" src={imgResource04} />
        <Paragraph>
          This video describes how scientists in Gorongosa National Park are using GPS satellite collars and motion-sensitive cameras to gather data about the recovery of the park’s lion population.
          &nbsp; <Anchor label="View Resource" target="_blank" icon={<LinkNextIcon/>} reverse={true} href="https://www.biointeractive.org/classroom-resources/tracking-lion-recovery-gorongosa-national-park" />
        </Paragraph>
      </Box>
      
      <Heading tag="h4">Gorongosa National Park Interactive Map (INTERACTIVE)</Heading>
      <Box direction="row" align="start" margin={{ bottom: 'small' }}>
        <Image className="thumbnail" src={imgResource06} />
        <Paragraph>
          This interactive map of Gorongosa National Park in Mozambique explores different features of the park ecosystem and conservation strategy.
          &nbsp; <Anchor label="View Resource" target="_blank" icon={<LinkNextIcon/>} reverse={true} href="https://www.biointeractive.org/classroom-resources/gorongosa-national-park-interactive-map" />
        </Paragraph>
      </Box>
      
      <Heading tag="h4">The Guide: A Biologist in Gorongosa (SHORT FILM)</Heading>
      <Box direction="row" align="start" margin={{ bottom: 'small' }}>
        <Image className="thumbnail" src={imgResource07} />
        <Paragraph>
          This film is set in war-torn Gorongosa National Park in Mozambique, a protected area that is the subject of a large-scale restoration project. The film tells the story of a young man from the local community who discovers a passion for science after meeting world-renowned biologist E.O. Wilson.
          &nbsp; <Anchor label="View Resource" target="_blank" icon={<LinkNextIcon/>} reverse={true} href="https://www.biointeractive.org/classroom-resources/guide-biologist-gorongosa" />
        </Paragraph>
      </Box>
      
      <Heading tag="h4">Gorongosa Timeline (INTERACTIVE)</Heading>
      <Box direction="row" align="start" margin={{ bottom: 'small' }}>
        <Image className="thumbnail" src={imgResource08} />
        <Paragraph>
          This interactive timeline explores the history of Gorongosa National Park in Mozambique. The timeline includes key events in the area’s rich history, starting with the earliest human settlements in Mozambique and continuing with important milestones in the establishment and management of Gorongosa National Park.
          &nbsp; <Anchor label="View Resource" target="_blank" icon={<LinkNextIcon/>} reverse={true} href="https://www.biointeractive.org/classroom-resources/gorongosa-timeline" />
        </Paragraph>
      </Box>
      
      <Heading tag="h4">Creating Chains and Webs to Model Ecological Relationships (ACTIVITY)</Heading>
      <Box direction="row" align="start" margin={{ bottom: 'small' }}>
        <Image className="thumbnail" src={imgResource09} />
        <Paragraph>
          This hands-on activity allows students to build model food webs and then evaluate how ecological disturbances affect each trophic level.
          &nbsp; <Anchor label="View Resource" target="_blank" icon={<LinkNextIcon/>} reverse={true} href="https://www.biointeractive.org/classroom-resources/creating-chains-and-webs-model-ecological-relationships" />
        </Paragraph>
      </Box>
      
      <Heading tag="h4">Exploring Biomes in Gorongosa National Park (ACTIVITY)</Heading>
      <Box direction="row" align="start" margin={{ bottom: 'small' }}>
        <Image className="thumbnail" src={imgResource10} />
        <Paragraph>
          This activity introduces students to the concept of biomes, using Gorongosa National Park as a case study. Part of the activity involves exploring the Gorongosa National Park Interactive Map.
          &nbsp; <Anchor label="View Resource" target="_blank" icon={<LinkNextIcon/>} reverse={true} href="https://www.biointeractive.org/classroom-resources/exploring-biomes-gorongosa-national-park" />
        </Paragraph>
      </Box>
      
      <Heading tag="h4">Surveying Gorongosa’s Biodiversity (SCIENTIST AT WORK VIDEO)</Heading>
      <Box direction="row" align="start" margin={{ bottom: 'small' }}>
        <Image className="thumbnail" src={imgResource11} />
        <Paragraph>
          In this video, biologists Piotr Naskrecki and Jennifer Guyton identify and record the diversity of species in Gorongosa National Park’s Cheringoma Plateau.
          &nbsp; <Anchor label="View Resource" target="_blank" icon={<LinkNextIcon/>} reverse={true} href="https://www.biointeractive.org/classroom-resources/surveying-gorongosas-biodiversity" />
        </Paragraph>
      </Box>
      
      <Heading tag="h4">Gorongosa’s Water Cycle (ANIMATION)</Heading>
      <Box direction="row" align="start" margin={{ bottom: 'small' }}>
        <Image className="thumbnail" src={imgResource12} />
        <Paragraph>
          This animation illustrates the main stages of the water cycle in Gorongosa National Park, an ecosystem that experiences both wet and dry seasons.
          &nbsp; <Anchor label="View Resource" target="_blank" icon={<LinkNextIcon/>} reverse={true} href="https://www.biointeractive.org/classroom-resources/gorongosas-water-cycle" />
        </Paragraph>
      </Box>
      
      <Box margin={{ top: 'small' }} colorIndex="light-1" pad="small">
        <Anchor label="Explore All Resources" target="_blank" icon={<LinkNextIcon/>} reverse={true} href="https://www.biointeractive.org/classroom-resources?keyword=gorongosa" />
      </Box>
      
    </Box>
  );
};

GorongosaInfoResources.defaultProps = {};

GorongosaInfoResources.propTypes = {};

export default GorongosaInfoResources;
