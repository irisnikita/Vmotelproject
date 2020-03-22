export const types = {
    USER_LOGIN: 'USER_LOGIN',
    GET_POKEMON: 'GET_POKEMON',
    CHANGE_PATH: 'CHANGE_PATH',
    LAYOUT: 'LAYOUT'
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
