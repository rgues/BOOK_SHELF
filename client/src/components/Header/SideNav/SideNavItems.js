import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOut, faHome, faFileText, faSignIn } from '@fortawesome/free-solid-svg-icons';


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
        restricted: false
    },
    {
        type: 'navItem',
        icon: faFileText,
        text: 'Add Admins',
        link: '/user/register',
        restricted: false
    },
    {
        type: 'navItem',
        icon: faSignIn,
        text: 'Login',
        link: '/login',
        restricted: false
    },
    {
        type: 'navItem',
        icon: faFileText,
        text: 'My reviews',
        link: '/user/user-reviews',
        restricted: false
    },
    {
        type: 'navItem',
        icon: faFileText,
        text: 'Add reviews',
        link: '/user/add',
        restricted: false
    },
    {
        type: 'navItem',
        icon: faSignOut,
        text: 'Logout',
        link: '/user/logout',
        restricted: false
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

const showItems = () => (items.map((item, i) => {
    return element(item,i);
}))


const SideNavItems = () => {
    return (
        <div>
            {showItems()}
        </div>
    );
};

export default SideNavItems;