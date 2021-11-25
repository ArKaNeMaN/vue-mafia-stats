import {App as VueApp} from "vue";

export default class Utils {

    static app: VueApp;

    static buildRoute(params: Object) {
        const q = {
            ...this.app.config.globalProperties.$route.query,
            ...params,
        };

        return '?' + this.serializeQuery(q);
    }

    static serializeQuery(q: Record<string, any>) {
        const str = [];
        for (const p in q)
            if (q[p] !== null)
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(q[p]));

        return str.join("&");
    }

    static fmtDateTime(_date: Date | any) {
        let date: Date;

        if (!(_date instanceof Date))
            date = new Date(_date);
        else date = _date;

        let sTime = date.toLocaleString('ru', {hour: 'numeric', minute: 'numeric'});

        // const delta = Math.abs((new Date()).getTime() - date.getTime());

        // if(delta <= new Date('1d').getTime())
        //     sTime = 'Сегодня в ' + sTime;
        // else sTime += ' ' + this.fmtDate(date);
        sTime += ' ' + this.fmtDate(date);

        return sTime;
    }

    static fmtDate(_date: Date | any) {
        let date: Date;

        if (!(_date instanceof Date))
            date = new Date(_date);
        else date = _date;

        const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

        let sDate = `${date.getDate()} ${months[date.getMonth()]}`;
        if (date.getUTCFullYear() != (new Date()).getUTCFullYear())
            sDate += ` ${date.getFullYear()}г.`;

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