 const axios =  require('axios');

 // GET

 const profileUser = () => {
  axios.get('http://localhost:3002/api/auth').then(session =>{
     console.log(session.data);
  }).catch(err => {
     console.log(err.response.data)
  })
}

 const logoutUser = () => {

     axios.get('http://localhost:3002/api/logout').then(session =>{
        console.log(session.data);
     }).catch(err => {
        console.log(err.response.data)
     })
  
  }

 const getBook = async  () => {

    const book = await axios.get('http://localhost:3002/api/getBook?id=64db524467795589853a6d36');
    console.log(book.data);
  
  }

  const getReviewer = async  () => {

    const user = await axios.get('http://localhost:3002/api/getReviewer?id=64e0bc5bd3a9bc810be1f80c');
    console.log(user.data);
  
  }
  
  const getBooks = async () =>{
  
   const books = await axios.get('http://localhost:3002/api/books?skip=0&limit=2&order=asc');
   console.log(books.data);
  
  }

  const getUsers = async () =>{
  
    const users = await axios.get('http://localhost:3002/api/users?skip=0&limit=2&order=asc');
    console.log(users.data);
   
   }

   const getUserBooks = async () =>{
  
    const userBooks = await axios.get('http://localhost:3002/api/user_posts?user=64e0bc5bd3a9bc810be1f80c');
    console.log(userBooks.data);
   
   }

  // POST 
const postBook = () => {

    const data = {
        "name":"The amazing HTML",
        "author":"Me",
        "review":"Whatever review",
        "pages":"100",
        "rating":"2",
        "price":"1000",
        "ownerId":"1"
    };

  axios.post('http://localhost:3002/api/book', data).then(res => {
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

  axios.post('http://localhost:3002/api/book/update', data).then(res => {
        console.log(res.data);
   }).catch(err => {
        console.log(err.response.data.message);
   })

}

const updateUser = () => {

    const data = {
        "_id":"64ef67c0d22cedb845fb197d",
        "email":"rgueskamen@gmail.com",
        "name":"KAMEN",
        "lastname":"kamen",
        "firstname":"Pascal",
        "address":"Nkolfoulou",
        "role":"1",
        "phone":"+237676622933",
        "active":"1"
    };

  axios.post('http://localhost:3002/api/user/update', data).then(res => {
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

const enableUser = async  () => {

    await axios.get('http://localhost:3002/api/user/enable?id=64ef67c0d22cedb845fb197d').then(res => {
        console.log(res.data);
    });
    
}

const disableUser = async  () => {

    await axios.get('http://localhost:3002/api/user/disable?id=64ef67c0d22cedb845fb197d').then(res => {
        console.log(res.data);
    });
    
}

// POST 
const registerUser = () => {

    const data = {
        "email":"rgueskamen@gmail.com",
        "password":"password123",
        "name":"KAMEN",
        "lastname":"Rodrigues"
    };

  axios.post('http://localhost:3002/api/register', data).then(res => {
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

  axios.post('http://localhost:3002/api/login', data).then(res => {
        console.log(res.data);
  }).catch(err => {
        console.log(err.response.data.message);
  })

}

const requestCountry = () => {

    const data = {
        "name":"rgueskamen@gmail.com",
        "flag":"green-red-yellow",
        "code":"CMR",
        "prefix":"237"
    };

  axios.post('http://localhost:3002/api/user/country', data).then(res => {
        console.log(res.data);
  }).catch(err => {
        console.log(err.response.data.message);
  })

}

const requestRole = () => {

    const data = {
        "title":"Teller",
        "slug":"cashier",
        "description":"User who can transfert a money"
    };

  axios.post('http://localhost:3002/api/user/role', data).then(res => {
        console.log(res.data);
  }).catch(err => {
        console.log(err.response.data.message);
  })

}


const requestCurrency = () => {

    const data = {
        "name":"Pounds",
        "code":"PD",
        "label":"pounds",
        "description":"United kingdoms Bank"
    };

  axios.post('http://localhost:3002/api/wallet/currency', data).then(res => {
        console.log(res.data);
  }).catch(err => {
        console.log(err.response.data.message);
  })

}

const requestPayment = () => {

    const data = {
        "name":"CARD",
        "description":"Customer should paid by credit or debit card",
        "fees":"2",
        "fees_type":"percentage"
    };

  axios.post('http://localhost:3002/api/wallet/payment', data).then(res => {
        console.log(res.data);
  }).catch(err => {
        console.log(err.response.data.message);
  })

}

const creditWallet = () => {

    const data = {
        "type":"transfert",
        "paymentId":"64f0d4ac4093c2ab380acbe5",
        "userId":"64ef67c0d22cedb845fb197d",
        "reason":"Recharge my wallet",
        "amount_wallet":"1000",
        "amount_paid":"1000.02",
        "currency_wallet":"64f0cf277e6884209eb53f03",
        "currency_paid":"64f0cf277e6884209eb53f03"
    };

  axios.post('http://localhost:3002/api/wallet/credit', data).then(res => {
        console.log(res.data);
  }).catch(err => {
        console.log(err.response.data.message);
  })

}


const transactionWallet = () => {

    const data = {
        "skip":"0",
        "limit":"10",
        "order":"desc",
        "type":"transfert",
        "token":"eyJhbGciOiJIUzI1NiJ9.NjRlZjY3YzBkMjJjZWRiODQ1ZmIxOTdk.v2BaHK0DlrZxMKczDpFpf32_usEPkvHhJvsyiWxptWE"
    };

  axios.post('http://localhost:3002/api/wallet/transaction', data).then(res => {
        console.log(res.data);
  }).catch(err => {
        console.log(err.response.data.message);
  })

}



transactionWallet();
 
