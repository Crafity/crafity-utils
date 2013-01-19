#!/bin/sh
#Build Script!
export currentTime=`date "+%Y%m%d%H%M%S"`
#echo $currentTime

echo - CLEANING OUTPUT FOLDER 
rm -Rf output/js output/img
rm -rf ./output/styles
echo - COPY JAVASCRIPT AND IMAGES 
cp -Ra src/js src/img src/favicon.ico output

echo - COMPILING JADE TO HTML AND UPDATE THE QUERYSTRING VERSIONS 
sed -e "s/v\=999/v\=$currentTime/g" src/index.jade | jade $1 > output/index.html

echo - UPDATE THE QUERYSTRING VERSION 
mkdir ./output/styles

export gluePath='/usr/local/bin/glue'

if [ -s $gluePath ]; then
	echo - CREATING A SPRITE MAP 
	glue src/img --css=src/styles --img=src/img
	mv src/styles/img.css src/styles/images.styl
	mv src/img/img.png output/img/img.png
else
	echo ============================================
	echo Please install glue to create a sprite map 
	echo \ \ Install: brew install glue
	echo ============================================
fi

echo - COMPILING STYLUS TO CSS 
stylus ./src/styles/style.styl -o ./output/styles -c

echo - COMPRESSING AND CONCATENATING JAVASCRIPT 
#find src/js/* | grep "\.js" | awk '{ print "cat " $1 }' | sh > src/js/_website.js
cat src/js/lib/jquery-1.8.3.min.js src/js/lib/es5-shim.js src/js/main.js > src/js/_website.js
uglifyjs -nc src/js/_website.js > output/js/website.min.js
rm src/js/_website.js

