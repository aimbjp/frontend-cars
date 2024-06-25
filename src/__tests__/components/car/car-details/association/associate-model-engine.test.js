import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import {thunk} from 'redux-thunk';
import {ModelEngineAssociation} from "../../../../../components/car/car-details";

const mockStore = configureStore([thunk]);

const brands = [{ brandId: 1, name: 'Brand1' }];
const modelsByBrand = [{ modelId: 1, name: 'Model1' }];
const engines = [{ engineId: 1, type: 'Engine1' }];
const drives = [{ driveId: 1, type: 'Drive1' }];
const bodyTypes = [{ bodyTypeId: 1, type: 'BodyType1' }];
const transmissions = [{ transmissionId: 1, type: 'Transmission1' }];
const colors = [{ colorId: 1, type: 'Color1' }];

const initialState = {
    carsDetailsReducer: {
        brands,
        modelsByBrand,
        engines,
        drives,
        bodyTypes,
        transmissions,
        colors
    }
};

const renderWithStore = (component, state = initialState) => {
    const store = mockStore(state);
    return {
        ...render(<Provider store={store}>{component}</Provider>),
        store,
    };
};

describe('ModelEngineAssociation Component', () => {
    test('renders all elements correctly', () => {
        renderWithStore(<ModelEngineAssociation />);

        expect(screen.getByLabelText('Бренд')).toBeInTheDocument();
        expect(screen.getByLabelText('Модель')).toBeInTheDocument();
        expect(screen.getByLabelText('Двигатель')).toBeInTheDocument();
        expect(screen.getByLabelText('Привод')).toBeInTheDocument();
        expect(screen.getByLabelText('Тип кузова')).toBeInTheDocument();
        expect(screen.getByLabelText('Коробка передач')).toBeInTheDocument();
        expect(screen.getByLabelText('Цвет')).toBeInTheDocument();
    });

    test('loads and displays options correctly', async () => {
        renderWithStore(<ModelEngineAssociation />);

        // Открываем выпадающий список
        fireEvent.mouseDown(screen.getByLabelText('Бренд'));

        await waitFor(() => {
            // Проверяем, что опция "Brand1" отображается
            expect(screen.getByText((content, element) => element.tagName.toLowerCase() === 'li' && content === 'Brand1')).toBeInTheDocument();
        });
    });

    test('enables model selection after brand is selected', async () => {
        renderWithStore(<ModelEngineAssociation />);

        fireEvent.mouseDown(screen.getByLabelText('Бренд'));
        fireEvent.click(await screen.findByText((content, element) => element.tagName.toLowerCase() === 'li' && content === 'Brand1'));

        fireEvent.mouseDown(screen.getByLabelText('Модель'));
        await waitFor(() => {
            expect(screen.getByText((content, element) => element.tagName.toLowerCase() === 'li' && content === 'Model1')).toBeInTheDocument();
        });
    });



});
