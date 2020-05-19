import {services} from '../services';
import {appConfig} from 'Src/constant';

export function create(params) {
    return services.create({...params, API: appConfig.API + '/room/create'});
}
export function get(params) {
    return services.get({...params, API: appConfig.API + '/room/get-rooms'});
}
export function getList(params) {
    return services.getList({...params, API: appConfig.API + '/room/get-rooms'});
}
export function getUserRent(params) {
    return services.getList({...params, API: appConfig.API + '/room/get-user-rent'});
}
export function del(params) {
    return services.del({...params, API: appConfig.API + '/room/delete'});
}
export function delAll(params) {
    return services.create({...params, API: appConfig.API + '/room/delete-all'});
}
export function delAllImage(params) {
    return services.create({...params, API: appConfig.API + '/room/delete-images'});
}
export function update(params) {
    return services.update({...params, API: appConfig.API + '/room/update'});
}
export function uploadImage(params) {
    return services.create({...params, API: appConfig.API + '/room/uploadImage'});
}
export function getImages(params) {
    return services.getList({...params, API: appConfig.API + '/room/get-images'});
}
// export function getUsers(params) {
//     return services.getList({...params,API: appConfig.API + '/user/get-user'});
// }
// export function getUser(params) {
//     return services.get({...params,API: appConfig.API + '/user/get-user'});
// }