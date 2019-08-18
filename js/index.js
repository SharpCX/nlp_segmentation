#!/usr/bin/env node

const request = require('request');

if(process.argv.length<3){
    console.log("请输入要分词的内容");
    return
}

const options = {
    headers: {'content-type' : 'application/x-www-form-urlencoded'},
    url: "http://www.sogou.com/labs/webservice/sogou_word_seg.php",
    form:{
        q: process.argv[2],
        fmt: "js"
    },
    method:"POST"
};

function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
        const info = JSON.parse(body);
        if(info && info.result){
            for (item in info.result){
                console.log(info.result[item].join(','));
            }
        } else {
            console.log("分词失败");
        }
    } else {
        console.log("请求失败");
    }
}

request.post(options, callback);