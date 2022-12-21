#!/bin/bash
#https://worldmaker.app/data/actuals/characters/079/001_01_001.png

# mkdir bubble
# cd bubble
# url=https://worldmaker.app/data/actuals/balloon/[01-40].png
# curl -k ${url} -O
# cd ../

mkdir sound
cd sound
url=https://worldmaker.app/data/actuals/sound/[001-179].png
curl -k ${url} -O
cd ../


mkdir effect
cd effect
url=https://worldmaker.app/data/actuals/effect/[001-042].png
curl -k ${url} -O
cd ../


mkdir sign
cd sign
url=https://worldmaker.app/data/actuals/sign/[001-042].png
curl -k ${url} -O
cd ../


mkdir item
cd item
url=https://worldmaker.app/data/actuals/item/[001-019].png
curl -k ${url} -O
cd ../

mkdir bg
cd bg
url=https://worldmaker.app/data/actuals/bg/[001-063].png
curl -k ${url} -O
cd ../
