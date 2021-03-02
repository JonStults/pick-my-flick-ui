import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'semantic-ui-css/semantic.min.css';
import "typeface-russo-one";
import "react-image-gallery/styles/scss/image-gallery.scss";
import './App.scss';
import App from './App';
import store from './main';
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();
require('dotenv').config();

ReactDOM.render(<Provider store={store}>
  <App history={history} />
</Provider>, document.getElementById('root'));
