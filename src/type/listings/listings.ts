export interface IListingResponse {
    price: string;
    tax: string;
    VIN: string;
    place: string;
    ownersCount: number;
    customs: string;
    exchange: boolean;
    datePosted: string;
    views: number;
    description: string;
    car: Car;
    listStatus: ListStatus;
    user: number;
    pts: string | null;
    listingId: number;
    success: boolean;
}

export interface Car {
    carId: number;
    year: number;
    listings: Listing[];
}

export interface Listing {
    listingId: number;
    price: string;
    tax: string;
    pts: string | null;
    VIN: string;
    place: string;
    ownersCount: number;
    customs: string;
    exchange: boolean;
    datePosted: string;
    views: number;
    description: string;
}

export interface ListStatus {
    listStatusId: number;
    type?: string;
}


export interface IListingData {
    modelId: number;
    engineId: number;
    transmissionId: number;
    driveId: number;
    bodyTypeId: number;
    colorId: number;
    year: number;
    price: string;
    VIN: string;
    place: string;
    ownersCount: number;
    customs?: string;
    exchange?: boolean;
    description: string;
    userId: number;
    pts?: string;
    images?: string[] | null;
}
