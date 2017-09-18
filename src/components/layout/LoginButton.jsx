import React from 'react';
import PropTypes from 'prop-types';
import Button from 'grommet/components/Button';

const LoginButton = ({ className, label, login, plain, toggleForm }) => {
  return (
    <Button type="button" className={className} onClick={login || toggleForm} label={label} plain={plain} />
  );
};

LoginButton.defaultProps = {
  className: 'site-header__button--as-link',
  label: 'Sign in',
  login: null,
  plain: true,
  toggleForm: null
};

LoginButton.propTypes = {
  className: PropTypes.string,
  label: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  login: PropTypes.func,
  plain: PropTypes.bool,
  toggleForm: PropTypes.func
};

export default LoginButton;
