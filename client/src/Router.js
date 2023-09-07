import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import BooksView from './components/Books'
import Layout from './hoc/Layout';
import Login from './containers/Admin/login';
import Auth from './hoc/auth';
import User from './components/Admin';
import AddReview from './containers/Admin/add';

const AuthenticateHome = Auth(Home,null);
const UserProfile = Auth(User,true);
const UserLogin = Auth(Login,false);
const AddReviewView =  Auth(AddReview,true);

const Router = () => (
    <Layout>
        <Routes>
            <Route path='/' exact element={ <AuthenticateHome/>} />
            <Route path='/login' exact element={<UserLogin />} />
            <Route path='/user' exact element={<UserProfile />} />
            <Route path='/user/add' exact element={<AddReviewView />} />
            <Route path='/books/:id' exact element={<BooksView />} />
        </Routes>
    </Layout>
)

export default Router;