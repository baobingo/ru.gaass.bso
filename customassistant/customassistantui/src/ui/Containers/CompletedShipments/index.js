import React from 'react';
import classNames from 'classnames';
import T from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import Client from "../../Services/Client";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

function desc(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function stableSort(array, cmp) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = cmp(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });

    return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
    return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const rows = [
    { id: 'brand.title', numeric: false, disablePadding: true, label: 'Brand', sortDisable: false },
    { id: 'status', numeric: false, disablePadding: false, label: 'Status', sortDisable: false  },
    { id: 'customs.title', numeric: false, disablePadding: false, label: 'Customs', sortDisable: false  },
    { id: 'invoiceAmount', numeric: true, disablePadding: false, label: 'Total amount, currency', sortDisable: true  },
    { id: 'taxAmount', numeric: true, disablePadding: false, label: 'TAX amount, RUB', sortDisable: true  },
    { id: 'vatAmount', numeric: true, disablePadding: false, label: 'VAT amount, RUB', sortDisable: true  },
    { id: 'etaCustoms', numeric: false, disablePadding: false, label: 'ETA to custom', sortDisable: false  },
    { id: 'extInvoiceNumber', numeric: false, disablePadding: false, label: 'Ext. invoice #', sortDisable: false  },
    { id: 'notes', numeric: false, disablePadding: false, label: '', sortDisable: false  },
    { id: 'internalInvoiceNumber', numeric: false, disablePadding: false, label: 'Int. invoice #', sortDisable: false  },
    { id: 'etaWarehouse', numeric: false, disablePadding: false, label: 'ETA to warehouse', sortDisable: false  },
    { id: 'cargoDimensions', numeric: false, disablePadding: false, label: '', sortDisable: false  },
    { id: 'localDelivery', numeric: false, disablePadding: false, label: 'Local delivery', sortDisable: false  },
];

class EnhancedTableHead extends React.Component {
    createSortHandler = property => event => {
        this.props.onRequestSort(event, property);
    };

    render() {
        const { onSelectAllClick, order, orderBy, numSelected, rowCount } = this.props;

        return (
            <TableHead>
                <TableRow>
                    <TableCell padding="checkbox">
                        <Checkbox
                            indeterminate={numSelected > 0 && numSelected < rowCount}
                            checked={numSelected === rowCount}
                            onChange={onSelectAllClick}
                        />
                    </TableCell>
                    {rows.map(
                        row => (
                            <TableCell
                                key={row.id}
                                align={row.numeric ? 'right' : 'left'}
                                padding={row.disablePadding ? 'none' : 'default'}
                                sortDirection={orderBy === row.id ? order : false}
                            >
                                <Tooltip
                                    title="Sort"
                                    placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                                    enterDelay={300}
                                >
                                    <TableSortLabel
                                        active={orderBy === row.id}
                                        direction={order}
                                        onClick={row.sortDisable?this.createSortHandler(row.id):null}
                                    >
                                        {row.label}
                                    </TableSortLabel>
                                </Tooltip>
                            </TableCell>
                        ),
                        this,
                    )}
                </TableRow>
            </TableHead>
        );
    }
}

EnhancedTableHead.propTypes = {
    numSelected: T.number.isRequired,
    onRequestSort: T.func.isRequired,
    onSelectAllClick: T.func.isRequired,
    order: T.string.isRequired,
    orderBy: T.string.isRequired,
    rowCount: T.number.isRequired,
};

const toolbarStyles = theme => ({
    root: {
        paddingRight: theme.spacing.unit,
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    spacer: {
        flex: '1 1 100%',
    },
    actions: {
        color: theme.palette.text.secondary,
    },
    title: {
        flex: '0 0 auto',
    },
});

let EnhancedTableToolbar = props => {
    const { numSelected, classes } = props;

    return (
        <Toolbar
            className={classNames(classes.root, {
                [classes.highlight]: numSelected > 0,
            })}
        >
            <div className={classes.title}>
                {numSelected > 0 ? (
                    <Typography color="inherit" variant="subtitle1">
                        {numSelected} selected
                    </Typography>
                ) : (
                    <Typography variant="h6" id="tableTitle">
                    </Typography>
                )}
            </div>
            <div className={classes.spacer} />
            <div className={classes.actions}>
                {numSelected > 0 ? (
                    <Tooltip title="Delete">
                        <IconButton aria-label="Delete">
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                ) : (
                    <Tooltip title="Filter list">
                        <IconButton aria-label="Filter list">
                            <FilterListIcon />
                        </IconButton>
                    </Tooltip>
                )}
            </div>
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    classes: T.object.isRequired,
    numSelected: T.number.isRequired,
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

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
        this.fetchData(rowsPerPage, number);
    }


    fetchData = (rowsPerPage, number) => {
        Client({method: 'GET', path: `/api/shipments/search/findShipmentByCompletedIsTrue?size=${rowsPerPage}&page=${number}`}).done(response => {
            this.setState({
                completedShipments: response.entity._embedded.shipments,
                pages: response.entity.page,
                links: response.entity._links
            });
        });
    }

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
        this.fetchData(rowsPerPage, page);
    };

    handleChangeRowsPerPage = event => {
        const { number } = this.state.pages;
        this.setState({ rowsPerPage: event.target.value });

        this.fetchData(event.target.value, number);
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
                                        <TableRow
                                            hover
                                            onClick={event => this.handleClick(event, index)}
                                            role="checkbox"
                                            aria-checked={isSelected}
                                            tabIndex={-1}
                                            key={index}
                                            selected={isSelected}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox checked={isSelected} />
                                            </TableCell>
                                            <TableCell component="th" scope="row" padding="none">
                                                {row.brand.title}
                                            </TableCell>
                                            <TableCell align="right">{row.status}</TableCell>
                                            <TableCell align="right">{row.customs.title}</TableCell>
                                            <TableCell align="right">{row.invoiceAmount}</TableCell>
                                            <TableCell align="right">{row.taxAmount}</TableCell>
                                            <TableCell align="right">{row.vatAmount}</TableCell>
                                            <TableCell align="right">{row.etaCustoms.substring(0, 10)}</TableCell>
                                            <TableCell align="right">{row.extInvoiceNumber}</TableCell>
                                            <TableCell align="right">
                                                <ExpansionPanel className={classes.expansionpanel}>
                                                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                                                        <Typography className={classes.heading}>Notes</Typography>
                                                    </ExpansionPanelSummary>
                                                    <ExpansionPanelDetails>
                                                        <Typography className={classes.heading}>
                                                            {row.notes}
                                                        </Typography>
                                                    </ExpansionPanelDetails>
                                                </ExpansionPanel>
                                            </TableCell>
                                            <TableCell align="right">{row.internalInvoiceNumber}</TableCell>
                                            <TableCell align="right">{row.etaWarehouse.substring(0, 10)}</TableCell>
                                            <TableCell align="right">
                                                <ExpansionPanel className={classes.expansionpanel}>
                                                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                                                        <Typography className={classes.heading}>Cargo Dimensions</Typography>
                                                    </ExpansionPanelSummary>
                                                    <ExpansionPanelDetails>
                                                        <Typography className={classes.heading}>
                                                            {row.cargoDimensions}
                                                        </Typography>
                                                    </ExpansionPanelDetails>
                                                </ExpansionPanel>
                                            </TableCell>
                                            <TableCell align="right">{row.localDelivery}</TableCell>
                                        </TableRow>
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