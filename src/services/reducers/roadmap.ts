import {Roadmap} from "../../type/roadmap";
import {TRoadmapActionType} from "../types/roadmap";
import {ADD_CAR, DELETE_CAR, FETCH_ROADMAPS} from "../action-types/roadmap";

interface RoadmapState {
    roadmaps: Roadmap[];
}

const initialState: RoadmapState = {
    roadmaps: [],
};

export const roadmapReducer = (state = initialState, action: TRoadmapActionType): RoadmapState => {
    switch (action.type) {
        case FETCH_ROADMAPS:
            return {
                ...state,
                roadmaps: action.payload,
            };
        case ADD_CAR:
            return {
                ...state,
                roadmaps: [...state.roadmaps, action.payload],
            };
        case DELETE_CAR:
            return {
                ...state,
                roadmaps: state.roadmaps.filter((roadmap) => roadmap.roadmap_id !== action.payload),
            };
        default:
            return state;
    }
};
