#!/bin/bash
echo "[INFO] Stopping Docker containers from docker-compose.yaml..."
docker-compose down

echo "[INFO] Clearing Docker system..."
docker stop $(docker ps -a -q)
docker system prune -a -f

echo "[INFO] Building Docker containers..."
docker-compose build --no-cache

echo "[INFO] Starting Docker containers..."
docker-compose up -d