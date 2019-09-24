import React from 'react';
import PropTypes from 'prop-types';

import Anchor from 'grommet/components/Anchor';
import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';
import Image from 'grommet/components/Image';
import Paragraph from 'grommet/components/Paragraph';
import Section from 'grommet/components/Section';

import p1 from '../../images/assignments-guide/p1.jpg';
import p2 from '../../images/assignments-guide/p2.png';
import p3 from '../../images/assignments-guide/p3.gif';
import p4 from '../../images/assignments-guide/p4.jpg';
import p5 from '../../images/assignments-guide/p5.jpg';
import p6 from '../../images/assignments-guide/p6.jpg';
import p7 from '../../images/assignments-guide/p7.jpg';
import p8 from '../../images/assignments-guide/p8.jpg';
import p9 from '../../images/assignments-guide/p9.jpg';

function GorongosaInfoAssignmentsGuide(props) {
  return (
    <Box>
      <Box
        className="wildcam-info-page"
        pad={{ vertical: 'medium', horizontal: 'large' }}
      >
        <Heading tag="h2">Assignments Guide</Heading>
        
        <ol>
          <li>
            <Paragraph>If you do not create a classroom, your students can still view and download the trail camera data as Explorers without creating a Zooniverse account.</Paragraph>
            <Anchor href={p1} target="_blank"><Image size="large" src={p1} /></Anchor>
          </li>

          <li>
            <Paragraph>The value of creating classrooms is the ability to create assignments for your students. An assignment allows you to select a specific subset of photos (e.g. 30 photos from the Dry Season) and assign those photos to a group of students in your classroom to identify. Another group of students can identify a different set of photos (e.g. 30 photos from the Wet Season). Let’s walk through how it works.</Paragraph>
            <Anchor href={p2} target="_blank"><Image size="large" src={p2} /></Anchor>
          </li>
          
          <li>
            <Paragraph>After you create a classroom share the link for your students join. After they have all joined, view your classroom and click “Create New Assignment”.</Paragraph>
            <Anchor href={p3} target="_blank"><Image size="large" src={p3} /></Anchor>
          </li>
          
          <li>
            <Paragraph>Fill in the Assignment name, instructions, and due date that your students will see. Include as much detail as you like in the instructions. For example, you may ask students to do a task outside the WildCam Lab platform (e.g. record observations while making animal identifications).</Paragraph>
            <Anchor href={p4} target="_blank"><Image size="large" src={p4} /></Anchor>
          </li>
          
          <li>
            <Paragraph>Click select photos. On the interactive map, the entire set of trail camera photos will be preselected. The number in this box shows the total number of photos selected. The images you assign to your students when you create your assignment will be randomly selected from this set. For example, if you assign 10 images for each student, 10 random images will be chosen and assigned to each student. If you want all of your students to see the exact same images, enter 10 here and all of your students will see the exact same images. If you want your students to see different images, don't change the number of images here and there will be a higher likelihood of your students seeing different images. If you want your students to identify any type of photo, do not select any filters. Click Select.</Paragraph>
            <Anchor href={p5} target="_blank"><Image size="large" src={p5} /></Anchor>
          </li>
          
          <li>
            <Paragraph>If you want your students to identify a particular type of photo, click the filters dropdown and select as many filters as you wish to apply. Click Select.</Paragraph>
            <Anchor href={p6} target="_blank"><Image size="large" src={p6} /></Anchor>
          </li>
          
          <li>
            <Paragraph>Edit the number of photos you want your students to identify. Next, select the students to send this assignment to. You can send an assignment to the entire class or send different assignments to groups of students. Click Create.</Paragraph>
            <Anchor href={p7} target="_blank"><Image size="large" src={p7} /></Anchor>
          </li>
          
          <li>
            <Paragraph>To see a list of your students and the number of classifications they made, navigate to that classroom and click the dropdown arrow next to the assignment. To edit or delete your assignment, click Edit.</Paragraph>
            <Anchor href={p8} target="_blank"><Image size="large" src={p8} /></Anchor>
          </li>
          
          <li>
            <Paragraph>Your students can start their assignment by logging in and going to the assignments page in the Student section.</Paragraph>
            <Anchor href={p9} target="_blank"><Image size="large" src={p9} /></Anchor>
          </li>
        </ol>

      </Box>
    </Box>
  );
};

GorongosaInfoAssignmentsGuide.defaultProps = {};

GorongosaInfoAssignmentsGuide.propTypes = {};

export default GorongosaInfoAssignmentsGuide;
