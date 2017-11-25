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
} from '../actions/types';

/**
 * Initial state of the reducer
 */
const INITIAL_STATE = {
    email: '',
    password: '',
    user: '',
    error: '',
    name: '',
    loading: false
};

/**
 * Auth reducer
 */
export default (state=INITIAL_STATE, action) => {
    switch(action.type) {
        // Change in email input field
        case EMAIL_CHANGED:
            return { ...state, email: action.payload };
        // Change in password input field
        case PASSWORD_CHANGED:
            return { ...state, password: action.payload };
        // During login process
        case LOGIN_USER:
            return { ...state, loading: true, error: '' };
        // On user login success
        case LOGIN_USER_SUCCESS:
            return { ...state, ...INITIAL_STATE, 
                user: action.payload
            };
        // On user login fail
        case LOGIN_USER_FAIL:
            return { ...state, 
                error: 'Authentication failed',
                password: '',
                loading: false
            };
        // On user login success
        case LOGOUT_USER_SUCCESS:
            return INITIAL_STATE;
        // On user login fail
        case LOGOUT_USER_FAIL:
            return { ...state, 
                error: 'Logout failed. Check your connectivity to the internet.'
            };
        // On update of user form fields
        case USER_UPDATE:
            // key interpolation
            return { ...state, 
                [action.payload.prop]: action.payload.value };
        // On successful update of user name
        case UPDATE_USER_NAME_SUCCESS:
            return { ...state, 
                user: action.payload };
        // On failure of user name update
        case UPDATE_USER_NAME_FAIL:
        return { ...state, 
            error: 'Cannot update username. Check your connectivity to the internet.'
        };
        default:
            return state;
    }
};