# Gainesville

Website development workspace for Gainesville The Band.

## Local Preview

```sh
python3 -m http.server 4173
```

Open `http://localhost:4173`.

## Hosting

GitHub stores source only. Production follows the HPE master specification v3:
Cloudflare Tunnel → rootless Nginx → Gainesville container inside `web-prod` on
awestruct. Isolated staging runs in `web-staging` on construct. No web container
publishes host ports; production receives the exact artifact tested in staging.

The GitHub Pages deployment workflow has been removed. If a demo is already
published, the repository owner must unpublish it in GitHub Settings → Pages.
Removing a workflow does not remove an existing hosted deployment.

The static application needs no framework replacement. Calendar/Facebook content
producers stay on the trusted side; their credentials do not enter public containers.

`infra/ansible` contains the legacy Ubuntu/direct-Nginx deployment and does not
implement the v3 target. Do not use it for the HPE rollout. See the sibling
infrastructure repository for the spec review and implementation plan.
