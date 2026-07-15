# Deploying audiobooks.codewonder.land

The site is a static Vite/React build, served directly by nginx (no app server).
nginx is a systemd service that already restarts on failure and starts on boot, so
there is no separate process to keep alive.

## One-time / redeploy

From a local checkout:

```bash
npm run build

# stage the build + deploy assets into your home dir on the server
rsync -az --delete dist/ server:~/audiobooks-site/
scp deploy/nginx/audiobooks.codewonder.land.conf server:~/audiobooks-site/nginx.conf
scp deploy/deploy.sh server:~/audiobooks-site/deploy.sh

# apply (needs sudo — installs web root, nginx site, TLS)
ssh -t server 'sudo bash ~/audiobooks-site/deploy.sh'
```

`deploy.sh` is idempotent: re-run it for every update. It only runs certbot the
first time (when no certificate exists yet).

## What it sets up

- Web root: `/var/www/audiobooks` (static files, SPA fallback to `index.html`)
- nginx site: `/etc/nginx/sites-available/audiobooks.codewonder.land.conf`
  (symlinked into `sites-enabled/`), modeled on the existing `nbp` site
- TLS: Let's Encrypt cert via `certbot --nginx`, with HTTP→HTTPS redirect
- Boot persistence: `systemctl enable nginx`
