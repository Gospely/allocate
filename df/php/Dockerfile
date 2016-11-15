FROM php:7.1-rc-fpm

MAINTAINER shark 'shark@dodora.cn'


RUN apt-get update
RUN apt-get install git -y
RUN apt-get install vim -y
RUN apt-get install openssh-server -y

RUN wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.32.0/install.sh | bash \
    && export NVM_DIR="$HOME/.nvm" \
    && [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" \
    && nvm install v6

RUN sed -i 's/PermitRootLogin prohibit-password/PermitRootLogin yes/' /etc/ssh/sshd_config

RUN mkdir /root/workspace
#modify the default workspace of nginx
sed -i 's:usr/share/nginx/html:/root/workspace:g' /etc/nginx/nginx.conf

EXPOSE 22

ENTRYPOINT wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.32.0/install.sh | bash \
    && export NVM_DIR="$HOME/.nvm" \
    && [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" \
    && service ssh start && cd ~/.gospely/.socket && nvm use v6 &&  npm install && npm start && /bin/bash
