import React from 'react';
import Article from 'grommet/components/Article';

export default function ProgramHome(props) {
  return (
    <Article className="home" colorIndex="accent-3">
      {props.children}
    </Article>
  );
}
