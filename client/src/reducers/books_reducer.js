const booksReducer = (state = {}, action) => {

    switch (action.type) {

        case 'GET_BOOKS':
            return { ...state, list: action.payload }

        case 'GET_BOOK':
            return { ...state, book: action.payload }

        case 'GET_BOOK_W_REVIEWER':
            return { ...state, book: action.payload.book, reviewer: action.payload.reviewer }

        case 'CLEAR_BOOK_W_REVIEWER':
            return { ...state, book: action.payload.book, reviewer: action.payload.reviewer }

        case 'ADD_BOOK':
            return { ...state, newBook: action.payload }

        case 'CLEAR_NEW_BOOK':
            return { ...state, newBook: action.payload }

        case 'UPDATE_BOOK':
            return { ...state,updateBook: action.payload.success ,book: action.payload.doc }

        case 'DELETE_BOOK':
            return { ...state,postDeleted: action.payload }
    
        case 'CLEAR_BOOK':
            return { ...state,postDeleted: action.payload.postDeleted,updateBook: action.payload.updateBook ,book: action.payload.book }    

        default:
            return state;
    }
}

export default booksReducer;