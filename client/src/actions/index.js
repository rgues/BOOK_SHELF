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
            book:{}, 
            reviewer:{}
        }
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