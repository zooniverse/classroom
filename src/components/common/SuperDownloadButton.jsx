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
import { config } from '../../lib/config';
import { blobbifyData, generateFilename } from '../../lib/mapexplorer-helpers'

import { saveAs } from 'browser-filesaver';
import superagent from 'superagent';

import Button from 'grommet/components/Button';
import Toast from 'grommet/components/Toast';
import Label from 'grommet/components/Label';
import SpinningIcon from 'grommet/components/icons/Spinning';
import DownloadIcon from 'grommet/components/icons/base/Download';

import { ZooTran, ZooTranCSV } from '../../lib/zooniversal-translator.js';

const STATUS = {
  IDLE: 'idle',
  FETCHING: 'fetching',
  SUCCESS: 'success',
  ERROR: 'error',
};

class SuperDownloadButton extends React.Component {
  constructor(props) {
    super(props);
    this.download = this.download.bind(this);

    this.altForm = null;
    this.altFormData = null;

    this.state = {  //Keep the state simple and local; no need for Redux connections.
      status: STATUS.IDLE,
    };
  }

  render() {
    return (
      <Button
        className={this.props.className}
        onClick={this.download}
        icon={(this.state.status === STATUS.FETCHING) ? <SpinningIcon size="small" /> : this.props.icon}
        primary={this.props.primary}
      >
        <Label>{this.props.text}</Label>
        {(this.state.status !== STATUS.SUCCESS) ? null : <Toast status='ok'>{ZooTran('Success: file downloaded.')}</Toast> }
        {(this.state.status !== STATUS.ERROR) ? null : <Toast status='critical'>{ZooTran('Error: could not download the file.')}</Toast> }
        <form style={{ 'display': 'none' }} action={config.root + 'downloads/'} method="POST" ref={c=>this.altForm=c} aria-hidden={true}>
          <textarea name="data" ref={c=>this.altFormData=c} readOnly aria-label="alt-data" />
          <input name="content_type" value={this.props.contentType} readOnly aria-label="alt-contenttype" />
          <input name="filename" value={this.props.filename} readOnly aria-label="alt-filename" />
        </form>
      </Button>
    );
  }

  download() {
    this.setState({ status: STATUS.FETCHING });
    superagent.get(this.props.url)
    .then(response => {
      if (!response) { throw 'ERROR (SuperDownloadButton): No response'; }
      if (response.ok && response.text) {  //Use .text, not .body, for pure CSV data
        return response.text;
      }
      throw 'ERROR (SuperDownloadButton): invalid response';
    })
    .then(data => {

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
        saveAs(blobbifyData(data, this.props.contentType), this.props.filename);
      }

      this.setState({ status: STATUS.SUCCESS });
    })
    .catch(err => {
      this.setState({ status: STATUS.ERROR });
      console.error(err);
    });
  }
}

SuperDownloadButton.propTypes = {
  url: PropTypes.string,
  className: PropTypes.string,
  text: PropTypes.string,
  icon: PropTypes.node,
  filename: PropTypes.string,
  contentType: PropTypes.string,
  useZooniversalTranslator: PropTypes.bool,
  primary: PropTypes.bool
};
SuperDownloadButton.defaultProps = {
  url: '',
  className: '',
  text: ZooTran('Download'),
  icon: <DownloadIcon size="small"/>,
  filename: generateFilename(),
  contentType: 'text/csv',
  useZooniversalTranslator: true,
  primary: false
};
export default SuperDownloadButton;
