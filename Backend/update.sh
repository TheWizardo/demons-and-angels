#!/usr/bin/env bash

work_dir="demons-and-angels"

datetime=$(date +"%Y-%m-%d_%H-%M-%S")
mkdir -p logs
if [ ! -f "logs/$datetime.log" ]; then
    touch logs/$datetime.log
fi

now=$(date +"%F %T.%3N")
echo "Stopping docker"
echo "[$now] Stopping docker..." >> logs/$datetime.log
cd $work_dir
docker-compose down >> ../logs/$datetime.log 2>&1

cd ..
now=$(date +"%F %T.%3N")
echo "Copying out .env file"
echo "[$now] copying out .env file" >> logs/$datetime.log
cp $work_dir/.env .env


now=$(date +"%F %T.%3N")
echo "Deleting codebase"
echo "[$now] Deleting codebase" >> logs/$datetime.log
rm -fr $work_dir

now=$(date +"%F %T.%3N")
echo "Downloading code from git"
echo "[$now] Downloading code from git" >> logs/$datetime.log
git clone https://github.com/TheWizardo/$work_dir.git >> logs/$datetime.log 2>&1

now=$(date +"%F %T.%3N")
echo "Copying in .env file"
echo "[$now] copying in .env file" >> logs/$datetime.log
cp .env $work_dir/.env

now=$(date +"%F %T.%3N")
echo "Deleting TypeScript source"
echo "[$now] Deleting TypeScript source" >> logs/$datetime.log
rm -fr $work_dir/Backend/src

cd $work_dir
now=$(date +"%F %T.%3N")
echo "Building docker"
echo "[$now] Building docker..." >> ../logs/$datetime.log
docker-compose build >> ../logs/$datetime.log 2>&1

now=$(date +"%F %T.%3N")
echo "Strting docker"
echo "[$now] Starting docker..." >> ../logs/$datetime.log
docker-compose up -d >> ../logs/$datetime.log 2>&1

echo "Full log is at ./logs/$datetime.log"
