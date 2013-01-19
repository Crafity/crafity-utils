#!/bin/sh

#========================================================
#Check the parameters
#========================================================
export help="Usage: proxy.sh <projectName> <targetDir>"
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
cd template
cp -Ra * $targetdir
cd ..

#========================================================
#Replace the placeholders
#========================================================
#sed 's/$projectname/'$projectname'/' $targetdir/config.json > $targetdir/_config.json
#mv $targetdir/_config.json $targetdir/config.json


#========================================================
#Trigger first build
#========================================================
