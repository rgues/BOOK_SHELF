import React from 'react';

const User = (props) => {

    console.log(props);
    let user =  props.user.login;

    return (
        <div className='user_container'>
                <div className='avatar'>
                    <img alt="avatar" src="/images/avatar.png" />
                </div>
                <div className='nfo'>
                    <div><span>Name:</span>{user ? user.name : null }</div>
                    <div><span>Lastname:</span>{user ? user.lastname : null}</div>
                    <div><span>Email:</span>{ user ? user.email : null}</div>
                </div>
                
        </div>
    );
};

export default User;