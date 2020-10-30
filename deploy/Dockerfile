FROM node:12.19
MAINTAINER Carlos Fau <carlos.fau@gmail.com>

WORKDIR /app

EXPOSE 5000

RUN npm install -g serve

COPY build /app/build/

# Define default command.
ENTRYPOINT ["serve", "-s", "build"]
