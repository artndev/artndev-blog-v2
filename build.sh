# Git Bash
# $ bash build.sh
docker buildx build --load -t artndev-blog-backend .
docker run --env-file .env -p 8080:8080 artndev-blog-backend