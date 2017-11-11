import {
    EMPLOYEE_UPDATE
} from '../actions/types';

/**
 * Initial state of the reducer
 */
const INITIAL_STATE = {
    name: '',
    phone: '',
    shift: ''
};

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        // handle update of employee form fields
        case EMPLOYEE_UPDATE:
            // key interpolation
            return { ...state, 
                [action.payload.prop]: action.payload.value };
        default:
            return state;
    }
};