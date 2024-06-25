import {
    CHANGE_LISTING_STATUS, CHANGE_LISTING_STATUS_FAILED, CHANGE_LISTING_STATUS_SUCCEED,
    GET_BODYTYPES_BY_MODEL_LISTINGS, GET_BODYTYPES_BY_MODEL_LISTINGS_FAILED, GET_BODYTYPES_BY_MODEL_LISTINGS_SUCCEED,
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
    GET_LISTINGS_FAILURE, GET_LISTINGS_STATUSES, GET_LISTINGS_STATUSES_FAILED, GET_LISTINGS_STATUSES_SUCCEED,
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
import {IParametersSearch, ListingsResponse, ListStatus} from "../../type/listings/listings";

import {BodyType, Brand, Color, Drive, Engine, Model, Transmission} from "../../type/car/cars-details";


interface IGetListingsAction {
    readonly type: typeof GET_LISTINGS;
}

interface IGetListingsActionSuccess {
    readonly type: typeof GET_LISTINGS_SUCCESS;
    listings: ListingsResponse;
}

interface IGetListingsActionFailure {
    readonly type: typeof GET_LISTINGS_FAILURE;
    error: string;
}

type TGetListings = IGetListingsAction | IGetListingsActionSuccess | IGetListingsActionFailure;


interface IUpdateSearchParametersAction {
    readonly type: typeof UPDATE_SEARCH_PARAMETERS;
    payload: IParametersSearch;
}

interface ISetActiveTabAction {
    readonly type: typeof SET_ACTIVE_TAB;
    activeTab: string;
}

interface IGetBrandsListingsAction {
    readonly type: typeof GET_BRANDS_LISTINGS;
}
interface IGetBrandsListingsSuccessAction {
    readonly type: typeof GET_BRANDS_LISTINGS_SUCCEED;
    brands: Brand[];
}
interface IGetBrandsListingsFailedAction {
    readonly type: typeof GET_BRANDS_LISTINGS_FAILED;
}
export type TGetBrandsListingsAction = IGetBrandsListingsAction | IGetBrandsListingsSuccessAction | IGetBrandsListingsFailedAction;

interface IGetModelsByBrandListingsAction { readonly type: typeof GET_MODELS_BY_BRAND_LISTINGS; }
interface IGetModelsByBrandListingsSuccessAction { readonly type: typeof GET_MODELS_BY_BRAND_LISTINGS_SUCCEED; models: Model[]; }
interface IGetModelsByBrandListingsFailedAction { readonly type: typeof GET_MODELS_BY_BRAND_LISTINGS_FAILED; }
export type TGetModelsByBrandListingsAction = IGetModelsByBrandListingsAction | IGetModelsByBrandListingsSuccessAction | IGetModelsByBrandListingsFailedAction;

interface IGetEnginesByModelListingsAction { readonly type: typeof GET_ENGINES_BY_MODEL_LISTINGS; }
interface IGetEnginesByModelListingsSuccessAction { readonly type: typeof GET_ENGINES_BY_MODEL_LISTINGS_SUCCEED; enginesByModel: Engine[]; }
interface IGetEnginesByModelListingsFailedAction { readonly type: typeof GET_ENGINES_BY_MODEL_LISTINGS_FAILED; }
export type TGetEnginesByModelListingsAction = IGetEnginesByModelListingsAction | IGetEnginesByModelListingsSuccessAction | IGetEnginesByModelListingsFailedAction;

interface IGetTransmissionsByModelListingsAction { readonly type: typeof GET_TRANSMISSIONS_BY_MODEL_LISTINGS; }
interface IGetTransmissionsByModelListingsSuccessAction { readonly type: typeof GET_TRANSMISSIONS_BY_MODEL_LISTINGS_SUCCEED; transmissionsByModel: Transmission[]; }
interface IGetTransmissionsByModelListingsFailedAction { readonly type: typeof GET_TRANSMISSIONS_BY_MODEL_LISTINGS_FAILED; }

interface IGetDrivesByModelListingsAction { readonly type: typeof GET_DRIVES_BY_MODEL_LISTINGS; }
interface IGetDrivesByModelListingsSuccessAction { readonly type: typeof GET_DRIVES_BY_MODEL_LISTINGS_SUCCEED; drivesByModel: Drive[]; }
interface IGetDrivesByModelListingsFailedAction { readonly type: typeof GET_DRIVES_BY_MODEL_LISTINGS_FAILED; }

interface IGetColorsByModelListingsAction { readonly type: typeof GET_COLORS_BY_MODEL_LISTINGS; }
interface IGetColorsByModelListingsSuccessAction { readonly type: typeof GET_COLORS_BY_MODEL_LISTINGS_SUCCEED; colorsByModel: Color[]; }
interface IGetColorsByModelListingsFailedAction { readonly type: typeof GET_COLORS_BY_MODEL_LISTINGS_FAILED; }

interface IGetBodyTypesByModelListingsAction { readonly type: typeof GET_BODYTYPES_BY_MODEL_LISTINGS; }
interface IGetBodyTypesByModelListingsSuccessAction { readonly type: typeof GET_BODYTYPES_BY_MODEL_LISTINGS_SUCCEED; bodyTypesByModel: BodyType[]; }
interface IGetBodyTypesByModelListingsFailedAction { readonly type: typeof GET_BODYTYPES_BY_MODEL_LISTINGS_FAILED; }
interface IResetModelsByBrandAction { readonly type: typeof RESET_MODELS_BY_BRAND; }

export type TGetTransmissionsByModelListingsAction = IGetTransmissionsByModelListingsAction | IGetTransmissionsByModelListingsSuccessAction | IGetTransmissionsByModelListingsFailedAction;
export type TGetBodyTypesByModelListingsAction = IGetBodyTypesByModelListingsAction | IGetBodyTypesByModelListingsSuccessAction | IGetBodyTypesByModelListingsFailedAction;
export type TGetColorsByModelListingsAction = IGetColorsByModelListingsAction | IGetColorsByModelListingsSuccessAction | IGetColorsByModelListingsFailedAction;
export type TGetDrivesByModelListingsAction = IGetDrivesByModelListingsAction | IGetDrivesByModelListingsSuccessAction | IGetDrivesByModelListingsFailedAction;


interface IGetListingsStatusesAction { readonly type: typeof GET_LISTINGS_STATUSES;}
interface IGetListingsStatusesSuccessAction { readonly type: typeof GET_LISTINGS_STATUSES_SUCCEED; listing_statuses: ListStatus[];}
interface IGetListingsStatusesFailedAction { readonly type: typeof GET_LISTINGS_STATUSES_FAILED;}

interface IChangeListingStatusAction { readonly type: typeof CHANGE_LISTING_STATUS;}
interface IChangeListingStatusSuccessAction { readonly type: typeof CHANGE_LISTING_STATUS_SUCCEED; statusList: ListStatus}
interface IChangeListingStatusFailedAction { readonly type: typeof CHANGE_LISTING_STATUS_FAILED;}

export type TGetListingsStatusesActions = IGetListingsStatusesAction | IGetListingsStatusesSuccessAction | IGetListingsStatusesFailedAction;
export type TChangeListingStatusActions = IChangeListingStatusAction | IChangeListingStatusSuccessAction | IChangeListingStatusFailedAction;


export type TListings = TGetListings | IUpdateSearchParametersAction | ISetActiveTabAction | TGetTransmissionsByModelListingsAction |
    TGetModelsByBrandListingsAction | TGetEnginesByModelListingsAction | TGetBrandsListingsAction |
    TGetBodyTypesByModelListingsAction | TGetColorsByModelListingsAction | TGetDrivesByModelListingsAction | IResetModelsByBrandAction
    | TGetListingsStatusesActions | TChangeListingStatusActions;
