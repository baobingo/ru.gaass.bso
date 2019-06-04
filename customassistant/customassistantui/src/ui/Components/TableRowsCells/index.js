import TableCell from "@material-ui/core/TableCell";
import Checkbox from "@material-ui/core/Checkbox";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from "@material-ui/core/Typography";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import TableRow from "@material-ui/core/TableRow";
import React from "react";
import T from "prop-types";


const TableRowsCells = (props) => {

    const {isSelected, row, classes, onClick} = props;

    return (
        <TableRow
            hover
            onClick={onClick}
            role="checkbox"
            aria-checked={isSelected}
            tabIndex={-1}
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
};

TableRowsCells.propTypes = {
    classes: T.object.isRequired,
};

export default TableRowsCells;