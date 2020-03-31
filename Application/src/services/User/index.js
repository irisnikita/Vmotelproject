import {services} from '../services';
import {appConfig} from 'Src/constant';

export function create(params) {
    return services.create({...params,API: appConfig.API + '/user/login'});
}
export function validate(params) {
    return services.create({...params,API: appConfig.API + '/user/validate'});
}
export function getUsers(params) {
    return services.getList({...params,API: appConfig.API + '/user/get-user'});
}
export function getUser(params) {
    return services.get({...params,API: appConfig.API + '/user/get-user'});
}