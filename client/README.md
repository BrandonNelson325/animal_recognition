# client

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).



## Server

# install dependencies
npm install

#windows
npm install --global windows-build-tools

#linux
npm install --save opencv4nodejs

#through
sudo apt-get update
sudo apt-get upgrade
sudo apt-get install libjpeg-dev libpng-dev libtiff-dev
sudo apt-get install libavcodec-dev libavformat-dev libswscale-dev libv4l-dev
sudo apt-get install libxvidcore-dev libx264-dev
sudo apt-get install libgtk-3-dev
sudo apt-get install libatlas-base-dev gfortran
sudo apt-get install python3-dev

cd ~
wget -O opencv.zip https://github.com/opencv/opencv/archive/3.4.4.zip
wget -O opencv_contrib.zip https://github.com/opencv/opencv_contrib/archive/3.4.4.zip
unzip opencv.zip
unzip opencv_contrib.zip
mv opencv-3.4.4 opencv
mv opencv_contrib-3.4.4 opencv_contrib

wget https://bootstrap.pypa.io/get-pip.py
sudo python3 get-pip.py

sudo pip install virtualenv virtualenvwrapper
sudo rm -rf ~/get-pip.py ~/.cache/pip

add to bash script file.

# virtualenv and virtualenvwrapper
export WORKON_HOME=$HOME/.virtualenvs
export VIRTUALENVWRAPPER_PYTHON=/usr/bin/python3
source /usr/local/bin/virtualenvwrapper.sh

source ~/.bashrc

mkvirtualenv cv -p python3

workon cv
pip install numpy

### final what i ended up doing
sudo aptitude search libgtk2.0-dev
It should return like this:

i  libgtk2.0-dev              - development files for the GTK+ library 
p  libgtk2.0-dev:i386         - development files for the GTK+ library
You need to build the files once again.Locate your OpenCV folder. Create a new folder and name it as release. Enter into this folder. For example

cd /home/user_name/OpenCv
mkdir Release
cd Release
Now build using cmake with following command:

cmake -D CMAKE_BUILD_TYPE=RELEASE -D CMAKE_INSTALL_PREFIX=/usr/local -D WITH_TBB=ON -D BUILD_NEW_PYTHON_SUPPORT=ON -D WITH_V4L=ON -D INSTALL_C_EXAMPLES=ON -D INSTALL_PYTHON_EXAMPLES=ON -D BUILD_EXAMPLES=ON -D WITH_QT=ON -D WITH_GTK=ON -D WITH_OPENGL=ON ..
Remember to put WITH_GTK=ON during cmake. After this step enter the command,

make
sudo make install
This should resolve your problem.If you have broken dependencies for libgtk2.0-dev, then install a fresh copy of libgtk2.0-dev using aptitude.

sudo aptitude install libgtk2.0-dev


#
npm install @tensorflow/tfjs-node
npm install @tensorflow/tfjs-node-gpu
#

cd ~/opencv
mkdir build
cd build

cmake -D CMAKE_BUILD_TYPE=Release -D CMAKE_INSTALL_PREFIX=/usr/local ..

make -j7 # runs 7 jobs in parallel

#linux dependencies
sudo apt-get install libopencv-dev
sudo apt-get install build-essential
sudo apt-get install cmake git libgtk2.0-dev pkg-config libavcodec-dev libavformat-dev libswscale-dev

#optional
sudo apt-get install python-dev python-numpy libtbb2 libtbb-dev libjpeg-dev libpng-dev libtiff-dev libjasper-dev libdc1394-22-dev

#to run server
npm start


