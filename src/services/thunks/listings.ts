import {AppThunkAction} from "../types";
import {request} from "../api/user";
import {
    GET_BODYTYPES_BRAND_FAILED,
    GET_BODYTYPES_BY_MODEL,
    GET_BODYTYPES_BY_MODEL_SUCCEED,
    GET_COLORS_BY_MODEL,
    GET_COLORS_BY_MODEL_FAILED,
    GET_COLORS_BY_MODEL_SUCCEED,
    GET_DRIVES_BY_MODEL,
    GET_DRIVES_BY_MODEL_FAILED,
    GET_DRIVES_BY_MODEL_SUCCEED,
    GET_ENGINES_BY_MODEL,
    GET_ENGINES_BY_MODEL_FAILED,
    GET_ENGINES_BY_MODEL_SUCCEED,
    GET_TRANSMISSIONS_BY_MODEL,
    GET_TRANSMISSIONS_BY_MODEL_FAILED,
    GET_TRANSMISSIONS_BY_MODEL_SUCCEED,
    SET_ACTIVE_BODYTYPE,
    SET_ACTIVE_BRAND,
    SET_ACTIVE_COLOR, SET_ACTIVE_DESCRIPTION,
    SET_ACTIVE_DRIVE,
    SET_ACTIVE_ENGINE, SET_ACTIVE_EXCHANGE,
    SET_ACTIVE_MILEAGE, SET_ACTIVE_OWNERSCOUNT,
    SET_ACTIVE_PHOTOS,
    SET_ACTIVE_PLACE,
    SET_ACTIVE_PRICE, SET_ACTIVE_PTS,
    SET_ACTIVE_TRANSMISSION, SET_ACTIVE_VIN, SET_ACTIVE_YEAR
} from "../action-types/listings";
import {BodyType, Brand, Color, Drive, Engine, Model, Transmission} from "../../type/car/cars-details";

export const getEnginesByModel = (modelId: string): AppThunkAction => dispatch => {
    dispatch({type: GET_ENGINES_BY_MODEL});
    request(`/engines/modelId`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({modelId})
    })
        .then(data => {
            if (data.success){
                dispatch({type: GET_ENGINES_BY_MODEL_SUCCEED, enginesByModel: data.engines})
            } else {
                dispatch({type: GET_ENGINES_BY_MODEL_FAILED})
            }
        })
        .catch(error => dispatch({type: GET_ENGINES_BY_MODEL_FAILED}));
};

export const getDrivesByModel = (modelId: string): AppThunkAction => dispatch => {
    dispatch({type: GET_DRIVES_BY_MODEL});
    request(`/drives/modelId`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({modelId})
    })
        .then(data => {
            if (data.success){
                dispatch({type: GET_DRIVES_BY_MODEL_SUCCEED, drivesByModel: data.drives})
            } else {
                dispatch({type: GET_DRIVES_BY_MODEL_FAILED})
            }
        })
        .catch(error => dispatch({type: GET_DRIVES_BY_MODEL_FAILED}));
};

export const getColorsByModel = (modelId: string): AppThunkAction => dispatch => {
    dispatch({type: GET_COLORS_BY_MODEL});
    request(`/colors/modelId`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({modelId})
    })
        .then(data => {
            if (data.success){
                dispatch({type: GET_COLORS_BY_MODEL_SUCCEED, colorsByModel: data.colors})
            } else {
                dispatch({type: GET_COLORS_BY_MODEL_FAILED})
            }
        })
        .catch(error => dispatch({type: GET_COLORS_BY_MODEL_FAILED}));
};

export const getBodyTypesByModel = (modelId: string): AppThunkAction => dispatch => {
    dispatch({type: GET_BODYTYPES_BY_MODEL});
    request(`/bodytypes/modelId`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({modelId})
    })
        .then(data => {
            if (data.success){
                dispatch({type: GET_BODYTYPES_BY_MODEL_SUCCEED, bodyTypesByModel: data.bodytypes})
            } else {
                dispatch({type: GET_BODYTYPES_BRAND_FAILED})
            }
        })
        .catch(error => dispatch({type: GET_BODYTYPES_BRAND_FAILED}));
};

