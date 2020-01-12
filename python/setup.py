# -*- coding: utf-8 -*-
# pandoc --from=markdown --to=rst --output=README.rst README.md
# python setup.py sdist bdist_wheel upload -r pypi
import os

try:
    # for pip >= 10
    from pip._internal.req import parse_requirements
except ImportError:
    # for pip <= 9.0.3
    from pip.req import parse_requirements

import setuptools

dir_path = os.path.dirname(os.path.realpath(__file__))


def load_requirements(fname):
    reqs = parse_requirements(fname, session="test")
    return [str(ir.req) for ir in reqs]


with open("./README.rst", "r") as fh:
    long_description = fh.read()

setuptools.setup(
    name="nlp_segmentation",
    version="1.2.7",
    author="cx",
    author_email="sharpcx@live.com",
    description="分词工具",
    # long_description_content_type='text/markdown',
    long_description=long_description,
    url="https://github.com/SharpCX/nlp_segmentation.git",
    packages=["bin", "nlp_segmentation"],
    classifiers=[
        "Programming Language :: Python :: 3",
        "License :: OSI Approved :: MIT License",
        "Operating System :: OS Independent",
    ],
    scripts=['bin/sougou_fenci', 'bin/baidu_fenci'],
    install_requires=load_requirements(os.path.join(dir_path, 'requirements.txt'))
)
