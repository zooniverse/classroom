import React from 'react';
import PropTypes from 'prop-types';

import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Label from 'grommet/components/Label';
import FormNextIcon from 'grommet/components/icons/base/FormNext';
import FormPreviousIcon from 'grommet/components/icons/base/FormPrevious';

import { ZooTran } from '../../../lib/zooniversal-translator.js';

import {
  WILDCAMMAP_INITIAL_STATE, WILDCAMMAP_PROPTYPES,
  WILDCAMMAP_CAMERA_STATUS,
} from '../ducks/index.js';

const CameraViewerData = (props) => {
  if (props.activeCameraDataStatus === WILDCAMMAP_CAMERA_STATUS.SUCCESS &&
      props.activeCameraData) {
    return (
      <Box className="camera-data-paging" direction="row" pad="none" alignSelf="stretch" justify="center" separator="horizontal">
        <Button
          plain={true}
          onClick={()=>{props.changePage(-1)}}
          icon={<FormPreviousIcon size="xsmall" />}
        />
        <Label align="center" size="small">
          {ZooTran('Page')} {props.page+1} / {Math.ceil(props.activeCameraData.length / props.itemsPerPage)}
        </Label>
        <Button
          plain={true}
          onClick={()=>{props.changePage(1)}}
          icon={<FormNextIcon size="xsmall" />}
        />
      </Box>
    );
  }
  return null;
}

CameraViewerData.defaultProps = {
  activeCameraDataStatus: WILDCAMMAP_PROPTYPES.activeCameraDataStatus,
  activeCameraData: WILDCAMMAP_PROPTYPES.activeCameraData,
  page: 0,
  itemsPerPage: 6,
  changePage: () => {},
};
CameraViewerData.propTypes = {
  activeCameraDataStatus: WILDCAMMAP_PROPTYPES.activeCameraDataStatus,
  activeCameraData: WILDCAMMAP_PROPTYPES.activeCameraData,
  page: PropTypes.number,
  itemsPerPage: PropTypes.number,
  changePage: PropTypes.func,
};

export default CameraViewerData;
