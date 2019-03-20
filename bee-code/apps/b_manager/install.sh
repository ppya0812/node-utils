set -e

if [ ! -d ./b_manager ]
then
  git clone git clone git@giturl
fi
cd ./b_manager
npm install
cd ..

# echo -e "\033[32m安装完成\033[39m"
