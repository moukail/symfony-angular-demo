#!/bin/sh

set -e

symfony composer install --no-interaction

echo "==> Waiting for database..."
while ! nc -z $DATABASE_HOST $DATABASE_PORT; do sleep 1; done
echo "==> Database ready."

echo "==> Running migrations..."
symfony console doctrine:migrations:migrate --no-interaction --allow-no-migration

echo "==> Warming up cache..."
symfony console cache:warmup --env=prod

echo "==> Starting PHP-FPM..."
exec "$@"
