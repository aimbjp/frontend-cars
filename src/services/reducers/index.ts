import { combineReducers } from 'redux';
import { userReducer } from "./user";
import {carDetailsReducer} from "./car-details";
import {listingReducer} from "./listings";

export const rootReducer = combineReducers({
    userReducer: userReducer,
    carsDetailsReducer: carDetailsReducer,
    listingReducer: listingReducer
});