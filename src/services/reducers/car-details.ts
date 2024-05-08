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


export interface ICarDetails{
    brandAdd: boolean;
    brandAddSucceed: boolean;
    brandAddFailed: boolean;

    modelAdd: boolean;
    modelAddSucceed: boolean;
    modelAddFailed: boolean;


    brands: Brand[],
    brandsGet: boolean,
    brandsGetSucceed: boolean,
    brandsGetFailed: boolean,

    modelsWithoutBrand: ModelWoBrand[],
    modelsWoBrandGet: boolean,
    modelsWoBrandGetSucceed: boolean,
    modelsWoBrandGetFailed: boolean,

    associateModelBrand: boolean,
    associateModelBrandSuccess: boolean,
    associateModelBrandFailed: boolean,

    drives: Drive[]
    driveAdd: boolean;
    driveAddSucceed: boolean;
    driveAddFailed: boolean;
    driveUpdate: boolean;
    driveUpdateSucceed: boolean;
    driveUpdateFailed: boolean;
    driveDelete: boolean;
    driveDeleteSucceed: boolean;
    driveDeleteFailed: boolean;

    engineAdd: boolean,
    engineAddSucceed: boolean,
    engineAddFailed: boolean,
    engineUpdate: boolean,
    engineUpdateSucceed: boolean,
    engineUpdateFailed: boolean,
    engineDelete: boolean,
    engineDeleteSucceed: boolean,
    engineDeleteFailed: boolean,
    engines: Engine[],
    enginesGet: boolean,
    enginesGetSucceed: boolean,
    enginesGetFailed: boolean,


    bodyTypesLoading: boolean,
    bodyTypes: BodyType[],
    bodyTypesError: boolean,
    bodyTypeAddSuccess: boolean,

    transmissionsLoading: boolean,
    transmissions: Transmission[],
    transmissionsError: boolean,


    colorsLoading: boolean,
    colors: Color[],
    colorsError: boolean,

    // Дополнительные поля для Body types
    bodyTypeAdd: boolean;
    bodyTypeAddSucceed: boolean;
    bodyTypeAddFailed: boolean;
    bodyTypeUpdate: boolean;
    bodyTypeUpdateSucceed: boolean;
    bodyTypeUpdateFailed: boolean;
    bodyTypeDelete: boolean;
    bodyTypeDeleteSucceed: boolean;
    bodyTypeDeleteFailed: boolean;

    // Дополнительные поля для Transmissions
    transmissionAdd: boolean;
    transmissionAddSucceed: boolean;
    transmissionAddFailed: boolean;
    transmissionUpdate: boolean;
    transmissionUpdateSucceed: boolean;
    transmissionUpdateFailed: boolean;
    transmissionDelete: boolean;
    transmissionDeleteSucceed: boolean;
    transmissionDeleteFailed: boolean;

    // Дополнительные поля для Colors
    colorAdd: boolean;
    colorAddSucceed: boolean;
    colorAddFailed: boolean;
    colorUpdate: boolean;
    colorUpdateSucceed: boolean;
    colorUpdateFailed: boolean;
    colorDelete: boolean;
    colorDeleteSucceed: boolean;
    colorDeleteFailed: boolean;

    modelsByBrand: Model[],
    modelsLoading: boolean,
    modelsError: boolean,

    modelEngineAssociationAdding: boolean,
    modelEngineAssociationSuccess: boolean,
    modelEngineAssociationError: boolean,
    modelBodyTypeAssociationAdding: boolean;
    modelBodyTypeAssociationSuccess: boolean;
    modelBodyTypeAssociationError: boolean;
    modelTransmissionAssociationAdding: boolean;
    modelTransmissionAssociationSuccess: boolean;
    modelTransmissionAssociationError: boolean;
    modelColorAssociationAdding: boolean;
    modelColorAssociationSuccess: boolean;
    modelColorAssociationError: boolean;
}

