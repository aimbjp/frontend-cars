import {AppDispatch, AppThunkAction} from "../types";
import {
    ADD_BODY_TYPE,
    ADD_BODY_TYPE_FAILED,
    ADD_BODY_TYPE_SUCCEED,
    ADD_BRAND,
    ADD_BRAND_FAILED,
    ADD_BRAND_SUCCEED,
    ADD_COLOR,
    ADD_COLOR_FAILED,
    ADD_COLOR_SUCCEED,
    ADD_DRIVE,
    ADD_DRIVE_FAILED,
    ADD_DRIVE_SUCCEED,
    ADD_ENGINE,
    ADD_ENGINE_FAILED,
    ADD_ENGINE_SUCCEED,
    ADD_MODEL, ADD_MODEL_ENGINE_ASSOCIATION, ADD_MODEL_ENGINE_ASSOCIATION_FAILED, ADD_MODEL_ENGINE_ASSOCIATION_SUCCEED,
    ADD_MODEL_FAILED,
    ADD_MODEL_SUCCEED,
    ADD_TRANSMISSION,
    ADD_TRANSMISSION_FAILED,
    ADD_TRANSMISSION_SUCCEED,
    ASSOCIATE_MODEL_BRAND,
    ASSOCIATE_MODEL_BRAND_FAILED,
    ASSOCIATE_MODEL_BRAND_SUCCEED,
    DELETE_BODY_TYPE,
    DELETE_BODY_TYPE_FAILED,
    DELETE_BODY_TYPE_SUCCEED,
    DELETE_COLOR,
    DELETE_COLOR_FAILED,
    DELETE_COLOR_SUCCEED,
    DELETE_DRIVE,
    DELETE_DRIVE_FAILED,
    DELETE_DRIVE_SUCCEED,
    DELETE_ENGINE,
    DELETE_ENGINE_FAILED,
    DELETE_ENGINE_SUCCEED,
    DELETE_TRANSMISSION,
    DELETE_TRANSMISSION_FAILED,
    DELETE_TRANSMISSION_SUCCEED,
    GET_BODY_TYPES,
    GET_BODY_TYPES_FAILED,
    GET_BODY_TYPES_SUCCEED,
    GET_BRANDS,
    GET_BRANDS_FAILED,
    GET_BRANDS_SUCCEED,
    GET_DRIVES,
    GET_DRIVES_FAILED,
    GET_DRIVES_SUCCEED,
    GET_ENGINES,
    GET_ENGINES_FAILED,
    GET_ENGINES_SUCCEED, GET_MODELS_BY_BRAND, GET_MODELS_BY_BRAND_FAILED,
    GET_MODELS_BY_BRAND_SUCCEED,
    GET_MODELS_WITHOUT_BRAND,
    GET_MODELS_WITHOUT_BRAND_FAILED,
    GET_MODELS_WITHOUT_BRAND_SUCCEED,
    UPDATE_BODY_TYPE,
    UPDATE_BODY_TYPE_FAILED,
    UPDATE_BODY_TYPE_SUCCEED,
    UPDATE_COLOR,
    UPDATE_COLOR_FAILED,
    UPDATE_COLOR_SUCCEED,
    UPDATE_DRIVE,
    UPDATE_DRIVE_FAILED,
    UPDATE_DRIVE_SUCCEED,
    UPDATE_ENGINE,
    UPDATE_ENGINE_FAILED,
    UPDATE_ENGINE_SUCCEED,
    UPDATE_TRANSMISSION,
    UPDATE_TRANSMISSION_FAILED,
    UPDATE_TRANSMISSION_SUCCEED
} from "../action-types/car-details";
import {
    fetchAddBrand, fetchAddDetailNameOnly,
    fetchAddModel,
    fetchAssociateModelWithBrand, fetchDeleteDetailById,
    fetchGetBrands, fetchGetDetails,
    fetchGetModelsWithoutBrand, fetchUpdateDetailWithId
} from "../api/car/car-deatails";
import {request} from "../api/user";

