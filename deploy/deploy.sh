#!/usr/bin/env bash
#
# Deploy the Audiobooks static site to this server. Run with sudo:
#
#     sudo bash /home/codewonderland/audiobooks-site/deploy.sh
#
# Idempotent: safe to re-run for every redeploy. It syncs the pre-built static
# files into the web root, installs/updates the nginx site, obtains a TLS
# certificate on first run, and makes sure nginx is enabled at boot.
#
# nginx itself is a systemd service that already restarts on failure and starts
# on boot, so serving these static files needs no separate long-running process.
set -euo pipefail

STAGING=/home/codewonderland/audiobooks-site   # uploaded build output (contains dist files + this script)
WEBROOT=/var/www/audiobooks
DOMAIN=audiobooks.codewonder.land
CONF=/etc/nginx/sites-available/${DOMAIN}.conf
ENABLED=/etc/nginx/sites-enabled/${DOMAIN}.conf

if [[ $EUID -ne 0 ]]; then
  echo "Please run with sudo: sudo bash $0" >&2
  exit 1
fi

echo "==> Syncing static files into ${WEBROOT}"
mkdir -p "${WEBROOT}"
rsync -a --delete --exclude 'deploy.sh' --exclude 'nginx.conf' "${STAGING}/" "${WEBROOT}/"
chown -R root:root "${WEBROOT}"
find "${WEBROOT}" -type d -exec chmod 755 {} \;
find "${WEBROOT}" -type f -exec chmod 644 {} \;

echo "==> Installing nginx site config"
cp "${STAGING}/nginx.conf" "${CONF}"
ln -sfn "${CONF}" "${ENABLED}"

echo "==> Testing nginx config"
nginx -t

echo "==> Reloading nginx (HTTP site live)"
systemctl reload nginx

if [[ ! -d "/etc/letsencrypt/live/${DOMAIN}" ]]; then
  echo "==> Obtaining TLS certificate via certbot"
  certbot --nginx -d "${DOMAIN}" --non-interactive --agree-tos --redirect
  systemctl reload nginx
else
  echo "==> TLS certificate already present, skipping certbot"
fi

echo "==> Ensuring nginx starts on boot"
systemctl enable nginx >/dev/null 2>&1 || true

echo "==> Done. https://${DOMAIN}/ should now be live."
