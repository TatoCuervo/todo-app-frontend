import { LOG_IN, LOG_OUT } from '../actions/types.jsx';

const defaultState = {
    loggedIn: false,
    user: {}
}

const authReducer = (state = defaultState, action) => {
    switch(action.type){
        case LOG_IN:
            return {
                loggedIn: true,
                user: {...action.payload}
            }
        case LOG_OUT:
            localStorage.clear()
            return {
                loggedIn: false,
                user: {}
            }
        default: return state
    }
}

export default authReducer