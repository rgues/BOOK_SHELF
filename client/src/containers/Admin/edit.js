import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { updateBook, getBook, clearBook, deleteBook } from '../../actions';


const usePrevious = (value) => {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}

const EditReview = (props) => {


    const previuosBook = usePrevious(props);

    let { id } = useParams();
    let timeout = null;
    const [_id] = useState(id);
    const [ownerId, SetOwnerId] = useState('');
    const [name, SetName] = useState('');
    const [author, SetAuthor] = useState('');
    const [review, SetReview] = useState('');
    const [pages, SetPages] = useState('');
    const [rating, SetRating] = useState('');
    const [price, SetPrice] = useState('');
    const [formData, setFormData] = useState({ _id, ownerId, name, author, review, pages, rating, price });
    const navigate = useNavigate();

    const handleChange = (setState) => (event) => {
        setState(event.target.value);
        setFormData({ _id, ownerId, name, author, review, pages, rating, price });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        props.dispatch(updateBook(formData));
    }

    const deletePost = () => {
        props.dispatch(deleteBook(id));
    }

    const setBookForm = ({ name, ownerId, author, review, pages, rating, price }) => {
        SetName(name);
        SetOwnerId(ownerId);
        SetAuthor(author);
        SetReview(review);
        SetPages(pages);
        SetRating(rating);
        SetPrice(price);
        setFormData({ _id, name, ownerId, author, review, pages, rating, price });
    }

    useEffect(() => {

        if (id) {
            props.dispatch(getBook(id));
        }

        if (previuosBook !== props) {
            if (props.books && props.books.book) {
                setBookForm(props.books.book);
            } 
        }

        // Fix the clear issue
        return () => {
            // props.dispatch(clearBook());
            clearTimeout(timeout);
        }

    }, [previuosBook]);

    const redirectUser = () => {
        timeout = setTimeout(() => {
            navigate(`/user/user-reviews`);
        }, 2000)

    }

    return (
        <div className='rl_container article'>

            {
                props.books.updateBook ?
                    <div className='edit_confirm'>
                        Post updated, <Link to={`/books/${props.books.book._id}`}>
                            Click here to see your post.
                        </Link>
                    </div>
                    : null
            }

            {
                props.books.postDeleted ?
                    <div className='red_tag'>
                        Post deleted
                        {redirectUser()}
                    </div>
                    : null
            }
            <form onSubmit={handleSubmit}>

                <h2>Edit review</h2>

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

                <button type='submit'>Edit review</button>

                <div className='delete_post'>
                    <div className="button" onClick={deletePost}>
                        Delete Review
                    </div>
                </div>

            </form>

        </div>
    );
};


const mapStateToProps = (state) => {

    return {
        books: state.books
    }
}

export default connect(mapStateToProps)(EditReview);