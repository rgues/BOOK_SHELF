const userReducer = (state = {}, action) => {

    switch (action.type) {

        case 'LOGIN_USER':
            return { ...state, login: action.payload };

        case 'USER_AUTH':
            return { ...state, login: action.payload };

        default:
            return state;
    }
}

export default userReducer;