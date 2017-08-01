// "Passing arrow functions (“lambdas”) to Mocha is discouraged" - https://mochajs.org/#arrow-functions
/* eslint prefer-arrow-callback: 0, func-names: 0, 'react/jsx-boolean-value': ['error', 'always'] */
/* global describe, it, before, beforeEach, afterEach, expect, localStorage */

import React from 'react';
import { shallow, mount } from 'enzyme';
import sinonTestFactory from 'sinon-test';
import sinon from 'sinon';
import ConnectedAdminContainer, { AdminContainer } from './AdminContainer';

const sinonTest = sinonTestFactory(sinon);

const user = {
  id: '34',
  admin: true
};

describe.only('<AdminContainer />', function() {
  describe('renders', function() {
    let wrapper;
    before(function() {
      wrapper = shallow(<AdminContainer />);
    });

    it('without crashing', function() {});

    it('null if there is no user', function() {
      expect(wrapper.type()).to.be.null();
    });

    it('<AdminCheckbox /> if there is a user', function() {
      wrapper.setProps({ user, initialised: true });
      expect(wrapper.find('AdminCheckbox')).to.have.lengthOf(1);
    });
  });

  describe('lifecycle', function() {
    describe('componentDidMount', function() {
      let setAdminStateStub;
      before(function() {
        setAdminStateStub = sinon.stub(AdminContainer.prototype, 'setAdminState').callsFake(() => {});
      });

      it('does not call #setAdminState if localStorage does not contain { adminFlag: true }', function() {
        mount(<AdminContainer user={user} initialised={true} />);
        expect(setAdminStateStub.called).to.be.false();
      });

      it('calls #setAdminState if localstorage contains { adminFlag: true }', function() {
        localStorage.setItem('adminFlag', true);
        mount(<AdminContainer user={user} initialised={true} />);
        expect(setAdminStateStub.called).to.be.true();
        expect(setAdminStateStub.calledWith(true)).to.be.true();
      });
    });
  });
});
