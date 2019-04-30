# building server+client container
docker build . -t numenedict
docker stop numenedict
docker rm numenedict
docker run -d -p 97:97 --name numenedict -e HOST_NAME=$(hostname) --link mongo -e DNS_DOMAINNAME=$(dnsdomainname) numenedict
docker logs numenedict
