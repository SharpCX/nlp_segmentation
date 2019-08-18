## 搜狗分词工具
### 安装
`pip install sougou_fenci`

### command-line
$ sougou_fenci 武汉市长江大桥
-> 
武汉市 n
长江 n
大桥 n
![commandline](./screenshot/screen1.png?raw=true "commandline")

### code
``` python
import sougou_fenci
resp = sougoou_fenci.get_fenci("武汉市长江大桥")
for result_item in resp.result:
    print(row_format.format(result_item[0], result_item[1]))

# 结 果
# 武汉市         n
# 长江         n
# 大桥         n
```