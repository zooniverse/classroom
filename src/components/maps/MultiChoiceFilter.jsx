import React from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'jumpstate';

import Box from 'grommet/components/Box';
import Label from 'grommet/components/Label';
import Button from 'grommet/components/Button';

import CheckboxIcon from 'grommet/components/icons/base/Checkbox';
import CheckboxSelectedIcon from 'grommet/components/icons/base/CheckboxSelected';

import { ZooTran } from '../../lib/zooniversal-translator.js';

const MultiChoicePanel = (props) => {
  return (
    <Box className="multi-choice filter">
      <Label align="end" margin="none" size="small">
        {(props.selected && props.selected.length > 0)
          ? `${props.selected.length} / ${props.options.length} ${ZooTran('options selected')}`
          : ZooTran('Showing all options')
        }
      </Label>
      <Box>
        {props.options && props.options.map(item => {
          const isSelected = props.selected && props.selected.indexOf(item.value) >= 0;

          if (isSelected) {

            return (
              <Button
                key={`map-control-filter-item-${props.filterKey}-${item.value}`}
                onClick={()=>{
                  Actions.mapexplorer.removeFilterSelectionItem({ key: props.filterKey, value: item.value });
                }}
                icon={<CheckboxSelectedIcon size="small" />}
              >
                {ZooTran(item.label)}
              </Button>
            );

          } else {

            return (
              <Button
                key={`map-control-filter-item-${props.filterKey}-${item.value}`}
                onClick={()=>{
                  Actions.mapexplorer.addFilterSelectionItem({ key: props.filterKey, value: item.value });
                }}
                icon={<CheckboxIcon size="small" />}
              >
                {ZooTran(item.label)}
              </Button>
            );

          }
        })}
      </Box>
    </Box>
  );
}

MultiChoicePanel.defaultProps = {
  filterKey: '',
  filterLabel: '',
  options: [],
  selected: undefined,  //We assume undefined instead of null by default, because that's what you get when you call filterArray[keyThatDoesntExist]
};
MultiChoicePanel.propTypes = {
  filterKey: PropTypes.string,
  filterLabel: PropTypes.string,
  options: PropTypes.array,
  selected: PropTypes.array,
};

export default MultiChoicePanel;
