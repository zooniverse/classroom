import React from 'react';
import PropTypes from 'prop-types';

import DarienNavi from '../../common/DarienNavi';

import Box from 'grommet/components/Box';

function DarienInfoEcology(props) {
  return (
    <Box>
      <DarienNavi />
      <Box className="wildcam-info-page">
        ECOLOGY
      </Box>
    </Box>
  );
};

DarienInfoEcology.defaultProps = {};

DarienInfoEcology.propTypes = {};

export default DarienInfoEcology;
