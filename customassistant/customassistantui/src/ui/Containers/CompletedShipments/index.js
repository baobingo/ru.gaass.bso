import React from 'react';
import T from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import EnhancedTableHead from "../../Components/EnhancedTableHead";
import EnhancedTableToolbar from "../../Components/EnhancedTableToolbar"
import TableRowsCells from "../../Components/TableRowsCells";
import fetchData from "./fetchData";

const desc = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
};

const stableSort = (array, cmp) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = cmp(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });

    return stabilizedThis.map(el => el[0]);
};

const getSorting = (order, orderBy) => {
    return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
};

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
    },
    table: {
        minWidth: 1020,
        '& td': {
            paddingRight: theme.spacing.unit*2,
            paddingLeft: theme.spacing.unit*2,
        },
        '& th': {
            paddingRight: theme.spacing.unit*2,
            paddingLeft: theme.spacing.unit*2,
        },
    },
    tableWrapper: {
        overflowX: 'auto',
    },
    expansionpanel: {
        boxShadow: 'none',
    },
});

class EnhancedTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            order: 'asc',
            orderBy: 'calories',
            selected: [],
            rowsPerPage: 5,
            completedShipments: [],
            pages: {
                size: 0,
                totalElements: 0,
                totalPages: 0,
                number: 0
            },
            links: [],
        };
    }


    componentDidMount() {
        const { rowsPerPage } = this.state;
        const { number } = this.state.pages;
        this.updateData(rowsPerPage, number);
    }

    updateData = (rowsPerPage, number) => {
        fetchData(rowsPerPage, number).done(response => {
            this.setState({
                completedShipments: response.entity._embedded.shipments,
                pages: response.entity.page,
                links: response.entity._links
            });
        });
    };

    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 'desc';

        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc';
        }

        this.setState({ order, orderBy });
    };

    handleSelectAllClick = event => {
        if (event.target.checked) {
            this.setState(state => ({ selected: this.state.completedShipments.map((row, index) => index) }));
            return;
        }
        this.setState({ selected: [] });
    };

    handleClick = (event, id) => {
        const { selected } = this.state;
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        this.setState({ selected: newSelected });
    };

    handleChangePage = (event, page) => {
        const { rowsPerPage } = this.state;
        this.updateData(rowsPerPage, page);
    };

    handleChangeRowsPerPage = event => {
        const { number } = this.state.pages;
        this.setState({ rowsPerPage: event.target.value });

        this.updateData(event.target.value, number);
    };

    isSelected = id => this.state.selected.indexOf(id) !== -1;

    render() {
        const { classes } = this.props;
        const { order, orderBy, selected, rowsPerPage} = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, this.state.completedShipments);
        const { number, totalElements } = this.state.pages;

        return (
            <Paper className={classes.root}>
                <EnhancedTableToolbar numSelected={selected.length} />
                <div className={classes.tableWrapper}>
                    <Table className={classes.table} aria-labelledby="tableTitle">
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={this.handleSelectAllClick}
                            onRequestSort={this.handleRequestSort}
                            rowCount={this.state.completedShipments.length}
                        />
                        <TableBody>
                            {stableSort(this.state.completedShipments, getSorting(order, orderBy)).map((row, index) => {
                                const isSelected = this.isSelected(index);
                                return (
                                    <TableRowsCells
                                        key={index}
                                        row = {row}
                                        isSelected = {isSelected}
                                        classes = {classes}
                                        onClick={event => this.handleClick(event, index)}/>
                                );
                            })}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 49 * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={totalElements}
                    rowsPerPage={rowsPerPage}
                    page={number}
                    backIconButtonProps={{
                        'aria-label': 'Previous Page',
                    }}
                    nextIconButtonProps={{
                        'aria-label': 'Next Page',
                    }}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
            </Paper>
        );
    }
}

EnhancedTable.propTypes = {
    classes: T.object.isRequired,
};

export default withStyles(styles)(EnhancedTable);