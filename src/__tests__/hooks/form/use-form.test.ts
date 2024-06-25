import { renderHook } from '@testing-library/react-hooks';
import { fireEvent } from '@testing-library/react';
import { ChangeEvent } from 'react';
import {useForm} from "../../../hooks/form/use-form";

interface TestFormValues {
    name: string;
    email: string;
}

describe('useForm hook', () => {
    const initialValues: TestFormValues = { name: '', email: '' };

    // Этот тест проверяет, что хук useForm правильно инициализируется с заданными начальными значениями.
    // Он вызывает хук с initialValues и затем проверяет, что values в результате совпадают с initialValues.
    it('should initialize with given values', () => {
        const { result } = renderHook(() => useForm(initialValues));
        expect(result.current.values).toEqual(initialValues);
    });

    // Этот тест проверяет, что хук useForm корректно обрабатывает изменение значения в input.
    // Он создаёт элемент input, устанавливает его name и value, затем вызывает fireEvent.change для имитации события изменения.
    // В итоге проверяется, что значение name в values обновилось правильно.
    it('should handle input change', () => {
        const { result } = renderHook(() => useForm(initialValues));

        const input = document.createElement('input');
        input.name = 'name';
        input.value = 'John';

        fireEvent.change(input, { target: { value: 'John' } });
        result.current.handleChange({ target: input, preventDefault: jest.fn() } as ChangeEvent<HTMLInputElement>);

        expect(result.current.values.name).toBe('John');
    });


    // Этот тест аналогичен предыдущему, но проверяет работу хука useForm с элементом textarea.
    // Он создаёт элемент textarea, устанавливает его name и value, затем вызывает fireEvent.change для имитации события изменения.
    // В итоге проверяется, что значение email в values обновилось правильно.
    it('should handle textarea change', () => {
        const { result } = renderHook(() => useForm(initialValues));

        const textarea = document.createElement('textarea');
        textarea.name = 'email';
        textarea.value = 'john@example.com';

        fireEvent.change(textarea, { target: { value: 'john@example.com' } });
        result.current.handleChange({ target: textarea, preventDefault: jest.fn() } as ChangeEvent<HTMLTextAreaElement>);

        expect(result.current.values.email).toBe('john@example.com');
    });

    // Этот тест проверяет, что метод setValues корректно обновляет значения в values.
    // Он вызывает хук с начальными значениями, затем использует setValues для установки новых значений, и проверяет, что values обновлены правильно.
    it('should update values using setValues', () => {
        const { result } = renderHook(() => useForm(initialValues));

        result.current.setValues({ name: 'Jane', email: 'jane@example.com' });

        expect(result.current.values).toEqual({ name: 'Jane', email: 'jane@example.com' });
    });

    // Этот тест проверяет, что метод handleChange вызывает preventDefault на переданном событии.
    // Он создаёт элемент input, вызывает handleChange с объектом события, содержащим preventDefault как jest.fn(), и проверяет, что preventDefault был вызван.
    it('should prevent default on handleChange', () => {
        const { result } = renderHook(() => useForm(initialValues));

        const preventDefault = jest.fn();
        const input = document.createElement('input');
        input.name = 'name';
        input.value = 'John';

        result.current.handleChange({
            preventDefault,
            target: input,
        } as ChangeEvent<HTMLInputElement>);

        expect(preventDefault).toHaveBeenCalled();
    });
});
