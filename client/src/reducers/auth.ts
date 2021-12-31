import { AUTH, DELETE_USER, LOGOUT, UPDATE_USERNAME, UPDATE_BALANCE } from '../constants/actions';

const authReducer = (state = { authData: null }, action: any) => {
    switch (action.type) {
        case AUTH:
            localStorage.setItem('profile', JSON.stringify({ ...action?.payload }));
            return { ...state, authData: action?.payload };
        case LOGOUT:
            localStorage.removeItem('profile');
            return { ...state, authData: null };
        case UPDATE_USERNAME:
            const userObjectNewName = JSON.parse(localStorage.getItem('profile') || '');
            userObjectNewName.user.username = action?.payload.newUsername;
            localStorage.setItem('profile', JSON.stringify(userObjectNewName));
            return { ...state, authData: userObjectNewName };
        case UPDATE_BALANCE:
            const userObjectNewBalance = JSON.parse(localStorage.getItem('profile') || '');
            userObjectNewBalance.user.balance = action?.payload.newBalance;
            localStorage.setItem('profile', JSON.stringify(userObjectNewBalance));
            return { ...state, authData: userObjectNewBalance };
        case DELETE_USER:
            localStorage.removeItem('profile');
            return { ...state, authData: null};
        default:
            return state;
    }
};

export default authReducer;
