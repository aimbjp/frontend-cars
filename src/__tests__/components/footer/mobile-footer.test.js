import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { setActiveTab } from '../../../services/thunks/listings';
import {MobileFooter} from "../../../components/footer/mobile-footer";

// Create a mock store
const mockStore = configureStore();
let store;

describe('MobileFooter', () => {
    beforeEach(() => {
        store = mockStore({
            listingsReducer: { activeTab: 'search' }
        });
        store.dispatch = jest.fn();
    });

    test('renders the MobileFooter component', () => {
        render(
            <Provider store={store}>
                <MobileFooter />
            </Provider>
        );

        expect(screen.getByText('Поиск')).toBeInTheDocument();
        expect(screen.getByText('Объявления')).toBeInTheDocument();
        expect(screen.getByText('Фильтры')).toBeInTheDocument();
    });

    test('should dispatch setActiveTab with correct value when a tab is clicked', () => {
        render(
            <Provider store={store}>
                <MobileFooter />
            </Provider>
        );

        const listingsTab = screen.getByText('Объявления');
        fireEvent.click(listingsTab);
        expect(store.dispatch).toHaveBeenCalledWith(expect.any(Function));

        const filtersTab = screen.getByText('Фильтры');
        fireEvent.click(filtersTab);
        expect(store.dispatch).toHaveBeenCalledWith(expect.any(Function));
    });


    test('should apply blue color to active tab', () => {
        render(
            <Provider store={store}>
                <MobileFooter />
            </Provider>
        );

        const searchIconStyle = screen.getByText('Поиск').parentElement.style;
        expect(searchIconStyle.color).toBe('blue');
    });
});
