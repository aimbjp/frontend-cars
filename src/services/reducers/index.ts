import { combineReducers } from 'redux';
import { userReducer } from "./user";
import {carDetailsReducer} from "./car-details";

export const rootReducer = combineReducers({
    userReducer: userReducer,
    carsDetailsReducer: carDetailsReducer,
});