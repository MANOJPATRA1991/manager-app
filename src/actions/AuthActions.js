import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

import { 
    EMAIL_CHANGED, 
    PASSWORD_CHANGED,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGIN_USER,
    LOGOUT_USER_SUCCESS,
    LOGOUT_USER_FAIL,
    USER_UPDATE,
    UPDATE_USER_NAME_SUCCESS,
    UPDATE_USER_NAME_FAIL
} from './types';

/**
 * Returns action to update state on email change
 * @param {String} text : Email input
 * @returns Action
 */
export const emailChanged = (text) => {
    return {
        type: EMAIL_CHANGED,
        payload: text
    };
};

/**
 * Returns action to update state on password change
 * @param {String} text : Password input
 * @returns Action
 */
export const passwordChanged = (text) => {
    return {
        type: PASSWORD_CHANGED,
        payload: text
    };
};

/**
 * Logs in user to firebase
 * @param {Object} : An object with two keys: email and password
 */
export const loginUser = ({ email, password }) => {
    return (dispatch) => {
        // Dispatches action with type LOGIN_USER to all reducers
        dispatch({ type: LOGIN_USER });
        // Sign in user
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(user => {
            // Dispatch action with user payload on login success
            loginUserSuccess(dispatch, user);   
        })
        .catch((error) => {
            // Create new user if user doesn't exist in database
            firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(user => {
                // Dispatch action with user payload on login success
                loginUserSuccess(dispatch, user);
            })
            .catch(() => {
                // Dispatch action stating login failure
                loginUserFail(dispatch);
            });
        });
    };
};

/**
 * Dispatch new Action with user data on login successs
 * @param {Object} dispatch  
 * @param {Object} user 
 */
const loginUserSuccess = (dispatch, user) => {
    dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: user
    });

    if (user.displayName) {
        console.log(user);
        Actions.main();
    } else {
        Actions.details();
    }
};

/**
 * Dispatch new Action stating login failure
 * @param {Object} dispatch  
 * @param {Object} user 
 */
const loginUserFail = (dispatch) => {
    dispatch({ type: LOGIN_USER_FAIL });
}

/**
 * Updates user data in the state
 * @param {Object} : An object with prop and value keys
 * @returns Action object
 */
export const userUpdate = ({ prop, value }) => {
    return {
        type: USER_UPDATE,
        payload: { prop, value }
    };
};

/**
 * Save updated user to the firebase database
 */
export const saveUser = (name) => {
    // Get current user from firebase authentication
    const { currentUser }= firebase.auth();
    
    return (dispatch) => {
        currentUser.updateProfile({
            displayName: name
        }).then(function() {
            // Update successful.
            dispatch({
                type: UPDATE_USER_NAME_SUCCESS,
                payload: currentUser
            });
            Actions.main();
        }).catch(function(error) {
            // An error happened.
            dispatch({
                type: UPDATE_USER_NAME_FAIL
            })
        });
    }
}

/**
 * Log out current user
 */
export const logout = () => {
    return (dispatch) => {
        firebase.auth().signOut().then(function() {
            // Sign-out successful.
            dispatch({
                type: LOGOUT_USER_SUCCESS
            });
            Actions.auth({ type: 'reset'});
        }).catch(function(error) {
            // An error happened.
            dispatch({
                type: LOGOUT_USER_FAIL
            })
        });
    }
}