import React from 'react';
import PropTypes from 'prop-types';
import ClassroomCreateForm from '../../components/common/ClassroomCreateForm';

class ClassroomCreateFormContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ClassroomCreateForm />
    );
  }
}

export default ClassroomCreateFormContainer;
