import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

// MUI
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import MuiLink from '@material-ui/core/Link';

import { Link } from 'react-router-dom';
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import EditIcon from '@material-ui/icons/Edit';
import KeyboardReturn from '@material-ui/icons/KeyboardReturn';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import dayjs from 'dayjs';

import { connect } from 'react-redux';
import {logoutUser, uploadImage} from '../../redux/actions/userActions';
import EditDetails from './EditDetails';
import MyButton from '../../util/myButton';

import ProfileSkeleton from '../../util/ProfileSkeleton';

const styles = (theme) => ({
    ...theme.spreadThis
  });

class Profile extends Component {

  handleLogout = (event) => {
    this.props.logoutUser();
  };

  handleImageChange = (event) =>{
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append('image', image, image.name);
    this.props.uploadImage(formData);
  };

  handleEditPicture = () => {
    const fileInput = document.getElementById('imageInput');
    fileInput.click();
  };

    render() {
        const {classes,  user: {credentials: {handle, createdAt, imageUrl, bio, website, location}, loading, authenticated}} = this.props;
        
        let profileMarkup = !loading ? (authenticated ? (
            <Paper className={classes.paper}>
                <div className={classes.profile}>
                    <div className='image-wrapper'>
                        <img src={imageUrl} alt="profile" className="profile-image"/>
                        <input type="file" id="imageInput" onChange={this.handleImageChange} hidden="hiddden"/>
                        <MyButton tip="Edit Profile Image" onClick={this.handleEditPicture} className="button">
                          <EditIcon color="primary"/>
                        </MyButton>
                    </div>
                    <hr/>
                    <div className="profile-details">
                        <MuiLink component={Link} to={`/user/${handle}`} color="primary" variant="h5">
                            @{handle}
                        </MuiLink>
                        <hr/>
                        {bio && <Typography variant="body2">{bio}</Typography>}
                        <hr/>
                        {
                            location && (
                                <Fragment>
                                    <LocationOn color="primary"/> <span>{location}</span>
                                    <hr/>
                                </Fragment>
                            )
                        }
                        {
                            website && (
                                <Fragment>
                                    <LinkIcon color="primary"/> <a href={website} target="_blank" rel="noopener noreferrer">
                                        {' '}{website}
                                    </a>
                                    <hr/>
                                </Fragment>
                            )
                        }
                        <CalendarTodayIcon color="primary"/>{' '}
                        <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>

                    </div>
                    <MyButton tip="Logout" onClick={this.handleLogout}>
                      <KeyboardReturn color="primary"/> 
                    </MyButton>
                    <EditDetails/>
                </div>
            </Paper>
        ) : (
            <Paper className={classes.paper}>
                <Typography variant="body2" align="center">
                    No profile found. Please login again
                </Typography>
                <div className={classes.buttons}>
                    <Button variant="contained" color="primary" component={Link} to="/login">Login</Button>
                    <Button variant="contained" color="secondary" component={Link} to="/signup">Signup</Button>
                </div>
            </Paper>
        )): (<ProfileSkeleton/>);
        return profileMarkup;
    }
}

const mapStateToProps = (state) => ({
    user: state.user
});

const mapActionsToProps = {logoutUser, uploadImage};

Profile.propTypes = {
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    logoutUser: PropTypes.func.isRequired,
    uploadImage: PropTypes.func.isRequired
};


export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Profile))
