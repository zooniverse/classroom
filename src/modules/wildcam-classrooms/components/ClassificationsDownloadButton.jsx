/*
ClassificationsDownloadButton
-----------------------------

Component for viewing, editing, or deleting a single assignment.

--------------------------------------------------------------------------------
 */

import React from 'react';
import PropTypes from 'prop-types';

import Button from 'grommet/components/Button';
import DownloadButton from 'grommet/components/icons/base/Download';

class ClassificationsDownloadButton extends React.Component {
  constructor() {
    super();
    this.state = {
    };
  }
  
  // ----------------------------------------------------------------
  
  componentDidMount() {
    this.initialise(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.initialise(nextProps);
  }
  
  initialise(props = this.props) {
  }

  render() {
    const props = this.props;
    const state = this.state;
    
    return (
      <Button
        className="classifications-download-button button"
        icon={<DownloadButton size="small" />}
        label="DOWNLOAD ASSIGNMENT"
        onClick={this.onClick.bind(this)}
      />
    );

    return null;
  }
  
  onClick() {
    console.log('+++ CLICK');
  }
};

/*
--------------------------------------------------------------------------------
 */

ClassificationsDownloadButton.defaultProps = {};

ClassificationsDownloadButton.propTypes = {};

export default ClassificationsDownloadButton;