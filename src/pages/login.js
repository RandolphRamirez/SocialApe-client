import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import PropTypes from 'prop-types';
import { Grid, Typography, TextField, Button, CircularProgress } from '@material-ui/core';
import AppIcon from '../images/favicon.ico';
import Axios from 'axios';
import { Link } from 'react-router-dom';

// MUI

const styles = (theme) => ({
    ...theme.spreadThis
});

class login extends Component {
    constructor(){
        super();
        this.state = {
            email: '',
            password: '',
            loading: false,
            errors: {}
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({
            loading: true
        });

        const userData = {
            email: this.state.email,
            password: this.state.password
        }
        Axios.post('/login', userData)
            .then(res => {
                localStorage.setItem('FBIdToken', `Bearer ${res.data.token}`);
                this.setState({
                    loading: false
                });

                this.props.history.push('/');
            })
            .catch(err => {
                console.log(err.response.data);
                this.setState({
                    errors: err.response.data,
                    loading: false
                });
            })
    }
    
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render() {
        const {classes} = this.props;
        const {errors, loading} = this.state;
        return (
            <Grid container className={classes.form}>
                <Grid item sm/>
                <Grid item sm>
                    <img src={AppIcon} alt="icon" className={classes.image}/>
                    <Typography variant="h2" className={classes.pageTitle}>
                        Login
                    </Typography>
                    <form noValidate onSubmit={this.handleSubmit}>
                        <TextField id="email" name="email" type="email" label="Email" className={classes.TextField}
                        value={this.state.email} helperText={errors.email} error={errors.email ? true: false}
                        onChange={this.handleChange} fullWidth/>  
                        <TextField id="password" name="password" type="password" label="Password" className={classes.TextField} value={this.state.password}
                         helperText={errors.password} error={errors.password ? true: false} onChange={this.handleChange} fullWidth/>   
                        {errors.general && (
                            <Typography variant="body2" className={classes.customError}>
                                {errors.general}
                            </Typography>
                        )}
                    
                        <Button type="submit" variant="contained" color="primary" className={classes.button} disabled={loading}>
                            Login
                            {loading && (
                                <CircularProgress className={classes.progress} size={30}/>
                            )}
                        </Button> 
                        <br/><small>Don't have an account? sign up <Link to={"/signup"}>here</Link></small>
                    </form>
                </Grid>
                <Grid item sm/>
            </Grid>
        )
    }
}

login.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(login);
