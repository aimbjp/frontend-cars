import {
    ADD_LISTING_REQUEST,
    ADD_LISTING_SUCCESS,
    ADD_LISTING_FAILURE,
    GET_ENGINES_BY_MODEL,
    GET_TRANSMISSIONS_BY_MODEL,
    GET_TRANSMISSIONS_BY_MODEL_SUCCEED,
    GET_TRANSMISSIONS_BY_MODEL_FAILED,
    GET_DRIVES_BY_MODEL,
    GET_DRIVES_BY_MODEL_SUCCEED,
    GET_COLORS_BY_MODEL,
    GET_COLORS_BY_MODEL_FAILED,
    GET_BODYTYPES_BY_MODEL,
    GET_BODYTYPES_BY_MODEL_SUCCEED,
    GET_COLORS_BY_MODEL_SUCCEED,
    GET_ENGINES_BY_MODEL_SUCCEED,
    GET_ENGINES_BY_MODEL_FAILED,
    GET_BODYTYPES_BRAND_FAILED,
    GET_DRIVES_BY_MODEL_FAILED,
    SET_ACTIVE_MODEL,
    SET_ACTIVE_BRAND,
    SET_ACTIVE_DRIVE,
    SET_ACTIVE_ENGINE,
    SET_ACTIVE_BODYTYPE,
    SET_ACTIVE_COLOR,
    SET_ACTIVE_TRANSMISSION,
    SET_ACTIVE_PRICE,
    SET_ACTIVE_MILEAGE,
    SET_ACTIVE_PHOTOS,
    SET_ACTIVE_PLACE,
    SET_ACTIVE_YEAR,
    SET_ACTIVE_VIN, SET_ACTIVE_OWNERSCOUNT, SET_ACTIVE_EXCHANGE, SET_ACTIVE_DESCRIPTION, SET_ACTIVE_PTS
} from '../action-types/listing-add';
import {TListingActionTypes} from "../types/listing-add";
import {IListingResponse} from "../../type/listings/listings";
import {BodyType, Brand, Color, Drive, Engine, Model, Transmission} from "../../type/car/cars-details";


interface IListingState {
    loading: boolean;
    listing: IListingResponse | null;
    error: string | null;
    loadingSuccess: boolean;

    enginesByModel: Engine[];
    enginesLoading: boolean,
    enginesError: boolean,

    bodyTypesByModel: BodyType[],
    bodyTypesLoading: boolean,
    bodyTypesError: boolean,

    transmissionsByModel: Transmission[],
    transmissionsLoading: boolean,
    transmissionsError: boolean,

    drivesByModel: Drive[];
    drivesLoading: boolean,
    drivesError: boolean,

    colorsByModel: Color[],
    colorsLoading: boolean,
    colorsError: boolean,

    activeModel: Model | null;
    activeBrand: Brand | null;
    activeDrive: Drive | null;
    activeEngine: Engine | null;
    activeTransmission: Transmission | null;
    activeBodyType: BodyType | null;
    activeColor: Color | null;
    activeYear: number | null;
    activePrice: string | null;
    activeVIN: string | null;
    activePlace: string | null;
    activeOwnersCount: number | null;
    activeMileage: number | null;
    activeExchange: boolean | null;
    activeDescription: string | null;
    activePTS: string | null;
    activeImages: string[] | null;
}

const initialState: IListingState = {
    loading: false,
    listing: null,
    error: null,
    loadingSuccess: false,

    enginesByModel: [],
    enginesLoading: false,
    enginesError: false,

    bodyTypesByModel: [],
    bodyTypesLoading: false,
    bodyTypesError: false,

    transmissionsByModel: [],
    transmissionsLoading: false,
    transmissionsError: false,

    drivesByModel: [],
    drivesLoading: false,
    drivesError: false,

    colorsByModel: [],
    colorsLoading: false,
    colorsError: false,

    activeModel: null,
    activeBrand:  null,
    activeDrive: null,
    activeEngine: null,
    activeTransmission: null,
    activeBodyType:null,
    activeColor: null,
    activeYear: null,
    activePrice: null,
    activeVIN: null,
    activePlace: null,
    activeOwnersCount: null,
    activeExchange: null,
    activeDescription: null,
    activePTS: null,
    activeImages: null,
    activeMileage: null,
};

