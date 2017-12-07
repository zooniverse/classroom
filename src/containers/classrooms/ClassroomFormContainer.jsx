import React from 'react';
import { connect } from 'react-redux';
import { Actions } from 'jumpstate';

import ClassroomForm from '../../components/classrooms/ClassroomForm';
import {
  CLASSROOMS_INITIAL_STATE, CLASSROOMS_PROPTYPES
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
    this.closeForm = this.closeForm.bind(this);
    this.updateClassroom = this.updateClassroom.bind(this);
  }

  componentWillUnmount() {
    this.resetFormFields();
  }

  onChange(event) {
    const fields = { ...this.props.formFields, [event.target.id]: event.target.value };
    Actions.classrooms.updateFormFields(fields);
  }

  onSubmit(event) {
    event.preventDefault();
    if (this.props.selectedClassroom) {
      this.updateClassroom().then(() => {
        Actions.getClassroom(this.props.selectedClassroom.id);
        this.closeForm();
      });
    } else {
      this.createClassroom().then(() => {
        Actions.getClassroomsAndAssignments(this.props.selectedProgram);
        this.closeForm();
      });
    }
  }

  resetFormFields() {
    Actions.classrooms.updateFormFields(CLASSROOMS_INITIAL_STATE.formFields);
  }

  closeForm() {
    Actions.classrooms.toggleFormVisibility();
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

    return Actions.createClassroom(classroomData)
      .then((classroom) => {
        if (!this.props.selectedProgram.custom) {
          const assignments = this.props.selectedProgram.metadata.assignments;
          if (classroom) this.autoCreateAssignments(assignments, classroom);
        }
      });
  }

  updateClassroom() {
    return Actions.updateClassroom({ id: this.props.selectedClassroom.id, payload: this.props.formFields });
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
            classifications_target: assignments[workflowId].classifications_target
          },
          workflow_id: workflowId
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
    }));
  }

  render() {
    return (
      <ClassroomForm
        classroomsStatus={this.props.classroomsStatus}
        heading={this.props.heading}
        formFields={this.props.formFields}
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
    classroomsStatus: state.classrooms.status,
    formFields: state.classrooms.formFields,
    selectedClassroom: state.classrooms.selectedClassroom,
    selectedProgram: state.programs.selectedProgram
  };
}

export default connect(mapStateToProps)(ClassroomFormContainer);
