// "Passing arrow functions (“lambdas”) to Mocha is discouraged" - https://mochajs.org/#arrow-functions
/* eslint prefer-arrow-callback: 0, func-names: 0, 'react/jsx-boolean-value': ['error', 'always'] */
/* global describe, it, before, expect */

import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { ClassroomManagerContainer } from './ClassroomManagerContainer';

describe('<ClassroomManagerContainer />', function() {
  let wrapper;
  const copyJoinLinkSpy = sinon.spy(ClassroomManagerContainer.prototype, 'copyJoinLink');
  const resetToastStateSpy = sinon.spy(ClassroomManagerContainer.prototype, 'resetToastState');
  before(function() {
    wrapper = shallow(<ClassroomManagerContainer />);
  });

  it('renders without crashing', function() {});

  it('renders <ClassroomManager /> component', function() {
    expect(wrapper.find('ClassroomManager')).to.have.lengthOf(1);
  });

  it('sets toast state when copyJoinLink is called', function() {
    wrapper.instance().copyJoinLink();
    expect(copyJoinLinkSpy.calledOnce).to.be.true();
    expect(wrapper.state('toast')).to.deep.equal({ message: 'Link copied', status: 'ok' });
  });

  it('sets toast state when resetToastState is called', function() {
    wrapper.instance().resetToastState();
    expect(resetToastStateSpy.calledOnce).to.be.true();
    expect(wrapper.state('toast')).to.deep.equal({ message: null, status: null });
  });
});
