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
    ADD_MODEL,
    ADD_MODEL_BODY_TYPE_ASSOCIATION,
    ADD_MODEL_BODY_TYPE_ASSOCIATION_FAILED,
    ADD_MODEL_BODY_TYPE_ASSOCIATION_SUCCEED,
    ADD_MODEL_COLOR_ASSOCIATION,
    ADD_MODEL_COLOR_ASSOCIATION_FAILED,
    ADD_MODEL_COLOR_ASSOCIATION_SUCCEED,
    ADD_MODEL_DRIVE_ASSOCIATION,
    ADD_MODEL_DRIVE_ASSOCIATION_FAILED,
    ADD_MODEL_DRIVE_ASSOCIATION_SUCCEED,
    ADD_MODEL_ENGINE_ASSOCIATION,
    ADD_MODEL_ENGINE_ASSOCIATION_FAILED,
    ADD_MODEL_ENGINE_ASSOCIATION_SUCCEED,
    ADD_MODEL_FAILED,
    ADD_MODEL_SUCCEED,
    ADD_MODEL_TRANSMISSION_ASSOCIATION,
    ADD_MODEL_TRANSMISSION_ASSOCIATION_FAILED,
    ADD_MODEL_TRANSMISSION_ASSOCIATION_SUCCEED,
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
    GET_COLORS,
    GET_COLORS_FAILED,
    GET_COLORS_SUCCEED,
    GET_DRIVES,
    GET_DRIVES_FAILED,
    GET_DRIVES_SUCCEED,
    GET_ENGINES,
    GET_ENGINES_FAILED,
    GET_ENGINES_SUCCEED,
    GET_MODELS_BY_BRAND,
    GET_MODELS_BY_BRAND_FAILED,
    GET_MODELS_BY_BRAND_SUCCEED,
    GET_MODELS_WITHOUT_BRAND,
    GET_MODELS_WITHOUT_BRAND_FAILED,
    GET_MODELS_WITHOUT_BRAND_SUCCEED,
    GET_TRANSMISSIONS,
    GET_TRANSMISSIONS_FAILED,
    GET_TRANSMISSIONS_SUCCEED,
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
import {BodyType, Brand, Color, Drive, Engine, Model, ModelWoBrand, Transmission} from "../../type/car/cars-details";

interface IAddBrandCarDetailsAction {
    readonly type: typeof ADD_BRAND;
}
interface IAddBrandCarDetailsSuccessAction {
    readonly type: typeof ADD_BRAND_SUCCEED;
}
interface IAddBrandCarDetailsFailedAction {
    readonly type: typeof ADD_BRAND_FAILED;
}


interface IAddModelCarDetailsAction {
    readonly type: typeof ADD_MODEL;
}
interface IAddModelCarDetailsSuccessAction {
    readonly type: typeof ADD_MODEL_SUCCEED;
}
interface IAddModelCarDetailsFailedAction {
    readonly type: typeof ADD_MODEL_FAILED;
}


interface IGetBrandsAction {
    readonly type: typeof GET_BRANDS;
}
interface IGetBrandsActionSuccessAction {
    readonly type: typeof GET_BRANDS_SUCCEED;
    brands: Brand[];
}
interface IGetBrandsActionFailedAction {
    readonly type: typeof GET_BRANDS_FAILED;
}


interface IGetModelsWoBrandAction {
    readonly type: typeof GET_MODELS_WITHOUT_BRAND;
}
interface IGetModelsWoBrandActionSuccessAction {
    readonly type: typeof GET_MODELS_WITHOUT_BRAND_SUCCEED;
    modelsWithoutBrand: ModelWoBrand[];
}
interface IGetModelsWoBrandActionFailedAction {
    readonly type: typeof GET_MODELS_WITHOUT_BRAND_FAILED;
}

interface ICreateAssociationModelBrandAction {
    readonly type: typeof ASSOCIATE_MODEL_BRAND;
}
interface ICreateAssociationModelBrandSuccessAction {
    readonly type: typeof ASSOCIATE_MODEL_BRAND_SUCCEED;
}
interface ICreateAssociationModelBrandFailedAction {
    readonly type: typeof ASSOCIATE_MODEL_BRAND_FAILED;
}

interface IGetDrivesAction {
    readonly type: typeof GET_DRIVES;
}

