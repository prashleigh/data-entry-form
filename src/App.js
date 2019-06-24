import React from 'react';
import { Route, Switch } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { 
  AppBar,
  Container,
  Hidden,
  Link,
  Toolbar,
  Typography
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { createMuiTheme, withStyles } from '@material-ui/core/styles';

import { history } from './configureStore';

import DataEntryForm, { DataPool, EntryPage, EditPage } from './components/data-entry-form';
import displayDate from './displayDate';

import './App.css';



const theme = createMuiTheme({});
const styles = {
  title: {
    flexGrow: 1,
    fontSize: '2.5rem',
    lineHeight: '1.48',
  },
  appbarTitle: {
    '&:hover': {
      textDecoration: 'none'
    }
  },
  appbarLink: {
    flexBasis: '85px',
    textAlign: 'center',
    fontSize: '1.1rem'
  }
};

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      headers: [
        {
            key: "title",
            label: "Title"
        },
        {
            key: "date",
            label: "Date",
            render: displayDate
        },
        {
            key: "description",
            label: "Description"
        }
      ],
      anchorEl: null
    }
  }

  handleMenu(event) {
    this.setState({
      anchorEl: event.currentTarget
    });
  }

  handleClose() {
    this.setState({
      anchorEl: null
    });
  }

  render() {
    return (
      <ConnectedRouter history={history}>
        <AppBar className={this.props.classes.appbar} position="static">
          <Toolbar>
            <Typography className={this.props.classes.title} variant="h1" noWrap>
              <Link
                color="inherit"
                component={RouterLink}
                to="/"
                className={this.props.classes.appbarTitle}
              >
                Mapping Violence
              </Link>
            </Typography>
            <Hidden smUp>
              <MenuIcon></MenuIcon>
            </Hidden>
            <Hidden xsDown>
              <Link
                color="inherit"
                component={RouterLink}
                to="/"
                className={this.props.classes.appbarLink}
              >
                Database
              </Link>
              <Link
                color="inherit"
                component={RouterLink}
                to="/admin"
                className={this.props.classes.appbarLink}
              >
                Admin
              </Link>
            </Hidden>
          </Toolbar>
        </AppBar>
        <Container>
          <DataEntryForm
            dataUrl={process.env.REACT_APP_API_DATA_LOCATION}
            schemaUrl={process.env.REACT_APP_API_SCHEMA_LOCATION}
            uischemaUrl={process.env.REACT_APP_API_UI_SCHEMA_LOCATION}
            render={(defProps) => (
              <Switch>
                <Route
                  path="/"
                  exact
                  render={() => (
                    <>
                      <h1>Mapping Violence Database</h1>
                      <p>Below are all the entries ever created by the Mapping Violence team.</p>
                      <DataPool
                        {...defProps}
                        headers={this.state.headers}
                      />
                    </>
                  )}
                >
                </Route>
                <Route
                  path="/entry/:id"
                  exact
                  render={({match}) => {
                    const id = match.params.id;
                    return (
                      <EntryPage
                        {...defProps}
                        id={id}
                      />
                    );
                  }}
                />
                <Route
                  path="/entry/:id/edit"
                  render={({match}) => {
                    const id = match.params.id;
                    return (
                      <EditPage
                        {...defProps}
                        id={id}
                      />
                    );
                  }}
                />
                {/* <ProtectedRoute
                  path="/admin"
                  allowedRoles={[ROLES.ADMIN]}
                  render={(props) => <AdminPage />}
                /> */}
              </Switch>
            )}
          />
          </Container>       
      </ConnectedRouter>
    );
  }
}

export default withStyles(styles)(App);