export const addBrand = (name: string): AppThunkAction => {

    return (dispatch: AppDispatch) => {
        if (!name) return;

        dispatch({type: ADD_BRAND});

        fetchAddBrand(name).then(
            res => {
                if (res.success) {
                    dispatch({type: ADD_BRAND_SUCCEED})
                } else {
                    dispatch({type: ADD_BRAND_FAILED})
                }
            }
        )
    }
}

export const addModel = (name: string): AppThunkAction => {
    return (dispatch: AppDispatch) => {
        dispatch({type: ADD_MODEL});
        if (!name) return;

        fetchAddModel(name).then(
            res => {
                if (res.success) {
                    dispatch({type: ADD_MODEL_SUCCEED})
                } else {
                    dispatch({type: ADD_MODEL_FAILED})
                }
            }
        )
    }
}

export const getBrands = (): AppThunkAction => {
    return (dispatch: AppDispatch) => {
        dispatch({type: GET_BRANDS});

        fetchGetBrands()
            .then(res => {
                if (res.success) {
                    dispatch({type: GET_BRANDS_SUCCEED, brands: res.brands})
                } else {
                    dispatch({type: GET_BRANDS_FAILED})
                }
            })
    }
}

export const getModelsWithoutBrand = (): AppThunkAction => {
    return (dispatch: AppDispatch) => {
        dispatch({type: GET_MODELS_WITHOUT_BRAND});

        fetchGetModelsWithoutBrand()
            .then(res => {
                if (res.success) {
                    dispatch({type: GET_MODELS_WITHOUT_BRAND_SUCCEED, modelsWithoutBrand: res.models})
                } else {
                    dispatch({type: GET_MODELS_WITHOUT_BRAND_FAILED})
                }
            })
    }
}

export const createAssociationModelBrand = (modelId: number, brandId: number): AppThunkAction => {
    return (dispatch: AppDispatch) => {
        dispatch({type: ASSOCIATE_MODEL_BRAND});

        fetchAssociateModelWithBrand(modelId, brandId)
            .then(res => {
                if (res.success) {
                    dispatch({type: ASSOCIATE_MODEL_BRAND_SUCCEED});
                    dispatch(getModelsWithoutBrand());
                } else {
                    dispatch({type: ASSOCIATE_MODEL_BRAND_FAILED});
                }
            })
    }
}


/**
 * Function to add a drive.
 *
 * @param {string} name - the name of the drive to be added
 * @return {AppThunkAction} a function that dispatches actions based on the result of adding a drive
 */
export const addDrive = (name: string): AppThunkAction => {
    return (dispatch: AppDispatch) => {
        dispatch({type: ADD_DRIVE});
        fetchAddDetailNameOnly('/drives', name).then(
            res => {
                if (res.success) {
                    dispatch({type: ADD_DRIVE_SUCCEED});
                } else {
                    dispatch({type: ADD_DRIVE_FAILED});
                }
            }
        )
    }
}

/**
 * Retrieves a list of drives by dispatching actions based on the fetch response.
 *
 * @return {AppThunkAction} A function that dispatches actions based on the fetch response.
 */
export const getDrives = (): AppThunkAction => {
    return (dispatch: AppDispatch) => {
        dispatch({type: GET_DRIVES});
        fetchGetDetails('/drives').then(
            res => {
                if (res.success) {
                    dispatch({type: GET_DRIVES_SUCCEED, drives: res.drives});
                } else {
                    dispatch({type: GET_DRIVES_FAILED});
                }
            }
        )
    }
}

/**
 * Updates the drive with the given id and name.
 *
 * @param {number} id - The id of the drive to update
 * @param {string} name - The new name for the drive
 * @return {AppThunkAction} An AppThunkAction that dispatches actions based on the update result
 */
export const updateDrive = (id: number, name: string): AppThunkAction => {
    return (dispatch: AppDispatch) => {
        dispatch({type: UPDATE_DRIVE});
        fetchUpdateDetailWithId('/drives', id, name).then(
            res => {
                if (res.success) {
                    dispatch({type: UPDATE_DRIVE_SUCCEED});
                } else {
                    dispatch({type: UPDATE_DRIVE_FAILED});
                }
            }
        )
    }
}