const initialState: ICarDetails = {
    brandAdd: false,
    brandAddSucceed: false,
    brandAddFailed: false,

    modelAdd: false,
    modelAddSucceed: false,
    modelAddFailed: false,

    brands: [],
    brandsGet: false,
    brandsGetSucceed: false,
    brandsGetFailed: false,

    modelsWithoutBrand: [],
    modelsWoBrandGet: false,
    modelsWoBrandGetSucceed: false,
    modelsWoBrandGetFailed: false,

    associateModelBrand: false,
    associateModelBrandSuccess: false,
    associateModelBrandFailed: false,

    drives: [],
    driveAdd: false,
    driveAddSucceed: false,
    driveAddFailed: false,
    driveUpdate: false,
    driveUpdateSucceed: false,
    driveUpdateFailed: false,
    driveDelete: false,
    driveDeleteSucceed: false,
    driveDeleteFailed: false,

    engineAdd: false,
    engineAddSucceed: false,
    engineAddFailed: false,
    engineUpdate: false,
    engineUpdateSucceed: false,
    engineUpdateFailed: false,
    engineDelete: false,
    engineDeleteSucceed: false,
    engineDeleteFailed: false,
    engines: [],
    enginesGet: false,
    enginesGetSucceed: false,
    enginesGetFailed: false,

    bodyTypesLoading: false,
    bodyTypes: [],
    bodyTypesError: false,
    bodyTypeAddSuccess: false,

    transmissionsLoading: false,
    transmissions: [],
    transmissionsError: false,


    colorsLoading: false,
    colors: [],
    colorsError: false,

    // Инициализация новых полей для Body types
    bodyTypeAdd: false,
    bodyTypeAddSucceed: false,
    bodyTypeAddFailed: false,
    bodyTypeUpdate: false,
    bodyTypeUpdateSucceed: false,
    bodyTypeUpdateFailed: false,
    bodyTypeDelete: false,
    bodyTypeDeleteSucceed: false,
    bodyTypeDeleteFailed: false,

    // Инициализация новых полей для Transmissions
    transmissionAdd: false,
    transmissionAddSucceed: false,
    transmissionAddFailed: false,
    transmissionUpdate: false,
    transmissionUpdateSucceed: false,
    transmissionUpdateFailed: false,
    transmissionDelete: false,
    transmissionDeleteSucceed: false,
    transmissionDeleteFailed: false,

    // Инициализация новых полей для Colors
    colorAdd: false,
    colorAddSucceed: false,
    colorAddFailed: false,
    colorUpdate: false,
    colorUpdateSucceed: false,
    colorUpdateFailed: false,
    colorDelete: false,
    colorDeleteSucceed: false,
    colorDeleteFailed: false,

    modelsByBrand: [],
    modelsLoading: false,
    modelsError: false,


    modelEngineAssociationAdding: false,
    modelEngineAssociationSuccess: false,
    modelEngineAssociationError: false,
    modelBodyTypeAssociationAdding: false,
    modelBodyTypeAssociationSuccess: false,
    modelBodyTypeAssociationError: false,
    modelTransmissionAssociationAdding: false,
    modelTransmissionAssociationSuccess: false,
    modelTransmissionAssociationError: false,
    modelColorAssociationAdding: false,
    modelColorAssociationSuccess: false,
    modelColorAssociationError: false,
}

