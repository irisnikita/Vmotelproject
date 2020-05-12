import {services} from '../services';
import {appConfig} from 'Src/constant';

export function create(params) {
    return services.create({...params, API: appConfig.API + '/contract/create'});
}
export function createUserRoom(params) {
    return services.create({...params, API: appConfig.API + '/contract/create-user-room'});
}
export function getList(params) {
    return services.getList({...params, API: appConfig.API + '/contract/get-contracts'});
}
export function del(params) {
    return services.del({...params, API: appConfig.API + '/contract/delete'});
}
export function delAll(params) {
    return services.create({...params, API: appConfig.API + '/contract/delete-all'});
}
export function delAllImage(params) {
    return services.create({...params, API: appConfig.API + '/contract/delete-images'});
}
export function update(params) {
    return services.update({...params, API: appConfig.API + '/contract/update'});
}
export function uploadImage(params) {
    return services.create({...params, API: appConfig.API + '/contract/uploadImage'});
}
export function getImages(params) {
    return services.getList({...params, API: appConfig.API + '/contract/get-images'});
}
// export function getUsers(params) {
//     return services.getList({...params,API: appConfig.API + '/user/get-user'});
// }
// export function getUser(params) {
//     return services.get({...params,API: appConfig.API + '/user/get-user'});
// }