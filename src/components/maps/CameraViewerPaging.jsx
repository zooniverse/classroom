import React from 'react';
import PropTypes from 'prop-types';

import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Label from 'grommet/components/Label';
import FormNextIcon from 'grommet/components/icons/base/FormNext';
import FormPreviousIcon from 'grommet/components/icons/base/FormPrevious';

import {
  MAPEXPLORER_INITIAL_STATE, MAPEXPLORER_PROPTYPES,
  MAPEXPLORER_CAMERA_STATUS,
} from '../../ducks/mapexplorer';

const CameraViewerData = (props) => {
  if (props.activeCameraDataStatus === MAPEXPLORER_CAMERA_STATUS.SUCCESS &&
      props.activeCameraData) {
    return (
      <Box className="camera-data-paging" direction="row" pad="none" alignSelf="stretch" justify="center" separator="horizontal">
        <Button
          plain={true}
          onClick={()=>{props.changePage(-1)}}
          icon={<FormPreviousIcon size="xsmall" />}
        />
        <Label align="center" size="small">
          Page {props.page+1} of {Math.ceil(props.activeCameraData.length / props.itemsPerPage)}
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
  activeCameraDataStatus: MAPEXPLORER_PROPTYPES.activeCameraDataStatus,
  activeCameraData: MAPEXPLORER_PROPTYPES.activeCameraData,
  page: 0,
  itemsPerPage: 6,
  changePage: () => {},
};
CameraViewerData.propTypes = {
  activeCameraDataStatus: MAPEXPLORER_PROPTYPES.activeCameraDataStatus,
  activeCameraData: MAPEXPLORER_PROPTYPES.activeCameraData,
  page: PropTypes.number,
  itemsPerPage: PropTypes.number,
  changePage: PropTypes.func,
};

export default CameraViewerData;
