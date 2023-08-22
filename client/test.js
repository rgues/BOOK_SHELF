 const axios =  require('axios');

 // GET

 const profileUser = () => {
  axios.get('http://localhost:3001/api/auth').then(session =>{
     console.log(session.data);
  }).catch(err => {
     console.log(err.response.data)
  })
}

 const logoutUser = () => {

     axios.get('http://localhost:3001/api/logout').then(session =>{
        console.log(session.data);
     }).catch(err => {
        console.log(err.response.data)
     })
  
  }

 const getBook = async  () => {

    const book = await axios.get('http://localhost:3001/api/getBook?id=64db524467795589853a6d36');
    console.log(book.data);
  
  }

  const getReviewer = async  () => {

    const user = await axios.get('http://localhost:3001/api/getReviewer?id=64e0bc5bd3a9bc810be1f80c');
    console.log(user.data);
  
  }
  
  const getBooks = async () =>{
  
   const books = await axios.get('http://localhost:3001/api/books?skip=0&limit=2&order=asc');
   console.log(books.data);
  
  }

  const getUsers = async () =>{
  
    const users = await axios.get('http://localhost:3001/api/users?skip=0&limit=2&order=asc');
    console.log(users.data);
   
   }

   const getUserBooks = async () =>{
  
    const userBooks = await axios.get('http://localhost:3001/api/user_posts?user=64e0bc5bd3a9bc810be1f80c');
    console.log(userBooks.data);
   
   }

  // POST 
const postBook = () => {

    const data = {
        "name":"The amazing Java",
        "author":"Me",
        "review":"Whatever review",
        "pages":"200",
        "rating":"3",
        "price":"3000",
        "ownerId":"1"
    };

  axios.post('http://localhost:3001/api/book', data).then(res => {
        console.log(res.data);
   }).catch(err => {
        console.log(err.response.data.message);
   })

}


// UPDATE
const updateBook = () => {

    const data = {
        "_id":"64db524467795589853a6d36",
        "name":"The amazing book 2",
        "author":"Me",
        "review":"Whatever review",
        "pages":"250",
        "rating":"3",
        "price":"4000",
        "ownerId":"1"
    };

  axios.post('http://localhost:3001/api/book/update', data).then(res => {
        console.log(res.data);
   }).catch(err => {
        console.log(err.response.data.message);
   })

}

// DELETE
const deleteBook = async  () => {

    await axios.delete('http://localhost:3001/api/book/delete?id=64db524467795589853a6d36').then(res => {
        console.log(res.data);
    });
    
}

// USER API 

// POST 
const registerUser = () => {

    const data = {
        "email":"rgueskamen@gmail.com",
        "password":"password123",
        "name":"KAMEN",
        "lastname":"Rodrigues"
    };

  axios.post('http://localhost:3001/api/register', data).then(res => {
        console.log(res.data);
  }).catch(err => {
        console.log(err.response.data.message);
  })

}

const loginUser = () => {

    const data = {
        "email":"rgueskamen@gmail.com",
        "password":"password123"
    };

  axios.post('http://localhost:3001/api/login', data).then(res => {
        console.log(res.data);
  }).catch(err => {
        console.log(err.response.data.message);
  })

}
 

// loginUser();

profileUser();