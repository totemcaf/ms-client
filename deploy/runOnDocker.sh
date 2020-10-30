#!/bin/bash

sudo docker build -t ms-client .

sudo docker stop ms-client || true
sudo docker rm ms-client || true

sudo docker run -d --name ms-client -p 5000:5000 ms-client
