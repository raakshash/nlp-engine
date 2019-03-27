
# ---- Base Node ----
FROM node AS base
# Create app directory
WORKDIR /nlp

# ---- Dependencies ----
FROM base AS dependencies  
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./
# install app dependencies including 'devDependencies'
RUN npm install

# ---- Copy Files/Build ----
FROM dependencies AS build  
WORKDIR /nlp
COPY . /nlp
# Build react/vue/angular bundle static files
# RUN npm run build

# --- Release with Alpine ----
FROM node:8.9-alpine AS release  
# Create app directory
WORKDIR /nlp
# optional
# RUN npm -g install serve
COPY --from=dependencies /nlp/package.json ./
# Install app dependencies
RUN npm install --only=production
COPY --from=build /nlp ./
#CMD ["serve", "-s", "dist", "-p", "8080"]
CMD ["node", "server.js"]