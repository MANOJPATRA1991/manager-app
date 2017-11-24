import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
    EMPLOYEE_UPDATE,
    EMPLOYEE_CREATE,
    EMPLOYEES_FETCH_SUCCESS,
    EMPLOYEE_FORM_CLEAR
} from './types';

/**
 * Updates employee data in the state
 * @param {Object} : An object with prop and value keys
 * @returns Action object
 */
export const employeeUpdate = ({ prop, value }) => {
    return {
        type: EMPLOYEE_UPDATE,
        payload: { prop, value }
    };
};

/**
 * Create and save an employee data in the database
 * @param {Object} : An object with name, phone and shift keys
 */
export const employeeCreate = ({ name, phone, shift }) => {
    // Get current user from firebase authentication
    const { currentUser } = firebase.auth();
    return (dispatch) => {
        // Save data to user's employee list
        firebase.database().ref(`/users/${currentUser.uid}/employees`)
        .push({ name, phone, shift })
        .then(() => {
            // Dispatch employee create action
            dispatch({ 
                type: EMPLOYEE_CREATE 
            });
            // Go back to employee list page
            Actions.employeeList();
        });
    };
};

/**
 * Fetch employee data from firebase
 */
export const employeesFetch = () => {
    // Get current user from firebase authentication
    const { currentUser } = firebase.auth();
    return (dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/employees`)
        .on('value', snapshot => {
            dispatch({
                type: EMPLOYEES_FETCH_SUCCESS,
                payload: snapshot.val()
            });
        });
    };
};

/**
 * Update and save existing employee data
 */
export const employeeSave = ({ name, phone, shift, uid }) => {
    // Get current user from firebase authentication
    const { currentUser } = firebase.auth();
    return (dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/employees/${uid}`)
        .set({ name, phone, shift })
        .then(() => {
            // Dispatch employee create action
            dispatch({ 
                type: EMPLOYEE_FORM_CLEAR 
            });
            // Go back to Employee List Scene
            Actions.employeeList();
        });
    };
};
