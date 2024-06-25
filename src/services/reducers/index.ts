import { combineReducers } from 'redux';
import { userReducer } from "./user";
import {carDetailsReducer} from "./car-details";
import {listingReducer} from "./listing-add";
import {listingsReducer} from "./listings";
import {roadmapReducer} from "./roadmap";

export const rootReducer = combineReducers({
    userReducer: userReducer,
    carsDetailsReducer: carDetailsReducer,
    listingReducer: listingReducer,
    listingsReducer: listingsReducer,
    roadmapReducer: roadmapReducer
});