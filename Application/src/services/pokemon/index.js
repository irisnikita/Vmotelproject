import {appConfig} from 'Src/constant';
import {services} from 'Src/services/services';

export function getList() {
    return services.getList({API:appConfig.API_POKEMON});
}