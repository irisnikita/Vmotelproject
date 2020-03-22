import {services} from '../services';
import {appConfig} from 'Src/constant';

export function getList(params) {
    return services.getList({...params,API: appConfig.API_MONGO + '/room'});
}