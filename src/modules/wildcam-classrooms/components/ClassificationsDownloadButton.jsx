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
import { saveAs } from 'browser-filesaver';
import { blobbifyData, generateFilename } from '../../../lib/file-download-helpers';

//superagentJsonapify(superagent);

import Button from 'grommet/components/Button';
import DownloadIcon from 'grommet/components/icons/base/Download';
import LoadingIcon from 'grommet/components/icons/Spinning';

const SAFETY_LIMIT = 100;  //Prevent recursion beyond a sensible limit.

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
    
    let icon = <DownloadIcon size="small" />;
    if (state.state === 'fetching') icon = <LoadingIcon size="small" />;
    
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
    
    const fetchArguments = { page: 1 };  //Default page_size is 20
    if (props.workflow_id) fetchArguments.workflow_id = props.workflow_id;
    
    this.setState({ state: 'fetching' });
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
        if (data && data.length > 0 && this.safetyCounter < SAFETY_LIMIT) {
          fetchArguments.page++;
          this.doFetchData(fetchArguments)
        } else {
          this.finishFetchData();
        }
      
        return data;
      })
      .catch(err => this.handleError(err));
  }
  
  finishFetchData() {
    console.log('+++ finishFetchData \n  total data: ', this.jsonData);
    
    let csvData = '';
    
    //Get the header
    if (this.jsonData[0]) {
      csvData += Object.keys(this.jsonData[0]).map(csvStr).join(',') + '\n';
    }
    
    //Now let's do each row.
    this.jsonData.forEach((data) => {
      csvData += Object.values(data).map(csvStr).join(',') + '\n'
    });
    
    this.saveFile(csvData);
    this.setState({ state: 'idle' });
  }
  
  handleError(err) {
    Actions.notification.setNotification({ status: 'critical' , message: 'Something went wrong.' });
    console.error(err);
  }
  
  saveFile(data) {
    saveAs(blobbifyData(data, this.props.contentType), generateFilename(this.props.fileNameBase));
  }
};

/*
--------------------------------------------------------------------------------
 */

function csvStr(str) {
  if (!str) return '';
  return '"' + str.replace(/"/g, '""') + '"';
}

function transformWildCamData(classification) {
  console.log('+++ transformdata: ', classification);
  
  const classification_id = classification.id;
  const subject_id =
    classification.links &&
    classification.links.subjects &&
    classification.links.subjects[0];
  const user_id =
    classification.links &&
    classification.links.user;
  const assignment_id =
    classification.links &&
    classification.links.workflow;
  
  let data = [];
  
  classification.annotations.forEach(task => {
    task.value.forEach(answer => {
      
      const species = answer.choice;
      const count = answer.answers && answer.answers.HOWMANY;
      
      if (user_id && assignment_id && classification_id && subject_id && species) {
        data.push({
          user_id,
          assignment_id,
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
  contentType: 'text/csv',
  fileNameBase: 'download-',
  label: '',
  transformData: transformWildCamData,
  workflow_id: undefined,
};

ClassificationsDownloadButton.propTypes = {
  contentType: PropTypes.string,
  fileNameBase: PropTypes.string,
  label: PropTypes.string,
  transformData: PropTypes.func,
  workflow_id: PropTypes.string,
};

export default ClassificationsDownloadButton;