export const types = {
    USER_LOGIN: 'USER_LOGIN',
    GET_POKEMON: 'GET_POKEMON',
    CHANGE_PATH: 'CHANGE_PATH',
    LAYOUT: 'LAYOUT',
    TRY_APPLICATION: 'TRY_APPLICATION',
    GET_BLOCKS: 'GET_BLOCKS',
    SELECT_BLOCK: 'SELECT_BLOCK'
};

export function layout(payload) {
    return {type: types.LAYOUT, payload};
}

export function userLogin(payload) {
    return {type: types.USER_LOGIN, payload};
}

export function changePath(payload) {
    return {type: types.CHANGE_PATH, payload};
}

export function getBlocks(payload) {
    return {type:types.GET_BLOCKS, payload};
}

export function selectBlock(payload) {
    return {type: types.SELECT_BLOCK, payload};
}

export function tryApplication(payload) {
    return {type: types.TRY_APPLICATION, payload};
}