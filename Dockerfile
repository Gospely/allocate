FROM ubuntu

MAINTAINER ivy 'xieyang@dodora.cn'

RUN apt-get update
RUN apt-get install git -y
RUN apt-get install vim -y
RUN apt-get install openssh-server -y

#install nvm
RUN git clone https://github.com/leinue/cnpm ~/.cnpm
RUN sh ~/.cnpm/cnpm.sh
RUN rm -rf ~/.cnpm

RUN nvm install v6
RUN nvm use v6
RUN npm install -g cnpm --registry=https://registry.npm.taobao.org

#clone code
RUN git clone https://github.com/Gospely/terminal-socket /var/www/socket
RUN cd /var/www/socket && cnpm install
RUN cnpm install -g supervisor

EXPOSE 22

ENTRYPOINT echo 'root:123456' | chpasswd && service ssh start && cd /var/www/socket && git pull && cnpm install && supervisor app.js && cd ~ && /bin/bash
