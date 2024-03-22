import React, {useEffect} from 'react';
import { Routes, Route } from 'react-router-dom';
import {LoginPage, ProfilePage, RegisterPage, ForgotPasswordPage, ResetPasswordPage, HomePage} from "../../pages/index";
import {OnlyAuth, OnlyUnAuth} from "../protected-route/protected-route";
import {useDispatch} from "react-redux";
import {checkUserAuth} from "../../services/actions/user";
import {ProfileContent} from "../profile/content/profile-content";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        //TODO: relates to storage
        // @ts-ignore
        dispatch(checkUserAuth());
    }, [dispatch]);

    return (
    <Routes>
        <Route path='/' element={<HomePage />}/>
        <Route path='/login' element={<OnlyUnAuth component={<LoginPage />} />} />
        <Route path='/register' element={<OnlyUnAuth component={<RegisterPage />} />} />
        <Route path='/forgot-password' element={<OnlyUnAuth component={<ForgotPasswordPage />} />} />
        <Route path='/reset-password' element={<OnlyUnAuth component={<ResetPasswordPage />} />} />
        <Route path='/profile/' element={<OnlyAuth component={ <ProfilePage element={<ProfileContent />} /> } /> } />
        <Route path='/profile/favorites' element={<OnlyAuth component={ <ProfilePage element={<ProfileContent />} /> } /> } />
        <Route path='/*' element={<HomePage />}/>
    </Routes>
    );
}

export default App;
