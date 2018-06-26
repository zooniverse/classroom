// "Passing arrow functions (“lambdas”) to Mocha is discouraged" - https://mochajs.org/#arrow-functions
/* eslint prefer-arrow-callback: 0, func-names: 0, 'react/jsx-boolean-value': ['error', 'always'] */
/* global describe, it, before, expect */

import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import ClassroomsManager from './ClassroomsManager';
import { CLASSROOMS_STATUS } from '../../ducks/classrooms';
import { ASSIGNMENTS_STATUS } from '../../ducks/assignments';

const instructions = 'Lorem Ipsum';

const assignments = {
  4: [{ id: '35', name: 'Assignment 1', metadata: { classifications_target: '20' } }],
  7: [{ id: '26', name: 'Assignment 2', metadata: { classifications_target: '40' } }]
};

const noAssignments = {
  4: [],
  7: []
};

const classrooms = [
  { id: '4', name: 'My classroom', joinToken: 'token1' },
  { id: '7', name: 'Another classroom', joinToken: 'token2' }
];

const match = {
  url: ''
};

describe('<ClassroomsManager />', function() {
  let wrapper;
  const toggleFormVisibilitySpy = sinon.spy();
  before(function() {
    wrapper = shallow(
      <ClassroomsManager
        assignments={noAssignments}
        assignmentsStatus={ASSIGNMENTS_STATUS.FETCHING}
        classroomInstructions={instructions}
        classroomsStatus={CLASSROOMS_STATUS.FETCHING}
        match={match}
        toggleFormVisibility={toggleFormVisibilitySpy}
      />
    );
  });

  it('renders without crashing', function() {});
});
