/*
ClassificationsDownloadButton
-----------------------------

Component for viewing, editing, or deleting a single assignment.

--------------------------------------------------------------------------------
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'jumpstate';

import apiClient from 'panoptes-client/lib/api-client';
import { saveAs } from 'browser-filesaver';
import { blobbifyData, generateFilename } from '../../../lib/file-download-helpers';

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
    
    this.classificationsData = [];
    this.safetyCounter = 0;
    
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
        //For each Classification resource, add it to our collection.
        data.forEach((data) => {
          if (Array.isArray(data)) {  //If we have an array, add _each element_ to our collection, not the array itself.
            this.classificationsData.push(...data)
          } else if (data) {
            this.classificationsData.push(data)
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
    Promise.resolve(this.props.transformData(this.classificationsData))
    .then((classifications) => {
      let csvData = jsonToCsv(classifications);
      this.saveFile(csvData);
      this.setState({ state: 'idle' });
    });
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

function csvStr (str) {
  if (!str) return '';
  return '"' + String(str).replace(/"/g, '""') + '"';
}

function jsonToCsv (json) {
  let csv = '';
  
  //Get the header
  if (json[0]) {
    csv += Object.keys(json[0]).map(csvStr).join(',') + '\n';
  }

  //Now let's do each row.
  json.forEach((row) => {
    csv += Object.values(row).map(csvStr).join(',') + '\n'
  });
  
  return csv;
}

/*
--------------------------------------------------------------------------------
 */

ClassificationsDownloadButton.defaultProps = {
  contentType: 'text/csv',
  fileNameBase: 'download-',
  label: '',
  transformData: (data) => { return data },
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