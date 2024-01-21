import { AUTH, DELETE_USER, LOGOUT, UPDATE_USERNAME, UPDATE_BALANCE } from '../actions';

const authReducer = (state = { authData: null }, action: any) => {
    const profile = JSON.parse(localStorage.getItem('profile') || '{}');

    switch (action.type) {
        case AUTH:
            localStorage.setItem('profile', JSON.stringify({ ...action?.payload }));
            return { ...state, authData: action?.payload };
        case LOGOUT:
            localStorage.removeItem('profile');
            return { ...state, authData: null };
        case UPDATE_USERNAME:
            profile.user.username = action?.payload.newUsername;
            localStorage.setItem('profile', JSON.stringify(profile));
            return { ...state, authData: profile };
        case UPDATE_BALANCE:
            profile.user.balance = action?.payload.newBalance;
            localStorage.setItem('profile', JSON.stringify(profile));
            return { ...state, authData: profile };
        case DELETE_USER:
            localStorage.removeItem('profile');
            return { ...state, authData: null };
        default:
            return state;
    }
};

export default authReducer;
