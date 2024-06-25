import { ListingsInitialState, listingsReducer } from "../../../services/reducers/listings";
import * as types from '../../../services/action-types/listings';

describe('Listings reducer', () => {
    it('should create initial state', () => {
        expect(listingsReducer(undefined, {})).toEqual(ListingsInitialState);
    });

    // Тесты для GET_LISTINGS actions
    it('should handle GET_LISTINGS', () => {
        const action = { type: types.GET_LISTINGS };
        const expectedState = {
            ...ListingsInitialState,
            listingsRequest: true
        };
        expect(listingsReducer(ListingsInitialState, action)).toEqual(expectedState);
    });

    it('should handle GET_LISTINGS_SUCCESS', () => {
        const action = {
            type: types.GET_LISTINGS_SUCCESS,
            listings: { page: 1, data: [{ id: 1, title: 'Test Listing' }], last_page: 1, total: 1, success: true }
        };
        const expectedState = {
            ...ListingsInitialState,
            listingsRequest: false,
            listings: {
                ...ListingsInitialState.listings,
                page: 1,
                data: [{ id: 1, title: 'Test Listing' }],
                last_page: 1,
                total: 1,
                success: true
            }
        };
        expect(listingsReducer(ListingsInitialState, action)).toEqual(expectedState);
    });

    it('should handle GET_LISTINGS_FAILURE', () => {
        const action = {
            type: types.GET_LISTINGS_FAILURE,
            error: 'Error fetching listings'
        };
        const expectedState = {
            ...ListingsInitialState,
            listingsRequest: false,
            listingRequestFailed: true,
            error: 'Error fetching listings'
        };
        expect(listingsReducer(ListingsInitialState, action)).toEqual(expectedState);
    });

    // Тесты для UPDATE_SEARCH_PARAMETERS actions
    it('should handle UPDATE_SEARCH_PARAMETERS', () => {
        const action = {
            type: types.UPDATE_SEARCH_PARAMETERS,
            payload: { page: "2" }
        };
        const expectedState = {
            ...ListingsInitialState,
            parameters: {
                ...ListingsInitialState.parameters,
                page: "2"
            }
        };
        expect(listingsReducer(ListingsInitialState, action)).toEqual(expectedState);
    });

    // Тесты для SET_ACTIVE_TAB actions
    it('should handle SET_ACTIVE_TAB', () => {
        const action = { type: types.SET_ACTIVE_TAB, activeTab: 'favorites' };
        const expectedState = {
            ...ListingsInitialState,
            activeTab: 'favorites'
        };
        expect(listingsReducer(ListingsInitialState, action)).toEqual(expectedState);
    });

    // Тесты для GET_BRANDS_LISTINGS actions
    it('should handle GET_BRANDS_LISTINGS', () => {
        const action = { type: types.GET_BRANDS_LISTINGS };
        const expectedState = {
            ...ListingsInitialState,
            brandsGet: true
        };
        expect(listingsReducer(ListingsInitialState, action)).toEqual(expectedState);
    });

    it('should handle GET_BRANDS_LISTINGS_SUCCEED', () => {
        const action = {
            type: types.GET_BRANDS_LISTINGS_SUCCEED,
            brands: [{ id: 1, name: 'Brand 1' }]
        };
        const expectedState = {
            ...ListingsInitialState,
            brandsGet: false,
            brands: [{ id: 1, name: 'Brand 1' }],
            brandsGetFailed: false
        };
        expect(listingsReducer(ListingsInitialState, action)).toEqual(expectedState);
    });

    it('should handle GET_BRANDS_LISTINGS_FAILED', () => {
        const action = { type: types.GET_BRANDS_LISTINGS_FAILED };
        const expectedState = {
            ...ListingsInitialState,
            brandsGet: false,
            brandsGetFailed: true
        };
        expect(listingsReducer(ListingsInitialState, action)).toEqual(expectedState);
    });

    // Тесты для GET_MODELS_BY_BRAND_LISTINGS actions
    it('should handle GET_MODELS_BY_BRAND_LISTINGS', () => {
        const action = { type: types.GET_MODELS_BY_BRAND_LISTINGS };
        const expectedState = {
            ...ListingsInitialState,
            modelsLoading: true
        };
        expect(listingsReducer(ListingsInitialState, action)).toEqual(expectedState);
    });

    it('should handle GET_MODELS_BY_BRAND_LISTINGS_SUCCEED', () => {
        const action = {
            type: types.GET_MODELS_BY_BRAND_LISTINGS_SUCCEED,
            models: [{ id: 1, name: 'Model 1' }]
        };
        const expectedState = {
            ...ListingsInitialState,
            modelsLoading: false,
            modelsByBrand: [{ id: 1, name: 'Model 1' }]
        };
        expect(listingsReducer(ListingsInitialState, action)).toEqual(expectedState);
    });

    it('should handle GET_MODELS_BY_BRAND_LISTINGS_FAILED', () => {
        const action = { type: types.GET_MODELS_BY_BRAND_LISTINGS_FAILED };
        const expectedState = {
            ...ListingsInitialState,
            modelsLoading: false,
            modelsError: true
        };
        expect(listingsReducer(ListingsInitialState, action)).toEqual(expectedState);
    });

    // Тесты для GET_ENGINES_BY_MODEL_LISTINGS actions
    it('should handle GET_ENGINES_BY_MODEL_LISTINGS', () => {
        const action = { type: types.GET_ENGINES_BY_MODEL_LISTINGS };
        const expectedState = {
            ...ListingsInitialState,
            enginesLoading: true
        };
        expect(listingsReducer(ListingsInitialState, action)).toEqual(expectedState);
    });

    it('should handle GET_ENGINES_BY_MODEL_LISTINGS_SUCCEED', () => {
        const action = {
            type: types.GET_ENGINES_BY_MODEL_LISTINGS_SUCCEED,
            enginesByModel: [{ id: 1, name: 'Engine 1' }]
        };
        const expectedState = {
            ...ListingsInitialState,
            enginesLoading: false,
            enginesByModel: [{ id: 1, name: 'Engine 1' }]
        };
        expect(listingsReducer(ListingsInitialState, action)).toEqual(expectedState);
    });

    it('should handle GET_ENGINES_BY_MODEL_LISTINGS_FAILED', () => {
        const action = { type: types.GET_ENGINES_BY_MODEL_LISTINGS_FAILED };
        const expectedState = {
            ...ListingsInitialState,
            enginesLoading: false,
            enginesError: true
        };
        expect(listingsReducer(ListingsInitialState, action)).toEqual(expectedState);
    });

    // Тесты для GET_TRANSMISSIONS_BY_MODEL_LISTINGS actions
    it('should handle GET_TRANSMISSIONS_BY_MODEL_LISTINGS', () => {
        const action = { type: types.GET_TRANSMISSIONS_BY_MODEL_LISTINGS };
        const expectedState = {
            ...ListingsInitialState,
            transmissionsLoading: true
        };
        expect(listingsReducer(ListingsInitialState, action)).toEqual(expectedState);
    });

    it('should handle GET_TRANSMISSIONS_BY_MODEL_LISTINGS_SUCCEED', () => {
        const action = {
            type: types.GET_TRANSMISSIONS_BY_MODEL_LISTINGS_SUCCEED,
            transmissionsByModel: [{ id: 1, name: 'Transmission 1' }]
        };
        const expectedState = {
            ...ListingsInitialState,
            transmissionsLoading: false,
            transmissionsByModel: [{ id: 1, name: 'Transmission 1' }]
        };
        expect(listingsReducer(ListingsInitialState, action)).toEqual(expectedState);
    });

    it('should handle GET_TRANSMISSIONS_BY_MODEL_LISTINGS_FAILED', () => {
        const action = { type: types.GET_TRANSMISSIONS_BY_MODEL_LISTINGS_FAILED };
        const expectedState = {
            ...ListingsInitialState,
            transmissionsLoading: false,
            transmissionsError: true
        };
        expect(listingsReducer(ListingsInitialState, action)).toEqual(expectedState);
    });

    // Тесты для GET_DRIVES_BY_MODEL_LISTINGS actions
    it('should handle GET_DRIVES_BY_MODEL_LISTINGS', () => {
        const action = { type: types.GET_DRIVES_BY_MODEL_LISTINGS };
        const expectedState = {
            ...ListingsInitialState,
            drivesLoading: true
        };
        expect(listingsReducer(ListingsInitialState, action)).toEqual(expectedState);
    });

    it('should handle GET_DRIVES_BY_MODEL_LISTINGS_SUCCEED', () => {
        const action = {
            type: types.GET_DRIVES_BY_MODEL_LISTINGS_SUCCEED,
            drivesByModel: [{ id: 1, name: 'Drive 1' }]
        };
        const expectedState = {
            ...ListingsInitialState,
            drivesLoading: false,
            drivesByModel: [{ id: 1, name: 'Drive 1' }]
        };
        expect(listingsReducer(ListingsInitialState, action)).toEqual(expectedState);
    });

    it('should handle GET_DRIVES_BY_MODEL_LISTINGS_FAILED', () => {
        const action = { type: types.GET_DRIVES_BY_MODEL_LISTINGS_FAILED };
        const expectedState = {
            ...ListingsInitialState,
            drivesLoading: false,
            drivesError: true
        };
        expect(listingsReducer(ListingsInitialState, action)).toEqual(expectedState);
    });

    // Тесты для GET_COLORS_BY_MODEL_LISTINGS actions
    it('should handle GET_COLORS_BY_MODEL_LISTINGS', () => {
        const action = { type: types.GET_COLORS_BY_MODEL_LISTINGS };
        const expectedState = {
            ...ListingsInitialState,
            colorsLoading: true
        };
        expect(listingsReducer(ListingsInitialState, action)).toEqual(expectedState);
    });

    it('should handle GET_COLORS_BY_MODEL_LISTINGS_SUCCEED', () => {
        const action = {
            type: types.GET_COLORS_BY_MODEL_LISTINGS_SUCCEED,
            colorsByModel: [{ id: 1, name: 'Color 1' }]
        };
        const expectedState = {
            ...ListingsInitialState,
            colorsLoading: false,
            colorsByModel: [{ id: 1, name: 'Color 1' }]
        };
        expect(listingsReducer(ListingsInitialState, action)).toEqual(expectedState);
    });

    it('should handle GET_COLORS_BY_MODEL_LISTINGS_FAILED', () => {
        const action = { type: types.GET_COLORS_BY_MODEL_LISTINGS_FAILED };
        const expectedState = {
            ...ListingsInitialState,
            colorsLoading: false,
            colorsError: true
        };
        expect(listingsReducer(ListingsInitialState, action)).toEqual(expectedState);
    });

    // Тесты для GET_BODYTYPES_BY_MODEL_LISTINGS actions
    it('should handle GET_BODYTYPES_BY_MODEL_LISTINGS', () => {
        const action = { type: types.GET_BODYTYPES_BY_MODEL_LISTINGS };
        const expectedState = {
            ...ListingsInitialState,
            bodyTypesLoading: true
        };
        expect(listingsReducer(ListingsInitialState, action)).toEqual(expectedState);
    });

    it('should handle GET_BODYTYPES_BY_MODEL_LISTINGS_SUCCEED', () => {
        const action = {
            type: types.GET_BODYTYPES_BY_MODEL_LISTINGS_SUCCEED,
            bodyTypesByModel: [{ id: 1, name: 'BodyType 1' }]
        };
        const expectedState = {
            ...ListingsInitialState,
            bodyTypesLoading: false,
            bodyTypesByModel: [{ id: 1, name: 'BodyType 1' }]
        };
        expect(listingsReducer(ListingsInitialState, action)).toEqual(expectedState);
    });

    it('should handle GET_BODYTYPES_BY_MODEL_LISTINGS_FAILED', () => {
        const action = { type: types.GET_BODYTYPES_BY_MODEL_LISTINGS_FAILED };
        const expectedState = {
            ...ListingsInitialState,
            bodyTypesLoading: false,
            bodyTypesError: true
        };
        expect(listingsReducer(ListingsInitialState, action)).toEqual(expectedState);
    });

    // Тесты для GET_LISTINGS_STATUSES actions
    it('should handle GET_LISTINGS_STATUSES', () => {
        const action = { type: types.GET_LISTINGS_STATUSES };
        const expectedState = {
            ...ListingsInitialState,
            getListingsStatuses: true
        };
        expect(listingsReducer(ListingsInitialState, action)).toEqual(expectedState);
    });

    it('should handle GET_LISTINGS_STATUSES_SUCCEED', () => {
        const action = {
            type: types.GET_LISTINGS_STATUSES_SUCCEED,
            listing_statuses: [{ id: 1, name: 'Active' }]
        };
        const expectedState = {
            ...ListingsInitialState,
            getListingsStatuses: false,
            listingsStatuses: [{ id: 1, name: 'Active' }]
        };
        expect(listingsReducer(ListingsInitialState, action)).toEqual(expectedState);
    });

    it('should handle GET_LISTINGS_STATUSES_FAILED', () => {
        const action = { type: types.GET_LISTINGS_STATUSES_FAILED };
        const expectedState = {
            ...ListingsInitialState,
            getListingsStatuses: false,
            getListingsStatusesFailed: true
        };
        expect(listingsReducer(ListingsInitialState, action)).toEqual(expectedState);
    });

    // Тесты для CHANGE_LISTING_STATUS actions
    it('should handle CHANGE_LISTING_STATUS', () => {
        const action = { type: types.CHANGE_LISTING_STATUS };
        const expectedState = {
            ...ListingsInitialState,
            changeListingStatuses: true
        };
        expect(listingsReducer(ListingsInitialState, action)).toEqual(expectedState);
    });

    it('should handle CHANGE_LISTING_STATUS_SUCCEED', () => {
        const action = {
            type: types.CHANGE_LISTING_STATUS_SUCCEED,
            statusList: { id: 1, type: 'Active' }
        };
        const expectedState = {
            ...ListingsInitialState,
            changeListingStatuses: false,
            listingStatus: { id: 1, type: 'Active' }
        };
        expect(listingsReducer(ListingsInitialState, action)).toEqual(expectedState);
    });

    it('should handle CHANGE_LISTING_STATUS_FAILED', () => {
        const action = { type: types.CHANGE_LISTING_STATUS_FAILED };
        const expectedState = {
            ...ListingsInitialState,
            changeListingStatuses: false
        };
        expect(listingsReducer(ListingsInitialState, action)).toEqual(expectedState);
    });
});
