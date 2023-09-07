import React, { useState } from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../../actions';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Login = (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const nagivate = useNavigate();
    let user = props.user;

    useEffect(() => {
        if (props.user.login.isAuth) {
            nagivate('/user');
        }
    },[])

    // Sent login data
    const submitForm = (e) => {
        e.preventDefault();
        props.dispatch(loginUser({ email, password }))
    }

    // update the form value
    const handleInputEmail = (event) => {
        setEmail(event.target.value);
    }

    // update the form value
    const handleInputPassword = (event) => {
        setPassword(event.target.value);
    }

    return (
        <div className='rl_container'>
            <form onSubmit={submitForm}>
                <h2>Login here</h2>

                <div className='form_element'>
                    <input
                        type="email"
                        placeholder='Enter your Email'
                        value={email}
                        onChange={handleInputEmail} />
                </div>

                <div className='form_element'>
                    <input type="password"
                        placeholder='Enter your Password'
                        value={password}
                        onChange={handleInputPassword} />
                </div>

                <button type="submit">Log in</button>

                <div className='error'>
                    {
                        user.login ?
                            <div>
                                {user.login.message}
                            </div>
                            : null
                    }
                </div>
            </form>
        </div>
    );

}

const mapStateToProps = (state, ownProps) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Login);