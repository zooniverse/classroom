import React from 'react';
import PropTypes from 'prop-types';

import Anchor from 'grommet/components/Anchor';
import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';
import Image from 'grommet/components/Image';
import Paragraph from 'grommet/components/Paragraph';
import Section from 'grommet/components/Section';

import p2 from '../../images/assignments-guide/p2.png';
import p3 from '../../images/assignments-guide/p3.gif';

function GorongosaInfoAssignmentsGuide(props) {
  return (
    <Box>
      <Box
        className="wildcam-info-page"
        pad={{ vertical: 'medium', horizontal: 'large' }}
      >
        <Heading tag="h2">Assignments Guide</Heading>
        
        <ol>
          <li><Paragraph>If you do not create a classroom, your students can still view and download the trail camera data as Explorers without creating a Zooniverse account.</Paragraph></li>

          <li>
            <Paragraph>The value of creating classrooms is the ability to create assignments for your students. An assignment allows you to select a specific subset of photos (e.g. 30 photos from the Dry Season) and assign those photos to a group of students in your classroom to identify. Another group of students can identify a different set of photos (e.g. 30 photos from the Wet Season). Let’s walk through how it works.</Paragraph>
            <Anchor href={p2} target="_blank"><Image size="large" src={p2} /></Anchor>
          </li>
          
          <li>
            <Paragraph>After you create a classroom share the link for your students join. After they have all joined, view your classroom and click “Create New Assignment”.</Paragraph>
            <Anchor href={p3} target="_blank"><Image size="large" src={p3} /></Anchor>
          </li>
          
          <li><Paragraph>Fill in the Assignment name, instructions, and due date that your students will see. Include as much detail as you like in the instructions. For example, you may ask students to do a task outside the WildCam Lab platform (e.g. record observations while making animal identifications).</Paragraph></li>
          
          <li><Paragraph>Click select photos. On the interactive map, the entire set of trail camera photos will be preselected. The number in this box shows the total number of photos selected. If you want your students to identify any type of photo, do not select any filters. Click Select.</Paragraph></li>
          
          <li><Paragraph>If you want your students to identify a particular type of photo, click the filters dropdown and select as many filters as you wish to apply. Click Select.</Paragraph></li>
          
          <li><Paragraph>Edit the number of photos you want your students to identify. Next, select the students to send this assignment to. You can send an assignment to the entire class or send different assignments to groups of students. Click Create.</Paragraph></li>
          
          <li><Paragraph>To view and edit your assignments, navigate to that classroom and click Edit. You can see a list of your students and the number of classifications they made.</Paragraph></li>
          
          <li><Paragraph>Your students can view their assignment by logging in and going to the assignments page in the Student section.</Paragraph></li>          
        </ol>

      </Box>
    </Box>
  );
};

GorongosaInfoAssignmentsGuide.defaultProps = {};

GorongosaInfoAssignmentsGuide.propTypes = {};

export default GorongosaInfoAssignmentsGuide;
