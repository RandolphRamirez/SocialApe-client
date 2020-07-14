import { SET_SCREAMS, LOADING_DATA, LIKE_SCREAM, UNLIKE_SCREAM, DELETE_SCREAM, SET_ERRORS, POST_SCREAM, CLEAR_ERRORS, LOADING_UI, SET_SCREAM, STOP_LOADING_UI} from '../types';
import Axios from 'axios';

// Get all screams
export const getScreams = () => (dispatch) => {
    dispatch({type: LOADING_DATA});
    Axios.get('/screams')
        .then(res => {
            dispatch({
                type: SET_SCREAMS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: SET_SCREAMS,
                payload: []
            })
        });
}

export const getScream = (screamId) => dispatch => {
    dispatch({type:LOADING_UI});
    Axios.get(`/screams/${screamId}`)
        .then(res => {
            dispatch({
                type: SET_SCREAM,
                payload: res.data
            });
            dispatch({type: STOP_LOADING_UI});
        })
        .catch(err => { console.log(err) });
}

// Post a scream
export const postScream = (newScream) => (dispatch) => {
    dispatch({type: LOADING_UI});
    Axios.post('/scream', newScream)
        .then(res => {
            dispatch({
                type: POST_SCREAM,
                payload: res.data
            });
            dispatch({type: CLEAR_ERRORS});
        })
        .catch(err => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            });
        });
}

// Like a scream
export const likeScream = (screamId) => (dispatch) => {
    Axios.get(`/screams/${screamId}/like`)
        .then(res => {
            dispatch({
                type: LIKE_SCREAM,
                payload: res.data
            });
        });
}

// Unlike a scream
export const unlikeScream = (screamId) => (dispatch) => {
    Axios.get(`/screams/${screamId}/unlike`)
        .then(res => {
            dispatch({
                type: UNLIKE_SCREAM,
                payload: res.data
            });
        });
}


// Delete a scream
export const deleteScream = (screamId) => (dispatch) => {
    Axios.delete(`/screams/${screamId}`)
        .then(() => {
            dispatch({
                type: DELETE_SCREAM,
                payload: screamId
            });
        });
}

export const clearErrors = () => (dispatch) => {
    dispatch({type: CLEAR_ERRORS});
}