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
echo - UPDATE THE QUERYSTRING VERSION 

crafity glue -s=src/img/sprite -o=output/img -c=src/styles -r=src/img

echo - COMPILING STYLUS TO CSS 
mkdir output/styles
stylus ./src/styles/style.styl -o ./output/styles -c

echo - COMPRESSING AND CONCATENATING JAVASCRIPT 
#find src/js/* | grep "\.js" | awk '{ print "cat " $1 }' | sh > src/js/_website.js
cat src/js/lib/jquery-1.8.3.min.js src/js/lib/es5-shim.js src/js/main.js > src/js/_website.js
uglifyjs -nc src/js/_website.js > output/js/website.min.js
rm src/js/_website.js

