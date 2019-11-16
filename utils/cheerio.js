const cheerio = require('cheerio');
const superagent = require('../config/superagent');
const ONE = 'http://wufazhuce.com/'; // ONE的web版网站
const TXHOST = 'http://api.tianapi.com/txapi/'; // 天行host
const config = require('../config/config')

async function getOne() {
    // 获取每日一句
    try {
        let res = await superagent.req(ONE, 'GET');
        let $ = cheerio.load(res.text);
        let todayOneList = $('#carousel-one .carousel-inner .item');
        let todayOne = $(todayOneList[0])
            .find('.fp-one-cita')
            .text()
            .replace(/(^\s*)|(\s*$)/g, '');
        return todayOne;
    } catch (err) {
        console.log('错误', err);
        return err;
    }
}

async function getTXweather() {
    // 获取天行天气
    let url = TXHOST + 'tianqi/';
    try {
        let res = await superagent.req(url, 'GET', {
            key: config.TXAPIKEY,
            city: '重庆'
        }); 
        let content = JSON.parse(res.text);
        if (content.code === 200) {
            let todayInfo = content.newslist[0];
            return todayInfo;
        } else {
            console.log('获取接口失败', content.code);
        }
    } catch (err) {
        console.log('获取接口失败', err);
    }
}
async function getTXhealthtip() {
    // 获取健康小提示
    let url = TXHOST + 'healthtip/';
    try {
        let res = await superagent.req(url, 'GET', {
            key: config.TXAPIKEY,
        }); 
        let content = JSON.parse(res.text);
        if (content.code === 200) {
            let healthtip = content.newslist[0].content;
            return healthtip;
        } else {
            console.log('获取接口失败', content.code);
        }
    } catch (err) {
        console.log('获取接口失败', err);
    }
}

module.exports = {
    getOne,
    getTXweather,
    getTXhealthtip
}