import {IParametersSearch, ListingsResponse, ListStatus} from "../../type/listings/listings";
import {TListings} from "../types/listings";
import {
    CHANGE_LISTING_STATUS,
    CHANGE_LISTING_STATUS_FAILED,
    CHANGE_LISTING_STATUS_SUCCEED,
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
    GET_LISTINGS_STATUSES,
    GET_LISTINGS_STATUSES_FAILED,
    GET_LISTINGS_STATUSES_SUCCEED,
    GET_LISTINGS_SUCCESS,
    GET_MODELS_BY_BRAND_LISTINGS,
    GET_MODELS_BY_BRAND_LISTINGS_FAILED,
    GET_MODELS_BY_BRAND_LISTINGS_SUCCEED,
    GET_TRANSMISSIONS_BY_MODEL_LISTINGS,
    GET_TRANSMISSIONS_BY_MODEL_LISTINGS_FAILED,
    GET_TRANSMISSIONS_BY_MODEL_LISTINGS_SUCCEED,
    RESET_MODELS_BY_BRAND,
    SET_ACTIVE_TAB,
    UPDATE_SEARCH_PARAMETERS
} from "../action-types/listings";
import {BodyType, Brand, Color, Drive, Engine, Model, Transmission} from "../../type/car/cars-details";


export interface IListingsList {
    parameters: IParametersSearch;
    listings: ListingsResponse | null;
    error: string | null;

    listingsRequest: boolean;
    listingRequestFailed: boolean;

    activeTab: string;

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

    brands: Brand[],
    brandsGet: boolean,
    brandsGetSucceed: boolean,
    brandsGetFailed: boolean,

    modelsByBrand: Model[],
    modelsLoading: boolean,
    modelsError: boolean,

    listingsStatuses: ListStatus[] | null;
    getListingsStatuses: boolean;
    getListingsStatusesFailed: boolean;

    listingStatus: ListStatus | null;
    changeListingStatuses: boolean;
    changeListingStatusesFailed: boolean;


}

export const ListingsInitialState : IListingsList = {
    parameters: {
        page:  "1",
        limit:  "15",
        sort: undefined,
        order:  undefined,
        priceMin:  undefined,
        priceMax:  undefined,
        places: undefined,
        brandIds:  undefined,
        modelIds:  undefined,
        colorIds:  undefined,
        bodyTypeIds:  undefined,
        transmissionTypes:  undefined,
        engineTypes:  undefined,
        driveTypes: undefined,
    },
    listings: null,
    error: null,

    listingsRequest: false,
    listingRequestFailed: false,

    activeTab: "listings",


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

    brands: [],
    brandsGet: false,
    brandsGetSucceed: false,
    brandsGetFailed: false,

    modelsByBrand: [],
    modelsLoading: false,
    modelsError: false,

    listingsStatuses: [],
    getListingsStatuses: false,
    getListingsStatusesFailed: false,

    listingStatus: null,
    changeListingStatuses: false,
    changeListingStatusesFailed: false,
}

