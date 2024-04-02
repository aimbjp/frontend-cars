import { FC, FormEvent, useRef, useEffect, useState } from "react";
import {Button, Stack, TextField, IconButton, InputAdornment, Box} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import { useForm } from "../../../../hooks/form/use-form";
import {useDispatch, useSelector} from "../../../../services/hooks";
import {getUserInfo, updateUserInfo} from "../../../../services/thunks/user";
import {IProfileForm} from "../../../../type/user/user-types";



export const UserInfoForm: FC = () => {
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState<{ [key: string]: boolean }>({
        email: false,
        name: false,
        username: false,
    });
    const [hasChanges, setHasChanges] = useState<boolean>(false);

    const { email, name, username } = useSelector((store) => store.userReducer.user);

    const initialStateForForm: IProfileForm = {
        email: email,
        name: name,
        username: username,
    };

    const { values, handleChange, setValues } = useForm<IProfileForm>(initialStateForForm);

    useEffect(() => {
        dispatch(getUserInfo())
    }, [dispatch]);

    useEffect(() => {
        if (email !== values.email || name !== values.name || username !== values.username) {
            setValues((prevValues: typeof values) => ({ ...prevValues, email: email, name: name, username: username }));
        }
    }, [email, name, username]);

    const handleProfile = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const changedValues: IProfileForm = (Object.keys(values) as Array<keyof typeof values>)
            .reduce((acc, key) => {
            if (values[key] !== initialStateForForm[key]) {
                acc[key] = values[key];
            }
            return acc;
        }, {} as IProfileForm);

        if (Object.keys(changedValues).length > 0) {
            dispatch(updateUserInfo(changedValues));
            setValues((prevValues: typeof values) => ({ ...prevValues }));
        }
    }

    const [focusField, setFocusField] = useState<keyof IProfileForm | null>(null);

    const inputRefs = useRef<{ [key in keyof IProfileForm]?: HTMLInputElement }>({});

    const handleEdit = (field: keyof IProfileForm) => {
        setIsEditing(prevState => ({ ...prevState, [field]: true }));
        setFocusField(field);
    };

    useEffect(() => {
        if (focusField && inputRefs.current[focusField]) {
            inputRefs.current[focusField]?.focus();
        }
    }, [focusField]);

    const handleBlur = (field: keyof IProfileForm) => {
        setIsEditing(prevState => ({ ...prevState, [field]: false }));
    };

    const handleCancel = () => {
        setValues((prevValues: typeof values) => (initialStateForForm));
    }

    useEffect(() => {
        const hasChanges = (Object.keys(values) as Array<keyof typeof values>)
            .some(key => values[key] !== initialStateForForm[key]);
        setHasChanges(hasChanges);
    }, [values, initialStateForForm]);

    return (
        <Box mt="3vh" mx="auto" maxWidth="400px">

        <form name="changeProfile" onSubmit={handleProfile}>
            <Stack spacing={2} sx={{ marginLeft: '5vw' }}>
                <TextField
                    type="text"
                    label="Имя"
                    placeholder="Имя"
                    onChange={handleChange}
                    value={values.name}
                    name="name"
                    disabled={!isEditing.name}
                    onBlur={() => handleBlur('name')}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    edge="end"
                                    onClick={() => handleEdit('name')}
                                    aria-label="toggle edit"
                                >
                                    <EditIcon />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                    inputRef={(ref: HTMLInputElement) => inputRefs.current['name'] = ref}
                />
                <TextField
                    type="email"
                    label="Email"
                    placeholder="Email"
                    onChange={handleChange}
                    value={values.email}
                    name="email"
                    disabled={!isEditing.email}
                    onBlur={() => handleBlur('email')}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    edge="end"
                                    onClick={() => handleEdit('email')}
                                    aria-label="toggle edit"
                                >
                                    <EditIcon />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                    inputRef={(ref: HTMLInputElement) => inputRefs.current['email'] = ref}
                />
                <TextField
                    type="username"
                    label="Username"
                    placeholder="Username"
                    onChange={handleChange}
                    value={values.username}
                    name="username"
                    disabled={!isEditing.username}
                    onBlur={() => handleBlur('username')}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    edge="end"
                                    onClick={() => handleEdit('username')}
                                    aria-label="toggle edit">
                                    <EditIcon />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                    inputRef={(ref: HTMLInputElement) => inputRefs.current['username'] = ref}
                />
                {hasChanges && (
                    <Stack direction="row" spacing={2}>
                        <Button variant="outlined" onClick={handleCancel} sx={{ borderRadius: '20px', backgroundColor: '#ffffff', color: '#000000', border: '1px solid #000000' }}>
                            Отменить
                        </Button>
                        <Button variant="contained" type="submit" sx={{ borderRadius: '20px', backgroundColor: '#000000', color: '#ffffff', width: 'fit-content' }}>
                            Сохранить
                        </Button>
                    </Stack>
                )}
            </Stack>
        </form>
        </Box>
    );
};

export default UserInfoForm;


