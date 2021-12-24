import { AUTH, DELETE_USER, LOGOUT, USER_UPDATE_NAME } from '../constants/actions';

const authReducer = (state = { authData: null }, action: any) => {
    switch (action.type) {
        case AUTH:
            localStorage.setItem('profile', JSON.stringify({ ...action?.payload }));
            return { ...state, authData: action?.payload, errors: null };
        case LOGOUT:
            localStorage.removeItem('profile');
            return { ...state, authData: null, errors: null };
        case USER_UPDATE_NAME:
            const userObjectNewName = JSON.parse(localStorage.getItem('profile') || '');
            userObjectNewName.user.username = action?.data.username;
            localStorage.setItem('profile', JSON.stringify(userObjectNewName));
            return { ...state, authData: action.data, errors: null };
        case DELETE_USER:
            localStorage.removeItem('profile');
            return { ...state, authData: null, errors: null };
        default:
            return state;
    }
};

export default authReducer;
