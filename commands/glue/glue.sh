#!/bin/sh
export srcPath=$1
export cssPath=$2
export relPath=$3
export outputPath=$4
export gluePath='/usr/local/bin/glue'

if [ -s $gluePath ]; then
	echo - CREATING A SPRITE MAP 
	glue $srcPath --css=$cssPath --img=$relPath --namespace=image --cachebuster
	mv $cssPath/sprite.css $cssPath/sprite.styl
	mv $relPath/sprite.png $outputPath/sprite.png
else
	echo ============================================
	echo Please install glue to create a sprite map 
	echo \ \ Install: brew install glue
	echo ============================================
fi
