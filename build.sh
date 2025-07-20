#!/bin/bash
echo "[INFO] Removing previous Docker containers..."
docker-compose down

echo "[INFO] Clearing Docker system..."
docker stop $(docker ps -a -q)
docker rm $(docker ps -a -q)
docker system prune -a -f

echo "[INFO] Rebuilding Docker containers..."
docker-compose build --no-cache

echo "[INFO] Starting Docker containers..."
docker-compose up -d