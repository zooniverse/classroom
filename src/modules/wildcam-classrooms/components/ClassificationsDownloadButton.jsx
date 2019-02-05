/*
ClassificationsDownloadButton
-----------------------------

Component for viewing, editing, or deleting a single assignment.

--------------------------------------------------------------------------------
 */

import React from 'react';
import PropTypes from 'prop-types';

import superagent from 'superagent';
import superagentJsonapify from 'superagent-jsonapify';
import apiClient from 'panoptes-client/lib/api-client';
import { config } from '../../../lib/config';

superagentJsonapify(superagent);

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
    
    const icon = <DownloadButton size="small" />;
    const onClick = this.onClick.bind(this);
    
    return (
      <Button
        className="classifications-download-button button"
        icon={icon}
        label={props.label}
        onClick={onClick}
      />
    );

    return null;
  }
  
  onClick() {
    console.log('+++ CLICK');
    this.fetchData();
  }
  
  fetchData() {
    const props = this.props;
    
    //const request = superagent.get(`${config.root}${endpoint}`)
    //  .set('Content-Type', 'application/json')
    //  .set('Authorization', apiClient.headers.Authorization);
    
    const args = {};
    if (props.workflow_id) args.workflow_id = props.workflow_id;
    
    console

    apiClient.type('classifications').get(args)
    
      .then((data) => {
        console.log(data);
        return data;
      })
      .catch(error => this.handleError(error));
  }
};

/*
--------------------------------------------------------------------------------
 */

ClassificationsDownloadButton.defaultProps = {
  label: '',
  workflow_id: undefined,
};

ClassificationsDownloadButton.propTypes = {
  label: PropTypes.string,
  workflow_id: PropTypes.string,
};

export default ClassificationsDownloadButton;