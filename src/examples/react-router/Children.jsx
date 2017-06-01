/* eslint react/prop-types: 0 */
/* eslint react/no-children-prop: 0 */
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

const App = () => (
  <Router>
    <ul>
      <ListItemLink value="11111" to="/somewhere" />
      <ListItemLink value="22222" to="/somewhere-else" />
    </ul>
  </Router>
);

const ListItemLink = ({ to, value, ...rest }) => (
  <Route
    path={to}
    children={({ match }) => (
      <li className={match ? 'active' : ''}>
        <Link to={to} {...rest}>
          {value}
        </Link>
      </li>
    )}
  />
);

export default App;
