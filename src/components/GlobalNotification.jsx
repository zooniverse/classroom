import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Anchor from 'grommet/components/Anchor';
import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Label from 'grommet/components/Label';
import Paragraph from 'grommet/components/Paragraph';

import CheckmarkIcon from 'grommet/components/icons/base/Checkmark';
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
          <CheckmarkIcon />
          <Label
            size="small"
          >
            &nbsp;
            ...
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
              ...
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
