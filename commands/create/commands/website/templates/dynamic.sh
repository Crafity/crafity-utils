#!/bin/sh

#========================================================
#Check the parameters
#========================================================
export help="Usage: dynamic.sh <projectName> <targetDir>"
if [ "$1" == "" ] || [ "$2" == "" ]; then
	echo $help
	exit 99
fi
export projectname=$1
export targetdir=$2
#echo Project: $projectname TargetDir: $targetdir

#========================================================
#Create the target dir
#========================================================
if [ -d $targetdir ]; then
	echo "Directory '$targetdir' already exists!" > /dev/stderr
	exit 98
else
	mkdir $targetdir
fi

#========================================================
#Create the empty dirs
#========================================================
#mkdir $targetdir/output
#mkdir $targetdir/src/img

#========================================================
#Copy all the files
#========================================================
cd dynamic
cp -Ra * $targetdir
cd ..

#========================================================
#Replace the placeholders
#========================================================
sed 's/$projectname/'$projectname'/' $targetdir/views/layout.jade > $targetdir/views/_layout.jade
mv $targetdir/views/_layout.jade $targetdir/views/layout.jade

sed 's/$projectname/'$projectname'/' $targetdir/views/home/index.jade > $targetdir/views/home/_index.jade
mv $targetdir/views/home/_index.jade $targetdir/views/home/index.jade

sed 's/$projectname/'$projectname'/' $targetdir/package.json > $targetdir/_package.json
mv $targetdir/_package.json $targetdir/package.json

#========================================================
#Trigger first build
#========================================================
