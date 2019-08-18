# -*- coding: utf-8 -*-

import json
import requests


def get_fenci(source: str):
    resp = requests.post("http://www.sogou.com/labs/webservice/sogou_word_seg.php", {
        "q": source,
        "fmt": "js"
    })
    if resp.ok:
        return json.loads(resp.text)
    else:
        raise Exception("请求异常" + resp.status_code + resp.content)


if __name__ == "__main__":
    print(get_fenci("武汉长江大桥"))
