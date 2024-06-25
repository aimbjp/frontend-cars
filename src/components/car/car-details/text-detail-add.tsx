import { FC, useState, useEffect } from 'react';
import {TextField, Button, Box} from '@mui/material';
import { ITextDetailAdd } from "./type";

export const TextDetailAdd: FC<ITextDetailAdd> = ({ label, handleAdd, buttonText, added_success }) => {
    const [name, setName] = useState('');
    const [highlight, setHighlight] = useState(false);

    useEffect(() => {
        if (added_success) {
            setHighlight(true);
            const timer = setTimeout(() => {
                setHighlight(false);
                setName('')
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [added_success]);

    const inputStyle = {
        color: highlight ? 'magenta' : 'inherit',
        backgroundColor: highlight ? 'lightgreen' : 'inherit',
    };

    return (
        <Box sx={{ display: 'grid', justifyContent: 'center', mt: 2 }}>
            <TextField

                label={label}
                value={name}
                onChange={(e) => setName(e.target.value)}
                variant="outlined"
                InputProps={{
                    style: inputStyle
                }}
            />
            <Button sx={{ mt: 0.5 }} onClick={() => handleAdd(name)} color="primary" variant="contained">
                {buttonText}
            </Button>
        </Box>
    );
}
