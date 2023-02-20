import React from 'react'
import PropTypes from 'prop-types'

import Anchor from 'grommet/components/Anchor'
import Button from 'grommet/components/Button'
import Box from 'grommet/components/Box'
import Heading from 'grommet/components/Heading'
import Image from 'grommet/components/Image'
import Paragraph from 'grommet/components/Paragraph'
import LinkNextIcon from 'grommet/components/icons/base/LinkNext'
import LinkPreviousIcon from 'grommet/components/icons/base/LinkPrevious'

import ScrollToTopOnMount from '../../../containers/common/ScrollToTopOnMount';

function ResourcesPage (props) {
  return (
    <Box
      className="wildcam-info-page"
      pad={{ vertical: 'medium', horizontal: 'large' }}
    >
      <ScrollToTopOnMount />

      <Heading tag="h2">Zooniverse In School Resources Page</Heading>

      <Heading tag="h3">PDF Documents</Heading>
      
      <Paragraph>
        <Anchor
          label="Zooniverse in Schools - Introduction"
          href="https://drive.google.com/file/d/1vuR8FfnmhdN7JCbc-KJJZVM03g2hAU1k/view?usp=share_link"
          target="_blank" rel="noopener noreferrer"
          icon={<LinkNextIcon/>} reverse={true}
        />
      </Paragraph>

      <Paragraph>
        <Anchor
          label="Activity 1 - Galaxy Zoo Activity - Educator's Guide"
          href="https://drive.google.com/file/d/1UeGgOwC8s2ThqX1-AnVzzennrN1DN-Tx/view?usp=share_link"
          target="_blank" rel="noopener noreferrer"
          icon={<LinkNextIcon/>} reverse={true}
        />
      </Paragraph>

      <Paragraph>
        <Anchor
          label="Activity 1 - Galaxy Zoo Activity - Worksheet"
          href="https://drive.google.com/file/d/1rikX9FBl9Az1jP4nay4eulGgtYFbATAM/view?usp=share_link"
          target="_blank" rel="noopener noreferrer"
          icon={<LinkNextIcon/>} reverse={true}
        />
      </Paragraph>

      <Paragraph>
        <Anchor
          label="Activity 2 - Zooniverse Classroom Activity - Educator's Guide"
          href="https://drive.google.com/file/d/1fcaYldweaVyKPoE4ZXwZuZ7boil9TIoM/view?usp=share_link"
          target="_blank" rel="noopener noreferrer"
          icon={<LinkNextIcon/>} reverse={true}
        />
      </Paragraph>

      <Paragraph>
        <Anchor
          label="Activity 2 - Zooniverse Classroom Activity - Worksheet"
          href="https://drive.google.com/file/d/1608JTaKo9BNXGGCOaJsMwRwBBVM06X_c/view?usp=share_link"
          target="_blank" rel="noopener noreferrer"
          icon={<LinkNextIcon/>} reverse={true}
        />
      </Paragraph>

      <Paragraph>
        <Anchor
          label="Additional Hands-on Activities"
          href="https://drive.google.com/file/d/1e8K74sJiyEhKpZ9kFRLIIXL9wZ_7ZOxm/view?usp=sharing"
          target="_blank" rel="noopener noreferrer"
          icon={<LinkNextIcon/>} reverse={true}
        />
      </Paragraph>

      <Heading tag="h3">Video Guides</Heading>

      <Paragraph>
        <Anchor
          label="Zooniverse Classroom Activity - Class Video"
          href="https://youtu.be/h0Xr6Ckp_Xs"
          target="_blank" rel="noopener noreferrer"
          icon={<LinkNextIcon/>} reverse={true}
        />
      </Paragraph>

      <Paragraph>
        <Anchor
          label="Galaxy Zoo Activity - Class Video"
          href="https://youtu.be/x2NdDZDHO_Q"
          target="_blank" rel="noopener noreferrer"
          icon={<LinkNextIcon/>} reverse={true}
        />
      </Paragraph>

      <Box direction="row" align="start" margin={{ bottom: 'small' }}>
        <Button
          type="button"
          className="button--secondary"
          path="/zooniverse-in-schools"
          label="Back to home page"
          icon={<LinkPreviousIcon/>}
        />
      </Box>

    </Box>
  )
}

export default ResourcesPage
