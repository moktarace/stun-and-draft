#!/bin/bash
#https://worldmaker.app/data/actuals/characters/079/001_01_001.png

for pose in {001..095}
do
    mkdir $pose
    cd $pose
    url=https://worldmaker.app/data/actuals/characters/${pose}/[001-058]_[01-07]_[001-015].png
    curl -Z -k ${url} -O 
    cd ../
done