export const listingReducer = (state = initialState, action: TListingActionTypes) => {
    switch (action.type) {
        case ADD_LISTING_REQUEST:
            return { ...state, loading: true };
        case ADD_LISTING_SUCCESS:
            return { ...initialState, loadingSuccess: true, listing: action.payload };
        case ADD_LISTING_FAILURE:
            return { ...state, loading: false, error: action.payload };

        case GET_ENGINES_BY_MODEL:
            return {...state, enginesLoading: true};
        case GET_ENGINES_BY_MODEL_SUCCEED:
            return {...state,enginesLoading: false, enginesByModel: action.enginesByModel};
        case GET_ENGINES_BY_MODEL_FAILED:
            return {...state, enginesLoading: false, enginesError: true};

        case GET_TRANSMISSIONS_BY_MODEL:
            return {...state, transmissionsLoading: true};
        case GET_TRANSMISSIONS_BY_MODEL_SUCCEED:
            return {...state,transmissionsLoading: false, transmissionsByModel: action.transmissionsByModel};
        case GET_TRANSMISSIONS_BY_MODEL_FAILED:
            return {...state, transmissionsLoading: false, transmissionsError: true};

        case GET_DRIVES_BY_MODEL:
            return {...state, drivesLoading: true};
        case GET_DRIVES_BY_MODEL_SUCCEED:
            return {...state,drivesLoading: false, drivesByModel: action.drivesByModel};
        case GET_DRIVES_BY_MODEL_FAILED:
            return {...state, drivesLoading: false, drivesError: true};

        case GET_BODYTYPES_BY_MODEL:
            return {...state, bodyTypesLoading: true};
        case GET_BODYTYPES_BY_MODEL_SUCCEED:
            return {...state,bodyTypesLoading: false, bodyTypesByModel: action.bodyTypesByModel};
        case GET_BODYTYPES_BRAND_FAILED:
            return {...state, bodyTypesLoading: false, bodyTypesError: true};

        case GET_COLORS_BY_MODEL:
            return {...state, colorsLoading: true};
        case GET_COLORS_BY_MODEL_SUCCEED:
            return {...state,colorsLoading: false, colorsByModel: action.colorsByModel};
        case GET_COLORS_BY_MODEL_FAILED:
            return {...state, colorsLoading: false, colorsError: true};

        case SET_ACTIVE_MODEL:
            return {...state, activeModel: action.activeModel};
        case SET_ACTIVE_BRAND:
            return {...state, activeBrand: action.activeBrand};
        case SET_ACTIVE_DRIVE:
            return {...state, activeDrive: action.activeDrive};
        case SET_ACTIVE_ENGINE:
            return {...state, activeEngine: action.activeEngine};
        case SET_ACTIVE_BODYTYPE:
            return {...state, activeBodyType: action.activeBodyType};
        case SET_ACTIVE_COLOR:
            return {...state, activeColor: action.activeColor};
        case SET_ACTIVE_TRANSMISSION:
            return {...state, activeTransmission: action.activeTransmission};
        case SET_ACTIVE_PRICE:
            return {...state, activePrice: action.activePrice};
        case SET_ACTIVE_MILEAGE:
            return {...state, activeMileage: action.activeMileage};
        case SET_ACTIVE_PHOTOS:
            return {...state, activeImages: action.activePhotos};
        case SET_ACTIVE_PLACE:
            return {...state, activePlace: action.activePlace};
        case SET_ACTIVE_YEAR:
            return {...state, activeYear: action.activeYear};
        case SET_ACTIVE_VIN:
            return {...state, activeVIN: action.activeVIN};
        case SET_ACTIVE_OWNERSCOUNT:
            return {...state, activeOwnersCount: action.activeOwnersCount};
        case SET_ACTIVE_EXCHANGE:
            return {...state, activeExchange: action.activeExchange};
        case SET_ACTIVE_DESCRIPTION:
            return {...state, activeDescription: action.activeDescription};
        case SET_ACTIVE_PTS:
            return {...state, activePTS: action.activePTS};

        default:
            return state;
    }
};
