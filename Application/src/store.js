import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './middleware';
import {reducer as Layouts} from './modules/Layouts/reducer';

const appReducer = combineReducers({
    Layouts: Layouts
});

let store = null;
const sagaMiddleware = createSagaMiddleware();

const composeEnhancers =  typeof window === 'object' && window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] ?
    window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__']({
        trace: true,
        traceLimit: 25
    }) : compose;

store = createStore(appReducer, composeEnhancers(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(rootSaga);

export default store;
