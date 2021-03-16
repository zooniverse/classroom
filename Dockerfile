FROM node:14

ENV DEBIAN_FRONTEND noninteractive

WORKDIR /node_app

COPY package.json /node_app/
RUN npm install .

COPY . /node_app

CMD ["npm","start"]