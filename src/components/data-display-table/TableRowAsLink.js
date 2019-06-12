import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { withRouter } from 'react-router-dom';

/**
 * Currently only supports displaying text in the cells.
 */
class TableRowAsLink extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            length: this.calculateLength(),
        }
    }

    componentDidMount() {
        window.addEventListener("resize", () => this.setState({length: this.calculateLength()}));
    }

    componentWillMount() {

    }

    calculateLength() {
        return Math.max(10, Math.floor(window.innerWidth / 14.4));
    }

    render() {
        return (
            <TableRow
                className={this.props.rowClassName}
                key={this.props.key}
                hover={this.props.hover}
                onClick={() => this.props.history.push(this.props.href)}
            >
                {this.props.headers.map((header, i) => {
                    const length = this.state.length;
                    const cellData = this.props.data[header.key] || <em>Data Attribute Not Found</em>;
                    return (
                        <TableCell className={this.props.cellClassName} key={i}>
                            <div className="short-text">
                                {cellData.length > length ? `${cellData.slice(0, length - 3)}...` : cellData}
                            </div>
                            <div className="full-text">{cellData}</div>
                        </TableCell>
                    )
                })}
            </TableRow>
        );
    }
}

export default withRouter(TableRowAsLink);