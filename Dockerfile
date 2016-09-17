FROM ivydom/ssh:v3

MAINTAINER ivy 'xieyang@dodora.cn'

RUN apt-get update
RUN apt-get install git -y
RUN apt-get install nodejs -y
RUN apt-get install npm -y
RUN apt-get install vim -y
RUN npm install -g npm
RUN sudo ln -s `which nodejs` /usr/bin/node

RUN echo 'root:123456' | chpasswd

RUN git clone https://github.com/Gospely/all /var/.gospel
RUN sh /var/.gospel/scripts/install-sdk.sh
RUN rm -rf /var/.gospel

#RUN git clone https://github.com/Gospely/pre-plugins ~/.c9/p
#RUN mv ~/.c9/p/plugins ~/.c9
#RUN rm -rf ~/.c9/p

RUN mkdir /var/.gospel
RUN mkdir /var/.gospel/plugins
RUN mkdir /var/.gospel/node_modules

ENTRYPOINT service ssh start && git clone https://github.com/Gospely/workspace /var/workspace && git clone https://github.com/Gospely/pre-plugins ~/.c9/p && mv ~/.c9/p/plugins ~/.c9 && rm -rf ~/.c9/p && cd /var/.gospel && ./server.js -w /var/workspace -l 0.0.0.0 -a : && cd /var/workspace && /bin/bash 
