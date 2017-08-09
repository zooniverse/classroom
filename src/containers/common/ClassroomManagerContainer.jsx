import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Actions } from 'jumpstate';
import {
  CLASSROOMS_STATUS, CLASSROOMS_INITIAL_STATE, CLASSROOMS_PROPTYPES,
} from '../../ducks/classrooms';
import ClassroomManager from '../../components/common/ClassroomManager';

class ClassroomManagerContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    Actions.getClassrooms().then(() => {
      this.props.classrooms.forEach((classroom) => {
        Actions.getAssignments(classroom.id);
      });
    });
  }

  render() {
    return (
      <ClassroomManager
        assignments={this.props.assignments}
        classrooms={this.props.classrooms}
        classroomInstructions={this.props.classroomInstructions}
        fetching={this.props.fetching}
      />
    );
  }

  render_status() {
    if (this.props.status === CLASSROOMS_STATUS.FETCHING) {
      return (<div>Loading...</div>);
    } else if (this.props.status === CLASSROOMS_STATUS.ERROR) {
      return (<div>ERROR!</div>);
    } else if (this.props.status === CLASSROOMS_STATUS.SUCCESS) {
      return (<div>Ready!</div>);
    }

    return null;
  }
}

ClassroomManagerContainer.propTypes = {
  ...CLASSROOMS_PROPTYPES,
};

ClassroomManagerContainer.defaultProps = {
  assignments: {},
  ...CLASSROOMS_INITIAL_STATE
};

const mapStateToProps = (state) => ({
  assignments: state.assignments.assignments,
  classrooms: state.classrooms.classrooms,
  error: state.classrooms.error,
  status: state.classrooms.status,
});

export default connect(mapStateToProps)(ClassroomManagerContainer);
