import {services} from '../services';
import {appConfig} from 'Src/constant';

export function create(params) {
    return services.create({...params, API: appConfig.API + '/customer/create'});
}
export function getList(params) {
    return services.getList({...params, API: appConfig.API + '/customer/get-customers'});
}
export function del(params) {
    return services.del({...params, API: appConfig.API + '/customer/delete'});
}
export function delAll(params) {
    return services.create({...params, API: appConfig.API + '/customer/delete-all'});
}
export function update(params) {
    return services.update({...params, API: appConfig.API + '/customer/update'});
}
// export function getUsers(params) {
//     return services.getList({...params,API: appConfig.API + '/user/get-user'});
// }
// export function getUser(params) {
//     return services.get({...params,API: appConfig.API + '/user/get-user'});
// }