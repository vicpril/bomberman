#!/usr/bin/env bash

SSH_HOST="87.242.103.157"
SSH_USER="vic"
USER="vicpril"
SSH_KEY_PATH="~/.ssh/cloud_rsa"

if [ "$#" -eq 0 ]; then
  containers=( frontend api sockets json nginx )
else
  containers=( "$@" )
fi


echo "BUILDING START: ${containers[@]}"
docker-compose --project-directory ../. --progress auto -f ../docker-compose.deploy.yml build ${containers[@]}
echo "BUILDING END"

echo "TAGGING START: ${containers[@]}"
for t in "${containers[@]}";
do
   docker tag bomberman-$t "ghcr.io/$USER/bomberman-$t:latest"
done
echo "TAGGING END"


echo "PUSHING START: ${containers[@]}"
for t in "${containers[@]}";
do
    docker push "ghcr.io/$USER/bomberman-$t:latest"
done
echo "PUSHING END"


echo "PULLING START: ${containers[@]}"
for t in "${containers[@]}";
do
    ssh -i $SSH_KEY_PATH $SSH_USER@$SSH_HOST docker pull "ghcr.io/$USER/bomberman-$t:latest"
done
echo "PULLING END"

echo "RELOAD START: ${containers[@]}"
ssh -i $SSH_KEY_PATH $SSH_USER@$SSH_HOST "cd /home/$SSH_USER/ && docker-compose down"
ssh -i $SSH_KEY_PATH $SSH_USER@$SSH_HOST "cd /home/$SSH_USER/ && docker-compose up -d --build --force-recreate"
ssh -i $SSH_KEY_PATH $SSH_USER@$SSH_HOST "docker image prune -a -f"
echo "RELOAD END"
