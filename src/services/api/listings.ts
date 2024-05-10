import {request} from "./user";
import {IListingData} from "../../type/listings/listings";

export const addListing = async (listingData: IListingData) => {
    const response = await request('/listings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(listingData),
    });
    if (!response.ok) {
        console.log(listingData)
        throw new Error('Failed to add listing');
    }
    return await response.json();
};
