FROM richarvey/nginx-php-fpm:php5

MAINTAINER shark 'shark@dodora.cn'

RUN apt-get update
RUN apt-get install git -y
RUN apt-get install vim -y
RUN apt-get install openssh-server -y

ENV WORDPRESS_VERSION 4.6.1
ENV WORDPRESS_SHA1 027e065d30a64720624a7404a1820e6c6fff1202

RUN mkdir /root/workspace
#modify the default workspace of nginx
RUN sed -i 's:usr/share/nginx/html:/root/workspace:g' /etc/nginx/nginx.conf

RUN set -x \
	&& curl -o wordpress.tar.gz -fSL "https://wordpress.org/wordpress-${WORDPRESS_VERSION}.tar.gz" \
	&& echo "$WORDPRESS_SHA1 *wordpress.tar.gz" | sha1sum -c - \
# upstream tarballs include ./wordpress/ so this gives us /usr/src/wordpress
	&& tar -xzf wordpress.tar.gz -C /usr/src/ \
	&& rm wordpress.tar.gz \
	&& chown -R www-data:www-data /usr/src/wordpress
RUN git clone https://github.com/WordPress/WordPress.git /root/workspace

COPY docker-entrypoint.sh /usr/local/bin/
RUN ln -s usr/local/bin/docker-entrypoint.sh /entrypoint.sh # backwards compat

ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["php-fpm"]
