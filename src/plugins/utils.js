export default class Utils {

    static app;

    buildRoute(p) {
        let q = {
            ...this.$route.query,
            p,
        };

        return '?' + this.serializeQuery(q);
    }

    static serializeQuery(q){
        let str = [];
        for(let p in q)
            if(q[p] !== null)
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(q[p]));

        return str.join("&");
    }

    static fmtDateTime(date){
        if(!(date instanceof Date))
            date = new Date(date);

        let curDate = new Date();

        let sTime = `${date.getHours()}:${(date.getMinutes() < 10 ? '0' : '') + date.getMinutes()}`;

        let delta = new Date(Math.abs(curDate - date));
        if(delta <= new Date('1d'))
            sTime = 'Сегодня в ' + sTime;
        else sTime += ' ' + this.fmtDate(date);

        return sTime;
    }

    static fmtDate(date){
        if(!(date instanceof Date))
            date = new Date(date);

        const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

        let curDate = new Date();
        let sDate = '';

        const oneYear = new Date('Thu Jan 01 1971 03:00:00 GMT+0300');

        let delta = new Date(Math.abs(curDate - date));
        sDate += `${date.getDate()} ${months[date.getMonth()]}`;
        if(delta > oneYear)
            sDate += ` ${date.getFullYear()} года`;

        return sDate;
    }

    static VueInstaller = {
        install(app) {
            Utils.app = app;

            app.utils = Utils;
            window.utils = Utils;
            app.config.globalProperties.utils = Utils;
            app.config.globalProperties.$utils = Utils;
        }
    }
}