interface IGetDrivesSuccessAction {
    readonly type: typeof GET_DRIVES_SUCCEED;
    drives: Drive[];
}

interface IGetDrivesFailedAction {
    readonly type: typeof GET_DRIVES_FAILED;
}

export type TDrivesActionTypes = IGetDrivesAction | IGetDrivesSuccessAction | IGetDrivesFailedAction;

interface IAddDriveAction {
    readonly type: typeof ADD_DRIVE;
}

interface IAddDriveSuccessAction {
    readonly type: typeof ADD_DRIVE_SUCCEED;
}

interface IAddDriveFailedAction {
    readonly type: typeof ADD_DRIVE_FAILED;
}

interface IUpdateDriveAction {
    readonly type: typeof UPDATE_DRIVE;
}

interface IUpdateDriveSuccessAction {
    readonly type: typeof UPDATE_DRIVE_SUCCEED;
}

interface IUpdateDriveFailedAction {
    readonly type: typeof UPDATE_DRIVE_FAILED;
}

interface IDeleteDriveAction {
    readonly type: typeof DELETE_DRIVE;
}

interface IDeleteDriveSuccessAction {
    readonly type: typeof DELETE_DRIVE_SUCCEED;
}

interface IDeleteDriveFailedAction {
    readonly type: typeof DELETE_DRIVE_FAILED;
}

export type TDriveActionTypes = IAddDriveAction | IAddDriveSuccessAction | IAddDriveFailedAction |
    IUpdateDriveAction | IUpdateDriveSuccessAction | IUpdateDriveFailedAction |
    IDeleteDriveAction | IDeleteDriveSuccessAction | IDeleteDriveFailedAction;


interface IAddEngineAction {
    readonly type: typeof ADD_ENGINE;
}

interface IAddEngineSuccessAction {
    readonly type: typeof ADD_ENGINE_SUCCEED;
}

interface IAddEngineFailedAction {
    readonly type: typeof ADD_ENGINE_FAILED;
}

interface IUpdateEngineAction {
    readonly type: typeof UPDATE_ENGINE;
}

interface IUpdateEngineSuccessAction {
    readonly type: typeof UPDATE_ENGINE_SUCCEED;
}

interface IUpdateEngineFailedAction {
    readonly type: typeof UPDATE_ENGINE_FAILED;
}

interface IDeleteEngineAction {
    readonly type: typeof DELETE_ENGINE;
}

interface IDeleteEngineSuccessAction {
    readonly type: typeof DELETE_ENGINE_SUCCEED;
}

interface IDeleteEngineFailedAction {
    readonly type: typeof DELETE_ENGINE_FAILED;
}

interface IGetEnginesAction {
    readonly type: typeof GET_ENGINES;
}

interface IGetEnginesSuccessAction {
    readonly type: typeof GET_ENGINES_SUCCEED;
    engines: Engine[];
}

interface IGetEnginesFailedAction {
    readonly type: typeof GET_ENGINES_FAILED;
}

export type TEngineActionTypes = IAddEngineAction | IAddEngineSuccessAction | IAddEngineFailedAction |
    IUpdateEngineAction | IUpdateEngineSuccessAction | IUpdateEngineFailedAction |
    IDeleteEngineAction | IDeleteEngineSuccessAction | IDeleteEngineFailedAction |
    IGetEnginesAction | IGetEnginesSuccessAction | IGetEnginesFailedAction;


interface IGetBodyTypesAction { readonly type: typeof GET_BODY_TYPES; }
interface IGetBodyTypesSuccessAction { readonly type: typeof GET_BODY_TYPES_SUCCEED; bodyTypes: BodyType[]; }
interface IGetBodyTypesFailedAction { readonly type: typeof GET_BODY_TYPES_FAILED; }

interface IAddBodyTypeAction { readonly type: typeof ADD_BODY_TYPE; }
interface IAddBodyTypeSuccessAction { readonly type: typeof ADD_BODY_TYPE_SUCCEED; }
interface IAddBodyTypeFailedAction { readonly type: typeof ADD_BODY_TYPE_FAILED; }

interface IUpdateBodyTypeAction { readonly type: typeof UPDATE_BODY_TYPE; }
interface IUpdateBodyTypeSuccessAction { readonly type: typeof UPDATE_BODY_TYPE_SUCCEED; }
interface IUpdateBodyTypeFailedAction { readonly type: typeof UPDATE_BODY_TYPE_FAILED; }

