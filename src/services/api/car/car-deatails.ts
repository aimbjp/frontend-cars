import {request} from "../user";


export const fetchAddDetailNameOnly = (link: string, name: string) => {
    return request(link,
        {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({name})
        })
}

export const fetchAddBrand = (name: string) => {
    return fetchAddDetailNameOnly('/brands', name);
}

export const fetchAddModel = (name: string) => {
    return fetchAddDetailNameOnly('/models', name);
}

export const fetchGetBrands = () => {
    return request(`/brands`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
}

export const fetchGetModelsWithoutBrand = () => {
    return request(`/models-without-brand`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
}

export const fetchAssociateModelWithBrand = (modelId: number, brandId: number)  => {
    return request(`/models/` + modelId, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ modelId, brandId }),
    })
}

export const fetchGetDetails = (endpoint: string) => {
    return request(endpoint, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
    })
}

export const fetchUpdateDetailWithId = (endpoint: string, id: number, detail: any) => {
    return request(`${endpoint}/${id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(detail)
    })
}

export const fetchDeleteDetailById = (endpoint: string, id: number) => {
    return request(`${endpoint}/${id}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'}
    })
}

