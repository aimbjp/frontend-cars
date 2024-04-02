import { FC, FormEvent, useState, useEffect, useRef } from 'react';
import { TextField, Button, Stack, InputAdornment, IconButton, CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from "../../../../../services/hooks";
import { IChangePassword } from "../../../../../type/user/user-types";
import { useForm } from "../../../../../hooks/form/use-form";
import { changePassword } from "../../../../../services/thunks/user";
import EditIcon from "@mui/icons-material/Edit";

const ChangePasswordForm: FC = () => {
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState<{ [key: string]: boolean }>({
        oldPassword: false,
        newPassword: false,
    });

    const { changePasswordFailed, changePasswordLoading } = useSelector(store => store.userReducer);

    const initialStateForForm: IChangePassword = {
        oldPassword: '',
        newPassword: ''
    };
    const [passwordFieldsVisible, setPasswordFieldsVisible] = useState<boolean>(false);

    const { values, handleChange, setValues } = useForm<IChangePassword>(initialStateForForm);

    const [focusField, setFocusField] = useState<keyof IChangePassword | null>(null);

    const inputRefs = useRef<{ [key in keyof IChangePassword]?: HTMLInputElement }>({});

    const handleEdit = (field: keyof IChangePassword) => {
        setIsEditing(prevState => ({ ...prevState, [field]: true }));
        setFocusField(field);
    };

    useEffect(() => {
        if (focusField && inputRefs.current[focusField]) {
            inputRefs.current[focusField]?.focus();
        }
    }, [focusField]);

    const handleBlur = (field: keyof IChangePassword) => {
        setIsEditing(prevState => ({ ...prevState, [field]: false }));
    };

    const handleCancel = () => {
        setValues(initialStateForForm);
        setPasswordFieldsVisible(false);
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(changePassword(values));
        if (!changePasswordFailed && !changePasswordLoading && passwordFieldsVisible) {
            handleCancel();
        }
    };

    const togglePasswordFields = () => {
        setPasswordFieldsVisible(prev => !prev);
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginTop: '3vh' }}>
            <Stack spacing={2}>
                <Button variant="contained" onClick={togglePasswordFields} sx={{ width: 'fit-content' }} >
                    {(passwordFieldsVisible ? 'Отменить' : 'Изменить пароль')}
                </Button>

                {passwordFieldsVisible && changePasswordLoading ? <CircularProgress size={24} /> : passwordFieldsVisible && (
                    <>
                        <TextField
                            type="oldPassword"
                            label="Старый пароль"
                            placeholder="Старый пароль"
                            onChange={handleChange}
                            value={values.oldPassword}
                            name="oldPassword"
                            disabled={!isEditing.oldPassword}
                            onBlur={() => handleBlur('oldPassword')}
                            error={changePasswordFailed && !changePasswordLoading}
                            helperText={changePasswordFailed && !changePasswordLoading ? 'Старый пароль неверный' : ''}
                            required
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            edge="end"
                                            onClick={() => handleEdit('oldPassword')}
                                            aria-label="toggle edit"
                                        >
                                            <EditIcon />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                            inputRef={(ref: HTMLInputElement) => inputRefs.current['oldPassword'] = ref}
                        />

                        <TextField
                            type="newPassword"
                            label="Новый пароль"
                            placeholder="Новый пароль"
                            onChange={handleChange}
                            value={values.newPassword}
                            name="newPassword"
                            disabled={!isEditing.newPassword}
                            onBlur={() => handleBlur('newPassword')}
                            required
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            edge="end"
                                            onClick={() => handleEdit('newPassword')}
                                            aria-label="toggle edit"
                                        >
                                            <EditIcon />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                            inputRef={(ref: HTMLInputElement) => inputRefs.current['newPassword'] = ref}
                        />

                        <Stack direction="row" spacing={2}>
                            <Button type="submit" variant="contained">Сохранить пароль</Button>
                            <Button variant="outlined" onClick={handleCancel}>Отменить</Button>
                        </Stack>
                    </>
                )}
            </Stack>
        </form>
    );
};

export default ChangePasswordForm;
