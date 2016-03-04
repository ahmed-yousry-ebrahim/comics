# Dockerfile
FROM seapy/rails-nginx-unicorn-pro:v1.0-ruby2.2.0-nginx1.6.0
MAINTAINER seapy(iamseapy@gmail.com)

# Add here your preinstall lib(e.g. imagemagick, mysql lib, pg lib, ssh config)
RUN apt-get update && apt-get -qq -y install libmagickwand-dev imagemagick 
RUN echo "deb http://archive.ubuntu.com/ubuntu precise main universe" > /etc/apt/sources.list
RUN apt-get update
RUN apt-get -y install python-software-properties git build-essential
RUN add-apt-repository -y ppa:chris-lea/node.js
RUN apt-get update
RUN apt-get -y install nodejs
RUN gem install compass
RUN npm install -g grunt-cli
RUN npm install -g bower
# build angular application
ADD . /app
RUN rm -rf public || true
WORKDIR /app/client
RUN npm install
RUN bower install --allow-root
RUN grunt build

#(required) Install Rails App
WORKDIR /app

RUN bundle install --without development test
RUN rake db:create && rake db:migrate && rake db:seed

#(required) nginx port number
EXPOSE 80