import React from 'react';
import Box from 'grommet/components/Box';
import Paragraph from 'grommet/components/Paragraph';
import Heading from 'grommet/components/Heading'
import Anchor from 'grommet/components/Anchor'

const GooglePrivacyPolicy = () => {
  return (
    <Box>
      <Heading>Zooniverse Classrooms Google Drive API Privacy Policy</Heading>

      <Paragraph>We (the Zooniverse) need to ask for permission for our web application to authenticate with your Google account and view and edit the contents of your Google Drive in order for the CSV export of the student classification data to be saved if that export option is chosen. This saves an extra step of having to download the CSV to your computer's local hard drive and importing it into Google Sheets yourself.</Paragraph>

      <Paragraph>We want you to know, though, that we do not store any data about your Google account. Zooniverse Classrooms also does not use any intermediaries or 3rd parties who might store your data.</Paragraph>

      <Paragraph>Our Google Drive integration works using the Google Drive API scopes: </Paragraph>

      <ul>
        <li><code>https://www.googleapis.com/auth/userinfo.email</code></li>
        <li><code>https://www.googleapis.com/auth/userinfo.profile</code></li>
        <li><code>openid</code></li>
        <li><code>https://www.googleapis.com/auth/drive</code></li>
        <li><code>https://www.googleapis.com/auth/drive.metadata.readonly</code></li>
        <li><code>https://www.googleapis.com/auth/drive.appdata</code></li>
        <li><code>https://www.googleapis.com/auth/drive.file</code></li>
      </ul>

      <Heading tag="h2">General Privacy Policy</Heading>

      <Paragraph>We have <Anchor href="https://www.zooniverse.org/privacy">a general privacy policy</Anchor> for our sites, including Zooniverse Classrooms.</Paragraph>
    </Box>
  )
}

export default GooglePrivacyPolicy