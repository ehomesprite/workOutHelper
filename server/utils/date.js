/**
 * created by zhangzihao on {2021/7/26}
 */
module.exports.formatTime = (timeStamp, _fmt = 'yyyy-MM-dd') => {
    let fmt = _fmt;

    if (!timeStamp) {
        return '';
    }

    let t;
    if (typeof (timeStamp) !== 'object') {
        let convertTimeStamp = parseInt(timeStamp, 10);
        if (convertTimeStamp.toString().length === 10) {
            convertTimeStamp *= 1000;
        }
        // !fmt && (fmt = 'yyyy-MM-dd');

        t = new Date(convertTimeStamp);
    } else {
        t = timeStamp;
    }

    const o = {
        'M+': t.getMonth() + 1, // 月份
        'd+': t.getDate(), // 日
        'h+': t.getHours(), // 小时
        'm+': t.getMinutes(), // 分
        's+': t.getSeconds(), // 秒
        'q+': Math.floor((t.getMonth() + 3) / 3), // 季度
        S: t.getMilliseconds(), // 毫秒
        w: '日一二三四五六'[t.getDay()], // 周
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (String(t.getFullYear())).substr(4 - RegExp.$1.length));
    }
    Object.keys(o).forEach((k) => {
        if (new RegExp(`(${k})`).test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : ((`00${String(o[k])}`).substr((String(o[k])).length)));
        }
    });
    return fmt;
};