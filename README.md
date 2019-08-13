# Mapping Violence Data Applications

## Building

### build.sh

Management of the environment variables that can be automatically set. See below for more information.

## Running

All of the services are managed in Docker containers and orchestrated with Docker Compose. A wrapper is used to source environment variables.

### Development

`./dc.sh -f docker-compose.dev.yml up -d --build` will build the containers and run them. Connect to `http://localhost:[SPA_PORT]` (see below for information on `SPA_PORT`) in the web browser to see the application.

### Production

The images need to be built before the following command can be run. To build the Docker images, run:

* `cd api; docker build -t [IMAGE_NAME:IMAGE_TAG] .`
* `cd ..; docker build -t [IMAGE_NAME:IMAGE_TAG] .`

`./dc.sh up -d` will start and run the containers. Connect to <http://data.mappingviolence.org> in the web browser to see the application.

## Environment Variables

Below is a list of environment variables that you need to set before developing or deploying the application. If you are a staffer with CDS, you can get the default values from Cailyn Hansen (cailyn_hansen \[AT\] alumni.brown.edu).

Given issues with Docker Desktop (Windows/Mac) and accessing files between the host file system and the container systems, some of the environment variables must be set based on the specific location of the source code in your directory. In order to automatically generate these environment variables, there is a `build.sh` script that generates `.env[.*]` files.

**If you need to change the defaults of the generated environment variables, change them in the `build.sh` script, NOT the generated `.env[.*]` files.**

In order to prevent pollution of the environment variable name space on your local machine, there is a wrapper of the `docker-compose` command named `dc.sh`. This script sources all the relevant `.env[.*]` files in a separate bash environment and then invokes `docker-compose`. This allows us to use environment variables in the `docker-compose.yml` file.

Okay, finally time for the list of environment variables, separated by the `.env[.*]` file they are located in:

### .env.[development|production].local

These are the environment variables that are used during development that are dependent on the local machine.

#### PROJECT_LOCATION

`PROJECT_LOCATION` is the current working directory of the project. Given the issue mentioned above, if the files are located on a Windows/Mac host but symlinked from a directory in WSL 1, then the non-symlink path must be given. The `-P` flag in the `pwd -P` command resolves the symlink. You should not need to edit this.

#### MONGOD_CONF_LOCATION

`MONGOD_CONF_LOCATION` is the location of the Mongo configuation file. You shouldn't need to edit the environment variable. Instead, make changes directly to the configuration file included in this repository.

#### DOTENV_CONFIG_PATH_FOR_APT

`DOTENV_CONFIG_PATH_FOR_APT` specifies what `.env` file is to be used for the environment variables for the API.

#### SPA_PORT

`SPA_PORT` is the port of the single page application (i.e. the data entry form). The default is 3001 but can be changed to whatever you please. Note: This is the port on the host machine, not the port in the application runs in the container. That is fixed to 3000 (there is no relationship between this value and the value you set for `SPA_PORT`).

#### API_PORT

`API_PORT` is the port of the API (i.e. the back-end). The default port is 8000 but can be changed to whatever you please. That is fixed to 8000 (there is no relationship between this value and the value you set for `API_PORT`).

### .env.[development|production]

These are the environment variables that are used during development that are the same across all local machines.

#### REACT_APP_API_DATA_LOCATION

`REACT_APP_API_DATA_LOCATION` is the endpoint location for accessing the data from the API.

#### REACT_APP_API_SCHEMA_LOCATION

`REACT_APP_API_SCHEMA_LOCATION` is the endpoint location for accessing the Form Schema. Currently, no used.

#### REACT_APP_API_UI_SCHEMA_LOCATION

`REACT_APP_API_UI_SCHEMA_LOCATION` is the endpoint location for accessing the Form UI Schema. Currently, not used.

#### REACT_APP_API_LOGIN_LOCATION
REACT_APP_API_LOGIN_LOCATION
`REACT_APP_API_DATA_LOCATION` ins the endpoint location for login.

#### DB_URL

`DB_URL` is the URL for connecting to the database.

#### DB_NAME

`DB_NAME` is the name of the database for this project.

#### ENTRY_COLLECTION

`ENTRY_COLLECTION` is the name of the collection that stores the entries.

#### ENTRY_VERSION_COLLECTION

`ENTRY_VERSION_COLLECTION` is the name of the collection that stores the entry versions.

### .env

See [https://docs.google.com/document/d/158HyXRxzP5vcKxXPCj8h_EhyQ2jqMZRml5cX7CEzaVA/edit](https://docs.google.com/document/d/158HyXRxzP5vcKxXPCj8h_EhyQ2jqMZRml5cX7CEzaVA/edit).

## README from create-react-app

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
