import {TActionUserType} from "./user";
import type { ThunkAction, ThunkDispatch } from 'redux-thunk';
import {rootReducer} from "../reducers";
import {TActionCarDetailsType} from "./cars-details";
import {TListingActionTypes} from "./listing-add";
import {TListings} from "./listings";
import {TRoadmapActionType} from "./roadmap";


export type AppActions =  | TActionUserType | TActionCarDetailsType | TListingActionTypes | TListings | TRoadmapActionType;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = ThunkDispatch<RootState, unknown, AppActions>;
export type AppThunkAction<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AppActions>;
