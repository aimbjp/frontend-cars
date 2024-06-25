import { carDetailsReducer, initialState } from "../../../services/reducers/car-details";
import * as types from "../../../services/action-types/car-details";

describe('CarDetails reducer', () => {
    it('should create initial state', () => {
        expect(carDetailsReducer(undefined, {})).toEqual(initialState);
    });

    // Тесты для ADD_BRAND actions
    it('should handle ADD_BRAND', () => {
        const action = { type: types.ADD_BRAND };
        const expectedState = {
            ...initialState,
            brandAdd: true,
            brandAddSucceed: false,
        };
        expect(carDetailsReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle ADD_BRAND_SUCCEED', () => {
        const action = { type: types.ADD_BRAND_SUCCEED };
        const expectedState = {
            ...initialState,
            brandAdd: false,
            brandAddSucceed: true,
            brandAddFailed: false,
        };
        expect(carDetailsReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle ADD_BRAND_FAILED', () => {
        const action = { type: types.ADD_BRAND_FAILED };
        const expectedState = {
            ...initialState,
            brandAdd: false,
            brandAddFailed: true,
            brandAddSucceed: false,
        };
        expect(carDetailsReducer(initialState, action)).toEqual(expectedState);
    });

    // Тесты для ADD_MODEL actions
    it('should handle ADD_MODEL', () => {
        const action = { type: types.ADD_MODEL };
        const expectedState = {
            ...initialState,
            modelAdd: true,
            modelAddSucceed: false,
        };
        expect(carDetailsReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle ADD_MODEL_SUCCEED', () => {
        const action = { type: types.ADD_MODEL_SUCCEED };
        const expectedState = {
            ...initialState,
            modelName: '',
            modelAdd: false,
            modelAddSucceed: true,
            modelAddFailed: false,
        };
        expect(carDetailsReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle ADD_MODEL_FAILED', () => {
        const action = { type: types.ADD_MODEL_FAILED };
        const expectedState = {
            ...initialState,
            modelAdd: false,
            modelAddFailed: true,
            modelAddSucceed: false,
        };
        expect(carDetailsReducer(initialState, action)).toEqual(expectedState);
    });

    // Тесты для GET_BRANDS actions
    it('should handle GET_BRANDS', () => {
        const action = { type: types.GET_BRANDS };
        const expectedState = {
            ...initialState,
            brandsGet: true,
        };
        expect(carDetailsReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle GET_BRANDS_SUCCEED', () => {
        const action = {
            type: types.GET_BRANDS_SUCCEED,
            brands: [{ id: 1, name: 'Brand 1' }]
        };
        const expectedState = {
            ...initialState,
            brandsGet: false,
            brands: [{ id: 1, name: 'Brand 1' }],
            brandsGetFailed: false,
        };
        expect(carDetailsReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle GET_BRANDS_FAILED', () => {
        const action = { type: types.GET_BRANDS_FAILED };
        const expectedState = {
            ...initialState,
            brandsGet: false,
            brandsGetFailed: true,
        };
        expect(carDetailsReducer(initialState, action)).toEqual(expectedState);
    });

    // Тесты для GET_MODELS_WITHOUT_BRAND actions
    it('should handle GET_MODELS_WITHOUT_BRAND', () => {
        const action = { type: types.GET_MODELS_WITHOUT_BRAND };
        const expectedState = {
            ...initialState,
            modelsWoBrandGet: true,
        };
        expect(carDetailsReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle GET_MODELS_WITHOUT_BRAND_SUCCEED', () => {
        const action = {
            type: types.GET_MODELS_WITHOUT_BRAND_SUCCEED,
            modelsWithoutBrand: [{ id: 1, name: 'Model 1' }]
        };
        const expectedState = {
            ...initialState,
            modelsWoBrandGet: false,
            modelsWithoutBrand: [{ id: 1, name: 'Model 1' }],
            modelsWoBrandGetFailed: false,
        };
        expect(carDetailsReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle GET_MODELS_WITHOUT_BRAND_FAILED', () => {
        const action = { type: types.GET_MODELS_WITHOUT_BRAND_FAILED };
        const expectedState = {
            ...initialState,
            modelsWoBrandGet: false,
            modelsWoBrandGetFailed: true,
        };
        expect(carDetailsReducer(initialState, action)).toEqual(expectedState);
    });

    // Тесты для ASSOCIATE_MODEL_BRAND actions
    it('should handle ASSOCIATE_MODEL_BRAND', () => {
        const action = { type: types.ASSOCIATE_MODEL_BRAND };
        const expectedState = {
            ...initialState,
            associateModelBrand: true,
            associateModelBrandSuccess: false,
        };
        expect(carDetailsReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle ASSOCIATE_MODEL_BRAND_SUCCEED', () => {
        const action = { type: types.ASSOCIATE_MODEL_BRAND_SUCCEED };
        const expectedState = {
            ...initialState,
            associateModelBrand: false,
            associateModelBrandSuccess: true,
            associateModelBrandFailed: false,
        };
        expect(carDetailsReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle ASSOCIATE_MODEL_BRAND_FAILED', () => {
        const action = { type: types.ASSOCIATE_MODEL_BRAND_FAILED };
        const expectedState = {
            ...initialState,
            associateModelBrand: false,
            associateModelBrandSuccess: false,
            associateModelBrandFailed: true,
        };
        expect(carDetailsReducer(initialState, action)).toEqual(expectedState);
    });

    // Тесты для GET_DRIVES actions
    it('should handle GET_DRIVES', () => {
        const action = { type: types.GET_DRIVES };
        const expectedState = {
            ...initialState,
            drivesLoading: true,
        };
        expect(carDetailsReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle GET_DRIVES_SUCCEED', () => {
        const action = {
            type: types.GET_DRIVES_SUCCEED,
            drives: [{ id: 1, name: 'Drive 1' }]
        };
        const expectedState = {
            ...initialState,
            drivesLoading: false,
            drives: [{ id: 1, name: 'Drive 1' }],
            drivesError: false,
        };
        expect(carDetailsReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle GET_DRIVES_FAILED', () => {
        const action = { type: types.GET_DRIVES_FAILED };
        const expectedState = {
            ...initialState,
            drivesLoading: false,
            drivesError: true,
        };
        expect(carDetailsReducer(initialState, action)).toEqual(expectedState);
    });

    // Тесты для ADD_DRIVE actions
    it('should handle ADD_DRIVE', () => {
        const action = { type: types.ADD_DRIVE };
        const expectedState = {
            ...initialState,
            driveAddLoading: true,
            driveAddSucceed: false,
        };
        expect(carDetailsReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle ADD_DRIVE_SUCCEED', () => {
        const action = { type: types.ADD_DRIVE_SUCCEED };
        const expectedState = {
            ...initialState,
            driveAddLoading: false,
            driveAddSucceed: true,
        };
        expect(carDetailsReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle ADD_DRIVE_FAILED', () => {
        const action = { type: types.ADD_DRIVE_FAILED };
        const expectedState = {
            ...initialState,
            driveAddLoading: false,
            driveAddError: true,
        };
        expect(carDetailsReducer(initialState, action)).toEqual(expectedState);
    });

    // Тесты для UPDATE_DRIVE actions
    it('should handle UPDATE_DRIVE', () => {
        const action = { type: types.UPDATE_DRIVE };
        const expectedState = {
            ...initialState,
            driveUpdateLoading: true,
        };
        expect(carDetailsReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle UPDATE_DRIVE_SUCCEED', () => {
        const action = { type: types.UPDATE_DRIVE_SUCCEED };
        const expectedState = {
            ...initialState,
            driveUpdateLoading: false,
            driveUpdateSuccess: true,
        };
        expect(carDetailsReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle UPDATE_DRIVE_FAILED', () => {
        const action = { type: types.UPDATE_DRIVE_FAILED };
        const expectedState = {
            ...initialState,
            driveUpdateLoading: false,
            driveUpdateError: true,
        };
        expect(carDetailsReducer(initialState, action)).toEqual(expectedState);
    });

    // Тесты для DELETE_DRIVE actions
    it('should handle DELETE_DRIVE', () => {
        const action = { type: types.DELETE_DRIVE };
        const expectedState = {
            ...initialState,
            driveDeleteLoading: true,
        };
        expect(carDetailsReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle DELETE_DRIVE_SUCCEED', () => {
        const action = { type: types.DELETE_DRIVE_SUCCEED };
        const expectedState = {
            ...initialState,
            driveDeleteLoading: false,
            driveDeleteSuccess: true,
        };
        expect(carDetailsReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle DELETE_DRIVE_FAILED', () => {
        const action = { type: types.DELETE_DRIVE_FAILED };
        const expectedState = {
            ...initialState,
            driveDeleteLoading: false,
            driveDeleteError: true,
        };
        expect(carDetailsReducer(initialState, action)).toEqual(expectedState);
    });

    // Тесты для ADD_ENGINE actions
    it('should handle ADD_ENGINE', () => {
        const action = { type: types.ADD_ENGINE };
        const expectedState = {
            ...initialState,
            engineAdd: true,
            engineAddSucceed: false,
        };
        expect(carDetailsReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle ADD_ENGINE_SUCCEED', () => {
        const action = { type: types.ADD_ENGINE_SUCCEED };
        const expectedState = {
            ...initialState,
            engineAdd: false,
            engineAddSucceed: true,
        };
        expect(carDetailsReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle ADD_ENGINE_FAILED', () => {
        const action = { type: types.ADD_ENGINE_FAILED };
        const expectedState = {
            ...initialState,
            engineAdd: false,
            engineAddFailed: true,
            engineAddSucceed: false,
        };
        expect(carDetailsReducer(initialState, action)).toEqual(expectedState);
    });

    // Тесты для UPDATE_ENGINE actions
    it('should handle UPDATE_ENGINE', () => {
        const action = { type: types.UPDATE_ENGINE };
        const expectedState = {
            ...initialState,
            engineUpdate: true,
        };
        expect(carDetailsReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle UPDATE_ENGINE_SUCCEED', () => {
        const action = { type: types.UPDATE_ENGINE_SUCCEED };
        const expectedState = {
            ...initialState,
            engineUpdate: false,
            engineUpdateSucceed: true,
        };
        expect(carDetailsReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle UPDATE_ENGINE_FAILED', () => {
        const action = { type: types.UPDATE_ENGINE_FAILED };
        const expectedState = {
            ...initialState,
            engineUpdate: false,
            engineUpdateFailed: true,
        };
        expect(carDetailsReducer(initialState, action)).toEqual(expectedState);
    });

    // Тесты для DELETE_ENGINE actions
    it('should handle DELETE_ENGINE', () => {
        const action = { type: types.DELETE_ENGINE };
        const expectedState = {
            ...initialState,
            engineDelete: true,
        };
        expect(carDetailsReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle DELETE_ENGINE_SUCCEED', () => {
        const action = { type: types.DELETE_ENGINE_SUCCEED };
        const expectedState = {
            ...initialState,
            engineDelete: false,
            engineDeleteSucceed: true,
        };
        expect(carDetailsReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle DELETE_ENGINE_FAILED', () => {
        const action = { type: types.DELETE_ENGINE_FAILED };
        const expectedState = {
            ...initialState,
            engineDelete: false,
            engineDeleteFailed: true,
        };
        expect(carDetailsReducer(initialState, action)).toEqual(expectedState);
    });

    // Тесты для GET_ENGINES actions
    it('should handle GET_ENGINES', () => {
        const action = { type: types.GET_ENGINES };
        const expectedState = {
            ...initialState,
            enginesGet: true,
        };
        expect(carDetailsReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle GET_ENGINES_SUCCEED', () => {
        const action = {
            type: types.GET_ENGINES_SUCCEED,
            engines: [{ id: 1, name: 'Engine 1' }]
        };
        const expectedState = {
            ...initialState,
            enginesGet: false,
            engines: [{ id: 1, name: 'Engine 1' }],
            enginesGetSucceed: true,
        };
        expect(carDetailsReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle GET_ENGINES_FAILED', () => {
        const action = { type: types.GET_ENGINES_FAILED };
        const expectedState = {
            ...initialState,
            enginesGet: false,
            enginesGetFailed: true,
        };
        expect(carDetailsReducer(initialState, action)).toEqual(expectedState);
    });

    // Тесты для GET_BODY_TYPES actions
    it('should handle GET_BODY_TYPES', () => {
        const action = { type: types.GET_BODY_TYPES };
        const expectedState = {
            ...initialState,
            bodyTypesLoading: true,
        };
        expect(carDetailsReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle GET_BODY_TYPES_SUCCEED', () => {
        const action = {
            type: types.GET_BODY_TYPES_SUCCEED,
            bodyTypes: [{ id: 1, name: 'BodyType 1' }]
        };
        const expectedState = {
            ...initialState,
            bodyTypesLoading: false,
            bodyTypes: [{ id: 1, name: 'BodyType 1' }],
        };
        expect(carDetailsReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle GET_BODY_TYPES_FAILED', () => {
        const action = { type: types.GET_BODY_TYPES_FAILED };
        const expectedState = {
            ...initialState,
            bodyTypesLoading: false,
            bodyTypesError: true,
        };
        expect(carDetailsReducer(initialState, action)).toEqual(expectedState);
    });

    // Тесты для ADD_BODY_TYPE actions
    it('should handle ADD_BODY_TYPE', () => {
        const action = { type: types.ADD_BODY_TYPE };
        const expectedState = {
            ...initialState,
            bodyTypeAdd: true,
            bodyTypeAddSucceed: false,
        };
        expect(carDetailsReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle ADD_BODY_TYPE_SUCCEED', () => {
        const action = { type: types.ADD_BODY_TYPE_SUCCEED };
        const expectedState = {
            ...initialState,
            bodyTypeAdd: false,
            bodyTypeAddSucceed: true,
        };
        expect(carDetailsReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle ADD_BODY_TYPE_FAILED', () => {
        const action = { type: types.ADD_BODY_TYPE_FAILED };
        const expectedState = {
            ...initialState,
            bodyTypeAdd: false,
            bodyTypeAddFailed: true,
            bodyTypeAddSucceed: false,
        };
        expect(carDetailsReducer(initialState, action)).toEqual(expectedState);
    });

    // Тесты для UPDATE_BODY_TYPE actions
    it('should handle UPDATE_BODY_TYPE', () => {
        const action = { type: types.UPDATE_BODY_TYPE };
        const expectedState = {
            ...initialState,
            bodyTypeUpdate: true,
        };
        expect(carDetailsReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle UPDATE_BODY_TYPE_SUCCEED', () => {
        const action = { type: types.UPDATE_BODY_TYPE_SUCCEED };
        const expectedState = {
            ...initialState,
            bodyTypeUpdate: false,
            bodyTypeUpdateSucceed: true,
        };
        expect(carDetailsReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle UPDATE_BODY_TYPE_FAILED', () => {
        const action = { type: types.UPDATE_BODY_TYPE_FAILED };
        const expectedState = {
            ...initialState,
            bodyTypeUpdate: false,
            bodyTypeUpdateFailed: true,
        };
        expect(carDetailsReducer(initialState, action)).toEqual(expectedState);
    });

    // Тесты для DELETE_BODY_TYPE actions
    it('should handle DELETE_BODY_TYPE', () => {
        const action = { type: types.DELETE_BODY_TYPE };
        const expectedState = {
            ...initialState,
            bodyTypeDelete: true,
        };
        expect(carDetailsReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle DELETE_BODY_TYPE_SUCCEED', () => {
        const action = { type: types.DELETE_BODY_TYPE_SUCCEED };
        const expectedState = {
            ...initialState,
            bodyTypeDelete: false,
            bodyTypeDeleteSucceed: true,
        };
        expect(carDetailsReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle DELETE_BODY_TYPE_FAILED', () => {
        const action = { type: types.DELETE_BODY_TYPE_FAILED };
        const expectedState = {
            ...initialState,
            bodyTypeDelete: false,
            bodyTypeDeleteFailed: true,
        };
        expect(carDetailsReducer(initialState, action)).toEqual(expectedState);
    });

    // Тесты для GET_TRANSMISSIONS actions
    it('should handle GET_TRANSMISSIONS', () => {
        const action = { type: types.GET_TRANSMISSIONS };
        const expectedState = {
            ...initialState,
            transmissionsLoading: true,
        };
        expect(carDetailsReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle GET_TRANSMISSIONS_SUCCEED', () => {
        const action = {
            type: types.GET_TRANSMISSIONS_SUCCEED,
            transmissions: [{ id: 1, name: 'Transmission 1' }]
        };
        const expectedState = {
            ...initialState,
            transmissionsLoading: false,
            transmissions: [{ id: 1, name: 'Transmission 1' }],
        };
        expect(carDetailsReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle GET_TRANSMISSIONS_FAILED', () => {
        const action = { type: types.GET_TRANSMISSIONS_FAILED };
        const expectedState = {
            ...initialState,
            transmissionsLoading: false,
            transmissionsError: true,
        };
        expect(carDetailsReducer(initialState, action)).toEqual(expectedState);
    });

    // Тесты для ADD_TRANSMISSION actions
    it('should handle ADD_TRANSMISSION', () => {
        const action = { type: types.ADD_TRANSMISSION };
        const expectedState = {
            ...initialState,
            transmissionAdd: true,
            transmissionAddSucceed: false,
        };
        expect(carDetailsReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle ADD_TRANSMISSION_SUCCEED', () => {
        const action = { type: types.ADD_TRANSMISSION_SUCCEED };
        const expectedState = {
            ...initialState,
            transmissionAdd: false,
            transmissionAddSucceed: true,
        };
        expect(carDetailsReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle ADD_TRANSMISSION_FAILED', () => {
        const action = { type: types.ADD_TRANSMISSION_FAILED };
        const expectedState = {
            ...initialState,
            transmissionAdd: false,
            transmissionAddFailed: true,
            transmissionAddSucceed: false,
        };
        expect(carDetailsReducer(initialState, action)).toEqual(expectedState);
    });

    // Тесты для UPDATE_TRANSMISSION actions
    it('should handle UPDATE_TRANSMISSION', () => {
        const action = { type: types.UPDATE_TRANSMISSION };
        const expectedState = {
            ...initialState,
            transmissionUpdate: true,
        };
        expect(carDetailsReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle UPDATE_TRANSMISSION_SUCCEED', () => {
        const action = { type: types.UPDATE_TRANSMISSION_SUCCEED };
        const expectedState = {
            ...initialState,
            transmissionUpdate: false,
            transmissionUpdateSucceed: true,
        };
        expect(carDetailsReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle UPDATE_TRANSMISSION_FAILED', () => {
        const action = { type: types.UPDATE_TRANSMISSION_FAILED };
        const expectedState = {
            ...initialState,
            transmissionUpdate: false,
            transmissionUpdateFailed: true,
        };
        expect(carDetailsReducer(initialState, action)).toEqual(expectedState);
    });

    // Тесты для DELETE_TRANSMISSION actions
    it('should handle DELETE_TRANSMISSION', () => {
        const action = { type: types.DELETE_TRANSMISSION };
        const expectedState = {
            ...initialState,
            transmissionDelete: true,
        };
        expect(carDetailsReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle DELETE_TRANSMISSION_SUCCEED', () => {
        const action = { type: types.DELETE_TRANSMISSION_SUCCEED };
        const expectedState = {
            ...initialState,
            transmissionDelete: false,
            transmissionDeleteSucceed: true,
        };
        expect(carDetailsReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle DELETE_TRANSMISSION_FAILED', () => {
        const action = { type: types.DELETE_TRANSMISSION_FAILED };
        const expectedState = {
            ...initialState,
            transmissionDelete: false,
            transmissionDeleteFailed: true,
        };
        expect(carDetailsReducer(initialState, action)).toEqual(expectedState);
    });

    // Тесты для GET_COLORS actions
    it('should handle GET_COLORS', () => {
        const action = { type: types.GET_COLORS };
        const expectedState = {
            ...initialState,
            colorsLoading: true,
        };
        expect(carDetailsReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle GET_COLORS_SUCCEED', () => {
        const action = {
            type: types.GET_COLORS_SUCCEED,
            colors: [{ id: 1, name: 'Color 1' }]
        };
        const expectedState = {
            ...initialState,
            colorsLoading: false,
            colors: [{ id: 1, name: 'Color 1' }],
        };
        expect(carDetailsReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle GET_COLORS_FAILED', () => {
        const action = { type: types.GET_COLORS_FAILED };
        const expectedState = {
            ...initialState,
            colorsLoading: false,
            colorsError: true,
        };
        expect(carDetailsReducer(initialState, action)).toEqual(expectedState);
    });

    // Тесты для ADD_COLOR actions
    it('should handle ADD_COLOR', () => {
        const action = { type: types.ADD_COLOR };
        const expectedState = {
            ...initialState,
            colorAdd: true,
            colorAddSucceed: false,
        };
        expect(carDetailsReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle ADD_COLOR_SUCCEED', () => {
        const action = { type: types.ADD_COLOR_SUCCEED };
        const expectedState = {
            ...initialState,
            colorAdd: false,
            colorAddSucceed: true,
        };
        expect(carDetailsReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle ADD_COLOR_FAILED', () => {
        const action = { type: types.ADD_COLOR_FAILED };
        const expectedState = {
            ...initialState,
            colorAdd: false,
            colorAddFailed: true,
            colorAddSucceed: false,
        };
        expect(carDetailsReducer(initialState, action)).toEqual(expectedState);
    });

    // Тесты для UPDATE_COLOR actions
    it('should handle UPDATE_COLOR', () => {
        const action = { type: types.UPDATE_COLOR };
        const expectedState = {
            ...initialState,
            colorUpdate: true,
        };
        expect(carDetailsReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle UPDATE_COLOR_SUCCEED', () => {
        const action = { type: types.UPDATE_COLOR_SUCCEED };
        const expectedState = {
            ...initialState,
            colorUpdate: false,
            colorUpdateSucceed: true,
        };
        expect(carDetailsReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle UPDATE_COLOR_FAILED', () => {
        const action = { type: types.UPDATE_COLOR_FAILED };
        const expectedState = {
            ...initialState,
            colorUpdate: false,
            colorUpdateFailed: true,
        };
        expect(carDetailsReducer(initialState, action)).toEqual(expectedState);
    });

    // Тесты для DELETE_COLOR actions
    it('should handle DELETE_COLOR', () => {
        const action = { type: types.DELETE_COLOR };
        const expectedState = {
            ...initialState,
            colorDelete: true,
        };
        expect(carDetailsReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle DELETE_COLOR_SUCCEED', () => {
        const action = { type: types.DELETE_COLOR_SUCCEED };
        const expectedState = {
            ...initialState,
            colorDelete: false,
            colorDeleteSucceed: true,
        };
        expect(carDetailsReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle DELETE_COLOR_FAILED', () => {
        const action = { type: types.DELETE_COLOR_FAILED };
        const expectedState = {
            ...initialState,
            colorDelete: false,
            colorDeleteFailed: true,
        };
        expect(carDetailsReducer(initialState, action)).toEqual(expectedState);
    });

    // Тесты для GET_MODELS_BY_BRAND actions
    it('should handle GET_MODELS_BY_BRAND', () => {
        const action = { type: types.GET_MODELS_BY_BRAND };
        const expectedState = {
            ...initialState,
            modelsLoading: true,
        };
        expect(carDetailsReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle GET_MODELS_BY_BRAND_SUCCEED', () => {
        const action = {
            type: types.GET_MODELS_BY_BRAND_SUCCEED,
            models: [{ id: 1, name: 'Model 1' }]
        };
        const expectedState = {
            ...initialState,
            modelsLoading: false,
            modelsByBrand: [{ id: 1, name: 'Model 1' }],
        };
        expect(carDetailsReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle GET_MODELS_BY_BRAND_FAILED', () => {
        const action = { type: types.GET_MODELS_BY_BRAND_FAILED };
        const expectedState = {
            ...initialState,
            modelsLoading: false,
            modelsError: true,
        };
        expect(carDetailsReducer(initialState, action)).toEqual(expectedState);
    });

    // Тесты для ADD_MODEL_ENGINE_ASSOCIATION actions
    it('should handle ADD_MODEL_ENGINE_ASSOCIATION', () => {
        const action = { type: types.ADD_MODEL_ENGINE_ASSOCIATION };
        const expectedState = {
            ...initialState,
            modelEngineAssociationAdding: true,
        };
        expect(carDetailsReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle ADD_MODEL_ENGINE_ASSOCIATION_SUCCEED', () => {
        const action = { type: types.ADD_MODEL_ENGINE_ASSOCIATION_SUCCEED };
        const expectedState = {
            ...initialState,
            modelEngineAssociationAdding: false,
            modelEngineAssociationSuccess: true,
        };
        expect(carDetailsReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle ADD_MODEL_ENGINE_ASSOCIATION_FAILED', () => {
        const action = { type: types.ADD_MODEL_ENGINE_ASSOCIATION_FAILED };
        const expectedState = {
            ...initialState,
            modelEngineAssociationAdding: false,
            modelEngineAssociationError: true,
        };
        expect(carDetailsReducer(initialState, action)).toEqual(expectedState);
    });

    // Тесты для ADD_MODEL_DRIVE_ASSOCIATION actions
    it('should handle ADD_MODEL_DRIVE_ASSOCIATION', () => {
        const action = { type: types.ADD_MODEL_DRIVE_ASSOCIATION };
        const expectedState = {
            ...initialState,
            modelDriveAssociationAdding: true,
        };
        expect(carDetailsReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle ADD_MODEL_DRIVE_ASSOCIATION_SUCCEED', () => {
        const action = { type: types.ADD_MODEL_DRIVE_ASSOCIATION_SUCCEED };
        const expectedState = {
            ...initialState,
            modelDriveAssociationAdding: false,
            modelDriveAssociationSuccess: true,
        };
        expect(carDetailsReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle ADD_MODEL_DRIVE_ASSOCIATION_FAILED', () => {
        const action = { type: types.ADD_MODEL_DRIVE_ASSOCIATION_FAILED };
        const expectedState = {
            ...initialState,
            modelDriveAssociationAdding: false,
            modelDriveAssociationError: true,
        };
        expect(carDetailsReducer(initialState, action)).toEqual(expectedState);
    });

    // Тесты для ADD_MODEL_BODY_TYPE_ASSOCIATION actions
    it('should handle ADD_MODEL_BODY_TYPE_ASSOCIATION', () => {
        const action = { type: types.ADD_MODEL_BODY_TYPE_ASSOCIATION };
        const expectedState = {
            ...initialState,
            modelBodyTypeAssociationAdding: true,
        };
        expect(carDetailsReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle ADD_MODEL_BODY_TYPE_ASSOCIATION_SUCCEED', () => {
        const action = { type: types.ADD_MODEL_BODY_TYPE_ASSOCIATION_SUCCEED };
        const expectedState = {
            ...initialState,
            modelBodyTypeAssociationAdding: false,
            modelBodyTypeAssociationSuccess: true,
        };
        expect(carDetailsReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle ADD_MODEL_BODY_TYPE_ASSOCIATION_FAILED', () => {
        const action = { type: types.ADD_MODEL_BODY_TYPE_ASSOCIATION_FAILED };
        const expectedState = {
            ...initialState,
            modelBodyTypeAssociationAdding: false,
            modelBodyTypeAssociationError: true,
        };
        expect(carDetailsReducer(initialState, action)).toEqual(expectedState);
    });

    // Тесты для ADD_MODEL_TRANSMISSION_ASSOCIATION actions
    it('should handle ADD_MODEL_TRANSMISSION_ASSOCIATION', () => {
        const action = { type: types.ADD_MODEL_TRANSMISSION_ASSOCIATION };
        const expectedState = {
            ...initialState,
            modelTransmissionAssociationAdding: true,
        };
        expect(carDetailsReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle ADD_MODEL_TRANSMISSION_ASSOCIATION_SUCCEED', () => {
        const action = { type: types.ADD_MODEL_TRANSMISSION_ASSOCIATION_SUCCEED };
        const expectedState = {
            ...initialState,
            modelTransmissionAssociationAdding: false,
            modelTransmissionAssociationSuccess: true,
        };
        expect(carDetailsReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle ADD_MODEL_TRANSMISSION_ASSOCIATION_FAILED', () => {
        const action = { type: types.ADD_MODEL_TRANSMISSION_ASSOCIATION_FAILED };
        const expectedState = {
            ...initialState,
            modelTransmissionAssociationAdding: false,
            modelTransmissionAssociationError: true,
            modelTransmissionAssociationSuccess: false,
        };
        expect(carDetailsReducer(initialState, action)).toEqual(expectedState);
    });


    // Тесты для ADD_MODEL_COLOR_ASSOCIATION actions
    it('should handle ADD_MODEL_COLOR_ASSOCIATION', () => {
        const action = { type: types.ADD_MODEL_COLOR_ASSOCIATION };
        const expectedState = {
            ...initialState,
            modelColorAssociationAdding: true,
        };
        expect(carDetailsReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle ADD_MODEL_COLOR_ASSOCIATION_SUCCEED', () => {
        const action = { type: types.ADD_MODEL_COLOR_ASSOCIATION_SUCCEED };
        const expectedState = {
            ...initialState,
            modelColorAssociationAdding: false,
            modelColorAssociationSuccess: true,
        };
        expect(carDetailsReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle ADD_MODEL_COLOR_ASSOCIATION_FAILED', () => {
        const action = { type: types.ADD_MODEL_COLOR_ASSOCIATION_FAILED };
        const expectedState = {
            ...initialState,
            modelColorAssociationAdding: false,
            modelColorAssociationError: true,
        };
        expect(carDetailsReducer(initialState, action)).toEqual(expectedState);
    });

    // Тесты для ADD_MODEL_DRIVE_ASSOCIATION actions
    it('should handle ADD_MODEL_DRIVE_ASSOCIATION', () => {
        const action = { type: types.ADD_MODEL_DRIVE_ASSOCIATION };
        const expectedState = {
            ...initialState,
            modelDriveAssociationAdding: true,
        };
        expect(carDetailsReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle ADD_MODEL_DRIVE_ASSOCIATION_SUCCEED', () => {
        const action = { type: types.ADD_MODEL_DRIVE_ASSOCIATION_SUCCEED };
        const expectedState = {
            ...initialState,
            modelDriveAssociationAdding: false,
            modelDriveAssociationSuccess: true,
        };
        expect(carDetailsReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle ADD_MODEL_DRIVE_ASSOCIATION_FAILED', () => {
        const action = { type: types.ADD_MODEL_DRIVE_ASSOCIATION_FAILED };
        const expectedState = {
            ...initialState,
            modelDriveAssociationAdding: false,
            modelDriveAssociationError: true,
        };
        expect(carDetailsReducer(initialState, action)).toEqual(expectedState);
    });
});
