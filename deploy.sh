docker stop gospel_socket && docker rm gospel_socket
docker build -t gospel_socket .
docker run --rm -it -p 2333:3000 -p 2334:22 -w /root/workspace -v /var/www/storage/codes/vue-f7:/root/workspace/ -v /var/www/gospely/socket:/root/.gospely/.socket --name="gospel_socket" gospel_socket
