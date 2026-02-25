#!/bin/bash
set -e

echo "Seeding MongoDB..."

until mongosh --quiet --eval "db.runCommand({ ping: 1 }).ok" | grep 1 > /dev/null; do
  echo "Waiting for MongoDB to start..."
  sleep 2
done

echo "MongoDB is up, importing data..."

mongoimport --db "${MONGO_DB}" --collection Users --drop --file Users.json --jsonArray
mongoimport --db "${MONGO_DB}" --collection FrontendConfig --drop --file FrontendConfig.json --jsonArray


echo "MongoDB seeding complete."
