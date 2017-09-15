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

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    const fields = { ...this.props.formFields, [event.target.id]: event.target.value };
    Actions.classrooms.updateFormFields(fields);
  }

  onSubmit(event) {
    event.preventDefault();
    // TODO: Add project id(s) associated to classroom create

    if (this.props.selectedClassroom) {
      Actions.updateClassroom({ id: this.props.selectedClassroom.id, payload: this.props.formFields })
        .then(() => {
          Actions.classrooms.toggleFormVisibility();
        }).then(() => {
          Actions.getClassroom(this.props.selectedClassroom.id);
        });
    } else {
      Actions.createClassroom(this.props.formFields)
        .then((classroom) => {
          console.log('classroom created', classroom)
          if (this.props.selectedProgram.metadata.autoCreateAssignments) {
            // TODO: Actions.assignments.createAssignment().then(Actions.getClassroomsAndAssignments());
            // For API optimization, we could merge the returned classroom into the local app state
            // Then only call for the linked assignments for that one classroom
            const assignments = this.props.selectedProgram.metadata.assignments;
            Promise.resolve(Object.keys(assignments).forEach((workflowId) => {
              // The classroom creation action won't have any students yet.
              // How do I later associate these auto-created assignments with the new classroom
              // with students who join later?
              // Might have to include assigning the student to the assignments for I2A classrooms
              // on the join classroom action.
              const assignmentData = {
                data: {
                  program_id: this.props.selectedProgram.id,
                  workflow_id: workflowId,
                  attributes: {
                    name: assignments[workflowId].name,
                    metadata: {
                      classification_target: assignments[workflowId].classification_target
                    }
                  },
                  relationships: {
                    classroom: {
                      data: {
                        id: classroom.id,
                        type: 'classrooms'
                      }
                    }
                  }
                }
              };

              Actions.createAssignment(assignmentData);
            })).then(() => {
              Actions.classrooms.toggleFormVisibility();
              Actions.getClassroomsAndAssignments();
            });
          } else {
            Actions.getClassroomsAndAssignments();
          }
        })
    }
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
