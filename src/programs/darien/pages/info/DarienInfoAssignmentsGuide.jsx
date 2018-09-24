import React from 'react';
import PropTypes from 'prop-types';

import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';
import Image from 'grommet/components/Image';
import Paragraph from 'grommet/components/Paragraph';
import Section from 'grommet/components/Section';

function DarienInfoAssignmentsGuide(props) {
  return (
    <Box>
      <Box
        className="wildcam-info-page"
        pad={{ vertical: 'medium', horizontal: 'large' }}
      >
        <Heading tag="h2">Assignments Guide</Heading>
        
        <ol>
          <li><Paragraph>The value of creating classrooms is the ability to create assignments for your students. </Paragraph></li>

          <li><Paragraph>If you do not create a classroom, your students can still view and download the trail camera data as Explorers without creating a Zooniverse account.</Paragraph></li>

          <li><Paragraph>An assignment allows you to select a specific subset of photos (e.g. 30 photos from the Dry Season) and assign those photos to a group of students in your classroom to identify. Another group of students can identify a different set of photos (e.g. 30 photos from the Wet Season). Let’s walk through how it works.</Paragraph></li>

          <li><Paragraph>After you create a classroom and your students join, click “View”, then click “Create New Assignment”.</Paragraph></li>

          <li><Paragraph>Fill in the Assignment name, instructions, and due date that your students will see. Include as much detail as you like in the instructions. For example, you may ask students to do a task outside the WildCam Lab platform (e.g. record observations while making animal identifications).</Paragraph></li>

          <li><Paragraph>Click select photos. On the interactive map, the entire set of trail camera photos will be preselected. The number in this box shows the total number of photos selected.</Paragraph></li>

          <li><Paragraph>If you want your students to identify any random type of photo, do not select any filters. Simply edit the number of photos in the box to indicate the number of photos you want each student to identify. Click Select.</Paragraph></li>

          <li><Paragraph>If you want your students to identify a particular type of photo, click the filters dropdown and select as many filters as you wish to apply. Next, edit the number of photos in the box to indicate the number of photos you want each student to identify. Click Select.</Paragraph></li>

          <li><Paragraph>If you only want to send this assignment to a group of students within a classroom, select only those students. You can create a new assignment if you wish to assign different photos to another group. Click Create to send the assignment to those students.</Paragraph></li>

          <li><Paragraph>To view and edit your assignments, navigate to that classroom and click Edit. You can see a list of your students and the number of classifications they made.</Paragraph></li>

          <li><Paragraph>Your students can view their assignment by going to the assignments page in the Explorer section. They must be logged into their Zooniverse account to access their assignment.</Paragraph></li>
        </ol>

      </Box>
    </Box>
  );
};

DarienInfoAssignmentsGuide.defaultProps = {};

DarienInfoAssignmentsGuide.propTypes = {};

export default DarienInfoAssignmentsGuide;
