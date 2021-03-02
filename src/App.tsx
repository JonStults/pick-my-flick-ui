import React from 'react';
import { Route, Router } from 'react-router-dom';
import Movies from './pages/movies/Movies';

interface AppProps {
  history: any;
}

const App: React.FunctionComponent<AppProps> = ({ history }) => {
  return (
    <div>
      <Router history={history}>
        <Route exact path="/" component={Movies} />
      </Router>
    </div>
  )
}

export default App;
