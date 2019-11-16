# emailBot
基于node实现的每天定时发送邮件



1.npm install
2.打开配置文件config/config.js,修改相应的配置
        module.exports = {
            MEMORIAL_DAY: '2016-09-17',  //与女朋友的纪念日
            TXAPIKEY: '', //此处须填写个人申请的天行apikey,请替换成自己的 申请地址https://www.tianapi.com/signup.html?source=474284281

            //邮箱配置(qq邮箱)
            emailUser: "****@qq.com", // 账号   你自定义的域名邮箱账号
            emailPass: "****",    // 密码   你自己开启SMPT获取的密码
            toEmailList: ['***@qq.com','****@qq.com'],    // 收件列表，可同时发送给多个人
            emailSubject: '来自馒头耙耙的每日关心',   //邮件标题
        }
 3运行node ./index.js
