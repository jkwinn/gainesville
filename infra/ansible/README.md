# Gainesville Ubuntu Deploy

Ansible automation for running the Gainesville static site and Google Calendar sync service on an Ubuntu host.

The Google service account JSON key is never committed. Pass the local key path at deploy time and Ansible will copy it to the server with restricted permissions.

## Files

- `inventory.example.ini`: starter inventory for your Ubuntu host.
- `site.yml`: deploys the static site and the calendar sync timer.
- `files/`: OS hardening, unattended update, and fail2ban config files.
- `templates/`: Nginx, systemd, SSH, timer, and environment templates.

## First Run

1. Install Ansible on your workstation.
2. Copy the example inventory:

   ```sh
   cp infra/ansible/inventory.example.ini infra/ansible/inventory.ini
   ```

3. Edit `infra/ansible/inventory.ini` with your server hostname or IP.
4. Share the Google Calendar with the service account email:

   `gainesvill-sa@copper-freedom-165318.iam.gserviceaccount.com`

5. Run the playbook, passing the local path to the service account JSON key:

   ```sh
   ansible-playbook -i infra/ansible/inventory.ini infra/ansible/site.yml \
     -e google_service_account_key_src=/path/to/google-calendar-service-account.json
   ```

## Common Variables

Override variables with `-e name=value`, inventory vars, or a vault file.

| Variable | Default |
| --- | --- |
| `gainesville_repo_url` | `https://github.com/jkwinn/gainesville.git` |
| `gainesville_repo_version` | `main` |
| `gainesville_app_dir` | `/opt/gainesville` |
| `gainesville_web_root` | `/var/www/gainesville` |
| `gainesville_calendar_id` | `gainesvilletheband@gmail.com` |
| `gainesville_calendar_sync_interval` | `15min` |
| `google_service_account_key_dest` | `/etc/gainesville/google-calendar-service-account.json` |
| `gainesville_server_name` | `_` |
| `gainesville_enable_firewall` | `true` |
| `gainesville_enable_fail2ban` | `true` |
| `gainesville_enable_unattended_upgrades` | `true` |
| `gainesville_enable_sysctl_hardening` | `true` |
| `gainesville_harden_ssh` | `false` |
| `gainesville_enable_hsts` | `false` |
| `gainesville_ssh_authorized_user` | `{{ ansible_user }}` |
| `gainesville_ssh_authorized_keys` | Jeff's `jwinn@localfedora.com` public key |

## Security Controls

The playbook applies these controls by default:

- Installs and enables Nginx for the static website.
- Serves the website with no directory listings and defensive HTTP headers.
- Adds a content security policy that allows this static site plus Facebook and YouTube embeds.
- Enables UFW with inbound deny, outbound allow, SSH allowed, and HTTP/HTTPS allowed.
- Enables fail2ban for SSH brute-force protection.
- Adds the configured SSH public key to the deploy/login user's `authorized_keys`.
- Enables unattended security updates.
- Applies conservative kernel/network hardening settings.
- Runs the calendar sync under a non-login service user with systemd filesystem restrictions.

SSH hardening is available but disabled by default because it can lock you out if your key login is not already working:

```sh
ansible-playbook -i infra/ansible/inventory.ini infra/ansible/site.yml \
  -e google_service_account_key_src=/secure/local/path/google-calendar-service-account.json \
  -e gainesville_harden_ssh=true
```

HSTS is also disabled by default. Only enable it after HTTPS is configured and tested for the final domain:

```sh
ansible-playbook -i infra/ansible/inventory.ini infra/ansible/site.yml \
  -e gainesville_server_name=gainesvilletheband.com \
  -e gainesville_enable_hsts=true
```

## Running The Sync Manually

After deploy:

```sh
sudo systemctl start gainesville-calendar-sync.service
sudo journalctl -u gainesville-calendar-sync.service -n 100 --no-pager
```

Check the timer:

```sh
systemctl list-timers gainesville-calendar-sync.timer
```

## Key Handling

Recommended:

```sh
ansible-playbook -i infra/ansible/inventory.ini infra/ansible/site.yml \
  -e google_service_account_key_src=/secure/local/path/google-calendar-service-account.json
```

If the key is already on the server at `google_service_account_key_dest`, you can omit `google_service_account_key_src`.

Do not place the JSON key in this repo, the web root, GitHub Pages, or browser JavaScript.
