import { FC, FormEvent, useRef, useEffect, useState } from "react";
import { Button, Stack, TextField, IconButton, InputAdornment } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../../hooks/form/use-form";
import { getUserInfo, updateUserInfo } from "../../../services/actions/user";

interface IProfileForm {
    email?: string;
    name?: string;
    password?: string;
    username?: string;
}

export const ProfileContent: FC = () => {
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState<{ [key: string]: boolean }>({
        email: false,
        name: false,
        password: false,
        username: false,
    });
    const [hasChanges, setHasChanges] = useState<boolean>(false);

    const email = useSelector((store: any) => store.userReducer.user.email);
    const name = useSelector((store: any) => store.userReducer.user.name);
    const username = useSelector((store: any) => store.userReducer.user.username);

    const { values, handleChange, setValues } = useForm<IProfileForm>({
        email: email,
        name: name,
        password: '',
        username: username,
    });

    useEffect(() => {
        // @ts-ignore
        dispatch(getUserInfo())
            .catch((e: any) => { console.error(e); });
    }, [dispatch]);

    useEffect(() => {
        if (email !== values.email || name !== values.name) {
            setValues((prevValues: typeof values) => ({ ...prevValues, email: email, name: name }));
        }
    }, [email, name]);

    const handleProfile = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const changedValues: IProfileForm = {};

        if (values.email !== email) {
            changedValues.email = values.email;
        }
        if (values.name !== name) {
            changedValues.name = values.name;
        }
        if (values.username !== username) {
            changedValues.username = values.username;
        }
        if (values.password !== '') {
            changedValues.password = values.password;
        }

        if (Object.keys(changedValues).length > 0) {
            // @ts-ignore
            dispatch(updateUserInfo(JSON.stringify(changedValues)));
            setValues((prevValues: typeof values) => ({ ...prevValues, password: '' }));
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
        setValues((prevValues: typeof values) => ({ ...prevValues, email: email, name: name, username: username, password: '' }));
    }

    useEffect(() => {
        setHasChanges(!(email === values.email && name === values.name && username === values.username && '' === values.password));
    }, [values.email, values.name, values.password, handleProfile, values.username]);

    return (
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
                        <Button variant="outlined" onClick={handleCancel}>
                            Отменить
                        </Button>
                        <Button variant="contained" type="submit">
                            Сохранить
                        </Button>
                    </Stack>
                )}
            </Stack>
        </form>
    );
};

export default ProfileContent;


