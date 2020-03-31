import axios from 'axios';

var CancelToken = axios.CancelToken;

axios.interceptors.request.use(function (config) {
    let userInfo = JSON.parse(localStorage.getItem('userInfo'));

    if (userInfo) {
        const {token = ''} = userInfo;

        config.params = {
            ...config.params,
            token: token
        };
    }
    return config;
});

export const services =  {
    get: function get(params) {
        if (typeof params.API !== 'undefined' && typeof params.id !== 'undefined') {
            const API = params.API;
            const cancelToken = params.cancelToken ? params.cancelToken : new CancelToken(function () {});

            delete params.API;
            delete params.cancelToken;

            return axios.get(API + '/' + params.id, {
                params: params,
                cancelToken: cancelToken
            });
        } else {
            return false;
        }
    },
    getList: function getList(params) {
        if (typeof(params.API) !== undefined) {
            const API = params.API;
            const cancelToken = params.cancelToken ? params.cancelToken : new CancelToken(function () {});

            delete params.API;
            delete params.cancelToken;

            return axios.get(API, {
                params: params,
                cancelToken
            });
        } else {return false}
    },
    create: function create(params) {
        if (typeof(params.API) !== undefined) {
            const API = params.API;
            const cancelToken = params.cancelToken ? params.cancelToken : new CancelToken(function () {});

            delete params.API;
            delete params.cancelToken;

            return axios.post(API, params);

        } else {
            return false;
        }
    }
};