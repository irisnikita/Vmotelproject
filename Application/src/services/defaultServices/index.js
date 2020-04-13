import {services} from '../services';
import {appConfig} from 'Src/constant';

export function create(params) {
    return services.create({...params,API: appConfig.API + '/room/create'});
}
export function getList(params) {
    return services.getList({...params,API: appConfig.API + '/default-service/get-default-services'});
}
export function del(params) {
    return services.del({...params,API: appConfig.API + '/room/delete'});
}
export function delAll(params) {
    return services.create({...params,API: appConfig.API + '/room/delete-all'});
}
export function update(params) {
    return services.update({...params,API: appConfig.API + '/room/update'});
}