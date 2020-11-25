import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Anchor from 'grommet/components/Anchor';
import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Label from 'grommet/components/Label';
import Paragraph from 'grommet/components/Paragraph';

import AlertIcon from 'grommet/components/icons/base/Alert';
import CloseIcon from 'grommet/components/icons/base/Close';
import DownIcon from 'grommet/components/icons/base/Down';

class GlobalNotification extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      expand: false,
      hide: false,
    }
  }
  
  render () {
    const { user } = this.props
    const { expand, hide } = this.state
    
    if (hide) return null
    if (user) return null
    
    return (
      <Box colorIndex="accent-1" pad="small">
        <Box
          align="center"
          direction="row"
          pad="none"
        >
          <AlertIcon />
          <Label
            size="small"
          >
            &nbsp;
            November 2020: Sign In issues
            &nbsp;
          </Label>
          <Button
            icon={<DownIcon size="small" style={{ padding: '4px' }} />}
            onClick={() => { this.setState({ expand: !expand }) }}
          />
          <Button
            icon={<CloseIcon size="small" style={{ padding: '4px' }} />}
            onClick={() => { this.setState({ hide: true }) }}
          />
        </Box>
        {expand && (
          <Box>
            <Paragraph margin="small" pad="small" size="small" style={{ maxWidth: 'none' }}>
              We are currently looking into an issue where educators and
              students cannot login to Zooniverse Classrooms via the Sign In
              button at the top of this website.
              We apologise for this inconvenience.
              While we work on a long term fix, we've found that the following
              workaround allows users to sign in to Zooniverse Classrooms:
            </Paragraph>
            <Paragraph margin="small" pad="small" size="small" style={{ maxWidth: 'none' }}>
              1. Go to <Anchor href="https://www.zooniverse.org">Zooniverse.org</Anchor>,
              click on the Sign In button, and proceed to log in.
            </Paragraph>
            <Paragraph margin="small" pad="small" size="small" style={{ maxWidth: 'none' }}>
              2. Once you're logged in at Zooniverse.org, return to this
              website and click the Sign In button.
            </Paragraph>
          </Box>
        )}
      </Box>
    )
  }
}

GlobalNotification.defaultProps = {
  user: null
};

GlobalNotification.propTypes = {
  user: PropTypes.object
};

function mapStateToProps(state) {
  return {
    user: state.auth.user
  };
}

export default connect(mapStateToProps)(GlobalNotification);
