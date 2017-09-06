// "Passing arrow functions (“lambdas”) to Mocha is discouraged" - https://mochajs.org/#arrow-functions
/* eslint prefer-arrow-callback: 0, func-names: 0, 'react/jsx-boolean-value': ['error', 'always'] */
/* global describe, it, before, beforeEach, afterEach, expect */

import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { ClassroomFormContainer } from './ClassroomFormContainer';

const mockChangeEvent = { target: { id: 'name', value: 'My classroom' } };

// This test block is throwing a warning from Jumpstate that it is being used without middleware
// Why?
describe('<ClassroomFormContainer />', function() {
  let wrapper;
  const onChangeStub = sinon.stub(ClassroomFormContainer.prototype, 'onChange').callsFake(() => {});
  const onSubmitStub = sinon.stub(ClassroomFormContainer.prototype, 'onSubmit').callsFake(() => {});
  before(function() {
    wrapper = shallow(<ClassroomFormContainer />);
  });

  it('without crashing', function() {});

  it('renders <ClassroomForm />', function() {
    expect(wrapper.find('ClassroomForm')).to.have.lengthOf(1);
  });

  it('calls onChange when change event happens', function() {
    wrapper.instance().onChange(mockChangeEvent);
    expect(onChangeStub.calledOnce).to.be.true();
  });

  it('calls onSubmit', function() {
    // TODO: Figure out how to test jumpstate Actions
    wrapper.instance().onSubmit();
    expect(onSubmitStub.calledOnce).to.be.true();
  });
});
