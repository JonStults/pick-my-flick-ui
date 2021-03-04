import React from 'react';
import { Route, Router } from 'react-router-dom';
import AuthLoader from './pages/auth/AuthLoader';
import LoginRegister from './pages/auth/LoginRegister';
import Movies from './pages/movies/Movies';

interface AppProps {
  history: any;
}

const App: React.FunctionComponent<AppProps> = ({ history }) => {
  return (
    <div>
      <Router history={history}>
        <AuthLoader />
        <Route exact path="/" component={LoginRegister} />
        <Route exact path="/movies" component={Movies} />
      </Router>
    </div>
  )
}

export default App;
