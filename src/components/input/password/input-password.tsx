import React, { useState, ChangeEvent,  } from 'react';
import { TextField, InputAdornment, IconButton,  } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

interface PasswordInputProps {
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    error?: boolean;
    helperText: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({ value, onChange, error, helperText , ...rest}) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePasswordVisibility = () => {
        setShowPassword(prevShowPassword => !prevShowPassword);
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        onChange(event);
    };

    return (
        <TextField
            {...rest}
            margin="normal"
            required
            fullWidth
            name="password"
            label="Пароль"
            type={!showPassword ? "password" : "text"}
            autoComplete="current-password"
            value={value}
            onChange={handleChange}
            error={error}
            {...(error ? { helperText: helperText } : {})}
            InputProps={{
                // Кнопка для показа/скрытия пароля
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleTogglePasswordVisibility}
                        >
                            {!showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                )
            }}
        />
    );
};

export default PasswordInput;
