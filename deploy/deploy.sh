#!/bin/bash

HOST=ec2-3-87-195-146.compute-1.amazonaws.com

scp -i $PEM -r \
  ../build \
  ubuntu@$HOST:/home/ubuntu/client/build/

scp -i $PEM \
  Dockerfile \
  ubuntu@$HOST:/home/ubuntu/client/

scp -i $PEM \
  runOnDocker.sh \
  ubuntu@$HOST:/home/ubuntu/client/

ssh  -i $PEM ubuntu@$HOST "cd client && bash runOnDocker.sh"