/**
 * Delete a drive by its id.
 *
 * @param {number} id - The id of the drive to delete
 * @return {AppThunkAction} A Redux thunk action
 */
export const deleteDrive = (id: number): AppThunkAction => {
    return (dispatch: AppDispatch) => {
        dispatch({type: DELETE_DRIVE});
        fetchDeleteDetailById('/drives', id).then(
            res => {
                if (res.success) {
                    dispatch({type: DELETE_DRIVE_SUCCEED});
                } else {
                    dispatch({type: DELETE_DRIVE_FAILED});
                }
            }
        )
    }
}


export const addEngine = (name: string): AppThunkAction => {
    return (dispatch: AppDispatch) => {
        dispatch({type: ADD_ENGINE});
        fetchAddDetailNameOnly('/engines', name).then(
            res => {
                if (res.success) {
                    dispatch({type: ADD_ENGINE_SUCCEED});
                } else {
                    dispatch({type: ADD_ENGINE_FAILED});
                }
            }
        )
    }
}

export const updateEngine = (id: number, name: string): AppThunkAction => {
    return (dispatch: AppDispatch) => {
        dispatch({type: UPDATE_ENGINE});
        fetchUpdateDetailWithId('/engines', id, { name }).then(
            res => {
                if (res.success) {
                    dispatch({type: UPDATE_ENGINE_SUCCEED});
                } else {
                    dispatch({type: UPDATE_ENGINE_FAILED});
                }
            }
        )
    }
}

export const deleteEngine = (id: number): AppThunkAction => {
    return (dispatch: AppDispatch) => {
        dispatch({type: DELETE_ENGINE});
        fetchDeleteDetailById('/engines', id).then(
            res => {
                if (res.success) {
                    dispatch({type: DELETE_ENGINE_SUCCEED});
                } else {
                    dispatch({type: DELETE_ENGINE_FAILED});
                }
            }
        )
    }
}

export const getEngines = (): AppThunkAction => {
    return (dispatch: AppDispatch) => {
        dispatch({type: GET_ENGINES});
        fetchGetDetails('/engines').then(
            res => {
                if (res.success) {
                    dispatch({type: GET_ENGINES_SUCCEED, engines: res.engines});
                } else {
                    dispatch({type: GET_ENGINES_FAILED});
                }
            }
        )
    }
}


export const getBodyTypes = (): AppThunkAction => {
    return (dispatch: AppDispatch) => {
        dispatch({type: GET_BODY_TYPES});
        fetchGetDetails('/bodytypes').then(
            res => {
                if (res.success) {
                    dispatch({type: GET_BODY_TYPES_SUCCEED, bodyTypes: res.bodyTypes});
                } else {
                    dispatch({type: GET_BODY_TYPES_FAILED});
                }
            }
        )
    }
}

export const addBodyType = (name: string): AppThunkAction => dispatch => {
    dispatch({ type: ADD_BODY_TYPE });
    fetchAddDetailNameOnly('/bodytypes', name)
        .then(res => dispatch({ type: res.success ? ADD_BODY_TYPE_SUCCEED : ADD_BODY_TYPE_FAILED }))
        .catch(() => dispatch({ type: ADD_BODY_TYPE_FAILED }));
};

export const updateBodyType = (id: number, name: string): AppThunkAction => dispatch => {
    dispatch({ type: UPDATE_BODY_TYPE });
    fetchUpdateDetailWithId('/bodytypes', id, { name })
        .then(res => dispatch({ type: res.success ? UPDATE_BODY_TYPE_SUCCEED : UPDATE_BODY_TYPE_FAILED }))
        .catch(() => dispatch({ type: UPDATE_BODY_TYPE_FAILED }));
};

