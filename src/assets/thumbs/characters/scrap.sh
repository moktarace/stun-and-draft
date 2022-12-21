#!/bin/bash
#https://worldmaker.app/data/actuals/characters/079/001_01_001.png

mkdir angle
cd angle
url=https://worldmaker.app/data/thumbs/characters/angle/[001-015].png
curl -k ${url} -O
cd ../

mkdir face
cd face
url=https://worldmaker.app/data/thumbs/characters/face/[01-59].png
curl -k ${url} -O
cd ../

mkdir pose
cd pose
url=https://worldmaker.app/data/thumbs/characters/pose/[001-095].png
curl -k ${url} -O
cd ../

mkdir hair
cd hair
url=https://worldmaker.app/data/thumbs/characters/hair/[001-006].png
curl -k ${url} -O
cd ../



