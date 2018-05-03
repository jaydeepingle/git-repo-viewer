import { createStore, compose, applyMiddleware } from 'redux';
import { browserHistory } from 'react-router';
import { routerMiddleware as createRouterMiddleware } from 'react-router-redux';
import rootReducer, { rootSaga } from '../modules';
import createSagaMiddleware from 'redux-saga';

const sagaMiddleware = createSagaMiddleware();
const routerMiddleware = createRouterMiddleware(browserHistory);

export default function configureStore(initialState = {}) {
  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(routerMiddleware, sagaMiddleware)
    )
  );

  sagaMiddleware.run(rootSaga);

  return store;
}
