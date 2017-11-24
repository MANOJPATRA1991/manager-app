import {
    EMPLOYEE_UPDATE,
    EMPLOYEE_CREATE,
    EMPLOYEE_FORM_CLEAR
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
        case EMPLOYEE_FORM_CLEAR:
            return INITIAL_STATE;
        default:
            return state;
    }
};
