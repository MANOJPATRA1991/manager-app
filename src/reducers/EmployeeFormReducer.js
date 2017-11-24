import {
    EMPLOYEE_UPDATE,
    EMPLOYEE_CREATE,
    EMPLOYEE_SAVE_SUCCESS,
    EMPLOYEE_CLEAR,
    EMPLOYEE_DELETE_SUCCESS
} from '../actions/types';

/**
 * Initial state of the reducer
 */
const INITIAL_STATE = {
      name: '',
     phone: '',
     shift: ''
};

/**
 * Employee form reducer
 */
export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        // On update of employee form fields
        case EMPLOYEE_UPDATE:
            // key interpolation
            return { ...state, 
                [action.payload.prop]: action.payload.value };
        // On employee creation complete
        case EMPLOYEE_CREATE:
            return INITIAL_STATE;
        // Clear the employee form on leaving the scene
        case EMPLOYEE_SAVE_SUCCESS:
            return INITIAL_STATE;
        // Clear the employee form
        case EMPLOYEE_CLEAR:
            return INITIAL_STATE;
        // On successful deletion of an employee
        case EMPLOYEE_DELETE_SUCCESS:
            return INITIAL_STATE;
        default:
            return state;
    }
};
