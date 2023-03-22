import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { applyMiddleware, legacy_createStore as createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import { logger } from './middleware';
import './index.css';
import rootReducer from './reducers/rootReducer';


const root = ReactDOM.createRoot(document.getElementById('root'));
const composeAlt = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const composedEnhancers = composeAlt(applyMiddleware(thunk, logger));
const store = createStore(rootReducer, composedEnhancers);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
