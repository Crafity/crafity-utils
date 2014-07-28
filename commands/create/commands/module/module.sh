#!/bin/sh

#========================================================
#Check the parameters
#========================================================
export help="Usage: module.sh <projectName> <description> <githubname> <targetDir>"
if [ "$1" == "" ] || [ "$2" == "" ] || [ "$3" == "" ]; then
	echo $help
	exit 99
fi
export projectname=$1
export githubname=$2
export targetdir=$3
export description="<Description>"
#echo Project: $projectname TargetDir: $targetdir Description: $description Github: $githubname

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
sed 's/$projectname/'$projectname'/g' $targetdir/package.json > $targetdir/_package.json
sed 's/$description/'$description'/g' $targetdir/_package.json > $targetdir/__package.json
sed 's/$githubname/'$githubname'/g' $targetdir/__package.json > $targetdir/___package.json
rm $targetdir/_package.json
rm $targetdir/__package.json
mv $targetdir/___package.json $targetdir/package.json

sed 's/$projectname/'$projectname'/g' $targetdir/main.js > $targetdir/_main.js
sed 's/$description/'$description'/g' $targetdir/_main.js > $targetdir/__main.js
sed 's/$githubname/'$githubname'/g' $targetdir/__main.js > $targetdir/___main.js
rm $targetdir/_main.js
rm $targetdir/__main.js
mv $targetdir/___main.js $targetdir/main.js

sed 's/$projectname/'$projectname'/g' $targetdir/README.md > $targetdir/_README.md
sed 's/$description/'$description'/g' $targetdir/_README.md > $targetdir/__README.md
sed 's/$githubname/'$githubname'/g' $targetdir/__README.md > $targetdir/___README.md
rm $targetdir/_README.md
rm $targetdir/__README.md
mv $targetdir/___README.md $targetdir/README.md

sed 's/$projectname/'$projectname'/g' $targetdir/test/package.test.js > $targetdir/test/_package.test.js
sed 's/$description/'$description'/g' $targetdir/test/_package.test.js > $targetdir/test/__package.test.js
sed 's/$githubname/'$githubname'/g' $targetdir/test/_package.test.js > $targetdir/test/___package.test.js
rm $targetdir/test/_package.test.js
rm $targetdir/test/__package.test.js
mv $targetdir/test/___package.test.js $targetdir/test/package.test.js


#========================================================
#Trigger first build
#========================================================
cd template
npm install
npm test
git init
