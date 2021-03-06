// Libraries
import {put, takeLatest, call, takeEvery, delay, select} from 'redux-saga/effects';
import {getPokemonSuccess} from 'Layouts/actions';

// Actions 
import {changePath, userLogin, tryApplication, getBlocks} from './actions';

// Services
import * as pokemonServices from 'Src/services/pokemon';

// Utils
import {types} from './actions';

export function* layout({payload}) {
    const {type, value} = payload;

    if (!type || !value) {
        return;
    }

    switch (type) {
        case 'path':
            yield put(changePath({
                path: value
            }));
            break;
        case 'login':
            yield put(userLogin({
                userLogin: value
            }));
            break;
        case 'validate':
            yield put(userLogin({
                userLogin: value
            }));
            break;
        case 'logout':
            yield put(userLogin({
                userLogin: {}
            }));
            break;
        case 'tryApplication': 
            yield put(tryApplication({
                isTry: value
            }));
            break;
        case 'getBlocks': 
            yield put(getBlocks({
                blocks: value
            }));
            break;
        default:
            break;
    }
}

export function* layoutMiddleware() {
    yield takeEvery(types.LAYOUT, layout);
}