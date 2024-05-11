import {
    ADD_LISTING_FAILURE,
    ADD_LISTING_REQUEST,
    ADD_LISTING_SUCCESS,
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
    SET_ACTIVE_MILEAGE,
    SET_ACTIVE_MODEL, SET_ACTIVE_OWNERSCOUNT,
    SET_ACTIVE_PHOTOS,
    SET_ACTIVE_PLACE,
    SET_ACTIVE_PRICE, SET_ACTIVE_PTS,
    SET_ACTIVE_TRANSMISSION,
    SET_ACTIVE_VIN,
    SET_ACTIVE_YEAR
} from "../action-types/listing-add";
import {IListingResponse} from "../../type/listings/listings";
import {BodyType, Brand, Color, Drive, Engine, Model, Transmission} from "../../type/car/cars-details";

export interface IAddListingRequestAction {
    readonly type: typeof ADD_LISTING_REQUEST;
}

export interface IAddListingSuccessAction {
    readonly type: typeof ADD_LISTING_SUCCESS;
    payload: IListingResponse;
}

export interface IAddListingFailureAction {
    readonly type: typeof ADD_LISTING_FAILURE;
    payload: string;
}

interface IGetEnginesByModelAction { readonly type: typeof GET_ENGINES_BY_MODEL; }
interface IGetEnginesByModelSuccessAction { readonly type: typeof GET_ENGINES_BY_MODEL_SUCCEED; enginesByModel: Engine[]; }
interface IGetEnginesByModelFailedAction { readonly type: typeof GET_ENGINES_BY_MODEL_FAILED; }

interface IGetTransmissionsByModelAction { readonly type: typeof GET_TRANSMISSIONS_BY_MODEL; }
interface IGetTransmissionsByModelSuccessAction { readonly type: typeof GET_TRANSMISSIONS_BY_MODEL_SUCCEED; transmissionsByModel: Transmission[]; }
interface IGetTransmissionsByModelFailedAction { readonly type: typeof GET_TRANSMISSIONS_BY_MODEL_FAILED; }

interface IGetDrivesByModelAction { readonly type: typeof GET_DRIVES_BY_MODEL; }
interface IGetDrivesByModelSuccessAction { readonly type: typeof GET_DRIVES_BY_MODEL_SUCCEED; drivesByModel: Drive[]; }
interface IGetDrivesByModelFailedAction { readonly type: typeof GET_DRIVES_BY_MODEL_FAILED; }


interface IGetColorsByModelAction { readonly type: typeof GET_COLORS_BY_MODEL; }
interface IGetColorsByModelSuccessAction { readonly type: typeof GET_COLORS_BY_MODEL_SUCCEED; colorsByModel: Color[]; }
interface IGetColorsByModelFailedAction { readonly type: typeof GET_COLORS_BY_MODEL_FAILED; }

interface IGetBodyTypesByModelAction { readonly type: typeof GET_BODYTYPES_BY_MODEL; }
interface IGetBodyTypesByModelSuccessAction { readonly type: typeof GET_BODYTYPES_BY_MODEL_SUCCEED; bodyTypesByModel: BodyType[]; }
interface IGetBodyTypesByModelFailedAction { readonly type: typeof GET_BODYTYPES_BRAND_FAILED; }

interface ISetActiveModelAction { readonly type: typeof SET_ACTIVE_MODEL; activeModel: Model | null; }
interface ISetActiveBrandAction { readonly type: typeof SET_ACTIVE_BRAND; activeBrand: Brand | null; }
interface ISetActiveDriveAction { readonly type: typeof SET_ACTIVE_DRIVE; activeDrive: Drive | null; }
interface ISetActiveEngineAction { readonly type: typeof SET_ACTIVE_ENGINE; activeEngine: Engine | null; }
interface ISetActiveBodyTypeAction { readonly type: typeof SET_ACTIVE_BODYTYPE; activeBodyType: BodyType | null; }
interface ISetActiveColorAction { readonly type: typeof SET_ACTIVE_COLOR; activeColor: Color | null; }
interface ISetActiveTransmissionAction { readonly type: typeof SET_ACTIVE_TRANSMISSION; activeTransmission: Transmission | null; }
interface ISetActivePriceAction { readonly type: typeof SET_ACTIVE_PRICE; activePrice: string | null; }
interface ISetActiveMileageAction { readonly type: typeof SET_ACTIVE_MILEAGE; activeMileage: number | null; }
interface ISetActivePhotosAction { readonly type: typeof SET_ACTIVE_PHOTOS; activePhotos: string[] | null; }
interface ISetActivePlaceAction { readonly type: typeof SET_ACTIVE_PLACE; activePlace: string | null; }
interface ISetActiveYearAction { readonly type: typeof SET_ACTIVE_YEAR; activeYear: number | null; }
interface ISetActiveVINAction { readonly type: typeof SET_ACTIVE_VIN; activeVIN: string | null; }
interface ISetActiveOwnersCountAction { readonly type: typeof SET_ACTIVE_OWNERSCOUNT; activeOwnersCount: number | null; }
interface ISetActiveExchangeAction { readonly type: typeof SET_ACTIVE_EXCHANGE; activeExchange: boolean | null; }
interface ISetActiveDescriptionAction { readonly type: typeof SET_ACTIVE_DESCRIPTION; activeDescription: string | null; }
interface ISetActivePTSAction { readonly type: typeof SET_ACTIVE_PTS; activePTS: string | null; }

type TCarSettingsActions = ISetActiveModelAction | ISetActiveBrandAction | ISetActiveDriveAction | ISetActiveEngineAction | ISetActiveBodyTypeAction |
    ISetActiveColorAction | ISetActiveTransmissionAction | ISetActivePriceAction | ISetActiveMileageAction |
    ISetActivePhotosAction | ISetActivePlaceAction | ISetActiveYearAction | ISetActiveVINAction |
    ISetActiveOwnersCountAction | ISetActiveExchangeAction | ISetActiveDescriptionAction | ISetActivePTSAction;

export type TListingActionTypes =
    | IAddListingRequestAction
    | IAddListingSuccessAction
    | IAddListingFailureAction
    | IGetBodyTypesByModelAction | IGetBodyTypesByModelSuccessAction | IGetBodyTypesByModelFailedAction
    | IGetColorsByModelAction | IGetColorsByModelSuccessAction | IGetColorsByModelFailedAction
    | IGetEnginesByModelAction | IGetEnginesByModelSuccessAction | IGetEnginesByModelFailedAction
    |   IGetTransmissionsByModelAction | IGetTransmissionsByModelSuccessAction | IGetTransmissionsByModelFailedAction
    | IGetDrivesByModelAction | IGetDrivesByModelSuccessAction | IGetDrivesByModelFailedAction  | TCarSettingsActions;