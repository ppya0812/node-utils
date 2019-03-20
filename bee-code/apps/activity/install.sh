set -e

if [ ! -d ./activity ]
then
  git clone git@giturl
fi
cd ./activity
npm install
cd ..

# echo -e "\033[32m安装完成\033[39m"
