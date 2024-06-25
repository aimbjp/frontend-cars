import { initialState, listingReducer } from "../../../services/reducers/listing-add";
import * as types from '../../../services/action-types/listing-add';

describe('Listing reducer', () => {
    it('should create initial state', () => {
        expect(listingReducer(undefined, {})).toEqual(initialState);
    });

    // Тесты для ADD_LISTING actions
    it('should handle ADD_LISTING_REQUEST', () => {
        const action = { type: types.ADD_LISTING_REQUEST };
        const expectedState = {
            ...initialState,
            loading: true
        };
        expect(listingReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle ADD_LISTING_SUCCESS', () => {
        const action = {
            type: types.ADD_LISTING_SUCCESS,
            payload: { id: 1, title: 'Test Listing' }
        };
        const expectedState = {
            ...initialState,
            loadingSuccess: true,
            listing: { id: 1, title: 'Test Listing' }
        };
        expect(listingReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle ADD_LISTING_FAILURE', () => {
        const action = {
            type: types.ADD_LISTING_FAILURE,
            payload: 'Error adding listing'
        };
        const expectedState = {
            ...initialState,
            loading: false,
            error: 'Error adding listing'
        };
        expect(listingReducer(initialState, action)).toEqual(expectedState);
    });

    // Тесты для GET_ENGINES_BY_MODEL actions
    it('should handle GET_ENGINES_BY_MODEL', () => {
        const action = { type: types.GET_ENGINES_BY_MODEL };
        const expectedState = {
            ...initialState,
            enginesLoading: true
        };
        expect(listingReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle GET_ENGINES_BY_MODEL_SUCCEED', () => {
        const action = {
            type: types.GET_ENGINES_BY_MODEL_SUCCEED,
            enginesByModel: [{ id: 1, name: 'Engine 1' }]
        };
        const expectedState = {
            ...initialState,
            enginesLoading: false,
            enginesByModel: [{ id: 1, name: 'Engine 1' }]
        };
        expect(listingReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle GET_ENGINES_BY_MODEL_FAILED', () => {
        const action = { type: types.GET_ENGINES_BY_MODEL_FAILED };
        const expectedState = {
            ...initialState,
            enginesLoading: false,
            enginesError: true
        };
        expect(listingReducer(initialState, action)).toEqual(expectedState);
    });

    // Тесты для GET_TRANSMISSIONS_BY_MODEL actions
    it('should handle GET_TRANSMISSIONS_BY_MODEL', () => {
        const action = { type: types.GET_TRANSMISSIONS_BY_MODEL };
        const expectedState = {
            ...initialState,
            transmissionsLoading: true
        };
        expect(listingReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle GET_TRANSMISSIONS_BY_MODEL_SUCCEED', () => {
        const action = {
            type: types.GET_TRANSMISSIONS_BY_MODEL_SUCCEED,
            transmissionsByModel: [{ id: 1, name: 'Transmission 1' }]
        };
        const expectedState = {
            ...initialState,
            transmissionsLoading: false,
            transmissionsByModel: [{ id: 1, name: 'Transmission 1' }]
        };
        expect(listingReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle GET_TRANSMISSIONS_BY_MODEL_FAILED', () => {
        const action = { type: types.GET_TRANSMISSIONS_BY_MODEL_FAILED };
        const expectedState = {
            ...initialState,
            transmissionsLoading: false,
            transmissionsError: true
        };
        expect(listingReducer(initialState, action)).toEqual(expectedState);
    });

    // Тесты для GET_DRIVES_BY_MODEL actions
    it('should handle GET_DRIVES_BY_MODEL', () => {
        const action = { type: types.GET_DRIVES_BY_MODEL };
        const expectedState = {
            ...initialState,
            drivesLoading: true
        };
        expect(listingReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle GET_DRIVES_BY_MODEL_SUCCEED', () => {
        const action = {
            type: types.GET_DRIVES_BY_MODEL_SUCCEED,
            drivesByModel: [{ id: 1, name: 'Drive 1' }]
        };
        const expectedState = {
            ...initialState,
            drivesLoading: false,
            drivesByModel: [{ id: 1, name: 'Drive 1' }]
        };
        expect(listingReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle GET_DRIVES_BY_MODEL_FAILED', () => {
        const action = { type: types.GET_DRIVES_BY_MODEL_FAILED };
        const expectedState = {
            ...initialState,
            drivesLoading: false,
            drivesError: true
        };
        expect(listingReducer(initialState, action)).toEqual(expectedState);
    });

    // Тесты для GET_COLORS_BY_MODEL actions
    it('should handle GET_COLORS_BY_MODEL', () => {
        const action = { type: types.GET_COLORS_BY_MODEL };
        const expectedState = {
            ...initialState,
            colorsLoading: true
        };
        expect(listingReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle GET_COLORS_BY_MODEL_SUCCEED', () => {
        const action = {
            type: types.GET_COLORS_BY_MODEL_SUCCEED,
            colorsByModel: [{ id: 1, name: 'Color 1' }]
        };
        const expectedState = {
            ...initialState,
            colorsLoading: false,
            colorsByModel: [{ id: 1, name: 'Color 1' }]
        };
        expect(listingReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle GET_COLORS_BY_MODEL_FAILED', () => {
        const action = { type: types.GET_COLORS_BY_MODEL_FAILED };
        const expectedState = {
            ...initialState,
            colorsLoading: false,
            colorsError: true
        };
        expect(listingReducer(initialState, action)).toEqual(expectedState);
    });

    // Тесты для GET_BODYTYPES_BY_MODEL actions
    it('should handle GET_BODYTYPES_BY_MODEL', () => {
        const action = { type: types.GET_BODYTYPES_BY_MODEL };
        const expectedState = {
            ...initialState,
            bodyTypesLoading: true
        };
        expect(listingReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle GET_BODYTYPES_BY_MODEL_SUCCEED', () => {
        const action = {
            type: types.GET_BODYTYPES_BY_MODEL_SUCCEED,
            bodyTypesByModel: [{ id: 1, name: 'BodyType 1' }]
        };
        const expectedState = {
            ...initialState,
            bodyTypesLoading: false,
            bodyTypesByModel: [{ id: 1, name: 'BodyType 1' }]
        };
        expect(listingReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle GET_BODYTYPES_BRAND_FAILED', () => {
        const action = { type: types.GET_BODYTYPES_BRAND_FAILED };
        const expectedState = {
            ...initialState,
            bodyTypesLoading: false,
            bodyTypesError: true
        };
        expect(listingReducer(initialState, action)).toEqual(expectedState);
    });

    // Тесты для SET_ACTIVE_MODEL actions
    it('should handle SET_ACTIVE_MODEL', () => {
        const action = { type: types.SET_ACTIVE_MODEL, activeModel: { id: 1, name: 'Model 1' } };
        const expectedState = {
            ...initialState,
            activeModel: { id: 1, name: 'Model 1' }
        };
        expect(listingReducer(initialState, action)).toEqual(expectedState);
    });

    // Аналогичные тесты для остальных SET_ACTIVE_* actions
    it('should handle SET_ACTIVE_BRAND', () => {
        const action = { type: types.SET_ACTIVE_BRAND, activeBrand: { id: 1, name: 'Brand 1' } };
        const expectedState = {
            ...initialState,
            activeBrand: { id: 1, name: 'Brand 1' }
        };
        expect(listingReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle SET_ACTIVE_DRIVE', () => {
        const action = { type: types.SET_ACTIVE_DRIVE, activeDrive: { id: 1, name: 'Drive 1' } };
        const expectedState = {
            ...initialState,
            activeDrive: { id: 1, name: 'Drive 1' }
        };
        expect(listingReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle SET_ACTIVE_ENGINE', () => {
        const action = { type: types.SET_ACTIVE_ENGINE, activeEngine: { id: 1, name: 'Engine 1' } };
        const expectedState = {
            ...initialState,
            activeEngine: { id: 1, name: 'Engine 1' }
        };
        expect(listingReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle SET_ACTIVE_BODYTYPE', () => {
        const action = { type: types.SET_ACTIVE_BODYTYPE, activeBodyType: { id: 1, name: 'BodyType 1' } };
        const expectedState = {
            ...initialState,
            activeBodyType: { id: 1, name: 'BodyType 1' }
        };
        expect(listingReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle SET_ACTIVE_COLOR', () => {
        const action = { type: types.SET_ACTIVE_COLOR, activeColor: { id: 1, name: 'Color 1' } };
        const expectedState = {
            ...initialState,
            activeColor: { id: 1, name: 'Color 1' }
        };
        expect(listingReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle SET_ACTIVE_TRANSMISSION', () => {
        const action = { type: types.SET_ACTIVE_TRANSMISSION, activeTransmission: { id: 1, name: 'Transmission 1' } };
        const expectedState = {
            ...initialState,
            activeTransmission: { id: 1, name: 'Transmission 1' }
        };
        expect(listingReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle SET_ACTIVE_PRICE', () => {
        const action = { type: types.SET_ACTIVE_PRICE, activePrice: '1000' };
        const expectedState = {
            ...initialState,
            activePrice: '1000'
        };
        expect(listingReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle SET_ACTIVE_MILEAGE', () => {
        const action = { type: types.SET_ACTIVE_MILEAGE, activeMileage: 1000 };
        const expectedState = {
            ...initialState,
            activeMileage: 1000
        };
        expect(listingReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle SET_ACTIVE_PHOTOS', () => {
        const action = { type: types.SET_ACTIVE_PHOTOS, activePhotos: ['photo1.jpg', 'photo2.jpg'] };
        const expectedState = {
            ...initialState,
            activeImages: ['photo1.jpg', 'photo2.jpg']
        };
        expect(listingReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle SET_ACTIVE_PLACE', () => {
        const action = { type: types.SET_ACTIVE_PLACE, activePlace: 'Place 1' };
        const expectedState = {
            ...initialState,
            activePlace: 'Place 1'
        };
        expect(listingReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle SET_ACTIVE_YEAR', () => {
        const action = { type: types.SET_ACTIVE_YEAR, activeYear: 2022 };
        const expectedState = {
            ...initialState,
            activeYear: 2022
        };
        expect(listingReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle SET_ACTIVE_VIN', () => {
        const action = { type: types.SET_ACTIVE_VIN, activeVIN: 'VIN12345' };
        const expectedState = {
            ...initialState,
            activeVIN: 'VIN12345'
        };
        expect(listingReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle SET_ACTIVE_OWNERSCOUNT', () => {
        const action = { type: types.SET_ACTIVE_OWNERSCOUNT, activeOwnersCount: 1 };
        const expectedState = {
            ...initialState,
            activeOwnersCount: 1
        };
        expect(listingReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle SET_ACTIVE_EXCHANGE', () => {
        const action = { type: types.SET_ACTIVE_EXCHANGE, activeExchange: true };
        const expectedState = {
            ...initialState,
            activeExchange: true
        };
        expect(listingReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle SET_ACTIVE_DESCRIPTION', () => {
        const action = { type: types.SET_ACTIVE_DESCRIPTION, activeDescription: 'Test Description' };
        const expectedState = {
            ...initialState,
            activeDescription: 'Test Description'
        };
        expect(listingReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle SET_ACTIVE_PTS', () => {
        const action = { type: types.SET_ACTIVE_PTS, activePTS: 'PTS12345' };
        const expectedState = {
            ...initialState,
            activePTS: 'PTS12345'
        };
        expect(listingReducer(initialState, action)).toEqual(expectedState);
    });
});
