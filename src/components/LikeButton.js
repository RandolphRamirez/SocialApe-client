import React, { Component } from 'react'
import PropTypes from 'prop-types';
import MyButton from '../util/myButton';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// Icons
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { likeScream, unlikeScream } from '../redux/actions/dataActions';

class LikeButton extends Component {

    likedScream = () => {
        if(this.props.user.likes && this.props.user.likes.find(like => like.screamId === this.props.screamId)){
            return true;
        }else{
            return false;
        }
    }

    likeScream = () => {
        this.props.likeScream(this.props.screamId);
    }

    unlikeScream = () => {
        this.props.unlikeScream(this.props.screamId);
    }

    render() {
        const { authenticated } = this.props.user;
        const likeButton = !authenticated ? (
            <Link to="/login">
                <MyButton tip="like">
                    <FavoriteBorderIcon color="primary"/>
                </MyButton>
            </Link>
            
        ) : (
            this.likedScream() ? (
                <MyButton tip="Undo like" onClick={this.unlikeScream}>
                    <FavoriteIcon color="primary"/>
                </MyButton>
            ): (
                <MyButton tip="Like" onClick={this.likeScream}>
                    <FavoriteBorderIcon color="primary"/>
                </MyButton>
            )
        )
        return likeButton;
    }
}

LikeButton.propTypes = {
    likeScream: PropTypes.func.isRequired,
    unlikeScream: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    screamId: PropTypes.string.isRequired
};

const mapStateToProps = (state) => ({
    user:state.user
});

const mapActionsToProps = {
    likeScream, 
    unlikeScream
}

export default connect(mapStateToProps, mapActionsToProps)(LikeButton);
