import {IParametersSearch} from "../../type/listings/listings";
import {request} from "./user";
import {LISTINGS, URL_API} from "./links";


export const fetchGetListings = (parameters: IParametersSearch | null) => {
    return request(LISTINGS, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: parameters ? (JSON.stringify(parameters)) : (JSON.stringify({noParams: true})),
    })
}