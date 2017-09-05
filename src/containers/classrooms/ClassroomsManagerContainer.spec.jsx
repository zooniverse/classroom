// "Passing arrow functions (“lambdas”) to Mocha is discouraged" - https://mochajs.org/#arrow-functions
/* eslint prefer-arrow-callback: 0, func-names: 0, 'react/jsx-boolean-value': ['error', 'always'] */
/* global describe, it, before, expect */

import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { ClassroomsManagerContainer } from './ClassroomsManagerContainer';

// TODO how to test jumpstate actions?
describe('<ClassroomsManagerContainer />', function() {
  let wrapper;
  before(function() {
    wrapper = shallow(<ClassroomsManagerContainer />);
  });

  it('renders without crashing', function() {});

  it('renders <ClassroomsManager /> component', function() {
    expect(wrapper.find('ClassroomsManager')).to.have.lengthOf(1);
  });
});
