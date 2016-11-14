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
    && nvm install v4

RUN sed -i 's/PermitRootLogin prohibit-password/PermitRootLogin yes/' /etc/ssh/sshd_config

RUN mkdir /root/workspace
RUN mkdir /root/.db

# init node project
RUN git clone https://github.com/Gospely/hello_node.git /root/workspace && cd /root/workspace && rm -rf .git

RUN git clone https://github.com/Gospely/excute.git /root/.db
RUN chmod 777 /root/.db/db/chmod.sh
RUN sh /root/.db/db/chmod.sh

EXPOSE 22

ENTRYPOINT wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.32.0/install.sh | bash \
    && export NVM_DIR="$HOME/.nvm" \
    && [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" \
    && service ssh start && cd ~/.gospely/.socket && nvm install 4.4.4 && nvm use 4.4.4 && npm start && /bin/bash
