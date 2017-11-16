import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

import { 
    EMAIL_CHANGED, 
    PASSWORD_CHANGED,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGIN_USER
} from './types';

/**
 * Returns action to update state on email change
 * @param {*} text Email input
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
 * @param {*} text Password input
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
 * @param {*} param0 An object with two keys: email and password
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
 * @param {*} dispatch  
 * @param {*} user 
 */
const loginUserSuccess = (dispatch, user) => {
    dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: user
    });

    Actions.main();
};

/**
 * Dispatch new Action stating login failure
 * @param {*} dispatch  
 * @param {*} user 
 */
const loginUserFail = (dispatch) => {
    dispatch({ type: LOGIN_USER_FAIL });
}