import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import {thunk} from 'redux-thunk';
import { setActivePhotos } from '../../../../services/thunks/listing-add';
import {AddListingPhoto} from "../../../../components/listings/add-listing/add-listing-photo";

jest.mock('../../../../services/thunks/listing-add', () => ({
    setActivePhotos: jest.fn(),
}));

const mockStore = configureStore([thunk]);

beforeAll(() => {
    global.URL.createObjectURL = jest.fn();
});

describe('AddListingPhoto', () => {
    let store;

    beforeEach(() => {
        store = mockStore({
            listingReducer: {
                activeImages: [],
            },
        });
    });

    it('renders the component without crashing', () => {
        render(
            <Provider store={store}>
                <AddListingPhoto />
            </Provider>
        );

        expect(screen.getByText('Фото')).toBeInTheDocument();
        expect(screen.getByText('Загрузить фото')).toBeInTheDocument();
        expect(screen.getByText('Подтвердить загрузку')).toBeInTheDocument();
        expect(screen.getByText('Предпросмотр фото')).toBeInTheDocument();
    });

    it('opens file dialog when "Загрузить фото" button is clicked', () => {
        render(
            <Provider store={store}>
                <AddListingPhoto />
            </Provider>
        );

        const uploadButton = screen.getByText('Загрузить фото');
        fireEvent.click(uploadButton);

        const fileInput = screen.getByTestId('file-input');
        expect(fileInput).toBeInTheDocument();
        // Simulate file selection
        Object.defineProperty(fileInput, 'files', {
            value: [new File(['dummy'], 'dummy.png', { type: 'image/png' })],
        });
        fireEvent.change(fileInput);

        // Check if preview image is displayed
        expect(screen.getByAltText('Preview')).toBeInTheDocument();
    });

    // it('displays selected file preview and allows file removal', async () => {
    //     render(
    //         <Provider store={store}>
    //             <AddListingPhoto />
    //         </Provider>
    //     );
    //
    //     const uploadButton = screen.getByText('Загрузить фото');
    //     fireEvent.click(uploadButton);
    //
    //     const fileInput = screen.getByTestId('file-input');
    //     const file = new File(['dummy'], 'dummy.png', { type: 'image/png' });
    //     Object.defineProperty(fileInput, 'files', {
    //         value: [file],
    //     });
    //     fireEvent.change(fileInput);
    //
    //     expect(screen.getByAltText('Preview')).toBeInTheDocument();
    //
    //     const deleteButton = screen.getByTestId('delete-button-0');
    //     expect(deleteButton).toBeInTheDocument();  // Ensure the delete button is in the document
    //
    //     fireEvent.click(deleteButton);
    //
    //     await waitFor(() => {
    //         expect(setActivePhotos).toHaveBeenCalledWith([]);
    //     });
    // });


    it('uploads files and updates active images in the store', async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ filesUrls: ['uploaded-file-url.png'] }),
            })
        );

        render(
            <Provider store={store}>
                <AddListingPhoto />
            </Provider>
        );

        const uploadButton = screen.getByText('Загрузить фото');
        fireEvent.click(uploadButton);

        const fileInput = screen.getByTestId('file-input');
        Object.defineProperty(fileInput, 'files', {
            value: [new File(['dummy'], 'dummy.png', { type: 'image/png' })],
        });
        fireEvent.change(fileInput);

        const confirmButton = screen.getByText('Подтвердить загрузку');
        fireEvent.click(confirmButton);

        await waitFor(() => {
            expect(setActivePhotos).toHaveBeenCalledWith(['uploaded-file-url.png']);
        });

        global.fetch.mockClear();
    });
});
