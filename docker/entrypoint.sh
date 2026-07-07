#!/bin/sh
set -e

echo "==> [entrypoint] Starting Laravel portfolio setup..."

# ── 1. Writable directories (HF Spaces has a read-only FS; /tmp is writable) ──
TMP_BASE=/tmp/laravel

mkdir -p \
    "$TMP_BASE/storage/app/public" \
    "$TMP_BASE/storage/framework/cache/data" \
    "$TMP_BASE/storage/framework/sessions" \
    "$TMP_BASE/storage/framework/views" \
    "$TMP_BASE/storage/logs" \
    "$TMP_BASE/cache"

# Replace storage/ with a /tmp symlink (only if not already a symlink)
if [ ! -L /var/www/html/storage ]; then
    # Copy existing storage structure first so Laravel's stubs are in place
    cp -rn /var/www/html/storage/. "$TMP_BASE/storage/" 2>/dev/null || true
    rm -rf /var/www/html/storage
    ln -s "$TMP_BASE/storage" /var/www/html/storage
    echo "==> [entrypoint] storage/ -> $TMP_BASE/storage"
fi

# Replace bootstrap/cache/ with a /tmp symlink
if [ ! -L /var/www/html/bootstrap/cache ]; then
    rm -rf /var/www/html/bootstrap/cache
    ln -s "$TMP_BASE/cache" /var/www/html/bootstrap/cache
    echo "==> [entrypoint] bootstrap/cache/ -> $TMP_BASE/cache"
fi

# ── 2. SQLite database (also in /tmp) ──
mkdir -p "$TMP_BASE/db"
if [ ! -f "$TMP_BASE/db/database.sqlite" ]; then
    touch "$TMP_BASE/db/database.sqlite"
    echo "==> [entrypoint] Created SQLite DB at $TMP_BASE/db/database.sqlite"
fi

# ── 3. Generate APP_KEY if not set ──
if [ -z "$APP_KEY" ]; then
    echo "==> [entrypoint] No APP_KEY set — generating one..."
    php /var/www/html/artisan key:generate --force
else
    echo "==> [entrypoint] APP_KEY is set."
fi

# ── 4. Run migrations (for session/cache tables) ──
php /var/www/html/artisan migrate --force --no-interaction 2>/dev/null || true

# ── 5. Cache config / routes / views for performance ──
php /var/www/html/artisan config:cache  2>/dev/null || true
php /var/www/html/artisan route:cache   2>/dev/null || true
php /var/www/html/artisan view:cache    2>/dev/null || true

echo "==> [entrypoint] Bootstrap complete. Starting services..."

# ── 6. Start PHP-FPM in background, then Nginx in foreground ──
php-fpm8.3 --daemonize
nginx -g "daemon off;"
