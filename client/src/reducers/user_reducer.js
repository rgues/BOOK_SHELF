const userReducer = (state = {}, action) => {

    switch (action.type) {

        case 'LOGIN_USER':
            return { ...state, login: action.payload };

        case 'USER_AUTH':
            return { ...state, login: action.payload };

        case 'GET_USER_POSTS':
            return { ...state, userPosts: action.payload };

        case 'GET_USERS':
            return { ...state, users: action.payload };

        case 'USER_REGISTER_USER':
            return { ...state, register: action.payload.success, users: action.payload.users };

        default:
            return state;
    }
}

export default userReducer;