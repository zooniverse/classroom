// "Passing arrow functions (“lambdas”) to Mocha is discouraged" - https://mochajs.org/#arrow-functions
/* eslint prefer-arrow-callback: 0, func-names: 0, 'react/jsx-boolean-value': ['error', 'always'] */
/* global describe, it, before, expect */

import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import ClassroomManager from './ClassroomManager';
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

const toast = {
  message: 'Copy successful',
  status: 'ok'
};

describe('<ClassroomManager />', function() {
  let wrapper;
  const copyJoinLinkSpy = sinon.spy();
  const deleteClassroomSpy = sinon.spy();
  const resetToastStateSpy = sinon.spy();
  const toggleFormVisibilitySpy = sinon.spy();
  before(function() {
    wrapper = shallow(
      <ClassroomManager
        assignments={noAssignments}
        classroomInstructions={instructions}
        classroomsStatus={CLASSROOMS_STATUS.FETCHING}
        assignmentsStatus={ASSIGNMENTS_STATUS.FETCHING}
        copyJoinLink={copyJoinLinkSpy}
        deleteClassroom={deleteClassroomSpy}
        resetToastState={resetToastStateSpy}
        toggleFormVisibility={toggleFormVisibilitySpy}
      />
    );
  });

  it('renders without crashing', function() {});

  it('renders grommet components on initial component load', function() {
    expect(wrapper.find('Box')).to.have.lengthOf(2);
    expect(wrapper.find('Paragraph')).to.have.lengthOf(1);
    expect(wrapper.find('Spinning')).to.have.lengthOf(1);
    expect(wrapper.find('Button')).to.have.lengthOf(1);
  });

  it('renders two Paragraph components on successful classrooms load, but there are none', function() {
    wrapper.setProps({ classroomsStatus: CLASSROOMS_STATUS.SUCCESS });
    expect(wrapper.find('Paragraph')).to.have.lengthOf(2);
  });

  it('renders classroom manager table on successful classrooms load and there are some', function() {
    wrapper.setProps({ classrooms });
    expect(wrapper.find('Box')).to.have.lengthOf(4);
    expect(wrapper.find('Table')).to.have.lengthOf(1);
    expect(wrapper.find('TableRow')).to.have.lengthOf(5);
    expect(wrapper.find('Button')).to.have.lengthOf(5);
    expect(wrapper.find('CopyToClipboard')).to.have.lengthOf(2);
    expect(wrapper.find('Spinning')).to.have.lengthOf(2);
  });

  it('renders three Paragraphs on successful assignments load and there are none', function() {
    wrapper.setProps({ assignmentsStatus: ASSIGNMENTS_STATUS.SUCCESS });
    expect(wrapper.find('Paragraph')).to.have.lengthOf(3);
  });

  it('renders assignments data on successful load and there are some', function() {
    wrapper.setProps({ assignments });
    expect(wrapper.find('Button')).to.have.lengthOf(7);
    expect(wrapper.find('Anchor')).to.have.lengthOf(2);
    expect(wrapper.find('TableRow').last().find('td').first().text()).to.equal('Assignment 2');
  });

  it('calls toggleFormVisibility when Create New Classroom button is clicked', function() {
    wrapper.find('Button').first().simulate('click');
    expect(toggleFormVisibilitySpy.calledOnce).to.be.true();
    // Layer does not render as a child, so unsure on how to test for its presence
  });

  // This test doesn't work because the button is wrapped by the CopyToClipboard component.
  // it('calls copyJoinLink when copy join link button is clicked', function() {
  //   const button = wrapper.find('Button').at(1);
  //   button.simulate('click');
  //   expect(copyJoinLinkSpy.called).to.be.true();
  // });

  it('calls deleteClassroom when delete button is clicked', function() {
    const button = wrapper.find('.manager-table__button--delete').first();
    button.simulate('click');
    expect(deleteClassroomSpy.called).to.be.true();
  });
});
