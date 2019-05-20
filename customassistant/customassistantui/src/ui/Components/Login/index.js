import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import Client from "rest";

const primary = red[500];
const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        width: 400
    },
    textField: {
        marginTop: theme.spacing.unit,
        margin: `${theme.spacing.unit}px auto`,
        width: 350,
    },
    button: {
        marginTop: theme.spacing.unit*3,
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        marginBottom: theme.spacing.unit*3,
        width: 400,
        height:60,
    },
    dense: {
        marginTop: 19,
    },
    root: {
        flexGrow: 1,
        maxWidth: 400,
        overflow: 'hidden',
        padding: `0 ${theme.spacing.unit * 3}px`,
        margin: `${theme.spacing.unit}px auto`,
        marginTop: '20vh',

    },
    headerImage:{
        backgroundImage: `url(./images/background.png)`,
        width: '100%',
        height: 200,
    },
    paper: {
        maxWidth: 300,
        margin: `${theme.spacing.unit}px auto`,
        padding: theme.spacing.unit * 2,
    },
    message: {
        margin: `${theme.spacing.unit}px auto`,
        color: primary,
    }
});

class Login extends Component{

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            message: ''
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleSubmit(e){
        const formData = new FormData(document.querySelector('form'));
        const data = new URLSearchParams();

        for (const [key, value]  of formData.entries()) {
            data.append(key, value);
        }


        Client({method: 'POST',
            path: '/login',
            entity: data.toString(),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
        }). done(response => {
            if(response.status.code === 401) {
                this.setState({message: response.headers.Autherror});
            }
            if(response.status.code === 200){
                window.location = "/";
            }
        });

        e.preventDefault();
    }

    render() {

        const { classes } = this.props;
        const { message } = this.state;

        return(
            <div>
                <div className={classes.root}>
                        <Grid container spacing={16}>
                            <Grid item className={classes.headerImage} xs={12}>
                            </Grid>
                            <Grid item xs={12}>
                                <form className={classes.container} onSubmit={this.handleSubmit}>
                                    <TextField
                                        required
                                        id="username"
                                        className={classes.textField}
                                        name="username"
                                        label="Username"
                                        margin="normal"

                                    />
                                    <TextField
                                        required
                                        id="password"
                                        className={classes.textField}
                                        name="password"
                                        label="Password"
                                        type="password"
                                        margin="normal"
                                    />
                                    {message && (<Typography variant="h6" align="center" className={classes.message} gutterBottom>
                                        {message}
                                    </Typography>)}
                                    <Button className={classes.button} type="submit" variant="contained" color="primary">Login</Button>
                                </form>
                            </Grid>
                        </Grid>
                </div>
            </div>
        )
    }
}

Login.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);