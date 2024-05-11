import {IParametersSearch} from "../../type/listings/listings";
import {AppDispatch, AppThunkAction} from "../types";
import {
    GET_BODYTYPES_BY_MODEL_LISTINGS,
    GET_BODYTYPES_BY_MODEL_LISTINGS_FAILED,
    GET_BODYTYPES_BY_MODEL_LISTINGS_SUCCEED,
    GET_BRANDS_LISTINGS,
    GET_BRANDS_LISTINGS_FAILED,
    GET_BRANDS_LISTINGS_SUCCEED,
    GET_COLORS_BY_MODEL_LISTINGS,
    GET_COLORS_BY_MODEL_LISTINGS_FAILED,
    GET_COLORS_BY_MODEL_LISTINGS_SUCCEED,
    GET_DRIVES_BY_MODEL_LISTINGS,
    GET_DRIVES_BY_MODEL_LISTINGS_FAILED,
    GET_DRIVES_BY_MODEL_LISTINGS_SUCCEED,
    GET_ENGINES_BY_MODEL_LISTINGS,
    GET_ENGINES_BY_MODEL_LISTINGS_FAILED,
    GET_ENGINES_BY_MODEL_LISTINGS_SUCCEED,
    GET_LISTINGS,
    GET_LISTINGS_FAILURE,
    GET_LISTINGS_SUCCESS,
    GET_MODELS_BY_BRAND_LISTINGS,
    GET_MODELS_BY_BRAND_LISTINGS_FAILED,
    GET_MODELS_BY_BRAND_LISTINGS_SUCCEED,
    GET_TRANSMISSIONS_BY_MODEL_LISTINGS,
    GET_TRANSMISSIONS_BY_MODEL_LISTINGS_FAILED,
    GET_TRANSMISSIONS_BY_MODEL_LISTINGS_SUCCEED, RESET_MODELS_BY_BRAND,
    SET_ACTIVE_TAB,
    UPDATE_SEARCH_PARAMETERS
} from "../action-types/listings";
import {fetchGetListings} from "../api/listings";
import {request} from "../api/user";
import {fetchGetBrands} from "../api/car/car-deatails";


export const getListings = (parameters: IParametersSearch | null): AppThunkAction => {
    return (dispatch: AppDispatch) => {
        dispatch({type: GET_LISTINGS})

        fetchGetListings(parameters)
            .then(res => {
                if(res.success){
                    dispatch({type: GET_LISTINGS_SUCCESS, listings: res})
                } else {
                    dispatch({type: GET_LISTINGS_FAILURE, error: res.message})
                }
            })
            .catch(err => dispatch({type: GET_LISTINGS_FAILURE, error: err}))
    }
}

export const updateSearchParameters = (parameters: IParametersSearch): AppThunkAction => dispatch =>  {
    dispatch({
        type: UPDATE_SEARCH_PARAMETERS,
        payload: parameters
    })
};

export const setActiveTab = (activeTab: string): AppThunkAction => {
    return dispatch => {
        dispatch({type: SET_ACTIVE_TAB, activeTab})
    }
}


export const getEnginesByModel = (modelId: string[]): AppThunkAction => dispatch => {
    dispatch({type: GET_ENGINES_BY_MODEL_LISTINGS});
    request(`/engines/modelId`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({modelId})
    })
        .then(data => {
            if (data.success){
                dispatch({type: GET_ENGINES_BY_MODEL_LISTINGS_SUCCEED, enginesByModel: data.engines})
            } else {
                dispatch({type: GET_ENGINES_BY_MODEL_LISTINGS_FAILED})
            }
        })
        .catch(error => dispatch({type: GET_ENGINES_BY_MODEL_LISTINGS_FAILED}));
};

export const getDrivesByModel = (modelId: string[]): AppThunkAction => dispatch => {
    dispatch({type: GET_DRIVES_BY_MODEL_LISTINGS});
    request(`/drives/modelId`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({modelId})
    })
        .then(data => {
            if (data.success){
                dispatch({type: GET_DRIVES_BY_MODEL_LISTINGS_SUCCEED, drivesByModel: data.drives})
            } else {
                dispatch({type: GET_DRIVES_BY_MODEL_LISTINGS_FAILED})
            }
        })
        .catch(error => dispatch({type: GET_DRIVES_BY_MODEL_LISTINGS_FAILED}));
};

export const getColorsByModel = (modelId: string[]): AppThunkAction => dispatch => {
    dispatch({type: GET_COLORS_BY_MODEL_LISTINGS});
    request(`/colors/modelId`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({modelId})
    })
        .then(data => {
            if (data.success){
                dispatch({type: GET_COLORS_BY_MODEL_LISTINGS_SUCCEED, colorsByModel: data.colors})
            } else {
                dispatch({type: GET_COLORS_BY_MODEL_LISTINGS_FAILED})
            }
        })
        .catch(error => dispatch({type: GET_COLORS_BY_MODEL_LISTINGS_FAILED}));
};

export const getBodyTypesByModel = (modelId: string[]): AppThunkAction => dispatch => {
    dispatch({type: GET_BODYTYPES_BY_MODEL_LISTINGS});
    request(`/bodytypes/modelId`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({modelId})
    })
        .then(data => {
            if (data.success){
                dispatch({type: GET_BODYTYPES_BY_MODEL_LISTINGS_SUCCEED, bodyTypesByModel: data.bodytypes})
            } else {
                dispatch({type: GET_BODYTYPES_BY_MODEL_LISTINGS_FAILED})
            }
        })
        .catch(error => dispatch({type: GET_BODYTYPES_BY_MODEL_LISTINGS_FAILED}));
};

export const getTransmissionsByModel = (modelId: string[]): AppThunkAction => dispatch => {
    dispatch({type: GET_TRANSMISSIONS_BY_MODEL_LISTINGS});
    request(`/transmissions/modelId`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({modelId})
    })
        .then(data => {
            if (data.success){
                dispatch({type: GET_TRANSMISSIONS_BY_MODEL_LISTINGS_SUCCEED, transmissionsByModel: data.transmissions})
            } else {
                dispatch({type: GET_TRANSMISSIONS_BY_MODEL_LISTINGS_FAILED})
            }
        })
        .catch(error => dispatch({type: GET_TRANSMISSIONS_BY_MODEL_LISTINGS_FAILED}));
};

export const getBrands = (): AppThunkAction => {
    return (dispatch: AppDispatch) => {
        dispatch({type: GET_BRANDS_LISTINGS});

        fetchGetBrands()
            .then(res => {
                if (res.success) {
                    dispatch({type: GET_BRANDS_LISTINGS_SUCCEED, brands: res.brands})
                } else {
                    dispatch({type: GET_BRANDS_LISTINGS_FAILED})
                }
            })
            .catch(error => dispatch({type: GET_BRANDS_LISTINGS_FAILED}));
    }
}

export const getModelsByBrandId = (brandIds: string[]): AppThunkAction => dispatch => {
    dispatch({type: GET_MODELS_BY_BRAND_LISTINGS});
    request(`/models/brandId`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({brandIds})
    })
        .then(data => {
            if (data.success) {
                dispatch({type: GET_MODELS_BY_BRAND_LISTINGS_SUCCEED, models: data.models})
            } else {
                dispatch({type: GET_MODELS_BY_BRAND_LISTINGS_FAILED})
            }
        })
        .catch(error => dispatch({type: GET_MODELS_BY_BRAND_LISTINGS_FAILED}));
};


export const resetModelsByBrandId = (): AppThunkAction => dispatch => dispatch({type: RESET_MODELS_BY_BRAND})
