
# running database container
docker pull mongo:latest
docker stop mongo
docker rm mongo
docker run -v //e/database:/data --name mongo -d mongo
# docker run --name mongo -d mongo
