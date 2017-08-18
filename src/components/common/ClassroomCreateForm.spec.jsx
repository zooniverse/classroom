// "Passing arrow functions (“lambdas”) to Mocha is discouraged" - https://mochajs.org/#arrow-functions
/* eslint prefer-arrow-callback: 0, func-names: 0, 'react/jsx-boolean-value': ['error', 'always'] */
/* global describe, it, before, beforeEach, afterEach, expect */

import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import ClassroomCreateForm from './ClassroomCreateForm';

describe('<ClassroomCreateForm />', function() {
  let wrapper;
  const onChangeSpy = sinon.spy();
  const onSubmitSpy = sinon.spy();
  before(function() {
    // Using mount. For some reason the simulating form submit wasn't working with shallow render
    wrapper = mount(<ClassroomCreateForm onChange={onChangeSpy} onSubmit={onSubmitSpy} />);
  });

  it('without crashing', function() {});

  it('renders grommet components', function() {
    expect(wrapper.find('Form')).to.have.lengthOf(1);
    expect(wrapper.find('FormField')).to.have.lengthOf(4);
    expect(wrapper.find('TextInput')).to.have.lengthOf(3);
    expect(wrapper.find('Button')).to.have.lengthOf(1);
    expect(wrapper.find('Heading')).to.have.lengthOf(1);
    expect(wrapper.find('Footer')).to.have.lengthOf(1);
    expect(wrapper.find('Paragraph')).to.have.lengthOf(2);
  });

  it('calls onChange when typing in the text input', function() {
    const textInput = wrapper.find('#name');
    const value = 'My Classroom';
    const change = { target: { value } };
    // Why is grommet using oninput and not onchange as the handler?
    textInput.simulate('input', change);
    expect(onChangeSpy.called).to.be.true();
  });

  it('calls onSubmit when the form is submitted', function() {
    const form = wrapper.find('form');
    form.simulate('submit');
    expect(onSubmitSpy.calledOnce).to.be.true();
  });

  it('Makes the option fields required when props.optionalFormFields is false', function() {
    expect(wrapper.find('legend')).to.have.lengthOf(2);
    wrapper.setProps({ optionalFormFields: false });
    wrapper.find('input').forEach((node) => {
      expect(node.props().required).to.equal(true);
    });
    expect(wrapper.find('legend')).to.have.lengthOf(1);
  });
});
