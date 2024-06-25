import React from 'react';
import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import { rootReducer } from '../../../services/reducers';
import {thunk} from 'redux-thunk';
import { checkEmailExist } from '../../../services/thunks/user';
import { ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { ForgotPasswordPage } from '../../../pages/user/forgot-password-page';
import {CHECK_EMAIL_EXIST_FAILED, CHECK_EMAIL_EXIST_SUCCESS} from "../../../services/action-types/user";

// Mock для thunks
jest.mock('../../../services/thunks/user', () => ({
    checkEmailExist: jest.fn((values) => (dispatch) => {
        return Promise.resolve();
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

describe('ForgotPasswordPage', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        store.dispatch({ type: CHECK_EMAIL_EXIST_FAILED });
    });

    // Этот тест проверяет, что все основные компоненты страницы отображаются корректно.
    it('should render the forgot password page', () => {
        renderWithProviders(<ForgotPasswordPage />);
        expect(screen.getByText(/восстановление пароля/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/почтовый адрес/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /отправить код/i })).toBeInTheDocument();
        expect(screen.getByText(/вспомнили пароль\? войти/i)).toBeInTheDocument();
    });

    // Этот тест проверяет, что значение email изменяется корректно при вводе.
    it('should update email value on change', () => {
        renderWithProviders(<ForgotPasswordPage />);
        const emailInput = screen.getByLabelText(/почтовый адрес/i);
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        expect(emailInput).toHaveValue('test@example.com');
    });

    // Этот тест проверяет, что при отправке формы с корректным email вызывается соответствующий thunk для проверки email.
    // it('should dispatch checkEmailExist on valid form submission', async () => {
    //     renderWithProviders(<ForgotPasswordPage />);
    //     const emailInput = screen.getByLabelText(/почтовый адрес/i);
    //     const submitButton = screen.getByRole('button', { name: /отправить код/i });
    //
    //     fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    //     fireEvent.click(submitButton);
    //
    //     await waitFor(() => {
    //         expect(checkEmailExist).toHaveBeenCalledWith({ email: 'test@example.com' });
    //     });
    // });

    // Этот тест проверяет, что при отправке формы с некорректным email thunk не вызывается.
    it('should not dispatch checkEmailExist on invalid form submission', () => {
        renderWithProviders(<ForgotPasswordPage />);
        const emailInput = screen.getByLabelText(/почтовый адрес/i);
        const submitButton = screen.getByRole('button', { name: /отправить код/i });

        fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
        fireEvent.click(submitButton);

        expect(checkEmailExist).not.toHaveBeenCalled();
    });

    // Этот тест проверяет, что отображается сообщение об ошибке, если email не найден.
    it('should show error message when email is not found', () => {
        store.dispatch({ type: 'user/setCheckEmailExistFailed', payload: true });
        renderWithProviders(<ForgotPasswordPage />);
        expect(screen.getByText(/почта не зарегистрирована/i)).toBeInTheDocument();
    });
});
