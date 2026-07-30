# Gainesville

Website development workspace for Gainesville The Band.

## Local Preview

```sh
python3 -m http.server 4173
```

Open `http://localhost:4173`.

## GitHub Pages Demo

The demo is configured to deploy from GitHub Actions to:

`https://jkwinn.github.io/gainesville/`

If the URL returns 404 after pushing, open the repository settings in GitHub and confirm:

- Settings > Pages
- Source: GitHub Actions

## Ubuntu Deploy

Ansible automation for a future Ubuntu host lives in `infra/ansible`. It deploys the static site, installs the Google Calendar sync service, and keeps the service account key outside the repo.
