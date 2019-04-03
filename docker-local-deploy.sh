# building server+client container
docker build . -t numenedict
docker stop numenedict
docker rm numenedict
docker run -d -p 97:97 --name numenedict --link mongo numenedict
docker logs numenedict