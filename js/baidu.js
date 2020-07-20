#!/usr/bin/env node

const request = require('request');
var Cookie = require('request-cookies').Cookie;
const lexon = require('./lexon')

if (process.argv.length < 3) {
    console.log("请输入要分词的内容");
    return
}

function requestNlp() {
    // const options = {
    //     url: "https://ai.baidu.com/tech/nlp/lexical",
    //     method: "GET"
    // };

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
            console.log("请求失败"+body);
        }
    }

    request("https://ai.baidu.com/tech/nlp/lexical", callback);
}

function getnlp(cookies) {
    let options = {
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
