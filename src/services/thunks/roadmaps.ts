import {AppThunkAction} from "../types";
import {Roadmap} from "../../type/roadmap";
import {ADD_CAR, DELETE_CAR, FETCH_ROADMAPS} from "../action-types/roadmap";
import {request} from "../api/user";

export const fetchRoadmaps = (): AppThunkAction => async (dispatch) => {
    const token = localStorage.getItem('accessToken');
    const response = await fetch('/api/roadmaps/user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({userId: 2})
    });
    const data = await response.json();
    dispatch({
        type: FETCH_ROADMAPS,
        payload: data.roadmaps,
    });
};

export const addCar = (car: Partial<Roadmap>): AppThunkAction => async (dispatch) => {
    const token = localStorage.getItem('accessToken');
    const response = await fetch('/api/roadmaps/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(car),
    });
    const data = await response.json();
    dispatch({
        type: ADD_CAR,
        payload: data.roadmap,
    });
};

export const deleteCar = (roadmapId: number): AppThunkAction => async (dispatch) => {
    const token = localStorage.getItem('accessToken');
    await fetch(`/api/roadmaps/${roadmapId}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    dispatch({
        type: DELETE_CAR,
        payload: roadmapId,
    });
};
