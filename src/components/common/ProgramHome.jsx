import React from 'react';
import classnames from 'classnames';
import Article from 'grommet/components/Article';
import ScrollToTopOnMount from '../../containers/common/ScrollToTopOnMount';

export default function ProgramHome(props) {
  const programHomeClassnames = classnames(
    'program-home',
    { [props.className]: props.className }
  );

  return (
    <Article className={programHomeClassnames} colorIndex="accent-3">
      <ScrollToTopOnMount />
      {props.children}
    </Article>
  );
}
