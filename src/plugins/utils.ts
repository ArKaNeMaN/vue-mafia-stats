import { App as VueApp } from "vue";

export default class Utils {

    static app: VueApp;

    static buildRoute(params: Object) {
        const q = {
            ...this.app.config.globalProperties.$route.query,
            ...params,
        };

        return '?' + this.serializeQuery(q);
    }

    static serializeQuery(q: Record<string, any>){
        const str = [];
        for(const p in q)
            if(q[p] !== null)
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(q[p]));

        return str.join("&");
    }

    static fmtDateTime(_date: Date|any){
        let date: Date;

        if(!(_date instanceof Date))
            date = new Date(_date);
        else date = _date;

        const curDate = new Date();

        let sTime = `${date.getHours()}:${(date.getMinutes() < 10 ? '0' : '') + date.getMinutes()}`;

        const delta = new Date(Math.abs(curDate.getTime() - date.getTime()));
        if(delta <= new Date('1d'))
            sTime = 'Сегодня в ' + sTime;
        else sTime += ' ' + this.fmtDate(date);

        return sTime;
    }

    static fmtDate(_date: Date|any){
        let date: Date;

        if(!(_date instanceof Date))
            date = new Date(_date);
        else date = _date;

        const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

        const curDate: Date = new Date();
        let sDate = '';

        const oneYear = new Date('Thu Jan 01 1971 03:00:00 GMT+0300');

        const delta = new Date(Math.abs(curDate.getTime() - date.getTime()));
        sDate += `${date.getDate()} ${months[date.getMonth()]}`;
        if(delta > oneYear)
            sDate += ` ${date.getFullYear()} года`;

        return sDate;
    }

    static VueInstaller = {
        install(app: VueApp) {
            Utils.app = app;

            app.config.globalProperties.utils = Utils;
            app.config.globalProperties.$utils = Utils;
        }
    }
}