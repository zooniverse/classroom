import React from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'jumpstate';
import Button from 'grommet/components/Button';
import Box from 'grommet/components/Box';

import GoogleIcon from './GoogleIcon';
import DisabledGoogleIcon from './DisabledGoogleIcon';
import Papa from 'papaparse';
import { config } from '../../lib/config';
import { blobbifyData, generateFilename } from '../../lib/file-download-helpers';


const STATUS = {
  IDLE: 'idle',
  CONFIGURING: 'configuring',
  FETCHING: 'fetching',
  SUCCESS: 'success',
  ERROR: 'error'
};

let GoogleAuth = null;

class GoogleDriveExportButton extends React.Component {
  constructor() {
    super();

    this.state = {
      isAuthorized: false,
      status: STATUS.IDLE
    };

    this.handleError = this.handleError.bind(this);
    this.setupGoogleClient = this.setupGoogleClient.bind(this);
    this.tryExport = this.tryExport.bind(this);
    this.updateSigninStatus = this.updateSigninStatus.bind(this);
  }

  componentDidMount() {
    this.setupGoogleClient();
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.isAuthorized !== this.state.isAuthorized) return false;

    return true;
  }

  componentWillUnmount() {
    if (this.state.isAuthorized) GoogleAuth.signOut();
    const script = document.querySelector('#google-api');
    script.parentNode.removeChild(script);
  }

  setupGoogleClient() {
    if (!document.querySelector('#google-api')) {
      this.setState({ status: STATUS.CONFIGURING });
      const script = document.createElement('script');
      script.src = config.google;
      script.id = 'google-api';

      script.onload = () => {
        const gapi = window.gapi;
        gapi.load('client', () => {
          gapi.client.init({
            apiKey: config.googleApiKey,
            clientId: config.googleClientId,
            scope: config.googleScope,
            discoveryDocs: config.googleDiscoveryDocs
          }).then(() => {
            GoogleAuth = gapi.auth2.getAuthInstance();
            GoogleAuth.isSignedIn.listen(this.updateSigninStatus);

            gapi.client.load('drive', 'v3', () => {
              this.setState({ status: STATUS.SUCCESS });
            });
          });
        });
      };

      document.body.appendChild(script);
    }
  }

  updateSigninStatus(isSignedIn) {
    this.setState({ isAuthorized: isSignedIn }, this.sendAuthorizedRequest);
  }

  handleError(error) {
    console.error(error);
    this.setState({ error: STATUS.ERROR });
  }

  export() {
    if (this.props.transformData && typeof this.props.transformData === 'function' && this.props.url) {
      this.setState({ status: STATUS.FETCHING });

      return new Promise((resolve, reject) => {
        return Papa.parse(this.props.url, { complete: result => resolve(result), error: error => reject(error), download: true });
      }).then((csvData) => {
        if (!csvData) throw 'ERROR (GoogleDriveExportButton): No CSV parsing result';

        if (csvData) {
          return this.props.transformData(csvData).then((transformedData) => {
            return Actions.exportToGoogleDrive({
              csv: transformedData,
              filename: generateFilename(this.props.fileNameBase)
            }).then(this.setState({ status: STATUS.SUCCESS }));
          });
        }
      }).catch(error => this.handleError(error));
    }

    return this.handleError('ERROR (GoogleDriveExportButton): No URL available to download or no transform data function')
  }

  tryExport() {
    if (this.state.isAuthorized) {
      this.export();
    } else {
      Promise.resolve(GoogleAuth.signIn())
        .then(() => {
          this.export();
        }).catch(error => handleError(error));
    }
  }

  render() {
    const disabled = (this.state.status !== STATUS.SUCCESS || this.props.disabled);
    const Icon = (disabled) ? DisabledGoogleIcon  : GoogleIcon
    if (this.state.status === STATUS.SUCCESS) {
      return (
        <Box
          className='button__container--google'
          direction='row'
          height='30px'
          justify='between'
          margin={{ horizontal: 'none', vertical: 'small'  }}
        >
          <span className='button__container--google__label'>Export with:</span>
          <Button
            className={this.props.className || null}
            label={<div><Icon />Google</div>}
            onClick={disabled ? null : this.tryExport}
            plain
          />
        </Box>
      );
    }

    return null;
  }
}

GoogleDriveExportButton.defaultProps = {
  className: '',
  contentType: 'text/csv',
  disabled: false,
  fileNameBase: 'astro101-',
  url: '',
  transformData: null
};

GoogleDriveExportButton.propTypes = {
  className: PropTypes.string,
  contentType: PropTypes.string,
  disabled: PropTypes.bool,
  fileNameBase: PropTypes.string,
  url: PropTypes.string.isRequired,
  transformData: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object
  ]).isRequired
};

export default GoogleDriveExportButton;
