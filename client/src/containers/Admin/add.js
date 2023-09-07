import React, { useState } from 'react';

const AddReview = () => {

    const [formData, setFormData] = useState({});
    const [name, SetName] = useState('');
    const [author, SetAuthor] = useState('');
    const [review, SetReview] = useState('');
    const handleChange = (setState) => (event) => {
        setState(event.target.value);
        console.log(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        setFormData({
            name,
            author,
            review
        });

        console.log(formData);
    }

    return (
        <div className='rl_container'>
            <form onSubmit={handleSubmit}>
                <h2>Add Review</h2>
                <div className='form_element'>
                    <input type='text' placeholder="name" value={name} onChange={handleChange(SetName)} />
                </div>
                <div className='form_element'>
                    <input  type='text' placeholder="author" value={author} onChange={handleChange(SetAuthor)} />
                </div>
                <div className='form_element'>
                    <input type='text' placeholder="review" value={review} onChange={handleChange(SetReview)} />
                </div>
              
                    <button type='submit'>Save</button>
            
            </form>

        </div>
    );
};

export default AddReview;