#!/bin/bash

NAME=lruCacheChisel
CONTAINER=node:10
DIRECTORY=$PWD

docker stop $NAME
docker rm $NAME

docker run -it \
	--name $NAME \
	-v $DIRECTORY:/src/ \
	$CONTAINER sh -c "cd /src/ && /bin/bash"

docker rm $NAME
