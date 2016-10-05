FROM node

MAINTAINER ivy 'xieyang@dodora.cn'

RUN apt-get update
RUN apt-get install git -y

#use cnpm
RUN npm install -g cnpm --registry=https://registry.npm.taobao.org

#clone code
RUN git clone https://github.com/Gospely/terminal-socket /var/www/socket
RUN cd /var/www/api && cnpm install
RUN cnpm install -g supervisor

ENTRYPOINT cd /var/www/socket && git pull && cnpm install && supervisor app.js && /bin/bash
