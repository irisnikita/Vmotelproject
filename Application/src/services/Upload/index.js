import {services} from '../services';
import {appConfig} from 'Src/constant';

export function uploadAvatar(params) {
    return services.upload({...params, API: appConfig.API + '/upload/userAvatar'});
}
export function getList(params) {
    return services.getList({...params, API: appConfig.API + '/upload/get-uploads'});
}
export function del(params) {
    return services.del({...params, API: appConfig.API + '/upload/delete'});
}
export function delAll(params) {
    return services.create({...params, API: appConfig.API + '/upload/delete-all'});
}
export function delAllImage(params) {
    return services.create({...params, API: appConfig.API + '/upload/delete-images'});
}
export function update(params) {
    return services.update({...params, API: appConfig.API + '/upload/update'});
}
export function uploadImage(params) {
    return services.create({...params, API: appConfig.API + '/upload/uploadImage'});
}
export function getImages(params) {
    return services.getList({...params, API: appConfig.API + '/upload/get-images'});
}
// export function getUsers(params) {
//     return services.getList({...params,API: appConfig.API + '/user/get-user'});
// }
// export function getUser(params) {
//     return services.get({...params,API: appConfig.API + '/user/get-user'});
// }