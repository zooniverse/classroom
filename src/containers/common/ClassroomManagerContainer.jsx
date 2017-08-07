import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Actions } from 'jumpstate';

class ClassroomManagerContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    Actions.getClassrooms();
  }

  render() {
    if (this.props.fetching) {
      return (<div>Loading...</div>);
    }

    return (<div>{this.props.classrooms}</div>);
  }
}

ClassroomManagerContainer.propTypes = {
  classrooms: PropTypes.arrayOf(PropTypes.object),
  fetching: PropTypes.bool
};

ClassroomManagerContainer.defaultProps = {
  classrooms: [],
  fetching: false
};

const mapStateToProps = (state) => ({
  classrooms: state.classrooms.classrooms,
  fetching: state.classrooms.fetching
});

export default connect(mapStateToProps)(ClassroomManagerContainer);
