import React from 'react';
import PropTypes from 'prop-types';
import List from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';

import { ZooTran } from '../../lib/zooniversal-translator.js';

const SimpleMapLegend = (props) => {
  return (
    <List className="map-legend-simple">
      {Object.keys(props.items).map(key => {
        const value = props.items[key];
        return (
          <ListItem className="map-legend-item" key={`map-legend-item-${key}`} direction="row">
            <svg height="10" width="10"><circle cx="5" cy="5" r="5" fill={key} fillOpacity="0.5" /></svg> <span>{ZooTran(value)}</span>
          </ListItem>
        );
      })}
    </List>
  );
}


SimpleMapLegend.defaultProps = {
  items: {},
};
SimpleMapLegend.propTypes = {
  items: PropTypes.object,
};

export default SimpleMapLegend;
