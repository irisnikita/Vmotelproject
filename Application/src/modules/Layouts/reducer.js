import {combineReducers} from 'redux';
import {produce} from 'immer';

import {types} from './actions';

const initialState = {
    userLogin: {},
    path: '',
    isTry: '',
    blocks: [],
    blockSelected: {}
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
        case types.TRY_APPLICATION: 
            return (produce(state, draftState => {
                draftState.isTry = action.payload.isTry;
            })); 
        case types.GET_BLOCKS:
            return (produce(state, draftState => {
                draftState.blocks = action.payload.blocks;
            }));
        case types.SELECT_BLOCK:
            return (produce(state, draftState => {
                draftState.blockSelected = action.payload.blockSelected;
            }));
        default:
            return {...state};
    }
};

export const reducer = combineReducers({
    layoutReducer: layoutReducer
});