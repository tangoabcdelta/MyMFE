#!/bin/bash
# echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
docker-compose -f compose.yml up --build