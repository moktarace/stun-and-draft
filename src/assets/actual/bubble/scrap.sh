#!/bin/bash

for n in {04..40}
do
    url=https://worldmaker.app/data/actuals/balloon/${n}.png
    curl -k ${url} -O
done

