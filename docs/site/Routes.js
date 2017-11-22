import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from 'Site/App';
import Home from 'Page/Home';
import Doc from 'Page/Doc';
import Example from 'Page/Example';
import Markdown from 'Component/Markdown';

import Components, {
  Toast,
  ActionSheet,
  Alert
} from 'Example';

import { componentList } from 'Root/config';

const exampleSubNavRoute = componentList.map(item =>
  <Route key={`/example/${item.url}`} path={`/example/${item.url}`} component={Components[item.component]} />
);

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="/doc" component={Doc}>
      <IndexRoute component={Markdown} />
      <Route path="/doc/:component" component={Markdown} />
    </Route>
    <Route path="/example" component={Example}>
      <IndexRoute component={Toast} />
      {exampleSubNavRoute}
    </Route>
  </Route>
);
