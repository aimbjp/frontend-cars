import { useState } from 'react';
import { TextField } from "@mui/material";
import { FC } from "react";
import { IInputBase } from "./types";
import { isEmailValid } from "../../../services/functions/checkInputs/email";

const InputBase: FC<IInputBase> = ({ value, handleChange, flagFailed, type, label, helperText }) => {
    const [emailError, setEmailError] = useState<boolean>(false);

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        // Проверяем значение только для поля ввода электронной почты
        if (type === "email" && value !== "") {
            const inputValue = e.target.value;
            setEmailError(!isEmailValid(inputValue)); // Устанавливаем ошибку, если электронная почта недопустима
        }
    };

    return (
        <TextField
            margin="normal"
            required
            fullWidth
            id={type}
            label={label}
            name={type}
            autoComplete={type}
            autoFocus
            value={value}
            onChange={handleChange}
            onBlur={handleBlur}
            {...(emailError ? { error: true, helperText: "Некорректная почта" } : {})}
            {...(helperText && !emailError ? { helperText: "Почта не зарегистрирована" } : {})}
            {...(flagFailed ? { error: true } : {})}
        />
    );
};

export default InputBase;
