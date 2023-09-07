import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getBookWithReviewer, clearBookWithReviewer } from '../../actions';
import { useParams } from 'react-router-dom';

const BooksView = (props) => {
    let { id } = useParams();

    useEffect(() => {
        props.dispatch(getBookWithReviewer(id))

        // called on component unmount
        return () => {
            props.dispatch(clearBookWithReviewer())
        }
       
    }, [id]);

    const renderBook = (books) => (
        books.book ?
            <div className='br_container'>
                <div className='br_header'>
                    <h2> {books.book.name} </h2>
                    <h5> {books.book.author}</h5>
                    <div className='br_reviewer'>
                        <span>Review by:</span> {books.reviewer.name} {books.reviewer.lastname}
                    </div>
                </div>
                <div className='br_review'>
                    {books.book.review}
                </div>
                <div className='br_box'>
                    <div className="left">
                        <div>
                            <span>Pages:</span>{books.book.page}
                        </div>
                        <div>
                            <span>Price:</span>{books.book.price}
                        </div>
                    </div>
                    <div className="right">
                        <span>Rating</span>
                        <div>{books.book.rating}/5</div>
                    </div>
                </div>
            </div>
            : null
    )

    let books = props.books;

    return (
        <div>
            {renderBook(books)}
        </div>
    );
}

const mapStateToProps = (state, ownProps) => {
    return {
        books: state.books
    }
}

export default connect(mapStateToProps)(BooksView);