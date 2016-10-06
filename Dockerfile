FROM ubuntu

MAINTAINER ivy 'xieyang@dodora.cn'

RUN apt-get update
RUN apt-get install -y python-software-properties software-properties-common
RUN add-apt-repository ppa:chris-lea/node.js  
RUN apt-get update
RUN apt-get install git -y
RUN apt-get install vim -y
RUN apt-get install openssh-server -y
RUN apt-get install nodejs -y
RUN ln -s `which nodejs` /usr/bin/node
RUN apt-get install npm -y

#install nvm

#RUN wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.32.0/install.sh | bash \
#    && export NVM_DIR="$HOME/.nvm" \
#    && [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" \
#    && nvm install v6 \

RUN npm install -g supervisor

RUN echo 'root:123456' | chpasswd

EXPOSE 22

ENTRYPOINT service ssh start && supervisor ~/.gospely/.socket/app.js && /bin/bash
