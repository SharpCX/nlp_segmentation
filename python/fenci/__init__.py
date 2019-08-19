# -*- coding: utf-8 -*-

import json
import requests

lexon = {
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


def sougou(source: str):
    resp = requests.post("http://www.sogou.com/labs/webservice/sogou_word_seg.php", {
        "q": source,
        "fmt": "js"
    })
    if resp.ok:
        return json.loads(resp.text)
    else:
        raise Exception("请求异常" + resp.status_code + resp.content)


def baidu(source: str):
    resp = requests.get('http://ai.baidu.com/tech/nlp/lexical')
    resp = requests.post("http://ai.baidu.com/aidemo", {
        "apiType": "nlp",
        "type": "lexer",
        "t1": source,
        "refSrc": "http://ai.baidu.com/tech/nlp/lexical",
    }, cookies=resp.cookies.get_dict())
    if resp.ok:
        json_obj = json.loads(resp.text)
        result = []
        # print(json_obj)
        for item in json_obj.get("data", {}).get("items", []):
            adg = item.get('pos', "")
            if len(adg) == 0:
                adg = item.get('ne', "")
            if len(adg) > 0:
                result.append([item['item'], lexon.get(adg.lower(), '')])
        return {"result":result}
    else:
        raise Exception("请求异常" + resp.status_code + resp.content)


if __name__ == "__main__":
    print(baidu("武汉"))
