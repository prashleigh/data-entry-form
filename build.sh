#!/bin/sh

echo "Starting build"

DO_NOT_EDIT_LINE="# DO NOT EDIT BELOW THIS LINE. IT IS CREATED BY 'build.sh'"

if [ -e .env.development.local ]
then
    sed -i "/$DO_NOT_EDIT_LINE/Q" .env.development.local
else
    touch .env.development.local
    if [ -e .env.development.local.example ]
    then
        cat .env.development.local.example >> .env.development.local
    fi
fi

PROJECT_LOCATION=$(pwd -P)
MONGOD_CONF_LOCATION=$(pwd -P)/mongod.conf
DOTENV_CONFIG_PATH_FOR_API=.env

SPA_PORT=3000
API_PORT=8000

cat >> .env.development.local << EOF
$DO_NOT_EDIT_LINE
PROJECT_LOCATION=$PROJECT_LOCATION
MONGOD_CONF_LOCATION=$MONGOD_CONF_LOCATION
DOTENV_CONFIG_PATH_FOR_API=$DOTENV_CONFIG_PATH_FOR_API
SPA_PORT=$SPA_PORT
API_PORT=$API_PORT
EOF

if [ -e .env.development ]
then
    sed -i "/$DO_NOT_EDIT_LINE/Q" .env.development
else
    touch .env.development
    if [ -e .env.development.example ]
    then
        cat .env.development.example >> .env.development
    fi
fi

# These URLs should NOT have trailing slashes
if [ "$1" = "dev-test" ]
then
    REACT_APP_API_DATA_LOCATION=http://localhost:8000/api/entry
    REACT_APP_API_SCHEMA_LOCATION=http://localhost:8000/api/schema
    REACT_APP_API_UI_SCHEMA_LOCATION=http://localhost:8000/api/uischema
    REACT_APP_API_LOGIN_LOCATION=http://localhost:8000/login
else
    REACT_APP_API_DATA_LOCATION=http://api.mappingviolence.org/api/entry
    REACT_APP_API_SCHEMA_LOCATION=http://api.mappingviolence.org/api/schema
    REACT_APP_API_UI_SCHEMA_LOCATION=http://api.mappingviolence.org/api/uischema
    REACT_APP_API_LOGIN_LOCATION=http://api.mappingviolence.org/login
fi

cat >> .env.development << EOF
$DO_NOT_EDIT_LINE
REACT_APP_API_DATA_LOCATION=$REACT_APP_API_DATA_LOCATION
REACT_APP_API_SCHEMA_LOCATION=$REACT_APP_API_SCHEMA_LOCATION
REACT_APP_API_UI_SCHEMA_LOCATION=$REACT_APP_API_UI_SCHEMA_LOCATION
REACT_APP_API_LOGIN_LOCATION=$REACT_APP_API_LOGIN_LOCATION
EOF

if [ -e .env ]
then
    sed -i "/$DO_NOT_EDIT_LINE/Q" .env
else
    touch .env
    if [ -e .env.example ]
    then
        cat .env.example >> .env
    fi
fi

if [ "$1" = "dev" ]
then
    echo $DO_NOT_EDIT_LINE >> .env
    cat .env.development .env.development.local | sed -e "s/$DO_NOT_EDIT_LINE//g" | sed -e "/^$/d" >> .env
fi

echo "Build ended"
