import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import BooksView from './components/Books'
import Layout from './hoc/Layout';
import Login from './containers/Admin/login';
import Auth from './hoc/auth';
import User from './components/Admin';
import AddReview from './containers/Admin/add';
import UserPosts from './components/Admin/userPosts';
import EditReview from './containers/Admin/edit';
import Register from './containers/Admin/register';
import Logout from './components/Admin/logout';

const AuthenticateHome = Auth(Home,null);
const UserProfile = Auth(User,true);
const UserLogin = Auth(Login,false);
const UserLogout = Auth(Logout,true);
const RegisterView = Auth(Register,true);
const AddReviewView =  Auth(AddReview,true);
const UserPostsView =  Auth(UserPosts,true);
const EditReviewView =  Auth(EditReview,true);

const Router = () => (
    <Layout>
        <Routes>
            <Route path='/' exact element={ <AuthenticateHome/>} />
            <Route path='/login' exact element={<UserLogin />} />
            <Route path='/user' exact element={<UserProfile />} />
            <Route path='/user/register' exact element={<RegisterView />} />
            <Route path='/user/add' exact element={<AddReviewView />} />
            <Route path='/user/user-reviews' exact element={<UserPostsView />} />
            <Route path='/user/edit-post/:id' exact element={<EditReviewView />} />
            <Route path='/user/logout' exact element={<UserLogout />} />
            <Route path='/books/:id' exact element={<BooksView />} />
        </Routes>
    </Layout>
)

export default Router;