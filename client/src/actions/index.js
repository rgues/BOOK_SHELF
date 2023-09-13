import axios from 'axios';
import { URL } from '../config';


/*========= Book ACTION ==================*/

export function getBooks(
    limit = 10,
    start = 0,
    order = 'asc',
    list = ''
) {

    const request = axios.get(`${URL}/api/books?limit=${limit}&skip=${start}&order=${order}`)
        .then(response => {
            if (list) {
                return [...list, ...response.data];
            } else {
                return response.data;
            }
        });

    return {
        type: 'GET_BOOKS',
        payload: request
    }

}

export function getBookWithReviewer(bookId) {

    const request = axios.get(`${URL}/api/getBook?id=${bookId}`)

    // usage of redux-thunk to delay the request
    return (dispatch) => {
        request.then(({data})=> {
            let book = data;
            
             axios.get(`${URL}/api/getReviewer?id=${book.ownerId}`).then(({data})=>{
                
                let response = {book,reviewer:data};

                dispatch({
                    type:'GET_BOOK_W_REVIEWER',
                    payload: response
                })
            })
           
            
          
        })
    }
}

export function clearBookWithReviewer() {
   
    // Reset the data before we load the view
    return {
        type:'CLEAR_BOOK_W_REVIEWER',
        payload: {
            book:null, 
            reviewer:{}
        }
    }
}

export function addBook(data) {

    const request = axios.post(`${URL}/api/book`,data)
    .then(response => response.data);

   

    return {
        type: 'ADD_BOOK',
        payload: request
    }
}

export function clearNewBook() {
   
    // Reset the data before we load the view
    return {
        type:'CLEAR_NEW_BOOK',
        payload: {}
    }
}

export function getUsersPosts(userId) {

    const request = axios.get(`${URL}/api/user_posts?user=${userId}`)
        .then(response => response.data);

    return {
        type: 'GET_USER_POSTS',
        payload: request
    }

}

export function getBook(bookId) {

    const request = axios.get(`${URL}/api/getBook?id=${bookId}`)
        .then(response => response.data);

    return {
        type: 'GET_BOOK',
        payload: request
    }

}

export function updateBook(data) {

    const request = axios.post(`${URL}/api/book/update`,data)
    .then(response => response.data);
    return {
        type: 'UPDATE_BOOK',
        payload: request
    }
}

export function deleteBook(id) {

    const request = axios.delete(`${URL}/api/book/delete?id=${id}`)
    .then(response => response.data);
    return {
        type: 'DELETE_BOOK',
        payload: request
    }
}

export function clearBook() {

    return {
        type: 'CLEAR_BOOK',
        payload: {postDeleted:false,updateBook:false,book:null}
    }
}


/*========= User ACTION ==================*/

export function loginUser(data) {

    const request = axios.post(`${URL}/api/login`,data)
    .then(response => response.data);

   

    return {
        type: 'LOGIN_USER',
        payload: request
    }
}

export function auth () {

    const request = axios.get(`${URL}/api/auth`)
    .then(response => response.data);

    return {
        type:'USER_AUTH',
        payload:request
    }
}



export function getUsers({ limit = 10,
    start = 0,
    order = 'asc',
    list = ''
}) {

    const request = axios.get(`${URL}/api/users?skip=${start}&limit=${limit}&order=${order}`)
                    .then(response => {
                        if (list) {
                            return [...list, response.data];
                        } else {
                            return response.data
                        }
                    });

    return {
        type: 'GET_USERS',
        payload: request
    }
}

export function userRegister (user,userList) {

    const request = axios.post(`${URL}/api/register`,user)
   
    return (dispatch) => {

            request.then(({data}) => {

                let response = {
                    success: data.success,
                    users: data.user ? [...userList,data.user] : userList,
                }

                dispatch({
                    type:'USER_REGISTER_USER',
                    payload:response
                })

            });
       
    }
}