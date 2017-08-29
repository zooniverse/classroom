import React from 'react';
import PropTypes from 'prop-types';
import Box from 'grommet/components/Box';

const SimpleMapLegend = (props) => {
  return (
    <Box className="map-legend-simple">
      {Object.keys(props.items).map(key => {
        const value = props.items[key];
        return (
          <Box className="map-legend-item" key={`map-legend-item-${key}`} direction="row">
            <svg height="10" width="10"><circle cx="5" cy="5" r="5" fill={key} fillOpacity="0.5" /></svg> <span>{value}</span>
          </Box>
        );
      })}
    </Box>
  );
}


SimpleMapLegend.defaultProps = {
  items: {},
};
SimpleMapLegend.propTypes = {
  items: PropTypes.object,
};

export default SimpleMapLegend;
