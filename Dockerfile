FROM hk01/docker-node:8.15-stretch-v0.1.0
COPY src /srv
COPY package.json /srv/package.json
WORKDIR /srv
RUN yarn