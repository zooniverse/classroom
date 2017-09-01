// "Passing arrow functions (“lambdas”) to Mocha is discouraged" - https://mochajs.org/#arrow-functions
/* eslint prefer-arrow-callback: 0, func-names: 0, 'react/jsx-boolean-value': ['error', 'always'] */
/* global describe, it, before, expect */

import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { ClassroomsManagerContainer } from './ClassroomsManagerContainer';

describe('<ClassroomsManagerContainer />', function() {
  let wrapper;
  const copyJoinLinkSpy = sinon.spy(ClassroomsManagerContainer.prototype, 'copyJoinLink');
  const resetToastStateSpy = sinon.spy(ClassroomsManagerContainer.prototype, 'resetToastState');
  before(function() {
    wrapper = shallow(<ClassroomsManagerContainer />);
  });

  it('renders without crashing', function() {});

  it('renders <ClassroomsManager /> component', function() {
    expect(wrapper.find('ClassroomsManager')).to.have.lengthOf(1);
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
