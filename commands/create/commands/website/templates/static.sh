#!/bin/sh

#========================================================
#Check the parameters
#========================================================
export help="Usage: static.sh <projectName> <targetDir>"
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
#Copy all the files
#========================================================
cp -R static/* $targetdir

#========================================================
#Replace the placeholders
#========================================================
sed 's/$projectname/'$projectname'/' $targetdir/src/index.jade > $targetdir/src/_index.jade
mv $targetdir/src/_index.jade $targetdir/src/index.jade

#========================================================
#Trigger first build
#========================================================
cd $targetdir
./build.sh
