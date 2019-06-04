import React from "react";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Checkbox from "@material-ui/core/Checkbox";
import Tooltip from "@material-ui/core/Tooltip";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import T from "prop-types";

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

const EnhancedTableHead = props => {
    const createSortHandler = property => event => {
        props.onRequestSort(event, property);
    };
    const { onSelectAllClick, order, orderBy, numSelected, rowCount } = props;

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
                                        onClick={row.sortDisable?createSortHandler(row.id):null}
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
};

EnhancedTableHead.propTypes = {
    numSelected: T.number.isRequired,
    onRequestSort: T.func.isRequired,
    onSelectAllClick: T.func.isRequired,
    order: T.string.isRequired,
    orderBy: T.string.isRequired,
    rowCount: T.number.isRequired,
};

export default EnhancedTableHead;