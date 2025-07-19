#!/bin/bash

echo "Remove previous containers..."
docker-compose down

echo "Clear Docker system..."
docker system prune -a -f

echo "Rebuild Docker containers..."
docker-compose build --no-cache