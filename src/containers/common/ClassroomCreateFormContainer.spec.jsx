// "Passing arrow functions (“lambdas”) to Mocha is discouraged" - https://mochajs.org/#arrow-functions
/* eslint prefer-arrow-callback: 0, func-names: 0, 'react/jsx-boolean-value': ['error', 'always'] */
/* global describe, it, before, beforeEach, afterEach, expect */

import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { ClassroomCreateFormContainer } from './ClassroomCreateFormContainer';

const fields = {
  name: 'My classroom',
  subject: '',
  school: '',
  description: ''
};

const mockChangeEvent = { target: { id: 'name', value: 'My classroom' } };

describe('<ClassroomCreateFormContainer />', function() {
  let wrapper;
  const onChangeSpy = sinon.spy(ClassroomCreateFormContainer.prototype, 'onChange');
  const onSubmitStub = sinon.stub(ClassroomCreateFormContainer.prototype, 'onSubmit').callsFake(() => {});
  before(function() {
    wrapper = shallow(<ClassroomCreateFormContainer />);
  });

  it('without crashing', function() {});

  it('renders <ClassroomCreateForm />', function() {
    expect(wrapper.find('ClassroomCreateForm')).to.have.lengthOf(1);
  });

  it('sets fields state when onChange is called', function() {
    wrapper.instance().onChange(mockChangeEvent);
    expect(onChangeSpy.calledOnce).to.be.true();
    expect(wrapper.state('fields')).to.deep.equal(fields);
  });

  it('calls onSubmit', function() {
    // TODO: Figure out how to test jumpstate Actions
    wrapper.instance().onSubmit();
    expect(onSubmitStub.calledOnce).to.be.true();
  });
});
