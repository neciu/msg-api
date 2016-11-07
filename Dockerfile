FROM  mhart/alpine-node:7.0.0
MAINTAINER Tomasz Netczuk <contact@netczuk.pl>
RUN npm install -g yarn

EXPOSE 80
WORKDIR /app
COPY ./ /app
RUN rm -rf node_modules/
RUN yarn
CMD yarn run start
