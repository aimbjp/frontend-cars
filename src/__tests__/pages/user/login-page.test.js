import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import {thunk} from 'redux-thunk';
import { rootReducer } from '../../../services/reducers';
import { login } from '../../../services/thunks/user';
import { ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { MemoryRouter } from 'react-router-dom';
import { LoginPage } from '../../../pages/user/login-page';
import {
    AUTHORIZATION_FAILED,
    CHECK_EMAIL_EXIST_FAILED,
    CHECK_EMAIL_EXIST_SUCCESS
} from '../../../services/action-types/user';

// Mock для thunks
jest.mock('../../../services/thunks/user', () => ({
    login: jest.fn((values) => {
        return (dispatch) => {
            return Promise.resolve();
        };
    }),
}));

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

const renderWithProviders = (ui) => {
    return render(
        <Provider store={store}>
            <MemoryRouter>
                <ThemeProvider theme={createTheme()}>
                    {ui}
                </ThemeProvider>
            </MemoryRouter>
        </Provider>
    );
};

describe('LoginPage', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should render all components correctly', () => {
        renderWithProviders(<LoginPage />);

        expect(screen.getByText(/вход/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/почтовый адрес/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/пароль/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /войти/i })).toBeInTheDocument();
    });

    // it('should validate email correctly', async () => {
    //     renderWithProviders(<LoginPage />);
    //     const emailInput = screen.getByLabelText(/почтовый адрес/i);
    //     const submitButton = screen.getByRole('button', { name: /войти/i });
    //
    //     fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    //     fireEvent.click(submitButton);
    //
    //     await waitFor(() => {
    //         // Используем findByText для поиска текста с учетом разбиения элементов
    //         const errorMessage = screen.queryByText((content, element) =>
    //             content.includes('Введите корректный почтовый адрес')
    //         );
    //         expect(errorMessage).toBeInTheDocument();
    //     });
    // });
    //
    // it('should submit form with valid email and password', async () => {
    //     renderWithProviders(<LoginPage />);
    //     const emailInput = screen.getByLabelText(/почтовый адрес/i);
    //     const passwordInput = screen.getByLabelText(/пароль/i);
    //     const submitButton = screen.getByRole('button', { name: /войти/i });
    //
    //     fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    //     fireEvent.change(passwordInput, { target: { value: 'password123' } });
    //     fireEvent.click(submitButton);
    //
    //     await waitFor(() => {
    //         expect(login).toHaveBeenCalledWith({ email: 'test@example.com', password: 'password123' });
    //     });
    // });
    //
    // it('should show error message when login fails', async () => {
    //     store.dispatch = jest.fn().mockImplementation((action) => {
    //         if (typeof action === 'function') {
    //             return action(() => {}, () => ({ userReducer: { authorizationFailed: true } }));
    //         }
    //         return action;
    //     });
    //
    //     store.dispatch({ type: AUTHORIZATION_FAILED });
    //
    //     renderWithProviders(<LoginPage />);
    //     const emailInput = screen.getByLabelText(/почтовый адрес/i);
    //     const passwordInput = screen.getByLabelText(/пароль/i);
    //     const submitButton = screen.getByRole('button', { name: /войти/i });
    //
    //     fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    //     fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });
    //     fireEvent.click(submitButton);
    //
    //     await waitFor(() => {
    //         const errorMessage = screen.getByText('Неверные данные, введите повторно');
    //         expect(errorMessage).toBeInTheDocument();
    //     });
    // });
});
