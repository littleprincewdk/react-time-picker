import React from 'react';
import { markdown } from 'markdown';

import Style from './Markdown-github.less';

import MD from 'MD';
import { componentList } from 'Root/config';

export default props => {
  const { component = componentList[0].url } = props.params;
  const html = markdown.toHTML(MD[component]);
  return (
    <article className={Style.markdown} dangerouslySetInnerHTML={{ __html: html }} />
  );
};
