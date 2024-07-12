git fetch origin main
git checkout main
git reset --hard origin/HEAD
git pull
docker compose down
docker compose up -d --build
