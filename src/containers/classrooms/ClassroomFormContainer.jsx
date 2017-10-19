import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Actions } from 'jumpstate';

import ClassroomForm from '../../components/classrooms/ClassroomForm';
import {
  CLASSROOMS_STATUS, CLASSROOMS_INITIAL_STATE, CLASSROOMS_PROPTYPES
} from '../../ducks/classrooms';
import {
  PROGRAMS_INITIAL_STATE, PROGRAMS_PROPTYPES
} from '../../ducks/programs';

export class ClassroomFormContainer extends React.Component {
  constructor(props) {
    super(props);

    this.autoCreateAssignments = this.autoCreateAssignments.bind(this);
    this.createClassroom = this.createClassroom.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.updateClassroom = this.updateClassroom.bind(this);
  }

  onChange(event) {
    const fields = { ...this.props.formFields, [event.target.id]: event.target.value };
    Actions.classrooms.updateFormFields(fields);
  }

  onSubmit(event) {
    event.preventDefault();
    if (this.props.selectedClassroom) {
      this.updateClassroom();
    } else {
      this.createClassroom();
    }
  }

  createClassroom() {
    const classroomData = {
      attributes: this.props.formFields,
      relationships: {
        program: {
          data: {
            id: this.props.selectedProgram.id,
            type: 'programs'
          }
        }
      }
    };

    Actions.createClassroom(classroomData)
      .then((classroom) => {
        if (!this.props.selectedProgram.custom) {
          const assignments = this.props.selectedProgram.metadata.assignments;
          if (classroom) this.autoCreateAssignments(assignments, classroom);
        }
      })
  }

  updateClassroom() {
    Actions.updateClassroom({ id: this.props.selectedClassroom.id, payload: this.props.formFields })
      .then(() => {
        Actions.classrooms.toggleFormVisibility();
      }).then(() => {
        Actions.getClassroom(this.props.selectedClassroom.id);
      });
  }

  autoCreateAssignments(assignments, classroom) {
    Promise.resolve(Object.keys(assignments).forEach((workflowId) => {
      // The classroom creation action won't have any students yet.
      // How do I later associate these auto-created assignments with the new classroom
      // with students who join later?
      // Might have to include assigning the student to the assignments for I2A classrooms
      // on the join classroom action.
      const assignmentData = {
        attributes: {
          name: assignments[workflowId].name,
          metadata: {
            classification_target: assignments[workflowId].classification_target
          },
          workflow_id: workflowId,
        },
        relationships: {
          classroom: {
            data: {
              id: classroom.id,
              type: 'classrooms'
            }
          }
        }
      };

      Actions.createAssignment(assignmentData);
    })).then(() => {
      Actions.classrooms.toggleFormVisibility();
      Actions.getClassroomsAndAssignments(this.props.selectedProgram);
    });
  }

  render() {
    return (
      <ClassroomForm
        heading={this.props.heading}
        fields={this.props.formFields}
        onChange={this.onChange}
        onSubmit={this.onSubmit}
        submitLabel={this.props.submitLabel}
      />
    );
  }
}

ClassroomFormContainer.defaultProps = {
  ...PROGRAMS_INITIAL_STATE,
  ...CLASSROOMS_INITIAL_STATE
};

ClassroomFormContainer.propTypes = {
  ...PROGRAMS_PROPTYPES,
  ...CLASSROOMS_PROPTYPES
};

function mapStateToProps(state) {
  return {
    formFields: state.classrooms.formFields,
    selectedClassroom: state.classrooms.selectedClassroom,
    selectedProgram: state.programs.selectedProgram
  };
}

export default connect(mapStateToProps)(ClassroomFormContainer);
