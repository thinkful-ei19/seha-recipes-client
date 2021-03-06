import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import recipeReducer from './reducers';
import { fetchRecipes } from './actions';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import registerServiceWorker from './registerServiceWorker';

import App from './App';

import WebFont from 'webfontloader';

WebFont.load({
  google: {
    families: ['Lato:300,700', 'Josefin+Sans:100i', 'Grand+Hotel', 'sans-serif']
  }
});

const store = createStore(
  combineReducers({
    form: formReducer,
    recipeReducer
  }),
  composeWithDevTools(applyMiddleware(thunk)
  ));
store.dispatch(fetchRecipes());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root')
);
registerServiceWorker();