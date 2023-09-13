import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addBook, clearNewBook } from '../../actions';

const AddReview = (props) => {

    const [ownerId, SetOwnerId] = useState('');
    const [name, SetName] = useState('');
    const [author, SetAuthor] = useState('');
    const [review, SetReview] = useState('');
    const [pages, SetPages] = useState('');
    const [rating, SetRating] = useState('');
    const [price, SetPrice] = useState('');
    const [formData, setFormData] = useState({ownerId,name, author, review, pages, rating, price});
   

    const handleChange = (setState) => (event) => {
        setState(event.target.value);
        setFormData({ownerId,name,author,review,pages,rating, price});
    }

 
    useEffect(() => {
        if(props.user&& props.user.login && props.user.login.id) {
            SetOwnerId(props.user.login.id) ;
        }

        return () => {
            props.dispatch(clearNewBook())
        } 
    },[]);

    const handleSubmit = (event) => {
        event.preventDefault();
        props.dispatch(addBook(formData));
    }

    const showNewBook = (book) => (
        book.post ? 
            <div className='conf_link'>
                Cool !! <Link to={`/books/${book.bookId}`}>Click the link to see the post.</Link>
            </div>
        : null
    )

    
    return (
        <div className='rl_container article'>
            <form onSubmit={handleSubmit}>

                <h2>Add a review</h2>

                <div className='form_element'>
                    <input type='text' placeholder="Enter name" value={name} onChange={handleChange(SetName)} />
                </div>

                <div className='form_element'>
                    <input type='text' placeholder="Enter author" value={author} onChange={handleChange(SetAuthor)} />
                </div>

                <textarea roes="3" placeholder="Enter review" value={review} onChange={handleChange(SetReview)} />
                
                <div className='form_element'>
                    <input type='number' placeholder="Enter pages" value={pages} onChange={handleChange(SetPages)} />
                </div>

                <div className='form_element'>
                    <select value={rating} onChange={handleChange(SetRating)}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </div>

                <div className='form_element'>
                    <input type='number' placeholder="Enter price" value={price} onChange={handleChange(SetPrice)} />
                </div>
              
                <button type='submit'>Add review</button>

                {
                    props.books.newBook ? 
                     showNewBook(props.books.newBook)
                    : null
                }

            </form>

        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        books: state.books
    }
}

export default connect(mapStateToProps)(AddReview);