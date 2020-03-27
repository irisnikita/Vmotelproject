import {services} from '../../services';
import {appConfig} from 'Src/constant';

export function create(params) {
    return services.create({...params,API: appConfig.API + '/user/login'});
}
export function validate(params) {
    return services.create({...params,API: appConfig.API + '/user/validate'});
}