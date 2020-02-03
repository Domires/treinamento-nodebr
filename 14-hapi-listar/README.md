sudo docker run \
    --name postgres \
    -e POSTGRES_USER=domires \
    -e POSTGRES_PASSWORD=1q2w3e4r \
    -e POSTGRES_DB=heroes \
    -p 5432:5432 \
    -d \
    postgres

docker ps 
docker exec -it postgres /bin/bash

sudo docker run \
    --name adminer \
    -p 8081:8080 \
    --link postgres:postgres \
    -d \
    adminer

## ---- MONGODB
sudo docker run \
    --name mongodb \
    -p 27017:27017 \
    -e MONGO_INITDB_ROOT_USERNAME=admin \
    -e MONGO_INITDB_ROOT_PASSWORD=1q2w3e4r \
    -d \
    mongo:4

sudo docker run \
    --name mongoclient01 \
    -p 3333:3000 \
    --link mongodb:mongodb \
    -d \
    mongoclient/mongoclient

sudo docker exec -it mongodb \
    mongo --host localhost -u admin -p 1q2w3e4r --authenticationDatabase admin \
    --eval "db.getSiblingDB('herois').createUser({user: 'domires', pwd: '1q2w3e4r', roles: [{role: 'readWrite', db: 'herois'}]})"