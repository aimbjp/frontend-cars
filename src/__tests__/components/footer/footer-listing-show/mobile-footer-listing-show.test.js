import { render, fireEvent, screen } from '@testing-library/react';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import ChatIcon from '@mui/icons-material/Chat';
import MobileFooter from "../../../../components/footer/footer-listing-show/mobile-footer-listing-show";

describe('MobileFooter', () => {
    const onChatOpen = jest.fn();
    const onCarPageOpen = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders correctly with initial active tab', () => {
        render(<MobileFooter onChatOpen={onChatOpen} onCarPageOpen={onCarPageOpen} />);

        expect(screen.getByText('Объявление')).toBeInTheDocument();
        expect(screen.getByText('Чат')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Объявление' })).toHaveStyle('color: blue');
        expect(screen.getByRole('button', { name: 'Чат' })).not.toHaveStyle('color: blue');
    });

    test('changes active tab and calls appropriate callbacks on tab click', () => {
        render(<MobileFooter onChatOpen={onChatOpen} onCarPageOpen={onCarPageOpen} />);

        fireEvent.click(screen.getByText('Чат'));
        expect(onChatOpen).toHaveBeenCalled();
        expect(screen.getByRole('button', { name: 'Чат' })).toHaveStyle('color: blue');
        expect(screen.getByRole('button', { name: 'Объявление' })).not.toHaveStyle('color: blue');

        fireEvent.click(screen.getByText('Объявление'));
        expect(onCarPageOpen).toHaveBeenCalled();
        expect(screen.getByRole('button', { name: 'Объявление' })).toHaveStyle('color: blue');
        expect(screen.getByRole('button', { name: 'Чат' })).not.toHaveStyle('color: blue');
    });

    test('resets active tab when chatOpen changes to false', async () => {
        const { rerender } = render(<MobileFooter onChatOpen={onChatOpen} onCarPageOpen={onCarPageOpen} chatOpen={true} />);

        // Проверка, что вкладка чата активна и имеет правильный цвет
        expect(screen.getByRole('button', { name: 'Чат' })).toHaveStyle('color: blue');

        // Изменение пропса chatOpen на false
        rerender(<MobileFooter onChatOpen={onChatOpen} onCarPageOpen={onCarPageOpen} chatOpen={false} />);

        // Проверка, что активная вкладка сбросилась на объявления и имеет ожидаемый цвет
        expect(screen.getByRole('button', { name: 'Объявление' })).toHaveStyle('color: blue');
        expect(screen.getByRole('button', { name: 'Чат' })).toHaveStyle('color: rgba(0, 0, 0, 0.6)');
    });

});
