import React, {useEffect} from 'react';
import { Routes, Route } from 'react-router-dom';
import {LoginPage, ProfilePage, RegisterPage, ForgotPasswordPage, ResetPasswordPage, HomePage} from "../../pages";
import {OnlyAuth, OnlyUnAuth} from "../protected-route/protected-route";
import {checkUserAuth} from "../../services/thunks/user";
import {useDispatch} from "../../services/hooks";
import {ProfileMain} from "../profile/content/profile-main/profile-main";
import io from 'socket.io-client';
import Chat from "../chat/chat";
//
// const socket = io('ws://localhost:3000', {
//     transports: ['websocket'],
// });
// // Обработчик для успешного подключения
// socket.on('connect', () => {
//     console.log('Подключение установлено');
// });
//
// // Обработчик для ошибок
// socket.on('connect_error', (error: any) => {
//     console.error('Ошибка подключения:', error);
// });
//
// // Обработчик для отключения
// socket.on('disconnect', () => {
//     console.log('Соединение с сервером разорвано');
// });

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(checkUserAuth());
    }, [dispatch]);


    return (
    <Routes>
        <Route path='/chat' element={<OnlyAuth component={<Chat />} />}/>
        <Route path='/' element={<HomePage />}/>
        <Route path='/login' element={<OnlyUnAuth component={<LoginPage />} />} />
        <Route path='/register' element={<OnlyUnAuth component={<RegisterPage />} />} />
        <Route path='/forgot-password' element={<OnlyUnAuth component={<ForgotPasswordPage />} />} />
        <Route path='/reset-password' element={<OnlyUnAuth component={<ResetPasswordPage />} />} />
        <Route path='/reset-password/:token' element={<OnlyUnAuth component={<ResetPasswordPage />} />} />
        <Route path='/profile/' element={<OnlyAuth component={ <ProfilePage element={<ProfileMain />} /> } /> } />
        <Route path='/profile/favorites' element={<OnlyAuth component={ <ProfilePage element={<ProfileMain />} /> } /> } />
        <Route path='/*' element={<HomePage />}/>
    </Routes>
    );
}

export default App;
