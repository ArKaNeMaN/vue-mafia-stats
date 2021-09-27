import axios from 'axios';

export default class MafiaApi {
    static ROOT_URL = "https://api.mafia.arkan1.ru/v1/";
    static DEFAULT_TIMEOUT = 10 * 1000;

    static request(method, path, data, options = {}){
        return new Promise((resolve, reject) => {
            axios.request({
                url: path,
                baseURL: this.ROOT_URL,
                method,
                data,
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

    static makePaginationParams(page = 1, perPage = 20){
        return {
            p: page ?? 1,
            pp: perPage ?? 20,
        };
    }

    static Players = class Players {
        static list(page = null, perPage = null, options = {}){
            return MafiaApi.get(
                'players',
                MafiaApi.makePaginationParams(page, perPage),
                options
            );
        }

        static search(search = {}, page = null, perPage = null, options = {}){
            return MafiaApi.get(
                'players/search',
                {
                    ...search,
                    ...MafiaApi.makePaginationParams(page, perPage)
                },
                options
            );
        }

        static get(player_id, options = {}){
            return MafiaApi.get(
                'player/' + player_id,
                {},
                options
            );
        }
    }

    static VueInstaller = {
        install(app) {
            app.mafiaApi = MafiaApi;
            window.mafiaApi = MafiaApi;
            app.config.globalProperties.mafiaApi = MafiaApi;
            app.config.globalProperties.$mafiaApi = MafiaApi;
        }
    }

}