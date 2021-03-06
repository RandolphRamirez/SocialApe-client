import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import PropTypes from 'prop-types';
import { Grid, Typography, TextField, Button, CircularProgress } from '@material-ui/core';
import AppIcon from '../images/favicon.ico';
import { Link } from 'react-router-dom';

// Redux
import { connect } from 'react-redux';
import { signupUser } from '../redux/actions/userActions';

const styles = (theme) => ({
    ...theme.spreadThis
});

class signup extends Component {
    constructor(){
        super();
        this.state = {
            email: '',
            password: '',
            confirmpassword: '',
            loading: false,
            handle: '',
            errors: {}
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        
        const newUserData = {
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmpassword,
            handle: this.state.handle
        }

        this.props.signupUser(newUserData, this.props.history);
    }
    
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render() {
        const {classes, UI: {loading}} = this.props;
        const {errors} = this.state;
        return (
            <Grid container className={classes.form}>
                <Grid item sm/>
                <Grid item sm>
                    <img src={AppIcon} alt="icon" className={classes.image}/>
                    <Typography variant="h2" className={classes.pageTitle}>
                        Signup
                    </Typography>
                    <form noValidate onSubmit={this.handleSubmit}>
                        <TextField id="email" name="email" type="email" label="Email" className={classes.TextField}
                        value={this.state.email} helperText={errors.email} error={errors.email ? true: false}
                        onChange={this.handleChange} fullWidth/>  
                        
                        <TextField id="password" name="password" type="password" label="Password" className={classes.TextField} value={this.state.password}
                         helperText={errors.password} error={errors.password ? true: false} onChange={this.handleChange} fullWidth/>
                        
                        <TextField id="confirmpassword" name="confirmpassword" type="password" label="Confirm Password" className={classes.TextField} value={this.state.confirmpassword}
                         helperText={errors.confirmpassword} error={errors.confirmPassword ? true: false} onChange={this.handleChange} fullWidth/>
                        
                        <TextField id="handle" name="handle" type="handle" label="Handle" className={classes.TextField} value={this.state.handle}
                         helperText={errors.handle} error={errors.handle ? true: false} onChange={this.handleChange} fullWidth/>   
                        
                        {errors.general && (
                            <Typography variant="body2" className={classes.customError}>
                                {errors.general}
                            </Typography>
                        )}
                    
                        <Button type="submit" variant="contained" color="primary" className={classes.button} disabled={loading}>
                            Signup
                            {loading && (
                                <CircularProgress className={classes.progress} size={30}/>
                            )}
                        </Button> 
                        <br/><small>Already have an account? Login <Link to={"/login"}>here</Link></small>
                    </form>
                </Grid>
                <Grid item sm/>
            </Grid>
        )
    }
}

signup.propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
    signupUser: PropTypes.object.isRequired
};


const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
})

export default connect(mapStateToProps, {signupUser})(withStyles(styles)(signup));
