// Libraries
import {all, fork} from 'redux-saga/effects';

// Middleware
import {layoutMiddleware} from 'Layouts/middleware';

export default function* rootSaga () {
    yield all([
        layoutMiddleware()
    ]);  
}