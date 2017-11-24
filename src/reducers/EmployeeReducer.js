import { 
    EMPLOYEES_FETCH_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {};

/**
 * Employee Reducer
 */
export default (state=INITIAL_STATE, action) => {
    switch (action.type) {
        // On successful employee fetch from firebase
        case EMPLOYEES_FETCH_SUCCESS:
            return action.payload;
        default:
            return state;
    }
}