import { services } from '../services';
import { appConfig } from 'Src/constant';

export function create(params) {
    return services.create({ ...params, API: appConfig.API + '/room/create' });
}
export function getList(params) {
    return services.getList({ ...params, API: appConfig.API + '/room/get-rooms' });
}
export function del(params) {
    return services.del({ ...params, API: appConfig.API + '/room/delete' });
}
export function delAll(params) {
    return services.create({ ...params, API: appConfig.API + '/room/delete-all' });
}
export function update(params) {
    return services.update({ ...params, API: appConfig.API + '/room/update' });
}
// export function getUsers(params) {
//     return services.getList({...params,API: appConfig.API + '/user/get-user'});
// }
// export function getUser(params) {
//     return services.get({...params,API: appConfig.API + '/user/get-user'});
// }