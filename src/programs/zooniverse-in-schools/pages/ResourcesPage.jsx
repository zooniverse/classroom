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

      <Paragraph>Placeholder</Paragraph>

      <Heading tag="h3">Some PDF type thing</Heading>

      <Box direction="row" align="start" margin={{ bottom: 'small' }}>
        <Paragraph>
          Placeholder
          &nbsp <Anchor label="Example link" target="_blank" icon={<LinkNextIcon/>} reverse={true} href="https://example.com" />
        </Paragraph>
      </Box>

      <Heading tag="h3">Video Guide</Heading>

      <Box direction="row" align="start" margin={{ bottom: 'small' }}>
        <Paragraph>
          Placeholder
          &nbsp <Anchor label="Example link" target="_blank" icon={<LinkNextIcon/>} reverse={true} href="https://example.com" />
        </Paragraph>
      </Box>

      <Heading tag="h3">Another PDF type thing</Heading>

      <Box direction="row" align="start" margin={{ bottom: 'small' }}>
        <Paragraph>
          Placeholder
          &nbsp <Anchor label="Example link" target="_blank" icon={<LinkNextIcon/>} reverse={true} href="https://example.com" />
        </Paragraph>
      </Box>

      <Heading tag="h3">More Resources</Heading>

      <Box direction="row" align="start" margin={{ bottom: 'small' }}>
        <Paragraph>
          Placeholder
          &nbsp <Anchor label="Example link" target="_blank" icon={<LinkNextIcon/>} reverse={true} href="https://example.com" />
        </Paragraph>
      </Box>

      <Box direction="row" align="start" margin={{ bottom: 'small' }}>
        <Button type="button" className="button--secondary" path="/zooniverse-in-schools" label="Back to home page" icon={<LinkPreviousIcon/>} />
      </Box>

    </Box>
  )
}

export default ResourcesPage