interface IDeleteBodyTypeAction { readonly type: typeof DELETE_BODY_TYPE; }
interface IDeleteBodyTypeSuccessAction { readonly type: typeof DELETE_BODY_TYPE_SUCCEED; }
interface IDeleteBodyTypeFailedAction { readonly type: typeof DELETE_BODY_TYPE_FAILED; }

export type TBodyTypeActionTypes = IGetBodyTypesAction | IGetBodyTypesSuccessAction | IGetBodyTypesFailedAction | IAddBodyTypeAction |
    IAddBodyTypeSuccessAction | IAddBodyTypeFailedAction | IUpdateBodyTypeAction | IUpdateBodyTypeSuccessAction | IUpdateBodyTypeFailedAction |
    IDeleteBodyTypeAction | IDeleteBodyTypeSuccessAction | IDeleteBodyTypeFailedAction;

interface IGetTransmissionsAction { readonly type: typeof GET_TRANSMISSIONS; }
interface IGetTransmissionsSuccessAction { readonly type: typeof GET_TRANSMISSIONS_SUCCEED; transmissions: Transmission[]; }
interface IGetTransmissionsFailedAction { readonly type: typeof GET_TRANSMISSIONS_FAILED; }

interface IAddTransmissionAction { readonly type: typeof ADD_TRANSMISSION; }
interface IAddTransmissionSuccessAction { readonly type: typeof ADD_TRANSMISSION_SUCCEED;  }
interface IAddTransmissionFailedAction { readonly type: typeof ADD_TRANSMISSION_FAILED; }

interface IUpdateTransmissionAction { readonly type: typeof UPDATE_TRANSMISSION; }
interface IUpdateTransmissionSuccessAction { readonly type: typeof UPDATE_TRANSMISSION_SUCCEED;  }
interface IUpdateTransmissionFailedAction { readonly type: typeof UPDATE_TRANSMISSION_FAILED; }

interface IDeleteTransmissionAction { readonly type: typeof DELETE_TRANSMISSION; }
interface IDeleteTransmissionSuccessAction { readonly type: typeof DELETE_TRANSMISSION_SUCCEED; }
interface IDeleteTransmissionFailedAction { readonly type: typeof DELETE_TRANSMISSION_FAILED; }

export type TTransmissionActionTypes = IGetTransmissionsAction | IGetTransmissionsSuccessAction | IGetTransmissionsFailedAction |
    IAddTransmissionAction | IAddTransmissionSuccessAction | IAddTransmissionFailedAction |
    IUpdateTransmissionAction | IUpdateTransmissionSuccessAction | IUpdateTransmissionFailedAction |
    IDeleteTransmissionAction | IDeleteTransmissionSuccessAction | IDeleteTransmissionFailedAction;

interface IGetColorsAction { readonly type: typeof GET_COLORS; }
interface IGetColorsSuccessAction { readonly type: typeof GET_COLORS_SUCCEED; colors: Color[]; }
interface IGetColorsFailedAction { readonly type: typeof GET_COLORS_FAILED; }

interface IAddColorAction { readonly type: typeof ADD_COLOR; }
interface IAddColorSuccessAction { readonly type: typeof ADD_COLOR_SUCCEED;  }
interface IAddColorFailedAction { readonly type: typeof ADD_COLOR_FAILED; }

interface IUpdateColorAction { readonly type: typeof UPDATE_COLOR; }
interface IUpdateColorSuccessAction { readonly type: typeof UPDATE_COLOR_SUCCEED;  }
interface IUpdateColorFailedAction { readonly type: typeof UPDATE_COLOR_FAILED; }

interface IDeleteColorAction { readonly type: typeof DELETE_COLOR; }
interface IDeleteColorSuccessAction { readonly type: typeof DELETE_COLOR_SUCCEED; }
interface IDeleteColorFailedAction { readonly type: typeof DELETE_COLOR_FAILED; }

export type TColorActionTypes = IGetColorsAction | IGetColorsSuccessAction | IGetColorsFailedAction |
    IAddColorAction | IAddColorSuccessAction | IAddColorFailedAction |
    IUpdateColorAction | IUpdateColorSuccessAction | IUpdateColorFailedAction |
    IDeleteColorAction | IDeleteColorSuccessAction | IDeleteColorFailedAction;

