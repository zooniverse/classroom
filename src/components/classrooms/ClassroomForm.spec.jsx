// "Passing arrow functions (“lambdas”) to Mocha is discouraged" - https://mochajs.org/#arrow-functions
/* eslint prefer-arrow-callback: 0, func-names: 0, 'react/jsx-boolean-value': ['error', 'always'] */
/* global describe, it, before, beforeEach, afterEach, expect */

import React from 'react';
import { mount } from 'enzyme';
import TextInput from 'grommet/components/TextInput';
import sinon from 'sinon';
import ClassroomForm from './ClassroomForm';
import { expect } from 'chai';

describe('<ClassroomForm />', function() {
  let wrapper, onChangeSpy, onSubmitSpy; 
  before(function() {
    onChangeSpy = sinon.spy();
    onSubmitSpy = sinon.spy();
    // Using mount. For some reason the simulating form submit wasn't working with shallow render
    wrapper = mount(<ClassroomForm onChange={onChangeSpy} onSubmit={onSubmitSpy} />);
  });

  it('without crashing', function() {
    expect(wrapper).to.be.ok()
  });

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
    const textInputs = wrapper.find(TextInput);
    const value = 'My Classroom';
    const change = { target: { value } };
    textInputs.forEach((input) => {
      input.simulate('change', change);
      expect(onChangeSpy.calledOnce).to.be.true();
      onChangeSpy.resetHistory()
    })
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
