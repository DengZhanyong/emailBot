// 引入email 模块
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
const config = require('../config/config')

// 开启一个 SMTP 连接池
var transport = nodemailer.createTransport(smtpTransport({
    host: "smtp.qq.com", // qq邮箱主机
    secure: true, // 使用 SSL
    secureConnection: true, // 使用 SSL
    port: 465, // SMTP 端口
    auth: {
        user: config.emailUser, // 账号   你自定义的域名邮箱账号
        pass: config.emailPass    // 密码   你自己开启SMPT获取的密码
    }
}));

function sendEmail(htmlcon) {
    // 设置邮件内容  可以拼接html 美化发送内容
    var mailOptions = {
        from: config.emailUser, // 发件地址
        to: config.toEmailList, // 收件列表
        subject: config.emailSubject, // 标题
        text: "text",
        html: htmlcon // html 内容
    }
    transport.sendMail(mailOptions, function (error, response) {
        if (error) {
            console.log("fail: " + error);
            console.log("发送失败");
        } else {
            console.log("发送成功");
        }
        transport.close(); // 如果没用，关闭连接池
    });
}

module.exports = {sendEmail}

