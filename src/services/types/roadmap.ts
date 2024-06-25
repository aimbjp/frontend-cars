import {ADD_CAR, DELETE_CAR, FETCH_ROADMAPS} from "../action-types/roadmap";
import {Roadmap} from "../../type/roadmap";

export interface IFetchRoadmapsAction {
    readonly type: typeof FETCH_ROADMAPS;
    payload: Roadmap[];
}

export interface IAddCarAction {
    readonly type: typeof ADD_CAR;
    payload: Roadmap;
}

export interface IDeleteCarAction {
    readonly type: typeof DELETE_CAR;
    payload: number;
}

export type TRoadmapActionType =
    | IFetchRoadmapsAction
    | IAddCarAction
    | IDeleteCarAction;