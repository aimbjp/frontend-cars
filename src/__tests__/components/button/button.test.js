import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ButtonResetRegister, ButtonSecondary, ButtonSecondaryWithLink } from '../../../components/button/reset-register-buttons';

describe('buttons', () => {
    describe('ButtonSecondary', () => {
        test('renders ButtonSecondary component with provided value', () => {
            render(<ButtonSecondary value="Test Button" />);
            const buttonElement = screen.getByText(/test button/i);
            expect(buttonElement).toBeInTheDocument();
        });

        test('calls onClick handler when clicked', () => {
            const handleClick = jest.fn();
            render(<ButtonSecondary value="Test Button" onClick={handleClick} />);
            const buttonElement = screen.getByText(/test button/i);
            fireEvent.click(buttonElement);
            expect(handleClick).toHaveBeenCalledTimes(1);
        });
    });

    // describe('ButtonSecondaryWithLink', () => {
    //     test('renders ButtonSecondaryWithLink component with provided value and link', () => {
    //         render(
    //             // <BrowserRouter>
    //                 <ButtonSecondaryWithLink value="Test Link Button" link="/test-link" />
    //             // </BrowserRouter>
    //         );
    //         // const linkElement = screen.getByText(/test link button/i);
    //         // expect(linkElement).toBeInTheDocument();
    //         // const link = linkElement.closest('a');
    //         // expect(link).toHaveAttribute('href', '/test-link');
    //
    //         expect(true).true;
    //     });
    // });
    //
    // describe('ButtonResetRegister', () => {
    //     test('renders ButtonResetRegister component with two links', () => {
    //         render(
    //             <BrowserRouter>
    //                 <ButtonResetRegister />
    //             </BrowserRouter>
    //         );
    //
    //         const registerLink = screen.getByText(/нет аккаунта\? зарегистрироваться/i);
    //         expect(registerLink).toBeInTheDocument();
    //         const registerAnchor = registerLink.closest('a');
    //         expect(registerAnchor).toHaveAttribute('href', '/register');
    //
    //         const forgotPasswordLink = screen.getByText(/забыли пароль\? восстановить/i);
    //         expect(forgotPasswordLink).toBeInTheDocument();
    //         const forgotPasswordAnchor = forgotPasswordLink.closest('a');
    //         expect(forgotPasswordAnchor).toHaveAttribute('href', '/forgot-password');
    //     });
    // });
});

