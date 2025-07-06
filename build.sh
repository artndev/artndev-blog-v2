# bash build.sh
docker buildx build --load -t blog .
docker run --env-file .env -p 8080:8080 blog