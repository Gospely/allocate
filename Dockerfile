FROM ivydom/ssh:v3

MAINTAINER ivy 'xieyang@dodora.cn'

RUN apt-get update
RUN apt-get install git -y
RUN apt-get install vim -y

#install nvm
RUN git clone https://github.com/leinue/cnpm/blob/master/cnpm.sh ~/.cnpm
RUN sh ~/.cnpm/cnpm.sh

#clone code
RUN git clone https://github.com/Gospely/terminal-socket /var/www/socket
RUN cd /var/www/socket && cnpm install
RUN cnpm install -g supervisor

ENTRYPOINT echo 'root:123456' | chpasswd && service ssh start && cd /var/www/socket && git pull && cnpm install && supervisor app.js && /bin/bash