export const deleteBodyType = (id: number): AppThunkAction => dispatch => {
    dispatch({ type: DELETE_BODY_TYPE });
    fetchDeleteDetailById('/bodytypes', id)
        .then(res => dispatch({ type: res.success ? DELETE_BODY_TYPE_SUCCEED : DELETE_BODY_TYPE_FAILED }))
        .catch(() => dispatch({ type: DELETE_BODY_TYPE_FAILED }));
};


export const addTransmission = (name: string): AppThunkAction => dispatch => {
    return(dispatch: AppDispatch) => {
        dispatch({type: ADD_TRANSMISSION});
        fetchAddDetailNameOnly('/transmissions', name)
            .then(res => dispatch({type: res.success ? ADD_TRANSMISSION_SUCCEED : ADD_TRANSMISSION_FAILED}))
            .catch(() => dispatch({type: ADD_TRANSMISSION_FAILED}))
    };
};

export const updateTransmission = (id: number, name: string): AppThunkAction => dispatch => {
    dispatch({ type: UPDATE_TRANSMISSION });
    fetchUpdateDetailWithId('/transmissions', id, { name })
        .then(res => dispatch({ type: res.success ? UPDATE_TRANSMISSION_SUCCEED : UPDATE_TRANSMISSION_FAILED }))
        .catch(() => dispatch({ type: UPDATE_TRANSMISSION_FAILED }));
};

export const deleteTransmission = (id: number): AppThunkAction => dispatch => {
    dispatch({ type: DELETE_TRANSMISSION });
    fetchDeleteDetailById('/transmissions', id)
        .then(res => dispatch({ type: res.success ? DELETE_TRANSMISSION_SUCCEED : DELETE_TRANSMISSION_FAILED }))
        .catch(() => dispatch({ type: DELETE_TRANSMISSION_FAILED }));
};

export const addColor = (name: string): AppThunkAction => dispatch => {
    dispatch({ type: ADD_COLOR });
    fetchAddDetailNameOnly('/colors', name)
        .then(res => dispatch({ type: res.success ? ADD_COLOR_SUCCEED : ADD_COLOR_FAILED }))
        .catch(() => dispatch({ type: ADD_COLOR_FAILED }));
};

export const updateColor = (id: number, name: string): AppThunkAction => dispatch => {
    dispatch({ type: UPDATE_COLOR });
    fetchUpdateDetailWithId('/colors', id, { name })
        .then(res => dispatch({ type: res.success ? UPDATE_COLOR_SUCCEED : UPDATE_COLOR_FAILED }))
        .catch(() => dispatch({ type: UPDATE_COLOR_FAILED }));
};

export const deleteColor = (id: number): AppThunkAction => dispatch => {
    dispatch({ type: DELETE_COLOR });
    fetchDeleteDetailById('/colors', id)
        .then(res => dispatch({ type: res.success ? DELETE_COLOR_SUCCEED : DELETE_COLOR_FAILED }))
        .catch(() => dispatch({ type: DELETE_COLOR_FAILED }));
};


export const getModelsByBrandId = (brandIds: string[]): AppThunkAction => dispatch => {
    dispatch({type: GET_MODELS_BY_BRAND});
    request(`/models/brandId`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({brandIds})
    })
        .then(data => {
            if (data.success){
                dispatch({type: GET_MODELS_BY_BRAND_SUCCEED, models: data.models})
            } else {
                dispatch({type: GET_MODELS_BY_BRAND_FAILED})
            }
        })
        .catch(error => dispatch({type: GET_MODELS_BY_BRAND_FAILED}));
};

export const addModelEngineAssociation = (modelIds: string[], engineIds: string[]): AppThunkAction => dispatch => {
    dispatch({type: ADD_MODEL_ENGINE_ASSOCIATION});
    request('/associate/model-engine', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({modelIds, engineIds})
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                dispatch({type: ADD_MODEL_ENGINE_ASSOCIATION_SUCCEED});
            } else {
                dispatch({type: ADD_MODEL_ENGINE_ASSOCIATION_FAILED});
            }
        })
        .catch(error => dispatch({type: ADD_MODEL_ENGINE_ASSOCIATION_FAILED}));
};
