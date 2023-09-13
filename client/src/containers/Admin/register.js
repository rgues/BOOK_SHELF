import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { getUsers, userRegister } from '../../actions';

// Implementation of nextProps
const usePrevious = (value) => {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}

const Register = (props) => {

    const nextProps = usePrevious(props);

    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        props.dispatch(getUsers(10));
      
        if (nextProps !== props) {
            if (props.user && props.user.register === false) {
                setError('Error, try again !');
            } else {
                setName('');
                setLastname('');
                setEmail('');
                setPassword('');
            }
        }

    },[nextProps])

    const handleInputChange = (setState) => (event) => {
        setState(event.target.value);
    }

    const submitForm = (event) => {
        event.preventDefault();
        setError('');
        props.dispatch(userRegister({ name, lastname, email, password }, props.user.users));
    }

    const showUsers = (user) => (
        user.users ?
            user.users.map((item) => (
                item ? <tr key={item._id}>
                    <td>{item.name}</td>
                    <td>{item.lastname}</td>
                    <td>{item.email}</td>
                </tr> :
                    null
            ))
            : null
    )

    return (
        <div className='rl_container'>

            <form onSubmit={submitForm}>

                <h2>Add  User</h2>
                <div className='form_element'>
                    <input type="text" placeholder='Enter name' value={name} onChange={handleInputChange(setName)} />
                </div>

                <div className='form_element'>
                    <input type="text" placeholder='Enter lastname' value={lastname} onChange={handleInputChange(setLastname)} />
                </div>

                <div className='form_element'>
                    <input type="email" placeholder='Enter email' value={email} onChange={handleInputChange(setEmail)} />
                </div>

                <div className='form_element'>
                    <input type="password" placeholder='Enter password' value={password} onChange={handleInputChange(setPassword)} />
                </div>

                {
                    error ?
                        <div className='error'>
                           {error} 
                        </div>
                        : null
                }

                <button type="submit">Add user</button>
            </form>

            <div className='current_users'>
                <h4>Current user</h4>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Lastname</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {showUsers(props.user)}
                    </tbody>
                </table>
            </div>

        </div>
    );
};

const mapStateToProps = (state) => {
   
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Register);