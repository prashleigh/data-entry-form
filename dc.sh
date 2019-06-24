#/bin/bash
set -a
source .env
set +a

if [ "$1" = "dev" ]
then
    docker-compose -f docker-compose.dev.yml ${@:2}
else
    docker-compose $@
fi