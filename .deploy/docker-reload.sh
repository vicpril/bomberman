#!/usr/bin/env bash

SSH_HOST="87.242.103.157"
SSH_USER="vic"
SSH_KEY_PATH="~/.ssh/cloud_rsa"

echo "RELOAD START:"
ssh -i $SSH_KEY_PATH $SSH_USER@$SSH_HOST "cd /home/$SSH_USER/ && docker-compose down"
ssh -i $SSH_KEY_PATH $SSH_USER@$SSH_HOST "cd /home/$SSH_USER/ && docker-compose up -d --build --force-recreate"
ssh -i $SSH_KEY_PATH $SSH_USER@$SSH_HOST "docker image prune -a -f"
echo "RELOAD END"
