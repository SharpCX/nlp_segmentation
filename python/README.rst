分词工具
--------

python版(有node版)
------------------

安装
~~~~

``pip install nlp_segmentation``

command-line
~~~~~~~~~~~~

搜狗分词
^^^^^^^^

.. code:: bash

   $ sougou_fenci 武汉市长江大桥
   武汉市 n
   长江 n
   大桥 n

百度分词
^^^^^^^^

.. code:: bash

   $ baidu_fenci 武汉市长江大桥
   武汉        地名
   长江大桥        地名

sougou 分词 code
~~~~~~~~~~~~~~~~

.. code:: python

   import nlp_segmentation
   resp = nlp_segmentation.sougou("武汉市长江大桥")
   for result_item in resp.result:
       print(row_format.format(result_item[0], result_item[1]))

   # 结 果
   # 武汉市         n
   # 长江         n
   # 大桥         n

baidu 分词 code
~~~~~~~~~~~~~~~

.. code:: python

   import nlp_segmentation
   resp = nlp_segmentation.baidu("武汉市长江大桥")
   for result_item in resp.result:
       print(row_format.format(result_item[0], result_item[1]))

   # 结 果
   # 武汉市         地名
   # 长江大桥         地名
