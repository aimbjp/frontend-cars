import {request} from "./user";
import {IListingData} from "../../type/listings/listings";

export const fetchAddListing = async (listingData: IListingData) => {
    return request('/listings/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',
            'Authorization': 'Barear '+ localStorage.getItem('accessToken') || '',
        },
        body: JSON.stringify(listingData),
    });
};
