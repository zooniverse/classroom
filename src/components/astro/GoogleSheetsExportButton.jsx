import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Actions } from 'jumpstate';
import Button from 'grommet/components/Button';
import { config } from '../../lib/config';

const STATUS = {
  IDLE: 'idle',
  CONFIGURING: 'configuring',
  SUCCESS: 'success',
  ERROR: 'error',
};

let GoogleAuth = null;

class GoogleSheetsExportButton extends React.Component {
  constructor() {
    super();

    this.state = {
      isAuthorized: false,
      status: STATUS.IDLE
    }

    this.handleError = this.handleError.bind(this);
    this.setupGoogleClient = this.setupGoogleClient.bind(this);
    this.tryExport = this.tryExport.bind(this);
    this.updateSigninStatus = this.updateSigninStatus.bind(this);
  }

  componentDidMount() {
    this.setupGoogleClient();
  }

  componentWillUnmount() {
    if (this.state.isAuthorized) GoogleAuth.signOut();
    const script = document.querySelector('#google-api');
    script.parentNode.removeChild(script);
  }

  updateSigninStatus(isSignedIn) {
    this.setState({ isAuthorized: isSignedIn }, this.sendAuthorizedRequest);
  }

  handleError(error) {
    console.error(error);
    this.setState({ error: STATUS.ERROR })
  }

  setupGoogleClient() {
    console.log('gapi', window.gapi)
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
            window.googleAuth = GoogleAuth;
            GoogleAuth.isSignedIn.listen(this.updateSigninStatus)

            gapi.client.load('drive', 'v3', () => {
              this.setState({ status: STATUS.SUCCESS });
            });
          })
        })
      };

      document.body.appendChild(script);
    }

  }

  export() {
    // TODO Replace body with the CSV from caesar request response
    const testCSV = new Blob([['test', 'csv'], ['hello', 'world']], { type: 'text/csv' });

    gapi.client.drive.files.create({
      resource: {
        name: 'test.csv',
        mimeType: 'application/vnd.google-apps.spreadsheet'
      },
      media: {
        mimeType: 'text/csv',
        body: testCSV
      },
      fields: 'id'
    }).then((response) => {
      console.log(response)
    })
  }

  tryExport() {
    if (this.state.isAuthorized) {
      this.export();
    } else {
      Promise.resolve(GoogleAuth.signIn())
        .then(() => {
          this.export();
        });
    }
  }

  render() {
    if (this.state.status === STATUS.SUCCESS) {
      return (
        <Button className={this.props.className || null} label="Export to Google Sheets" onClick={this.props.disabled ? null : this.tryExport} />
      );
    }

    return null;
  }
}

GoogleSheetsExportButton.defaultProps = {
  disabled: false
};

GoogleSheetsExportButton.propTypes = {
  disabled: PropTypes.bool
};

export default GoogleSheetsExportButton;
