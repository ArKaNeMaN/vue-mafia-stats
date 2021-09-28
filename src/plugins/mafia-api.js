import axios from 'axios';

export default class MafiaApi {
    static ROOT_URL = "https://api.mafia.arkan1.ru/v1/";
    static DEFAULT_TIMEOUT = 10 * 1000;
    static API_TOKEN = null;
    static USER = null;

    static request(method, path, data, options = {}){
        return new Promise((resolve, reject) => {
            axios.request({
                url: path,
                baseURL: this.ROOT_URL,
                method,
                data,
                headers: {
                    Authorization: (this.API_TOKEN !== null) ? `Bearer ${this.API_TOKEN}` : null,
                },
                timeout: this.DEFAULT_TIMEOUT,
                responseType: 'json',
                ...options,
            }).then((response) => {
                let data = response.data;
                let status = response.status;

                if(status !== 200){
                    return reject({
                        methodError: false,
                        error: {
                            code: status,
                            message: data.error.message,
                        }
                    });
                }

                return resolve(data);
            })
            .catch((reason) => {
                console.log(reason);
                return reject({
                    methodError: false,
                    error: {
                        code: 500,
                        message: data.error.message,
                        reason,
                    },
                });
            });
        });
    }

    static get(path, data, options = {}){
        return this.request('get', path, {}, {
            params: data,
            ...options,
        });
    }

    static post(path, data, options = {}){
        return this.request('post', path, data, options);
    }

    static put(path, data, options = {}){
        return this.request('put', path, data, options);
    }

    static delete(path, data, options = {}){
        return this.request('delete', path, data, options);
    }

    static makePaginationParams({page = null, perPage = null} = {}){
        return {
            ...(page != null ? {p: page} : {}),
            ...(perPage != null ? {pp: perPage} : {}),
        };
    }

    static setApiToken(token){
        this.API_TOKEN = token;
    }

    static resetApiToken(){
        this.setApiToken(null);
    }

    static auth(token){
        this.setApiToken(token);

        return new Promise((resolve, reject) => {
            this.Users.get().then((user) => {
                this.USER = user;
                resolve(this.USER);
            }).catch(reject);
        });
    }

    static testAuth(){
        return new Promise((resolve, reject) => {
            this.get('test').then((token) => {
                this.auth(token)
                    .then(resolve)
                    .catch(reject);
            }).catch(reject);
        });
    }

    static Users = class Users {
        static get(options = {}){
            return MafiaApi.get('user', {}, options);
        }
    }

    static Players = class Players {
        static list(
            data = {page: null, perPage: null},
            options = {}
        ){
            return MafiaApi.get(
                'players',
                MafiaApi.makePaginationParams(data),
                options
            );
        }

        static search(
            search = {s: null, name: null, nickname: null},
            data = {page: null, perPage: null},
            options = {}
        ){
            return MafiaApi.get(
                'players/search',
                {
                    ...search,
                    ...MafiaApi.makePaginationParams(data)
                },
                options
            );
        }

        static get(
            player_id,
            options = {}
        ){
            return MafiaApi.get(
                'player/' + player_id,
                {},
                options
            );
        }
    }

    static VueInstaller = {
        install(app) {
            app.config.globalProperties.mafiaApi = MafiaApi;
            app.config.globalProperties.$mafiaApi = MafiaApi;
        }
    }

}