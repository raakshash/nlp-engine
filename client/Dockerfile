FROM alpine

EXPOSE 99

ADD nginx/default.conf /etc/nginx/conf.d/default.conf

COPY . /var/www/localhost/numenedict

RUN apk add nginx && \
    mkdir /run/nginx && \
    apk add nodejs && \
    apk add npm && \
    cd /var/www/localhost/numenedict && \
    npm install && \
    npm run build && \
    apk del nodejs && \
    apk del npm && \
    mv /var/www/localhost/numenedict/build /var/www/localhost && \
    cd /var/www/localhost/numenedict && \
    rm -rf * && \
    mv /var/www/localhost/build /var/www/localhost/numenedict;

CMD ["/bin/sh", "-c", "exec nginx -g 'daemon off;';"]

WORKDIR /var/www/localhost/numenedict