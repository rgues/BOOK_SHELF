import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOut, faHome, faFileText, faSignIn } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';


const SideNavItems = ({ user }) => {

    const items = [
        {
            type: 'navItem',
            icon: faHome,
            text: 'Home',
            link: '/',
            restricted: false
        },
        {
            type: 'navItem',
            icon: faFileText,
            text: 'My Profile',
            link: '/user',
            restricted: true
        },
        {
            type: 'navItem',
            icon: faFileText,
            text: 'Add Admins',
            link: '/user/register',
            restricted: true
        },
        {
            type: 'navItem',
            icon: faSignIn,
            text: 'Login',
            link: '/login',
            restricted: false,
            exclude: true
        },
        {
            type: 'navItem',
            icon: faFileText,
            text: 'My reviews',
            link: '/user/user-reviews',
            restricted: true
        },
        {
            type: 'navItem',
            icon: faFileText,
            text: 'Add reviews',
            link: '/user/add',
            restricted: true
        },
        {
            type: 'navItem',
            icon: faSignOut,
            text: 'Logout',
            link: '/user/logout',
            restricted: true
        }
    ];


    const element = (item, key) => (
        <div key={key} className={item.type}>
            <Link to={item.link} >
                <FontAwesomeIcon icon={item.icon} name={item.text} />
                {item.text}
            </Link>
        </div>
    )

    const showItems = (user) => (

        user.login ? items.map((item, i) => {

            if (user.login.isAuth) {
                return !item.exclude ? element(item, i) : null;
            } else {
                return !item.restricted ? element(item, i) : null;
            }
        })
            : null

    )

    return (
        <div>
            {showItems(user)}
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(SideNavItems);