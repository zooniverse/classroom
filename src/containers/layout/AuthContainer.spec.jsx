// "Passing arrow functions (“lambdas”) to Mocha is discouraged" - https://mochajs.org/#arrow-functions
/* eslint prefer-arrow-callback: 0, func-names: 0, 'react/jsx-boolean-value': ['error', 'always'] */
/* global describe, it, before, beforeEach, afterEach, expect, localStorage */

import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import ConnectedAuthContainer, { AuthContainer } from './AuthContainer';

const user = {
  id: '463'
};

describe('<AuthContainer />', function() {
  let wrapper;
  before(function() {
    wrapper = shallow(<AuthContainer user={user} initialised={true} />, { options: { disableLifecycleMethods: true } });
  });

  it('without crashing', function() {});
});
