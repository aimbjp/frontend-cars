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

export interface IParametersSearch {
    page: string | undefined;
    limit: string | undefined;
    sort: string | undefined;
    order: 'ASC' | 'DESC' | undefined;
    priceMin: string | undefined;
    priceMax: string | undefined;
    places: string | string[] | undefined;
    brandIds: string | string[] | undefined;
    modelIds: string | string[] | undefined;
    colorIds: string | string[] | undefined;
    bodyTypeIds: string | string[] | undefined;
    transmissionTypes: string | string[] | undefined;
    engineTypes: string | string[] | undefined;
    driveTypes: string | string[] | undefined;
}




interface Brand {
    brandId: number;
    name: string;
}

interface Model {
    modelId: number;
    name: string;
    brand: Brand;
}

interface Color {
    colorId: number;
    type: string;
}

interface BodyType {
    bodyTypeId: number;
    type: string;
}

interface Transmission {
    transmissionId: number;
    type: string;
}

interface Engine {
    engineId: number;
    type: string;
    capacity: number | null;
}

interface Drive {
    driveId: number;
    type: string;
}

export interface Car {
    carId: number;
    year: number;
    model: Model;
    color: Color;
    bodyType: BodyType;
    transmission: Transmission;
    engine: Engine;
    drive: Drive;
}

export interface Listing {
    listingId: number;
    user?: {
        userId: string;
        name: string;
        contactInfo: any;
    }
    price: string;
    tax: string | null;
    pts: string | null;
    VIN: string;
    place: string;
    media_url: string[];
    ownersCount: number;
    customs: string | null;
    exchange: boolean;
    datePosted: string;
    views: number;
    description: string;
    car: Car;
    listStatus?: ListStatus;
}

export interface ListingsResponse {
    data: Listing[];
    total: number;
    page: number;
    last_page: number;
    success: boolean;
}
