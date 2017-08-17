import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import { CreateJumpstateMiddleware } from 'jumpstate';
import rootReducer from '../ducks/reducer';

const createStoreWithMiddleware = applyMiddleware(
  CreateJumpstateMiddleware(),
  
  //TEMP: re-enabled for debugging only!
  //@shaunanoordin, don't forget about thiiisss
  createLogger(),
  
)(createStore);

export default function configureStore(initialState) {
  /* eslint-disable no-underscore-dangle */
  const store = createStoreWithMiddleware(rootReducer, initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  );
  /* eslint-enable */

  // if (module.hot) {
  //   // Enable Webpack hot module replacement for reducers
  //   module.hot.accept('../ducks/reducer', () => {
  //     // don't bother loading this module if we're not in hot mode
  //     const nextRootReducer = require('../ducks/reducer'); // eslint-disable-line global-require

  //     store.replaceReducer(nextRootReducer);
  //   });
  // }

  return store;
}
