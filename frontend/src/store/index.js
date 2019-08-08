import createSagaMiddleware from 'redux-saga';
import { persistStore } from 'redux-persist';

import createStore from './createStore';
import rootReducer from './modules/rootReducer';
import rootSaga from './modules/rootSaga';
import presistReducers from './persistReducers';

const sagaMonitor =
  process.env.NODE_ENV === 'development'
    ? console.tron.createSagaMonitor()
    : null;

const sagaMiddleware = createSagaMiddleware(sagaMonitor);

const middlewares = [sagaMiddleware];

const store = createStore(presistReducers(rootReducer), middlewares);

const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export { store, persistor };
