import {combineReducers} from 'redux';
import {produce} from 'immer';

import {types} from './actions';

const initialState = {
    userLogin: {},
    path: ''
};

const layoutReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.USER_LOGIN:
            return (produce(state, draftState => {
                draftState.userLogin = action.payload.userLogin;
            }));
        case types.CHANGE_PATH: 
            return (produce(state, draftState => {
                draftState.path = action.payload.path;
            })); 
        default:
            return {...state};
    }
};

export const reducer = combineReducers({
    layoutReducer: layoutReducer
});