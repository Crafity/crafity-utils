#!/bin/sh
#Build Script!
export currentTime=`date "+%Y%m%d%H%M%S"`
echo $currentTime

rm -Rf output/js output/img
cp -Ra src/js src/img output

sed -e "s/v\=999/v\=$currentTime/g" src/index.jade | jade $1 > output/index.html

rm -rf ./output/styles
mkdir ./output/styles
stylus ./src/styles/style.styl -o ./output/styles -c