interface IGetModelsByBrandAction { readonly type: typeof GET_MODELS_BY_BRAND; }
interface IGetModelsByBrandSuccessAction { readonly type: typeof GET_MODELS_BY_BRAND_SUCCEED; models: Model[]; }
interface IGetModelsByBrandFailedAction { readonly type: typeof GET_MODELS_BY_BRAND_FAILED; }

interface IAddModelEngineAssociationAction { readonly type: typeof ADD_MODEL_ENGINE_ASSOCIATION; }
interface IAddModelEngineAssociationSuccessAction { readonly type: typeof ADD_MODEL_ENGINE_ASSOCIATION_SUCCEED; }
interface IAddModelEngineAssociationFailedAction { readonly type: typeof ADD_MODEL_ENGINE_ASSOCIATION_FAILED; }

interface IAddModelDriveAssociationAction { readonly type: typeof ADD_MODEL_DRIVE_ASSOCIATION; }
interface IAddModelDriveAssociationSuccessAction { readonly type: typeof ADD_MODEL_DRIVE_ASSOCIATION_SUCCEED; }
interface IAddModelDriveAssociationFailedAction { readonly type: typeof ADD_MODEL_DRIVE_ASSOCIATION_FAILED; }

interface IAddModelBodyTypeAssociationAction { readonly type: typeof ADD_MODEL_BODY_TYPE_ASSOCIATION; }
interface IAddModelBodyTypeAssociationSuccessAction { readonly type: typeof ADD_MODEL_BODY_TYPE_ASSOCIATION_SUCCEED; }
interface IAddModelBodyTypeAssociationFailedAction { readonly type: typeof ADD_MODEL_BODY_TYPE_ASSOCIATION_FAILED; }

interface IAddModelTransmissionAssociationAction { readonly type: typeof ADD_MODEL_TRANSMISSION_ASSOCIATION; }
interface IAddModelTransmissionAssociationSuccessAction { readonly type: typeof ADD_MODEL_TRANSMISSION_ASSOCIATION_SUCCEED; }
interface IAddModelTransmissionAssociationFailedAction { readonly type: typeof ADD_MODEL_TRANSMISSION_ASSOCIATION_FAILED; }

interface IAddModelColorAssociationAction { readonly type: typeof ADD_MODEL_COLOR_ASSOCIATION; }
interface IAddModelColorAssociationSuccessAction { readonly type: typeof ADD_MODEL_COLOR_ASSOCIATION_SUCCEED; }
interface IAddModelColorAssociationFailedAction { readonly type: typeof ADD_MODEL_COLOR_ASSOCIATION_FAILED; }

export type TModelActionTypes = IGetModelsByBrandAction | IGetModelsByBrandSuccessAction | IGetModelsByBrandFailedAction |
    IAddModelEngineAssociationAction | IAddModelEngineAssociationSuccessAction | IAddModelEngineAssociationFailedAction |
    IAddModelDriveAssociationAction | IAddModelDriveAssociationSuccessAction | IAddModelDriveAssociationFailedAction |
    IAddModelBodyTypeAssociationAction | IAddModelBodyTypeAssociationSuccessAction | IAddModelBodyTypeAssociationFailedAction |
    IAddModelTransmissionAssociationAction | IAddModelTransmissionAssociationSuccessAction | IAddModelTransmissionAssociationFailedAction |
    IAddModelColorAssociationAction | IAddModelColorAssociationSuccessAction | IAddModelColorAssociationFailedAction;


export type TActionCarDetailsType = IAddBrandCarDetailsFailedAction | IAddBrandCarDetailsSuccessAction |
    IAddBrandCarDetailsAction | IAddModelCarDetailsFailedAction | IAddModelCarDetailsSuccessAction |
    IAddModelCarDetailsAction | IGetBrandsActionFailedAction | IGetBrandsActionSuccessAction |
    IGetBrandsAction | IGetModelsWoBrandActionFailedAction | IGetModelsWoBrandActionSuccessAction |
    IGetModelsWoBrandAction | ICreateAssociationModelBrandFailedAction | ICreateAssociationModelBrandSuccessAction |
    ICreateAssociationModelBrandAction | TDrivesActionTypes | TDriveActionTypes | TEngineActionTypes |
    TBodyTypeActionTypes | TColorActionTypes | TTransmissionActionTypes | TModelActionTypes;
