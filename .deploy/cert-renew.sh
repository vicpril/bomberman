#!/usr/bin/env bash

SSH_HOST="87.242.103.157"
SSH_USER="vic"
SSH_KEY_PATH="~/.ssh/cloud_rsa"

ssh -i $SSH_KEY_PATH $SSH_USER@$SSH_HOST docker compose run --rm certbot renew

# 0 0 24 2,5,8,11 * docker compose run --rm certbot renew > /dev/null 2>&1