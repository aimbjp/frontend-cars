import { render, fireEvent, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import {AppHeader} from "../../../components/header/header";

const mockStore = configureStore();
let store;

describe('AppHeader', () => {
    beforeEach(() => {
        store = mockStore({});
    });

    // Тест на корректное отображение компонента AppHeader и начальные элементы UI
    test('отображает AppHeader и проверяет наличие основных компонентов UI', () => {
        render(
            <Provider store={store}>
                <Router>
                    <AppHeader />
                </Router>
            </Provider>
        );
        expect(screen.getByText('Cars')).toBeInTheDocument();
        expect(screen.getByLabelText('open drawer')).toBeInTheDocument();
    });

    // Тест на проверку открытия и закрытия боковой панели по клику на иконку меню
    test('открывает и закрывает боковую панель при клике на иконку меню', () => {
        render(
            <Provider store={store}>
                <Router>
                    <AppHeader />
                </Router>
            </Provider>
        );
        const menuButton = screen.getByTestId('menu-button');
        fireEvent.click(menuButton);
        expect(screen.getAllByText('Вход')[0]).toBeVisible();
    });

    // // Тест на закрытие боковой панели при клике на элемент меню
    // test('закрывает боковую панель при клике на элемент меню', () => {
    //     render(
    //         <Provider store={store}>
    //             <Router>
    //                 <AppHeader />
    //             </Router>
    //         </Provider>
    //     );
    //     // Открытие боковой панели
    //     fireEvent.click(screen.getByTestId('menu-button'));
    //     // Клик по первому найденному элементу 'Вход' в боковой панели
    //     fireEvent.click(screen.getAllByText('Вход')[0]);
    //     // Проверка, что боковой панель закрылась, используя queryAllByText и проверку отсутствия элементов
    //     expect(screen.queryAllByText('Вход').length).toBe(1);
    // });


// Проверка наличия всех ссылок в боковой панели и корректность их роутинга
    test('все ссылки присутствуют в боковой панели и имеют правильные маршруты', () => {
        render(
            <Provider store={store}>
                <Router>
                    <AppHeader />
                </Router>
            </Provider>
        );
        fireEvent.click(screen.getByTestId('menu-button'));
        // Используем getAllByTestId для поиска всех элементов и проверяем href для первого элемента каждого типа
        expect(screen.getAllByTestId('menu-login')[0]).toHaveAttribute('href', '/login');
        expect(screen.getAllByTestId('menu-profile')[0]).toHaveAttribute('href', '/profile');
        expect(screen.getAllByTestId('menu-chat')[0]).toHaveAttribute('href', '/chat');
        expect(screen.getAllByTestId('menu-add-details')[0]).toHaveAttribute('href', '/car/add-details');
        expect(screen.getAllByTestId('menu-add-listing')[0]).toHaveAttribute('href', '/listings/add');
        expect(screen.getAllByTestId('menu-listings')[0]).toHaveAttribute('href', '/listings');
    });

// Тест на видимость и корректность ссылок на рабочем столе
    test('ссылки на рабочем столе видимы и корректно маршрутизированы', () => {
        render(
            <Provider store={store}>
                <Router>
                    <AppHeader />
                </Router>
            </Provider>
        );
        // Используем getAllByTestId и проверяем текст первого элемента каждого типа
        expect(screen.getAllByTestId('menu-login')[0].textContent).toBe('Вход');
        expect(screen.getAllByTestId('menu-profile')[0].textContent).toBe('Профиль');
        expect(screen.getAllByTestId('menu-chat')[0].textContent).toBe('Чат');
        expect(screen.getAllByTestId('menu-add-details')[0].textContent).toBe('Добавить детали');
        expect(screen.getAllByTestId('menu-add-listing')[0].textContent).toBe('Добавить объявление');
        expect(screen.getAllByTestId('menu-listings')[0].textContent).toBe('Список объявлений');
    });

});
