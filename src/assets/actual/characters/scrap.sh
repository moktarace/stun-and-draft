#!/bin/bash
#https://worldmaker.app/data/actuals/characters/079/001_01_001.png

for pose in {001..095}
do
    mkdir $pose
    cd $pose
    url=https://worldmaker.app/data/actuals/characters/${pose}/[001-059]_[01-06]_[001-015].png
    curl -k ${url} -O
    cd ../
done