export function carDetailsReducer (state = initialState, action: any) {
    switch (action.type) {
        case ADD_BRAND: return {
            ...state,
            brandAdd: true, brandAddSucceed: false,
        };
        case ADD_BRAND_SUCCEED: return {
            ...state,
            brandAdd: false, brandAddFailed: false, brandAddSucceed: true,
        };
        case ADD_BRAND_FAILED: return {
            ...state,
            brandAdd: false, brandAddFailed: true, brandAddSucceed: false,
        };

        case ADD_MODEL: return {
            ...state,
            modelAdd: true, modelAddSucceed: false,
        };
        case ADD_MODEL_SUCCEED: return {
            ...state,
            modelAdd: false, modelAddFailed: false, modelAddSucceed: true,
            modelName: ''
        };
        case ADD_MODEL_FAILED: return {
            ...state,
            modelAdd: false, modelAddFailed: true, modelAddSucceed: false,
        };

        case GET_BRANDS: return {
            ...state,
            brandsGet: true,
        };
        case GET_BRANDS_SUCCEED: return {
            ...state,
            brandsGet: false, brands: action.brands, brandsGetFailed: false
        };
        case GET_BRANDS_FAILED: return {
            ...state,
            brandsGet: false, brandsGetFailed: true,
        };

        case GET_MODELS_WITHOUT_BRAND: return {
            ...state,
            modelsWoBrandGet: true,
        };
        case GET_MODELS_WITHOUT_BRAND_SUCCEED: return {
            ...state,
            modelsWoBrandGet: false, modelsWithoutBrand: action.modelsWithoutBrand, modelsWoBrandGetFailed: false
        };
        case GET_MODELS_WITHOUT_BRAND_FAILED: return {
            ...state,
            modelsWoBrandGet: false, modelsWoBrandGetFailed: true,
        };

        case ASSOCIATE_MODEL_BRAND: return {
            ...state,
            associateModelBrand: true, associateModelBrandSuccess: false
        };
        case ASSOCIATE_MODEL_BRAND_SUCCEED: return {
            ...state,
            associateModelBrand: false, associateModelBrandSuccess: true, associateModelBrandFailed: false
        };
        case ASSOCIATE_MODEL_BRAND_FAILED: return {
            ...state,
            associateModelBrand: false, associateModelBrandSuccess: false, associateModelBrandFailed: true

        };



        case GET_DRIVES:
            return {...state, drivesLoading: true};
        case GET_DRIVES_SUCCEED:
            return {...state, drivesLoading: false, drives: action.drives, drivesError: false};
        case GET_DRIVES_FAILED:
            return {...state, drivesLoading: false, drivesError: true};

        case ADD_DRIVE:
            return {...state, driveAddLoading: true, driveAddSucceed: false};
        case ADD_DRIVE_SUCCEED:
            return {...state, driveAddLoading: false, driveAddSucceed: true};
        case ADD_DRIVE_FAILED:
            return {...state, driveAddLoading: false, driveAddError: true};

        case UPDATE_DRIVE:
            return {...state, driveUpdateLoading: true};
        case UPDATE_DRIVE_SUCCEED:
            return {...state, driveUpdateLoading: false, driveUpdateSuccess: true};
        case UPDATE_DRIVE_FAILED:
            return {...state, driveUpdateLoading: false, driveUpdateError: true};

        case DELETE_DRIVE:
            return {...state, driveDeleteLoading: true};
        case DELETE_DRIVE_SUCCEED:
            return {...state, driveDeleteLoading: false, driveDeleteSuccess: true};
        case DELETE_DRIVE_FAILED:
            return {...state, driveDeleteLoading: false, driveDeleteError: true};




        case ADD_ENGINE:
            return {...state, engineAdd: true, engineAddSucceed: false};
        case ADD_ENGINE_SUCCEED:
            return {...state, engineAdd: false, engineAddSucceed: true};
        case ADD_ENGINE_FAILED:
            return {...state, engineAdd: false, engineAddFailed: true, engineAddSucceed: false};

        case UPDATE_ENGINE:
            return {...state, engineUpdate: true};
        case UPDATE_ENGINE_SUCCEED:
            return {...state, engineUpdate: false, engineUpdateSucceed: true};
        case UPDATE_ENGINE_FAILED:
            return {...state, engineUpdate: false, engineUpdateFailed: true};

        case DELETE_ENGINE:
            return {...state, engineDelete: true};
        case DELETE_ENGINE_SUCCEED:
            return {...state, engineDelete: false, engineDeleteSucceed: true};
        case DELETE_ENGINE_FAILED:
            return {...state, engineDelete: false, engineDeleteFailed: true};

        case GET_ENGINES:
            return {...state, enginesGet: true};
        case GET_ENGINES_SUCCEED:
            return {...state, enginesGet: false, engines: action.engines, enginesGetSucceed: true};
        case GET_ENGINES_FAILED:
            return {...state, enginesGet: false, enginesGetFailed: true};



        case GET_BODY_TYPES:
            return {...state, bodyTypesLoading: true};
        case GET_BODY_TYPES_SUCCEED:
            return {...state, bodyTypesLoading: false, bodyTypes: action.bodyTypes};
        case GET_BODY_TYPES_FAILED:
            return {...state, bodyTypesLoading: false, bodyTypesError: true};

        case ADD_BODY_TYPE:
            return {...state, bodyTypeAdd: true, bodyTypeAddSucceed: false};
        case ADD_BODY_TYPE_SUCCEED:
            return {...state, bodyTypeAdd: false, bodyTypeAddSucceed: true};
        case ADD_BODY_TYPE_FAILED:
            return {...state, bodyTypeAdd: false, bodyTypeAddFailed: true, bodyTypeAddSucceed: false};

        case UPDATE_BODY_TYPE:
            return {...state, bodyTypeUpdate: true};
        case UPDATE_BODY_TYPE_SUCCEED:
            return {...state, bodyTypeUpdate: false, bodyTypeUpdateSucceed: true};
        case UPDATE_BODY_TYPE_FAILED:
            return {...state, bodyTypeUpdate: false, bodyTypeUpdateFailed: true};

        case DELETE_BODY_TYPE:
            return {...state, bodyTypeDelete: true};
        case DELETE_BODY_TYPE_SUCCEED:
            return {...state, bodyTypeDelete: false, bodyTypeDeleteSucceed: true};
        case DELETE_BODY_TYPE_FAILED:
            return {...state, bodyTypeDelete: false, bodyTypeDeleteFailed: true};



        case GET_TRANSMISSIONS:
            return {...state, transmissionsLoading: true};
        case GET_TRANSMISSIONS_SUCCEED:
            return {...state, transmissionsLoading: false, transmissions: action.transmissions};
        case GET_TRANSMISSIONS_FAILED:
            return {...state, transmissionsLoading: false, transmissionsError: true};

        case ADD_TRANSMISSION:
            return {...state, transmissionAdd: true, transmissionAddSucceed: false};
        case ADD_TRANSMISSION_SUCCEED:
            return {...state, transmissionAdd: false, transmissionAddSucceed: true};
        case ADD_TRANSMISSION_FAILED:
            return {...state, transmissionAdd: false, transmissionAddFailed: true, transmissionAddSucceed: false};

        case UPDATE_TRANSMISSION:
            return {...state, transmissionUpdate: true};
        case UPDATE_TRANSMISSION_SUCCEED:
            return {...state, transmissionUpdate: false, transmissionUpdateSucceed: true};
        case UPDATE_TRANSMISSION_FAILED:
            return {...state, transmissionUpdate: false, transmissionUpdateFailed: true};

        case DELETE_TRANSMISSION:
            return {...state, transmissionDelete: true};
        case DELETE_TRANSMISSION_SUCCEED:
            return {...state, transmissionDelete: false, transmissionDeleteSucceed: true};
        case DELETE_TRANSMISSION_FAILED:
            return {...state, transmissionDelete: false, transmissionDeleteFailed: true};



        case GET_COLORS:
            return {...state, colorsLoading: true};
        case GET_COLORS_SUCCEED:
            return {...state, colorsLoading: false, colors: action.colors};
        case GET_COLORS_FAILED:
            return {...state, colorsLoading: false, colorsError: true};

        case ADD_COLOR:
            return {...state, colorAdd: true, colorAddSucceed: false};
        case ADD_COLOR_SUCCEED:
            return {...state, colorAdd: false, colorAddSucceed: true};
        case ADD_COLOR_FAILED:
            return {...state, colorAdd: false, colorAddFailed: true, colorAddSucceed: false};

        case UPDATE_COLOR:
            return {...state, colorUpdate: true};
        case UPDATE_COLOR_SUCCEED:
            return {...state, colorUpdate: false, colorUpdateSucceed: true};
        case UPDATE_COLOR_FAILED:
            return {...state, colorUpdate: false, colorUpdateFailed: true};

        case DELETE_COLOR:
            return {...state, colorDelete: true};
        case DELETE_COLOR_SUCCEED:
            return {...state, colorDelete: false, colorDeleteSucceed: true};
        case DELETE_COLOR_FAILED:
            return {...state, colorDelete: false, colorDeleteFailed: true};


        case GET_MODELS_BY_BRAND:
            return {...state, modelsLoading: true};
        case GET_MODELS_BY_BRAND_SUCCEED:
            return {...state,modelsLoading: false, modelsByBrand: action.models};
        case GET_MODELS_BY_BRAND_FAILED:
            return {...state, modelsLoading: false, modelsError: true};

        case ADD_MODEL_ENGINE_ASSOCIATION:
            return {...state, modelEngineAssociationAdding: true};
        case ADD_MODEL_ENGINE_ASSOCIATION_SUCCEED:
            return {...state, modelEngineAssociationAdding: false, modelEngineAssociationSuccess: true};
        case ADD_MODEL_ENGINE_ASSOCIATION_FAILED:
            return {...state, modelEngineAssociationAdding: false, modelEngineAssociationError: true};

        case ADD_MODEL_BODY_TYPE_ASSOCIATION:
            return {...state, modelBodyTypeAssociationAdding: true};
        case ADD_MODEL_BODY_TYPE_ASSOCIATION_SUCCEED:
            return {...state, modelBodyTypeAssociationAdding: false, modelBodyTypeAssociationSuccess: true};
        case ADD_MODEL_BODY_TYPE_ASSOCIATION_FAILED:
            return {...state, modelBodyTypeAssociationAdding: false, modelBodyTypeAssociationError: true};

        case ADD_MODEL_TRANSMISSION_ASSOCIATION:
            return {...state, modelTransmissionAssociationAdding: true};
        case ADD_MODEL_TRANSMISSION_ASSOCIATION_SUCCEED:
            return {...state, modelTransmissionAssociationAdding: false, modelTransmissionAssociationSuccess: true};
        case ADD_MODEL_TRANSMISSION_ASSOCIATION_FAILED:
            return {...state, modelTransmissionAssociationAdding: false, modelTransmissionAssociationError: true};

        case ADD_MODEL_COLOR_ASSOCIATION:
            return {...state, modelColorAssociationAdding: true};
        case ADD_MODEL_COLOR_ASSOCIATION_SUCCEED:
            return {...state, modelColorAssociationAdding: false, modelColorAssociationSuccess: true};
        case ADD_MODEL_COLOR_ASSOCIATION_FAILED:
            return {...state, modelColorAssociationAdding: false, modelColorAssociationError: true};

        case ADD_MODEL_DRIVE_ASSOCIATION:
            return {...state, modelDriveAssociationAdding: true};
        case ADD_MODEL_DRIVE_ASSOCIATION_SUCCEED:
            return {...state, modelDriveAssociationAdding: false, modelDriveAssociationSuccess: true};
        case ADD_MODEL_DRIVE_ASSOCIATION_FAILED:
            return {...state, modelDriveAssociationAdding: false, modelDriveAssociationError: true};


        default:
            return state;
    }
}