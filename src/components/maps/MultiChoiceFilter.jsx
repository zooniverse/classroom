import React from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'jumpstate';

import Form from 'grommet/components/Form';
import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';

import CheckboxIcon from 'grommet/components/icons/base/Checkbox';
import CheckboxSelectedIcon from 'grommet/components/icons/base/CheckboxSelected';

class MultiChoicePanel extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <Form className="multi-choice filter">
        <h3>{this.props.filterLabel}</h3>
        <Box>
          {(this.props.selected && this.props.selected.length > 0)
            ? `Selected ${this.props.selected.length} out of ${this.props.options.length} options`
            : `Showing all options`
          }
        </Box>
        <Box>
          {this.props.options && this.props.options.map(item => {
            const isSelected = this.props.selected && this.props.selected.indexOf(item.value) >= 0;
            
            if (isSelected) {
              
              return (
                <Button
                  key={`map-control-filter-item-${this.props.filterKey}-${item.value}`}
                  onClick={()=>{
                    Actions.mapexplorer.removeFilterSelectionItem({ key: this.props.filterKey, value: item.value });
                  }}
                  icon={<CheckboxSelectedIcon/>}
                >
                  {item.label}
                </Button>
              );
              
            } else {
              
              return (
                <Button
                  key={`map-control-filter-item-${this.props.filterKey}-${item.value}`}
                  onClick={()=>{
                    Actions.mapexplorer.addFilterSelectionItem({ key: this.props.filterKey, value: item.value });
                  }}
                  icon={<CheckboxIcon/>}
                >
                  {item.label}
                </Button>
              );
              
            }
          })}
        
        </Box>
      </Form>
    );
  }
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
