import React, {useEffect} from 'react';
import { Routes, Route } from 'react-router-dom';
import {LoginPage, ProfilePage, RegisterPage, ForgotPasswordPage, ResetPasswordPage, HomePage} from "../../pages";
import {OnlyAuth, OnlyUnAuth} from "../protected-route/protected-route";
import {checkUserAuth} from "../../services/thunks/user";
import {useDispatch} from "../../services/hooks";
import {ProfileMain} from "../profile/content/profile-main/profile-main";
import Chat from "../chat/chat";
import {CarsDetailsPage} from "../../pages/сars";
import {AppHeader} from "../header/header";
import {ListingAddPage} from "../../pages/listings/listing-add-page";
import {ListingsPage} from "../../pages/listings/listings-page";
import {ListingShowPage} from "../../pages/listings/listings-show-page";
import Roadmap from "../../pages/roadmap/roadmap-page";
import TinderCard from "../../pages/tinder/tinder-page";


function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(checkUserAuth());
    }, [dispatch]);


    return (
        <>
            <AppHeader />
            <Routes>
                <Route path='/chat' element={<OnlyAuth component={<Chat />} />}/>
                <Route path='/' element={<ListingsPage />}/>
                <Route path='/login' element={<OnlyUnAuth component={<LoginPage />} />} />
                <Route path='/register' element={<OnlyUnAuth component={<RegisterPage />} />} />
                <Route path='/forgot-password' element={<OnlyUnAuth component={<ForgotPasswordPage />} />} />
                <Route path='/reset-password' element={<OnlyUnAuth component={<ResetPasswordPage />} />} />
                <Route path='/reset-password/:token' element={<OnlyUnAuth component={<ResetPasswordPage />} />} />
                <Route path='/profile/' element={<OnlyAuth component={ <ProfilePage element={<ProfileMain />} /> } /> } />
                <Route path='/profile/favorites' element={<OnlyAuth component={ <ProfilePage element={<ProfileMain />} /> } /> } />

                <Route path='/car/add-details' element={<OnlyAuth component={<CarsDetailsPage />} /> } />
                <Route path='/listings/add' element={<OnlyAuth component={<ListingAddPage />} /> } />

                <Route path='/listings' element={<ListingsPage />} />
                <Route path='/listing/:listingId' element={<ListingShowPage />} />

                <Route path='/roadmap' element={<Roadmap />} />
                <Route path='/tinder' element={<TinderCard />} />

                <Route path='/*' element={<HomePage />}/>
            </Routes>
        </>

    );
}

export default App;
