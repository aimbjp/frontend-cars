import {FC, FormEvent, useEffect, useRef, useState} from 'react';
import {Box, Button, CircularProgress, IconButton, InputAdornment, Stack, TextField} from '@mui/material';
import {useDispatch, useSelector} from "../../../../../services/hooks";
import {IChangePassword} from "../../../../../type/user/user-types";
import {useForm} from "../../../../../hooks/form/use-form";
import {changePassword} from "../../../../../services/thunks/user";
import EditIcon from "@mui/icons-material/Edit";
import {CHANGE_PASSWORD_RELOAD} from "../../../../../services/action-types/user";

const ChangePasswordForm: FC = () => {
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState<{ [key: string]: boolean }>({
        oldPassword: false,
        newPassword: false,
    });

    const { changePasswordFailed, changePasswordLoading, changePasswordSuccess } = useSelector(store => store.userReducer);

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
    }

    useEffect(() => {
        if (changePasswordSuccess) {
            handleCancel();
            dispatch({type: CHANGE_PASSWORD_RELOAD});
        }
    }, [changePasswordSuccess]);

    const togglePasswordFields = () => {
        setPasswordFieldsVisible(prev => !prev);
    };

    return (
        <Box mt="3vh" mx="auto" maxWidth="400px">
            <form onSubmit={handleSubmit}>
                <Stack spacing={2}>
                    <Button variant="contained" onClick={togglePasswordFields} sx={{ width: 'fit-content' }}>
                        {(passwordFieldsVisible ? 'Отменить' : 'Изменить пароль')}
                    </Button>

                    {passwordFieldsVisible && changePasswordLoading ? (
                        <Box display="flex" justifyContent="center">
                            <CircularProgress size={24} />
                        </Box>
                    ) : passwordFieldsVisible && (
                        <Box>
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
                                <Button type="submit" variant="contained" sx={{ backgroundColor: '#007bff', color: '#ffffff', borderRadius: '10px' }}>
                                    Сохранить пароль
                                </Button>
                                <Button variant="outlined" onClick={handleCancel} sx={{ borderColor: '#007bff', color: '#007bff', borderRadius: '10px' }}>
                                    Отменить
                                </Button>
                            </Stack>
                        </Box>
                    )}
                </Stack>
            </form>
        </Box>
    );
};

export default ChangePasswordForm;
