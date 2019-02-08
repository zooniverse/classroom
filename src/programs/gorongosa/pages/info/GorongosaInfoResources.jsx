import React from 'react';
import PropTypes from 'prop-types';

import Anchor from 'grommet/components/Anchor';
import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';
import Image from 'grommet/components/Image';
import Paragraph from 'grommet/components/Paragraph';
import LinkNextIcon from 'grommet/components/icons/base/LinkNext';

import imgMapping from '../../images/resources-mapping.jpg';
import imgFoodwebs from '../../images/resources-foodweb.jpg';

function DarienInfoResources(props) {
  return (
    <Box
      className="wildcam-info-page"
      pad={{ vertical: 'medium', horizontal: 'large' }}
    >
      <Heading tag="h2">Educator Resources</Heading>

      <Paragraph>WildCam Darién Lab allows students to filter data generated through the WildCam Darién citizen science project, to ask questions and test hypotheses. We have developed a number of activities to guide educators and students through this exploration. Existing WildCam Lab activities are listed below; we will continue to update the list with new activities.</Paragraph>
      <Paragraph>To support further exploration of topics using Darién National Park as a case study, explore additional educational resources listed below under "Related Resources".</Paragraph>

      <Heading tag="h3">WildCam Lab Activities</Heading>

      <Heading tag="h4">Scientific Inquiry and Data Analysis Using WildCam Darién (ACTIVITY)</Heading>
      <Paragraph>In this activity, students will be guided through the investigation of a scientific question, using data from trail cameras in Darién and Soberanía National Parks. &nbsp; <Anchor label="View Activity" icon={<LinkNextIcon/>} reverse={true} href="#" /> //TODO</Paragraph>

      <Heading tag="h4">Biodiversity Studies in Darién (ACTIVITY)</Heading>
      <Paragraph>In this activity, students will calculate species richness, evenness, and the Shannon diversity index for various habitat types using data from trail cameras in Darién and Soberanía National Parks, and then investigate the impact of human activity in these habitats. &nbsp; <Anchor label="View Activity" icon={<LinkNextIcon/>} reverse={true} href="#" /> //TODO</Paragraph>

      <Heading tag="h3">Related Resources</Heading>

      <Heading tag="h4">Modeling Food Webs in Darién Panama (ACTIVITY)</Heading>
      <Box direction="row">
        <Image className="thumbnail" src={imgFoodwebs} />
        <Paragraph>
          Students use cards to build model food webs and evaluate how ecological disturbances affect each trophic level. &nbsp;
          <Anchor label="View Activity" icon={<LinkNextIcon/>} reverse={true} href="https://www.hhmi.org/biointeractive/modeling-food-webs-in-darien-panama" target="_blank" rel="noopener noreferrer" />
        </Paragraph>
      </Box>

      <Heading tag="h4">Mapping the Darién Gap (VIDEO)</Heading>
      <Box direction="row">
        <Image className="thumbnail" src={imgMapping} />
        <Paragraph>
          Indigenous communities from the tropical rainforest of Darién, Panama use drones to map their land to protect it from outside threats and to make sustainable land use plans. &nbsp;
          <Anchor label="View Video" icon={<LinkNextIcon/>} reverse={true} href="https://www.hhmi.org/biointeractive/mapping-darien-gap" target="_blank" rel="noopener noreferrer" />
        </Paragraph>
      </Box>
    </Box>
  );
};

DarienInfoResources.defaultProps = {};

DarienInfoResources.propTypes = {};

export default DarienInfoResources;