export const getTransmissionsByModel = (modelId: string): AppThunkAction => dispatch => {
    dispatch({type: GET_TRANSMISSIONS_BY_MODEL});
    request(`/transmissions/modelId`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({modelId})
    })
        .then(data => {
            if (data.success){
                dispatch({type: GET_TRANSMISSIONS_BY_MODEL_SUCCEED, transmissionsByModel: data.transmissions})
            } else {
                dispatch({type: GET_TRANSMISSIONS_BY_MODEL_FAILED})
            }
        })
        .catch(error => dispatch({type: GET_TRANSMISSIONS_BY_MODEL_FAILED}));
};

export const setActiveModel = (activeModel: Model | null) : AppThunkAction=> dispatch => {
    dispatch({type: 'SET_ACTIVE_MODEL', activeModel})
}

export const setActiveBrand = (activeBrand: Brand | null): AppThunkAction => dispatch => {
    dispatch({ type: SET_ACTIVE_BRAND, activeBrand });
};

export const setActiveDrive = (activeDrive: Drive | null): AppThunkAction => dispatch => {
    dispatch({ type: SET_ACTIVE_DRIVE, activeDrive });
};

export const setActiveEngine = (activeEngine: Engine | null): AppThunkAction => dispatch => {
    dispatch({ type: SET_ACTIVE_ENGINE, activeEngine });
};

export const setActiveBodyType = (activeBodyType: BodyType | null): AppThunkAction => dispatch => {
    dispatch({ type: SET_ACTIVE_BODYTYPE, activeBodyType });
};

export const setActiveColor = (activeColor: Color | null): AppThunkAction => dispatch => {
    dispatch({ type: SET_ACTIVE_COLOR, activeColor });
};

export const setActiveTransmission = (activeTransmission: Transmission | null): AppThunkAction => dispatch => {
    dispatch({ type: SET_ACTIVE_TRANSMISSION, activeTransmission });
};

export const setActivePrice = (activePrice: string | null): AppThunkAction => dispatch => {
    dispatch({ type: SET_ACTIVE_PRICE, activePrice });
};

export const setActiveMileage = (activeMileage: number | null): AppThunkAction => dispatch => {
    dispatch({ type: SET_ACTIVE_MILEAGE, activeMileage });
};

export const setActivePhotos = (activePhotos: string[] | null): AppThunkAction => dispatch => {
    dispatch({ type: SET_ACTIVE_PHOTOS, activePhotos });
};

export const setActivePlace = (activePlace: string | null): AppThunkAction => dispatch => {
    dispatch({ type: SET_ACTIVE_PLACE, activePlace });
};

export const setActiveYear = (activeYear: number | null): AppThunkAction => dispatch => {
    dispatch({ type: SET_ACTIVE_YEAR, activeYear });
};

export const setActiveVIN = (activeVIN: string | null): AppThunkAction => dispatch => {
    dispatch({ type: SET_ACTIVE_VIN, activeVIN });
};

export const setActiveOwnersCount = (activeOwnersCount: number | null): AppThunkAction => dispatch => {
    dispatch({ type: SET_ACTIVE_OWNERSCOUNT, activeOwnersCount });
};

export const setActiveExchange = (activeExchange: boolean | null): AppThunkAction => dispatch => {
    dispatch({ type: SET_ACTIVE_EXCHANGE, activeExchange });
};

export const setActiveDescription = (activeDescription: string | null): AppThunkAction => dispatch => {
    dispatch({ type: SET_ACTIVE_DESCRIPTION, activeDescription });
};

export const setActivePTS = (activePTS: string | null): AppThunkAction => dispatch => {
    dispatch({ type: SET_ACTIVE_PTS, activePTS });
};