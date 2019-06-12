import React from 'react';

import { connect } from 'react-redux';
import { Prompt } from 'react-router-dom';

import { JsonForms } from '@jsonforms/react';

import Button from '@material-ui/core/Button'

import { isEqual } from 'lodash';

import { Actions } from '../components/data-entry-form';

const mapStateToProps = state => {
    return {
        newData: state.jsonforms.core.data,
        schema: state.jsonforms.core.schema,
        uischema: state.jsonforms.core.uischema,
    };
};
  
const mapDispatchToProps = dispatch => {
    return {
        changeData: (data) => dispatch(Actions.set(data)),
        saveData: (oldId, data) => dispatch(Actions.save(oldId, data))
    };
}
  

class EditPage extends React.Component {

    static defaultProps = {
        className: "edit-page"
    }

    // This sets the data on a router history push/pop 
    componentDidMount() {
        this.props.changeData(
            Object.assign({}, this.props.data)
        );
    }

    // This sets the data on a hard refresh or bookmark link
    componentDidUpdate(prevProps) {
        if (!isEqual(prevProps.data, this.props.data)) {
            this.props.changeData(
                Object.assign({}, this.props.data)
            );
        }
    }

    render() {
        const id = this.props.id;
        const data = this.props.data;
        var innerElement;
        if ((!data || !Object.keys(data).length) && id !== "new") {
            innerElement = <div>This entry was not found. Please make sure the URL is correct.</div>    
        } else {
            innerElement = (
                <div>
                    <h1>Editing Entry</h1>
                    {id !== "new" && <p>This entry has the following ID: {id}</p>}
                    <JsonForms />
                    <div className="footer">
                        <Button
                            variant="outlined"
                            onClick={() => this.props.saveData(this.props.id, this.props.newData)}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            onClick={() => this.props.saveData(this.props.id, this.props.newData)}
                        >
                            Save
                        </Button>
                    </div>
                </div>
            );
        }
        console.log(id, !isEqual(this.props.data, this.props.newData), this.props.data && this.props.data.title, this.props.newData && this.props.newData.title)
        return (
            
            <div className={this.props.className}>
                {innerElement}
                <Prompt
                    when={!isEqual(this.props.data, this.props.newData)}
                    message={"You have unsaved changes. Are you sure you want to continue? These edits will be lost."}
                />
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditPage);