docker stop gospel_socket && docker rm gospel_socket
docker build -t gospel_socket .
docker run -itd -p 9996:3000 -w /var/www/socket --name="gospel_socket" gospel_docket
