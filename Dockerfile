
FROM node:carbon

ENV NODE_ENV=production
ENV PORT=97
ENV DB=mongodb://mongo:27017/nlpdata
# Create app directory
WORKDIR /nlp

# Install app dependencies
# RUN npm -g install serve

# A wildcard is used to ensure both package.json AND package-lock.json are copied
# COPY package*.json ./

# RUN npm install

# Bundle app source
COPY . /nlp

RUN npm cache clean --force && \
    # npm install && \
    npm run client-intsall && \
    npm run client-build && \
    mkdir /nlp/public && \
    mv /nlp/client/build/* /nlp/public && \
    rm -rf /nlp/client
    # rm -rf /nlp/node_modules

# Build react/vue/angular bundle static files
# RUN npm run build

EXPOSE 97

COPY ./start.sh /start.sh
RUN chmod +x /start.sh

# If serving static files
#CMD ["serve", "-s", "dist", "-p", "8080"]
CMD /start.sh
