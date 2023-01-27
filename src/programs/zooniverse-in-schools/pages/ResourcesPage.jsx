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
        <Anchor label="Galaxy Zoo Activity - Educator's Guide" target="_blank" icon={<LinkNextIcon/>} reverse={true} href="https://drive.google.com/file/d/1WpN-KrHZ1smu5kXmLrhWYBq_p3yswlyj/view?usp=share_link" />
      </Paragraph>
      <Paragraph>
        <Anchor label="Galaxy Zoo Activity - Worksheet" target="_blank" icon={<LinkNextIcon/>} reverse={true} href="https://drive.google.com/file/d/1-OanRxi26FYO6RDkciUor-DOUSfMG01z/view?usp=share_link" />
      </Paragraph>

      <Heading tag="h3">Video Guides</Heading>

      <Paragraph>
        <Anchor label="Zooniverse Classroom Activity - Class Video" target="_blank" icon={<LinkNextIcon/>} reverse={true} href="https://youtu.be/h0Xr6Ckp_Xs" />
      </Paragraph>

      <Paragraph>
        <Anchor label="Galaxy Zoo Activity - Class Video" target="_blank" icon={<LinkNextIcon/>} reverse={true} href="https://youtu.be/x2NdDZDHO_Q" />
      </Paragraph>

      <Box direction="row" align="start" margin={{ bottom: 'small' }}>
        <Button type="button" className="button--secondary" path="/zooniverse-in-schools" label="Back to home page" icon={<LinkPreviousIcon/>} />
      </Box>

    </Box>
  )
}

export default ResourcesPage
