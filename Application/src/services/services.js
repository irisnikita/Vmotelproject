import axios from 'axios';

export const services =  {
    get: function get(params) {
        if (typeof params.API !== 'undefined' && typeof params.id !== 'undefined') {
            const API = params.API;

            delete params.API;

            return axios.get(API + '/' + params.id, {
                params: params
            });
        } else {
            return false;
        }
    },
    getList: function getList(params) {
        if (typeof(params.API) !== undefined) {
            const API = params.API;

            delete params.API;

            return axios.get(API, {
                params: params
            });
        } else {return false}
    },
    create: function create(params) {
        if (typeof(params.API) !== undefined) {
            const API = params.API;

            delete params.API;

            return axios({
                url: API,
                method: 'post',
                data: {
                    ...params
                }
            });
        } else {
            return false;
        }
    }
};