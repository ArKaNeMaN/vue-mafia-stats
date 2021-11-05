import axios, {AxiosRequestConfig, Method} from 'axios';
import { App as VueApp } from "vue";

export type PaginateOptions = {
    page?: number|null,
    perPage?: number|null
};

export type SearchOptions = Object;
export type PlayersSearchOptions = {
    s?: string|null,
    name?: string|null,
    nickname?: string|null,
};

export type PlayersGetGPlayersData = {
    withGames?: boolean|1|0|null
};

export default class MafiaApi {
    static ROOT_URL: string = "https://api.mafia.arkan1.ru/v1/";
    static DEFAULT_TIMEOUT: number = 10 * 1000;
    static API_TOKEN: string|null = null;
    static USER: Object|null = null;

    static request(
        method: Method,
        path: string,
        data: Object = {},
        options: AxiosRequestConfig = {}
    ){
        return new Promise((resolve, reject) => {
            axios.request({
                url: path,
                baseURL: this.ROOT_URL,
                method,
                data,
                headers: {
                    Authorization: (this.API_TOKEN !== null) ? `Bearer ${this.API_TOKEN}` : '',
                },
                timeout: this.DEFAULT_TIMEOUT,
                responseType: 'json',
                ...options,
            }).then((response) => {
                const data = response.data;
                const status = response.status;

                if(status !== 200){
                    return reject({
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
                    error: {
                        code: 500,
                        message: 'Server error',
                        reason,
                    },
                });
            });
        });
    }

    static get(path: string, data = {}, options: AxiosRequestConfig = {}){
        return this.request('get', path, {}, {
            params: data,
            ...options,
        });
    }

    static post(path: string, data = {}, options: AxiosRequestConfig = {}){
        return this.request('post', path, data, options);
    }

    static put(path: string, data = {}, options: AxiosRequestConfig = {}){
        return this.request('put', path, data, options);
    }

    static delete(path: string, data = {}, options: AxiosRequestConfig = {}){
        return this.request('delete', path, data, options);
    }

    static makePaginationParams(
        {
            page = null,
            perPage = null
        }: PaginateOptions = {}
    ){
        return {
            ...(page != null ? {p: page} : {}),
            ...(perPage != null ? {pp: perPage} : {}),
        };
    }

    static paginated(
        path: string,
        paginateOptions: PaginateOptions = {
            page: null,
            perPage: null
        },
        data: Object = {},
        options: AxiosRequestConfig = {}
    ){
        return MafiaApi.get(
            path,
            {
                ...MafiaApi.makePaginationParams(paginateOptions),
                ...data,
            },
            options,
        );
    }

    static search(
        path: string,
        search: SearchOptions = {},
        paginateOptions: PaginateOptions = { page: null, perPage: null },
        data = {},
        options: AxiosRequestConfig = {}
    ) {
        return MafiaApi.paginated(
            path,
            paginateOptions,
            {
                ...data,
                ...search,
            },
            options,
        );
    }

    static setApiToken(token: string|null){
        this.API_TOKEN = token;
    }

    static resetApiToken(){
        this.setApiToken(null);
    }

    static auth(token: string){
        this.setApiToken(token);

        return new Promise((resolve, reject) => {
            this.Users.get().then((user) => {
                this.USER = Object(user);
                resolve(this.USER);
            }).catch(reject);
        });
    }

    static testAuth(){
        return new Promise((resolve, reject) => {
            this.get('test').then((token) => {
                this.auth(String(token))
                    .then(resolve)
                    .catch(reject);
            }).catch(reject);
        });
    }

    static Users = class Users {
        static get(options: AxiosRequestConfig = {}){
            return MafiaApi.get('user', {}, options);
        }
    }

    static Players = class Players {

        static list(
            paginateOptions: PaginateOptions = {},
            data: Object = {},
            options: AxiosRequestConfig = {},
        ){
            return MafiaApi.paginated(
                'players',
                paginateOptions,
                data,
                options,
            );
        }

        static search(
            search: PlayersSearchOptions = {},
            paginateOptions: PaginateOptions = {},
            data: Object = {},
            options: AxiosRequestConfig = {}
        ){
            return MafiaApi.search(
                'players/search',
                search,
                paginateOptions,
                data,
                options,
            );
        }

        static get(
            player_id: number,
            options: AxiosRequestConfig = {}
        ){
            return MafiaApi.get(
                'players/' + player_id,
                {},
                options
            );
        }

        static getGames(
            player_id: number,
            options: AxiosRequestConfig = {},
        ){
            return MafiaApi.get(`players/${player_id}/games`, {}, options);
        }

        static getGPLayers(
            player_id: number,
            paginateOptions: PaginateOptions = {},
            data: PlayersGetGPlayersData = { withGames: false },
            options: AxiosRequestConfig = {}
        ){
            return MafiaApi.paginated(
                `players/${player_id}/gPlayers`,
                paginateOptions,
                {
                    ...(data.withGames ? {withGames: 1} : {}),
                },
                options,
            );
        }
    }

    static Games = class Games {
        static list(
            paginateOptions: PaginateOptions = {},
            data: Object = {},
            options: AxiosRequestConfig = {},
        ){
            return MafiaApi.paginated(
                'games',
                paginateOptions,
                data,
                options,
            );
        }
    }

    static VueInstaller = {
        install(app: VueApp) {
            app.config.globalProperties.mafiaApi = MafiaApi;
            app.config.globalProperties.$mafiaApi = MafiaApi;
        }
    }

}