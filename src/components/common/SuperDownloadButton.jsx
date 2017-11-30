/*
SuperDownloadButton
===================

Creates a download button that, when clicked, queries an external URL for data,
then opens the 'Save As' dialog box for downloading said data.

Usage:
  <SuperDownloadButton
    url="https://some.service.that/returns/csv"
  />

The "Super" part comes from the amount of work needed to get this working across
all browsers, notably Safari 9, which has such poor HTML5 support that it
doesn't support 'download' in <a href="file.csv" download>.

This component creates a hidden <form> that submits the data you want Safari to
download to EduAPI's download service, which echoes the content back as a HTTP
response with 'content-disposition' headers to force a download dialog.

********************************************************************************
 */

import React from 'react';
import PropTypes from 'prop-types';

import { saveAs } from 'browser-filesaver';
import superagent from 'superagent';
import Papa from 'papaparse';

import Button from 'grommet/components/Button';
import Toast from 'grommet/components/Toast';
import Label from 'grommet/components/Label';
import SpinningIcon from 'grommet/components/icons/Spinning';
import DownloadIcon from 'grommet/components/icons/base/Download';

import { config } from '../../lib/config';
import { blobbifyData, generateFilename } from '../../lib/file-download-helpers';
import { ZooTran, ZooTranCSV } from '../../lib/zooniversal-translator.js';

const STATUS = {
  IDLE: 'idle',
  FETCHING: 'fetching',
  SUCCESS: 'success',
  ERROR: 'error'
};

class SuperDownloadButton extends React.Component {
  constructor(props) {
    super(props);
    this.download = this.download.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.saveFile = this.saveFile.bind(this);

    this.altForm = null;
    this.altFormData = null;

    this.state = {  // Keep the state simple and local; no need for Redux connections.
      filename: generateFilename(this.props.fileNameBase),
      status: STATUS.IDLE
    };
  }

  handleClick() {
    if (this.props.transformData && typeof this.props.transformData === 'function') {
      this.setState({ status: STATUS.FETCHING });

      return new Promise((resolve, reject) => {
        return Papa.parse(this.props.url, { complete: result => resolve(result), error: error => reject(error), download: true });
      }).then((csvData) => {
        if (csvData) {
          return this.props.transformData(csvData).then((transformedData) => {
            this.setState({ status: STATUS.SUCCESS });
            this.saveFile(transformedData);
          });
        }

        throw 'ERROR (SuperDownloadButton): No CSV parsing result';
      }).catch(error => this.handleError(error));
    }

    return this.download();
  }

  handleError(error) {
    this.setState({ status: STATUS.ERROR });
    console.error(error);
  }

  saveFile(data) {
    saveAs(blobbifyData(data, this.props.contentType), this.state.filename);
  }

  download() {
    this.setState({ status: STATUS.FETCHING });
    superagent.get(this.props.url)
    .then((response) => {
      if (!response) { throw 'ERROR (SuperDownloadButton): No response'; }
      if (response.ok && response.text) {  // Use .text, not .body, for pure CSV data
        return response.text;
      }
      throw 'ERROR (SuperDownloadButton): invalid response';
    })
    .then((data) => {
      if (this.props.useZooniversalTranslator && this.props.contentType === 'text/csv') {
        data = ZooTranCSV(data);
      }

      const enableSafariWorkaround =
        !(/Chrome/i.test(navigator.userAgent)) &&
        /Safari/i.test(navigator.userAgent);

      if (enableSafariWorkaround) {
        console.log('Downloading: Safari Workaround');
        this.altFormData.value = data;
        this.altForm.submit();
      } else {
        this.saveFile(data);
      }

      this.setState({ status: STATUS.SUCCESS });
    })
    .catch(error => this.handleError(error));
  }

  render() {
    // Grommet Button determines disabled state based on presence of onClick handler...
    return (
      <Button
        className={this.props.className ? this.props.className : null}
        onClick={this.props.disabled ? null : this.handleClick}
        icon={(this.state.status === STATUS.FETCHING) ? <SpinningIcon size="small" /> : this.props.icon}
        primary={this.props.primary}
        label={this.props.text}
      >
        {(this.state.status !== STATUS.SUCCESS) ?
          null :
          <Toast status="ok">{ZooTran('Success: file downloaded.')}</Toast>
        }
        {(this.state.status !== STATUS.ERROR) ?
          null :
          <Toast status="critical">{ZooTran('Error: could not download the file.')}</Toast>
        }
        <form
          style={{ display: 'none' }}
          action={config.root + 'downloads/'}
          method="POST"
          ref={c => this.altForm = c}
          aria-hidden={true}
        >
          <textarea name="data" ref={c => this.altFormData = c} readOnly aria-label="alt-data" />
          <input name="content_type" value={this.props.contentType} readOnly aria-label="alt-contenttype" />
          <input name="filename" value={this.state.filename} readOnly aria-label="alt-filename" />
        </form>
      </Button>
    );
  }
}

SuperDownloadButton.propTypes = {
  className: PropTypes.string,
  contentType: PropTypes.string,
  disabled: PropTypes.bool,
  fileNameBase: PropTypes.string,
  icon: PropTypes.node,
  primary: PropTypes.bool,
  text: PropTypes.string,
  transformData: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object
  ]),
  url: PropTypes.string,
  useZooniversalTranslator: PropTypes.bool
};

SuperDownloadButton.defaultProps = {
  className: '',
  contentType: 'text/csv',
  disabled: false,
  fileNameBase: 'download-',
  icon: <DownloadIcon size="small" />,
  primary: false,
  text: ZooTran('Download'),
  transformData: null,
  url: '',
  useZooniversalTranslator: true
};

export default SuperDownloadButton;
