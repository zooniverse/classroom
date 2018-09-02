/*
Helpful Guide
-------------

A helpful popup that's used to display tutorials or instructions with multiple
steps.

--------------------------------------------------------------------------------
 */

import React from 'react';
import PropTypes from 'prop-types';

import Button from 'grommet/components/Button';
import Box from 'grommet/components/Box';
import Layer from 'grommet/components/Layer';
import Value from 'grommet/components/Value';

import CloseIcon from 'grommet/components/icons/base/Close';
import LinkNextIcon from 'grommet/components/icons/base/LinkNext';
import LinkPrevIcon from 'grommet/components/icons/base/LinkPrevious';

class HelpfulGuide extends React.Component {
  
  constructor() {
    super();
    this.state = {
      page: 0,
    };
  }
  
  render() {
    const props = this.props;
    const state = this.state;
    
    const totalPages = (props.children && props.children.length)
      ? props.children.length
      : 0;
    
    return (
      <Layer
        className="helpful-guide"
        onClose={props.onClose}
        overlayClose={true}
      >
        <Box className="helpful-guide-container">
          <Box
            className="helpful-guide-content"
            flex="grow"
            pad="small"
          >
            {props.children && props.children[state.page]}
          </Box>
          <Box
            className="helpful-guide-actions"
            direction="row"
            justify="around"
            align="center"
          >
            <Button
              icon={<LinkPrevIcon size="small" />}
              disabled={(state.page <= 0)}
              onClick={() => {
                this.setState({
                  page: Math.max(state.page - 1, 0)
                });
              }}
            />
            
            <Value size="small" value={((state.page+1) + ' / ' + totalPages)} />
            
            <Button
              icon={<LinkNextIcon size="small" />}
              disabled={(state.page >= totalPages - 1)}
              onClick={() => {
                this.setState({
                  page: Math.min(state.page + 1, totalPages - 1)
                });
              }}
            />
            
            <Button
              icon={<CloseIcon size="small" />}
              onClick={props.onClose}
            />
            
          </Box>
        </Box>
      </Layer>
    );
  }
        
        
}

HelpfulGuide.defaultProps = {
  onClose: () => {},
};

HelpfulGuide.propTypes = {
  onClose: PropTypes.func,
}

export default HelpfulGuide;