export const listingsReducer = (state = ListingsInitialState, action: TListings) => {
    switch (action.type){
        case GET_LISTINGS: return {...state, listingsRequest: true};
        case GET_LISTINGS_FAILURE: return {...state, error: action.error, listingsRequest: false, listingRequestFailed: true};
        case GET_LISTINGS_SUCCESS: return {...state, listingRequestFailed: false,
            listings: {
                ...state.listings,
                page: action.listings.page,
                data: action.listings.page !== 1 ? [...(state.listings?.data || []), ...action.listings.data]: action.listings.data,
                last_page: action.listings.last_page,
                total: action.listings.total,
                success: action.listings.success,
            },
            listingsRequest: false};

        case UPDATE_SEARCH_PARAMETERS: return { ...state, parameters: {...state.parameters, ...action.payload} };

        case SET_ACTIVE_TAB: return {...state, activeTab: action.activeTab}

        case GET_BRANDS_LISTINGS:
            return {
                ...state,
                brandsGet: true,
            };
        case GET_BRANDS_LISTINGS_SUCCEED:
            return {
                ...state,
                brandsGet: false,
                brands: action.brands,
                brandsGetFailed: false
            };
        case GET_BRANDS_LISTINGS_FAILED:
            return {
                ...state,
                brandsGet: false,
                brandsGetFailed: true,
            };

        case GET_MODELS_BY_BRAND_LISTINGS:
            return {
                ...state,
                modelsLoading: true
            };
        case GET_MODELS_BY_BRAND_LISTINGS_SUCCEED:
            return {
                ...state,
                modelsLoading: false,
                modelsByBrand: action.models
            };
        case GET_MODELS_BY_BRAND_LISTINGS_FAILED:
            return {
                ...state,
                modelsLoading: false,
                modelsError: true
            };

        case GET_ENGINES_BY_MODEL_LISTINGS:
            return {
                ...state,
                enginesLoading: true
            };
        case GET_ENGINES_BY_MODEL_LISTINGS_SUCCEED:
            return {
                ...state,
                enginesLoading: false,
                enginesByModel: action.enginesByModel
            };
        case GET_ENGINES_BY_MODEL_LISTINGS_FAILED:
            return {
                ...state,
                enginesLoading: false,
                enginesError: true
            };

        case GET_TRANSMISSIONS_BY_MODEL_LISTINGS:
            return {
                ...state,
                transmissionsLoading: true
            };
        case GET_TRANSMISSIONS_BY_MODEL_LISTINGS_SUCCEED:
            return {
                ...state,
                transmissionsLoading: false,
                transmissionsByModel: action.transmissionsByModel
            };
        case GET_TRANSMISSIONS_BY_MODEL_LISTINGS_FAILED:
            return {
                ...state,
                transmissionsLoading: false,
                transmissionsError: true
            };

        case GET_DRIVES_BY_MODEL_LISTINGS:
            return {
                ...state,
                drivesLoading: true
            };
        case GET_DRIVES_BY_MODEL_LISTINGS_SUCCEED:
            return {
                ...state,
                drivesLoading: false,
                drivesByModel: action.drivesByModel
            };
        case GET_DRIVES_BY_MODEL_LISTINGS_FAILED:
            return {
                ...state,
                drivesLoading: false,
                drivesError: true
            };

        case GET_BODYTYPES_BY_MODEL_LISTINGS:
            return {
                ...state,
                bodyTypesLoading: true
            };
        case GET_BODYTYPES_BY_MODEL_LISTINGS_SUCCEED:
            return {
                ...state,
                bodyTypesLoading: false,
                bodyTypesByModel: action.bodyTypesByModel
            };
        case GET_BODYTYPES_BY_MODEL_LISTINGS_FAILED:
            return {
                ...state,
                bodyTypesLoading: false,
                bodyTypesError: true
            };

        case GET_COLORS_BY_MODEL_LISTINGS:
            return {
                ...state,
                colorsLoading: true
            };
        case GET_COLORS_BY_MODEL_LISTINGS_SUCCEED:
            return {
                ...state,
                colorsLoading: false,
                colorsByModel: action.colorsByModel
            };
        case GET_COLORS_BY_MODEL_LISTINGS_FAILED:
            return {
                ...state,
                colorsLoading: false,
                colorsError: true
            };

        case RESET_MODELS_BY_BRAND: return {...state, modelsByBrand: []};

        case GET_LISTINGS_STATUSES: return {...state, getListingsStatuses: true };
        case GET_LISTINGS_STATUSES_SUCCEED: return {...state, getListingsStatuses: false, listingsStatuses: action.listing_statuses };
        case GET_LISTINGS_STATUSES_FAILED: return {...state, getListingsStatuses: false, getListingsStatusesFailed: true};

        case CHANGE_LISTING_STATUS: return {...state, changeListingStatuses: true};
        case CHANGE_LISTING_STATUS_SUCCEED: return {...state, changeListingStatuses: false, listingStatus: action.statusList};
        case CHANGE_LISTING_STATUS_FAILED: return {...state, changeListingStatuses: false};

        default: return state;
    }
}
