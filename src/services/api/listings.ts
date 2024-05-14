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

export const getListingById = (id: string) => {
    return request(`${LISTINGS}/${id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });
}

export const fetchSetNewStatusListing = (id: string, statusId: string) => {
    return request(`${LISTINGS}/status`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Barear '+ localStorage.getItem('accessToken') || '',
        },
        body: JSON.stringify({statusId, listingId: id}),
    })
}

export const fetchGetListingsStatuses = () => {
    return request(`${LISTINGS}/statuses`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
}