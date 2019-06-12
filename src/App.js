import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import idx from 'idx';

import { Actions } from './components/data-entry-form';

import DataPool from './components/data-pool/DataPool';
import Dashboard from './dashboard/Dashboard';
import EditPage from './edit-page/EditPage';
import ProtectedRoute from './components/protected-route/ProtectedRoute';

import { ROLES } from './components/protected-route/Permissions';

import './App.css'
import AdminPage from './admin-page/AdminPage';

import { startingData, schema, uischema } from './example';

const mapStateToProps = state => {
  return {
    dataList: state.dataentryform.data
  }
}

const mapDispatchToProps = dispatch => {
  return {
    initData: ({data, schema, uischema}) => dispatch(Actions.init(data, schema, uischema))
  }
}

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
            label: "Date"
        },
        {
            key: "description",
            label: "Description"
        }
      ]
    }
  }

  componentDidMount() {
    this.props.initData({
      data: startingData,
      schema,
      uischema
    });
  }

  render() {
    return (
      <BrowserRouter>
        <header>
          <h1><Link to="/">Mapping Violence</Link></h1>
          <nav>
            {/* <Link to="/">My Dashboard</Link> */}
            <Link to="/">Database</Link>
            {/* <Link to="/team">The Team</Link> */}
            <Link to="/admin">Admin</Link>
          </nav>
        </header>
        <DataPool
          headers={this.state.headers}
          dataList={this.props.dataList}
          path="/"
        >
          <h1>Mapping Violence Database</h1>
          <p>Below are all the entries ever created by the Mapping Violence team.</p>
        </DataPool>
        <Route
          path="/entry/:id"
          render={({ match }) => 
            <EditPage
              id={match.params.id}
              data={idx(this, _ => _.props.dataList.find(data => data.id === match.params.id))}
            />
          }
        />
        <ProtectedRoute
          path="/admin"
          allowedRoles={[ROLES.ADMIN]}
          render={(props) => <AdminPage />}
        />
      </BrowserRouter>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
