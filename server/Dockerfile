# https://hub.docker.com/_/node
FROM node:10-alpine

# Install Yarn (https://hub.docker.com/r/jfyne/node-alpine-yarn/dockerfile)
# May not be necessary
RUN apk add --no-cache --virtual .build-deps \
    ca-certificates \
    wget \
    tar && \
    cd /usr/local/bin && \
    wget https://yarnpkg.com/latest.tar.gz && \
    tar zvxf latest.tar.gz && \
    ln -s /usr/local/bin/dist/bin/yarn.js /usr/local/bin/yarn.js && \
    apk del .build-deps

# Create app directory
RUN mkdir -p /usr/src/app/server
WORKDIR /usr/src/app/server

# Copy Dependency Files
COPY package.json .
COPY yarn.lock .

# Install Dependencies
RUN yarn

# Copy rest of code to current directory
COPY . /usr/src/app/server

# Start the app
CMD ["yarn", "run", "start-prod"]