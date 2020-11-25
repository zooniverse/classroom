import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Label from 'grommet/components/Label';
import Paragraph from 'grommet/components/Paragraph';

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
      <Box colorIndex="accent-2" pad="small">
        <Box direction="row">
          <Paragraph size="small" margin="small">Notice</Paragraph>
          <Button size="xsmall" onClick={() => { this.setState({ expand: !expand }) }}>[more]</Button>
          <Button size="xsmall" onClick={() => { this.setState({ hide: true }) }}>[x]</Button>
        </Box>
        {expand && (
          <Paragraph>
            Full details
          </Paragraph>
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
