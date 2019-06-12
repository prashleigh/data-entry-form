import React from 'react';

import { Route } from 'react-router-dom';

import Button from '@material-ui/core/Button'

import { NEW_ID } from '../data-entry-form';
import DataDisplayTable from '../data-display-table/DataDisplayTable';

class DataPool extends React.Component {

    static defaultProps = {
        className: "data-pool",
        headers: [],
        dataList: [],
        path: "/",
        urlPrefix: "/entry/"
    }

    render() {
        return (
            <Route
                path={this.props.path}
                exact
                render={() =>
                    <div className={this.props.className}>
                        {this.props.children}
                        <Button
                            variant="contained"
                            onClick={() => this.props.history.push(`${this.props.urlPrefix}${NEW_ID}`)}
                        >
                            Create New
                        </Button>
                        <DataDisplayTable
                            dataList={this.props.dataList}
                            headers={this.props.headers}
                            urlPrefix={this.props.urlPrefix}
                        />
                    </div>
                }
            />
        );
    }
}

export default DataPool;