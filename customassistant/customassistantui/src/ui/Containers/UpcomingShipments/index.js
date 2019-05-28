import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import LinearProgress from '@material-ui/core/LinearProgress';
import { SortableElement, SortableContainer} from "react-sortable-hoc";
import Client from "../../Services/Client";
import arrayMove from "array-move";

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        marginBottom: theme.spacing.unit * 3,
        overflowX: 'auto',
        userSelect: 'none',
    },
    table: {
        '& td': {
            paddingRight: theme.spacing.unit*3,
            paddingLeft: theme.spacing.unit*3,
        },
        '& th': {
            paddingRight: theme.spacing.unit*3,
            paddingLeft: theme.spacing.unit*3,
        },
        minWidth: 700,
    },
    helperClass: {
        boxShadow:  '0 0 3px rgba(0,0,0,0.6)',
        display: 'table',
        background: 'white',
    },
    heading: {
        fontSize: theme.typography.fontSize * 0.9,
        fontWeight: theme.typography.fontWeightRegular,
    },
    progress: {
        margin: theme.spacing.unit * 2,
    },
    expansionpanel: {
        boxShadow: 'none',
    },
    progress100: {
        backgroundColor: 'green'
    },
    progress60: {
        backgroundColor: 'yellow'
    },
    progress40: {
        backgroundColor: 'red'
    }
});

const TableRowSortable = SortableElement(({index, ...props})=><TableRow {...props}></TableRow>);
const TableBodySortable = SortableContainer(({children, id})=><TableBody id={id}>{children}</TableBody>);


class UpcomingShipments extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            upcomingShipments: [],
        };
    }

    componentDidMount() {
        Client({method: 'GET', path: '/api/shipments/search/findShipmentByCompletedFalseOrderByPriority'}).done(response => {
            this.setState({upcomingShipments: response.entity._embedded.shipments});
        });
    }

    backedPriorityUpdate = () =>{
        this.state.upcomingShipments.map((row, index)=>{
            row.priority = index;
            Client({
                method: 'PUT',
                // path: row._links.self.href.replace('8081','8080'),
                path: row._links.self.href.match(/(^http:\/\/.*:\d*)(.*$)/)[2],
                entity: row,
                headers: {
                    'Content-Type': 'application/json'
                },
            });
        })
    }

    onSortEnd = ({oldIndex, newIndex}) => {
        this.setState({
            upcomingShipments: arrayMove(this.state.upcomingShipments, oldIndex, newIndex),
        });
        this.backedPriorityUpdate();
    };

    render(){
        const { classes } = this.props;
        let { taxBalance, vatBalance } = this.props;

        return (
            <Paper className={classes.root} style={{height: 400, width: '100%'}}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Brand</TableCell>
                            <TableCell align="right">Status</TableCell>
                            <TableCell align="right">Custom</TableCell>
                            <TableCell align="right">Total amount, currency</TableCell>
                            <TableCell align="right">TAX amount, RUB</TableCell>
                            <TableCell align="right">VAT amount, RUB</TableCell>
                            <TableCell align="right">ETA to custom</TableCell>
                            <TableCell align="right">Ext. invoice #</TableCell>
                            <TableCell align="right"/>
                            <TableCell align="right">Int. invoice #</TableCell>
                            <TableCell align="right">ETA to warehouse</TableCell>
                            <TableCell align="right"/>
                            <TableCell align="right">Local delivery</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBodySortable
                        lockAxis='y'
                        onSortEnd={element => console.log(element)}
                        lockToContainerEdges
                        helperContainer={() => document.getElementById('ghostContainer')}
                        helperClass={classes.helperClass}
                        pressDelay={500}
                        onSortEnd={this.onSortEnd}
                        id='ghostContainer'>
                        {this.state.upcomingShipments.map((row, index) => {

                            let taxEnoughpPercent = 0;
                            let taxNotEnoughAmount = 0;

                            let vatEnoughpPercent = 0;
                            let vatNotEnoughAmount = 0;

                            if(taxBalance > 0) {
                                if (taxBalance - row.taxAmount >= 0) {
                                    taxEnoughpPercent = 100;
                                } else {
                                    taxEnoughpPercent = taxBalance / row.taxAmount * 100;
                                    taxNotEnoughAmount = row.taxAmount - taxBalance;
                                }
                                taxBalance = taxBalance - row.taxAmount;
                            }

                            if(vatBalance > 0) {
                                if (vatBalance - row.vatAmount >= 0) {
                                    vatEnoughpPercent = 100;
                                } else {
                                    vatEnoughpPercent = vatBalance / row.vatAmount * 100;
                                    vatNotEnoughAmount = row.vatAmount - vatBalance;
                                }
                                vatBalance = vatBalance - row.vatAmount;
                            }

                            return(
                                <TableRowSortable index={index} key={index}>
                                    <TableCell component="td" scope="row" align="right">
                                        {row.brand.title}
                                    </TableCell>
                                    <TableCell align="right">{row.status}</TableCell>
                                    <TableCell align="right">{row.customs.title}</TableCell>
                                    <TableCell align="right">{row.invoiceAmount}</TableCell>
                                    <TableCell align="right">
                                        {row.taxAmount}<br/>({taxNotEnoughAmount.toFixed(2)})
                                        <LinearProgress variant="determinate" value={taxEnoughpPercent}
                                            classes={{barColorPrimary:
                                                    taxEnoughpPercent>50?taxEnoughpPercent===100?classes.progress100:classes.progress60:classes.progress40}}
                                        />
                                    </TableCell>
                                    <TableCell align="right">
                                        {row.vatAmount}<br/>({vatNotEnoughAmount.toFixed(2)})
                                        <LinearProgress variant="determinate" value={vatEnoughpPercent}
                                            classes={{barColorPrimary:
                                                    vatEnoughpPercent>50?vatEnoughpPercent===100?classes.progress100:classes.progress60:classes.progress40
                                            }}/>
                                    </TableCell>
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
                                </TableRowSortable>
                            )}
                        )}
                    </TableBodySortable>
                </Table>
            </Paper>
        );
    };
}

UpcomingShipments.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UpcomingShipments);