import { INCREASE_STORE, DECREASE_STORE, FETCH_USER, FETCH_USER_SUCCESS, FETCH_USER_FAILED} from './constants';
import { combineReducers } from 'redux';

const initialStateCounter = { number: 0  };

export const counter = (state = initialStateCounter, action) => {
    switch (action.type) {
        case INCREASE_STORE:
            return {
                number: state.number + 1
            }
        case DECREASE_STORE:
            return {
                number: state.number - 1
            }
            default:
                return state
    }
};

const initialStateUser = {};

export const user = (state = initialStateUser, action) => {
    switch (action.type) {
        case FETCH_USER_SUCCESS:
            return action.payload.user
        case FETCH_USER_FAILED:
            return {}
        default:
        return state
    }
}


export default combineReducers({
    counter,
    user
})