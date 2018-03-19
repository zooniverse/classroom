import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Actions } from 'jumpstate';

import WildCamClassroom from '../../wildcam-classrooms/WildCamClassroom';

import Article from 'grommet/components/Article';
import Box from 'grommet/components/Box';
import Section from 'grommet/components/Section';

class DarienEducators extends React.Component {
  render() {
    if (!this.props.selectedProgram) {
      return null;
    }
    
    return (
      <Article colorIndex="accent-3">
        <Section
          align="center"
          colorIndex="accent-3"
          direction="column"
          justify="center"
        >
          <WildCamClassroom
            selectedProgram={this.props.selectedProgram}
          />
        </Section>
      </Article>
    );
  }
};

DarienEducators.propTypes = {
  selectedProgram: PropTypes.object,
};

DarienEducators.defaultProps = {
  selectedProgram: null,
};

function mapStateToProps(state) {
  return {
    selectedProgram: state.programs.selectedProgram,
  };
}

export default connect(mapStateToProps)(DarienEducators);
