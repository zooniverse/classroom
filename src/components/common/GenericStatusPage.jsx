import React from 'react';
import PropTypes from 'prop-types';
import Section from 'grommet/components/Section';
import Paragraph from 'grommet/components/Paragraph';
import Spinning from 'grommet/components/icons/Spinning';
import Status from 'grommet/components/icons/Status';

const GenericStatusPage = (props) => {
  const statusComponent = props.status === 'fetching' ? <Spinning /> : <Status value={props.status} />
  return (
    <Section align="center" colorIndex="light-2" full={true} justify="center" direction="row">
      {statusComponent}{' '}
      {props.message &&
        <Paragraph>{props.message}</Paragraph>}
    </Section>
  );
}

GenericStatusPage.defaultProps = {
  message: '',
  status: 'ok'
};

GenericStatusPage.propTypes = {
  message: PropTypes.string,
  status: PropTypes.string
}

export default GenericStatusPage;
