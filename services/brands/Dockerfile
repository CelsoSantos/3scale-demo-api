FROM eu.gcr.io/steam-genius-137212/development/baseimage

COPY . /src
WORKDIR /src

RUN npm install --production

ENTRYPOINT npm start
