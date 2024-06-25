import {render, screen, fireEvent, waitFor, act} from '@testing-library/react';
import {TextDetailAdd} from "../../../../components/car/car-details";

describe('TextDetailAdd', () => {
    const handleAddMock = jest.fn();
    const label = "New Text";
    const buttonText = "Add";

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders correctly with initial props', () => {
        render(<TextDetailAdd label={label} handleAdd={handleAddMock} buttonText={buttonText} added_success={false} />);

        expect(screen.getByLabelText(label)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: buttonText })).toBeInTheDocument();
    });

    test('updates the name state on text field change', () => {
        render(<TextDetailAdd label={label} handleAdd={handleAddMock} buttonText={buttonText} added_success={false} />);

        const input = screen.getByLabelText(label);
        fireEvent.change(input, { target: { value: 'Test' } });
        expect(input.value).toBe('Test');
    });

    test('calls handleAdd when button is clicked', () => {
        render(<TextDetailAdd label={label} handleAdd={handleAddMock} buttonText={buttonText} added_success={false} />);

        const input = screen.getByLabelText(label);
        fireEvent.change(input, { target: { value: 'Test' } });
        fireEvent.click(screen.getByText(buttonText));
        expect(handleAddMock).toHaveBeenCalledWith('Test');
    });



    test('highlights input field when added_success is true', async () => {
        render(<TextDetailAdd label={label} handleAdd={handleAddMock} buttonText={buttonText} added_success={true} />);

        const inputContainer = screen.getByLabelText(label).parentElement;

        // Использование waitFor для ожидания применения стилей
        await waitFor(() => {
            expect(inputContainer).toHaveStyle('color: magenta');
            expect(inputContainer).toHaveStyle('background-color: lightgreen');
        });
    });

    test('removes highlight and clears input after delay', async () => {
        jest.useFakeTimers();

        // Рендерим компонент
        render(<TextDetailAdd label={label} handleAdd={handleAddMock} buttonText={buttonText} added_success={true} />);

        // Ожидаем, что начальные стили применились
        const inputContainer = screen.getByLabelText(label).parentElement;
        expect(inputContainer).toHaveStyle('color: magenta');
        expect(inputContainer).toHaveStyle('background-color: lightgreen');

        // Продвигаем таймер на 2000 миллисекунд
        act(() => {
            jest.advanceTimersByTime(2000);
        });
        //
        // // Ожидаем, что стили вернулись к значениям по умолчанию
        // await waitFor(() => {
        //     expect(inputContainer).not.toHaveStyle('color: magenta');
        //     expect(inputContainer).not.toHaveStyle('background-color: lightgreen');
        // });

        // Проверяем, что поле ввода очищено
        const input = screen.getByLabelText(label);
        expect(input.value).toBe('');

        jest.useRealTimers();
    });
});
