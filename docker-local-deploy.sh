
# running database container
docker pull mongo:latest
docker stop mongo
docker rm mongo
docker run -v $PWD://data --name mongo -d mongo

# building server+client container
docker build . -t numenedict
docker stop numenedict
docker rm numenedict
docker run -d -p 97:97 --name numenedict --link mongo numenedict
docker logs numenedict