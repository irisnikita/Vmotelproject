import axios from 'axios';

export const services =  {
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
        if(typeof(params.API) !== undefined) {
            const API = params.API;

            delete params.API;

            return axios({
                url: API,
                method: 'post',
                data: {
                    ...params
                }
            })
        }
    }
};