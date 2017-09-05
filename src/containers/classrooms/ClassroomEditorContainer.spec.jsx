// "Passing arrow functions (“lambdas”) to Mocha is discouraged" - https://mochajs.org/#arrow-functions
/* eslint prefer-arrow-callback: 0, func-names: 0, 'react/jsx-boolean-value': ['error', 'always'] */
/* global describe, it, before, expect */

import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { ClassroomEditorContainer } from './ClassroomEditorContainer';

const selectedClassroom = {
  id: '352'
};

describe('<ClassroomEditorContainer />', function() {
  let wrapper;
  const editClassroomStub = sinon.stub(ClassroomEditorContainer.prototype, 'editClassroom').callsFake(() => {});
  const exportGradesStub = sinon.stub(ClassroomEditorContainer.prototype, 'exportGrades').callsFake(() => {});
  const removeStudentFromClassroomStub = sinon.stub(ClassroomEditorContainer.prototype, 'removeStudentFromClassroom').callsFake(() => {});

  before(function() {
    wrapper = shallow(<ClassroomEditorContainer />);
  });

  it('renders without crashing', function() {});

  it('renders <ClassroomEditor /> component', function() {
    expect(wrapper.find('ClassroomEditor')).to.have.lengthOf(1);
  });

  it('calls editClassroom only when there is a selectedClassroom', function() {
    expect(editClassroomStub.calledOnce).to.be.false();
    wrapper.setProps({ selectedClassroom });
    wrapper.instance().editClassroom();
    expect(editClassroomStub.calledOnce).to.be.true();
  });
});
