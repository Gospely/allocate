FROM ubuntu

MAINTAINER ivy 'xieyang@dodora.cn'

RUN apt-get update
RUN apt-get install git -y
RUN apt-get install vim -y
RUN apt-get install openssh-server -y

#install nvm

RUN wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.32.0/install.sh | bash \
    && export NVM_DIR="$HOME/.nvm" \
    && [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" \
    && nvm install v6 \
    && cd /var/www/socket/ && npm install \ 
    && npm install -g supervisor

RUN echo 'root:123456' | chpasswd

EXPOSE 22

ENTRYPOINT service ssh start && cd /var/www/socket && git pull && npm install && supervisor app.js && cd ~ && /bin/bash
