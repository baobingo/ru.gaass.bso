import React,{ useState } from 'react';
import T from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
import UpcomingShipments from "../../Containers/UpcomingShipments";
import {Icon} from "@material-ui/core";
import CompletedShipments from '../../Containers/CompletedShipments';

function TabContainer(props) {
    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
            {props.children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: T.node.isRequired,
};

const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
});

class Main extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: 'one',
            anchorEl: null,
            mobileMoreAnchorEl: null,
            taxBalance: 0,
            vatBalance: 0,
        };
    }

    componentDidMount() {
        this.setState({taxBalance: 127000, vatBalance: 157565,});
    }

    handleChange = (event, value) => {
        this.setState({ value });
    };

    handleProfileMenuOpen = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleMenuClose = () => {
        this.setState({ anchorEl: null });
        this.handleMobileMenuClose();
        window.location = "/logout";
    };

    handleMobileMenuOpen = event => {
        this.setState({ mobileMoreAnchorEl: event.currentTarget });
    };

    handleMobileMenuClose = () => {
        this.setState({ mobileMoreAnchorEl: null });
    };

    render() {
        const { classes } = this.props;
        const { value, anchorEl, mobileMoreAnchorEl} = this.state;

        const isMenuOpen = Boolean(anchorEl);
        const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

        const renderMenu = (
            <Menu
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={isMenuOpen}
                onClose={this.handleMenuClose}
            >
                {/*<MenuItem onClick={this.handleMenuClose}>Profile</MenuItem>*/}
                <MenuItem onClick={this.handleMenuClose}>Logout</MenuItem>
            </Menu>
        );

        const renderMobileMenu = (
            <Menu
                anchorEl={mobileMoreAnchorEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={isMobileMenuOpen}
                onClose={this.handleMenuClose}
            >
                {/*<MenuItem onClick={this.handleProfileMenuOpen}>*/}
                <MenuItem onClick={this.handleMenuClose}>
                    <IconButton color="inherit">
                        <AccountCircle />
                    </IconButton>
                    <p>Logout</p>
                </MenuItem>
            </Menu>
        );

        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <Tabs value={value} onChange={this.handleChange}>
                            <Tab value="one" label="Arrivals" icon={<Icon>flight_land</Icon>}/>
                            <Tab value="two" label={`TAX balance (${this.state.taxBalance})`} icon={<Icon>attach_money</Icon>}/>
                            <Tab value="three" label={`VAT balance (${this.state.vatBalance})`} icon={<Icon>attach_money</Icon>}/>
                        </Tabs>
                        <div className={classes.grow} />
                        <div className={classes.sectionDesktop}>
                            <IconButton
                                aria-owns={isMenuOpen ? 'material-appbar' : undefined}
                                aria-haspopup="true"
                                onClick={this.handleProfileMenuOpen}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                        </div>
                        <div className={classes.sectionMobile}>
                            <IconButton aria-haspopup="true" onClick={this.handleMobileMenuOpen} color="inherit">
                                <MoreIcon />
                            </IconButton>
                        </div>
                    </Toolbar>
                </AppBar>
                {value === 'one' && <TabContainer>
                    <Typography variant="h4" gutterBottom>
                        Upcoming shipments
                    </Typography>
                    <UpcomingShipments taxBalance = {this.state.taxBalance} vatBalance = {this.state.vatBalance}/>
                    <Typography variant="h4" gutterBottom>
                        Completed shipments
                    </Typography>
                    <CompletedShipments/>
                </TabContainer>}
                {value === 'two' && <TabContainer>TAX balance</TabContainer>}
                {value === 'three' && <TabContainer>VAT balance</TabContainer>}
                {renderMenu}
                {renderMobileMenu}
            </div>
        );
    }
}

Main.propTypes = {
    classes: T.object.isRequired,
};

export default withStyles(styles)(Main);