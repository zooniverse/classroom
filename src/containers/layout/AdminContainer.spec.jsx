// "Passing arrow functions (“lambdas”) to Mocha is discouraged" - https://mochajs.org/#arrow-functions
/* eslint prefer-arrow-callback: 0, func-names: 0, 'react/jsx-boolean-value': ['error', 'always'] */
/* global describe, it, before, beforeEach, afterEach, expect, localStorage */

import React from 'react';
import { shallow, mount } from 'enzyme';
import sinonTestFactory from 'sinon-test';
import sinon from 'sinon';
// import { Actions } from 'jumpstate';
import ConnectedAdminContainer, { AdminContainer, __RewireAPI__ as AdminContainerAPI } from './AdminContainer';

const sinonTest = sinonTestFactory(sinon);

const user = {
  id: '34',
  admin: true
};

describe.only('<AdminContainer />', function() {
  // let wrapper;
  // const setAdminStateSpy = sinon.spy(AdminContainer.prototype, 'setAdminState');

  describe('renders', function() {
    let wrapper;
    before(function() {
      wrapper = shallow(<AdminContainer />);
    });

    it('without crashing', function() {});

    it('null if there is no user', function() {
      // const setAdminStateSpy = this.spy(AdminContainer.prototype, 'setAdminState');
      expect(wrapper.type()).to.be.null();
    });

    it('<AdminCheckbox /> if there is a user', function() {
      wrapper.setProps({ user, initialised: true });
      expect(wrapper.find('AdminCheckbox')).to.have.lengthOf(1);
    });
  });

  describe('lifecycle', function() {
    describe('componentDidMount', function() {
      before(function() {
        AdminContainer.__Rewire__('Actions', {
          auth: {
            setAdminUser: sinon.mock()
          }
        });
      });

      afterEach(function() {
        localStorage.clear();
      });

      it('calls AdminContainer.prototype.setAdminState if localstorage contains { adminFlag: true }', function() {
        sinon.spy(AdminContainer.prototype, 'setAdminState');
        console.log('AdminContainer.prototype', AdminContainer.prototype)
        localStorage.setItem('adminFlag', true);
        const wrapper = mount(<AdminContainer user={user} initialised={true} />);
        expect(AdminContainer.prototype.setAdminState.calledOnce).to.be.true();
        expect(setAdminStateSpy.calledWith(true)).to.be.true();
      });
    });
  });
});
