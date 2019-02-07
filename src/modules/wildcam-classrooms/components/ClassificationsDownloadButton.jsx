/*
ClassificationsDownloadButton
-----------------------------

Component for viewing, editing, or deleting a single assignment.

--------------------------------------------------------------------------------
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'jumpstate';

//import superagent from 'superagent';
//import superagentJsonapify from 'superagent-jsonapify';
import apiClient from 'panoptes-client/lib/api-client';
//import { config } from '../../../lib/config';

//superagentJsonapify(superagent);

import Button from 'grommet/components/Button';
import DownloadButton from 'grommet/components/icons/base/Download';

class ClassificationsDownloadButton extends React.Component {
  constructor() {
    super();
    this.state = {
      state: 'idle',
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
    this.initiateFetchData();
  }
  
  initiateFetchData() {
    const props = this.props;
    
    this.jsonData = [];
    this.safetyCounter = 0;
    
    //const request = superagent.get(`${config.root}${endpoint}`)
    //  .set('Content-Type', 'application/json')
    //  .set('Authorization', apiClient.headers.Authorization);
    
    const fetchArguments = { page: 1, page_size: 3 };
    if (props.workflow_id) fetchArguments.workflow_id = props.workflow_id;
    
    this.doFetchData(fetchArguments);
  }
  
  doFetchData(fetchArguments) {
    if (!fetchArguments) return;
    
    this.safetyCounter++;
    
    apiClient.type('classifications').get(fetchArguments)
      .then((data) => {
        //For each Classification, add it to our collection.
        data.forEach((classification) => {
          const data = this.props.transformData(classification);

          if (Array.isArray(data)) {  //If we have an array, add _each element_ to our collection, not the array itself.
            this.jsonData.push(...data)
          } else if (data) {
            this.jsonData.push(data)
          }

        });
      
        //Fetch next set of data
        if (data.length === 0 || this.safetyCounter >= 10) {
          this.finishFetchData();
        } else {
          fetchArguments.page++;
          this.doFetchData(fetchArguments)
        }
      
        return data;
      })
      .catch(err => this.handleError(err));
  }
  
  finishFetchData() {
    console.log('+++ finishFetchData \n  total data: ', this.jsonData);
  }
  
  handleError(err) {
    Actions.auth.setStatus(AUTH_STATUS.ERROR);
    Actions.auth.setError(error);
    Actions.notification.setNotification({ status: 'critical' , message: 'Something went wrong.' });
    console.error(error);
  }
};

/*
--------------------------------------------------------------------------------
 */

function transformWildCamData(classification) {
  console.log('+++ transformdata: ', classification);
  
  const classification_id = classification.id;
  const subject_id = classification.links.subjects[0];
  
  let data = [];
  
  classification.annotations.forEach(task => {
    task.value.forEach(answer => {
      
      const species = answer.choice;
      const count = answer.answers.HOWMANY;
      
      if (classification_id && subject_id && species) {
        data.push({
          classification_id,
          subject_id,
          species,
          count,
        });
      }
    });
  });
  
  return data;
}

/*
--------------------------------------------------------------------------------
 */

ClassificationsDownloadButton.defaultProps = {
  label: '',
  transformData: transformWildCamData,
  workflow_id: undefined,
};

ClassificationsDownloadButton.propTypes = {
  label: PropTypes.string,
  transformData: PropTypes.func,
  workflow_id: PropTypes.string,
};

export default ClassificationsDownloadButton;