#!/bin/sh
#Build Script!
export currentTime=`date "+%Y%m%d%H%M%S"`
#echo $currentTime

echo - CLEANING OUTPUT FOLDER 
rm -Rf output/js output/img output/styles

echo - COPY JAVASCRIPT AND IMAGES 
cp -Ra src/js src/img src/favicon.ico output

echo - COMPILING JADE TO HTML AND UPDATE THE QUERYSTRING VERSIONS 
sed -e "s/v\=999/v\=$currentTime/g" src/index.jade | jade $1 > output/index.html

echo - COPYING CSS FILES TO STYLES 
mkdir output/styles
cp src/styles/*.css output/styles/

echo - COPY STYLES TO TEMP FOLDER 
rm -rf temp
mkdir temp
mkdir temp/styles
cp -Ra src/styles/* temp/styles

echo - GENERATE SPRITE MAP
mkdir temp/img
crafity glue -s=src/img/sprite -o=output/img -c=temp/styles -r=img
cp -Ra temp/img output/img

echo - COMPILING STYLUS TO CSS 
stylus temp/styles/style.styl -o output/styles -c

echo - COPYING FONTS 
cp -Ra src/fonts output

echo - COMPRESSING AND CONCATENATING JAVASCRIPT 
#find src/js/* | grep "\.js" | awk '{ print "cat " $1 }' | sh > output/js/_website.js
mkdir temp/js
cat src/js/lib/jquery-1.8.3.min.js src/js/lib/es5-shim.js src/js/bootstrap.js src/js/main.js > temp/js/_website.js
uglifyjs temp/js/_website.js > output/js/website.min.js

echo - CLEAN UP
rm -rf temp
