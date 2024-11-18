// import rootReducer from './modules';
// import { composeWithDevTools} from 'redux-devtools-extension';
// import { createStore, applyMiddleware } from 'redux';
// import ReduxThunk from 'redux-thunk';

// const store = createStore(
//     rootReducer,
//     composeWithDevTools(applyMiddleware(ReduxThunk))
// );

// export default store;

import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './modules';

const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
);

export default store;
