import React from 'react';
import PropTypes from 'prop-types';

import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';
import Image from 'grommet/components/Image';
import Paragraph from 'grommet/components/Paragraph';
import Section from 'grommet/components/Section';

function KenyaInfoAssignmentsGuide(props) {
  return (
    <Box>
      <Box
        className="wildcam-info-page"
        pad={{ vertical: 'medium', horizontal: 'large' }}
      >
        <Heading tag="h2">Assignments Guide</Heading>

        <Paragraph>The value of creating classrooms is the ability to create assignments for your students where you can keep track of how many photos they process on the Wildwatch Kenya platform. To do this please follow the following instructions:</Paragraph>

        <ol>
          <li><Paragraph>Click the "Educator" tab from the Wildwatch Kenya Lab [link] home screen.</Paragraph></li>
          <li><Paragraph>Click "Manage Classrooms".</Paragraph></li>
          <li><Paragraph>Click "Register Teacher" and fill out the information you see there to help us learn more about who is using these platforms.</Paragraph></li>
          <li><Paragraph>From the List of Classrooms page, click "+Create new classroom."</Paragraph></li>
          <li><Paragraph>After you create a classroom, click “View” on the right hand side of the screen, then click “Create new assignment”.</Paragraph></li>
          <li><Paragraph>Fill in the Assignment name, instructions, due date, and the number of photos for your students to process that they will see. Include as much detail as you like in the instructions. For example, you may ask students to do a task outside the Wildwatch Lab platform (e.g. record observations while making animal identifications).</Paragraph></li>
          <li><Paragraph>If you only want to send this assignment to a group of students within a classroom, select only those students (once they're logged in). You can create a new assignment if you wish to assign a different number of photos to another group. Click "Create" to send the assignment to those students.</Paragraph></li>
          <li><Paragraph>To view and edit your assignments, navigate to that classroom and click "Edit". You can see a list of your students and the number of classifications they made.</Paragraph></li>
          <li><Paragraph>When you are ready to share the classroom with your students, send them the URL posted at the top of your classroom page next to Join URL. They will be prompted to sign in and placed in your classroom.</Paragraph></li>
          <li><Paragraph>Your students can view their assignment by going to the assignments page in the Explorer section, or clicking "Student" from the Wildwatch Kenya Lab home screen, and then "View assignments". They must be logged into their Zooniverse account to access their assignment, and they can download the data they've processed at any time.</Paragraph></li>
        </ol>

        <Paragraph>If you do not create a classroom, you or your students can still view and download trail camera data that has already been processed as Explorers without creating a Zooniverse account.</Paragraph>

        <Paragraph>For example, you can select and download a specific subset of photos (e.g. 30 photos from the Dry Season) and assign those photos to a group of students to identify. Another group of students can identify a different set of photos (e.g. 30 photos from the Wet Season). Alternatively, you can provide them instructions for how to analyze these photos from the Explorer screen and have them fill out a separate worksheet. Let’s walk through how it works starting from the Explorer screen.</Paragraph>

        <ol>
          <li><Paragraph>Note the 26,000+ photos available to analyze and the dropdown arrows in the upper right hand corner of the screen to filter them. On the interactive map, the entire set of trail camera photos will be preselected. Select a filter such as a species or season. The number in the grey bar above shows the total number of photos selected and the map will adjust to show the categories you've selected.</Paragraph></li>
          <li><Paragraph>If you want your students to identify a particular type of photo, click the filters dropdown and select as many filters as you wish to apply. You can then download the file of select photos to share with your students or provide them instructions on how to navigate the map and dropdown arrows on the Explorer page, and which photos to select and analyze. </Paragraph></li>
          <li><Paragraph>If you want your students to identify any random type of photo, do not select any filters. Simply download the entire data set using the download button, share this file with your students, and communicate the number of photos you want each student to identify. This would happen outside the Wildwatch Kenya Lab platform. Alternatively, you can provide them instructions on how to navigate the map and dropdown arrows, and assign them a number of photos to analyze from the Explorer page.</Paragraph></li>
        </ol>

      </Box>
    </Box>
  );
};

KenyaInfoAssignmentsGuide.defaultProps = {};

KenyaInfoAssignmentsGuide.propTypes = {};

export default KenyaInfoAssignmentsGuide;
