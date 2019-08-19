#!/usr/bin/env node

const request = require('request');
var Cookie = require('request-cookies').Cookie;

if (process.argv.length < 3) {
    console.log("请输入要分词的内容");
    return
}


var lexon = {
    "per": "人名",
    "loc": "地名",
    "org": "机构名",
    "time": "时间",
    "n": "普通名词",
    "nr": "人名",
    "nz": "其他名词",
    "a": "形容词",
    "m": "数量词",
    "c": "连词",
    "f": "方位名词",
    "ns": "地名",
    "v": "普通动词",
    "ad": "副形词",
    "q": "量词",
    "u": "助词",
    "s": "处所名词",
    "nt": "机构团体名",
    "vd": "动副词",
    "an": "名形词",
    "r": "代词",
    "xc": "其他虚词",
    "t": "时间名词",
    "nw": "作品名",
    "vn": "名动词",
    "d": "副词",
    "p": "介词",
    "w": "标点符号"
}


function requestNlp() {
    const options = {
        url: "http://ai.baidu.com/tech/nlp/lexical",
        method: "GET"
    };

    function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
            // console.log(response.cookies);
            // console.log(response.headers['set-cookie']);
            let rawcookies = response.headers['set-cookie'];
            let cookieList = "";
            for (let i in rawcookies) {
                let cookie = new Cookie(rawcookies[i]);
                // cookieList.push(cookie);
                cookieList+=(cookie.key+"="+cookie.value+"; ");
            }
            getnlp(cookieList);
        } else {
            console.log("请求失败");
        }
    }

    request.post(options, callback);
}

function getnlp(cookies) {
    // console.log(cookies);
    options = {
        url: "http://ai.baidu.com/aidemo",
        form: {
            "apiType": "nlp",
            "type": "lexer",
            "t1": process.argv[2],
            "refSrc": "http://ai.baidu.com/tech/nlp/lexical",
        },
        method: "POST",
        headers:{
            "cookie": cookies
        }
    };

    function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
            let bodyJson = JSON.parse(body);
            let result = [];
            for(let item in bodyJson.data.items){
                let itemData = bodyJson.data.items[item];
                let adg = itemData.pos;
                if(!adg){
                    adg = itemData.ne;
                }
                adg = adg.toLowerCase();
                if(adg){
                    result.push([itemData.item, lexon[adg]]);
                }
            }
            for(let item in result){
                console.log(result[item].join(','));
            }
        } else {
            console.log("请求失败");
        }
    }

    request.post(options, callback);
}

requestNlp();
