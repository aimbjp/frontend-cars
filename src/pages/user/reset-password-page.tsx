import {FC, FormEvent, SyntheticEvent, useEffect, useState} from "react";
import {
    Avatar,
    Box,
    Button,
    Container,
    createTheme,
    CssBaseline,
    ThemeProvider,
    Typography
} from "@mui/material";
import LockResetRoundedIcon from '@mui/icons-material/LockResetRounded';
import { useForm } from "../../hooks/form/use-form";
import { PasswordInput, InputBase } from "../../components/input";
import {
    ButtonSecondary,
} from "../../components/button/reset-register-buttons";
import {useDispatch} from "../../services/hooks";
import {changeForgotPasswordEmail, remindPassword, resetPassword} from "../../services/thunks/user";
import {IResetPassword} from "../../type/user/user-types";
import { useNavigate, useParams} from "react-router-dom";
import {CHECK_EMAIL_EXIST_SUCCESS} from "../../services/action-types/user";

const defaultTheme = createTheme({
});

export const ResetPasswordPage: FC = () => {
    const dispatch = useDispatch();
    const {token} = useParams();
    const navigate = useNavigate();


    const [errorToken, setErrorToken] = useState<string>('')
    const [flag, setFlag] = useState<boolean>(false)

    const {values, handleChange} = useForm<IResetPassword>({password: "", token: token || ""});

    // useEffect(() => {
    //     if (token) dispatch({type: CHECK_EMAIL_EXIST_SUCCESS});
    // }, [token])

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const payload = (values);

        dispatch(resetPassword(payload, setErrorToken, setFlag));
    }


    const handleChangeEmail = (e: SyntheticEvent<Element, Event>) => {
        e.preventDefault();
        if (token) {
            navigate('/forgot-password');
            dispatch(changeForgotPasswordEmail());

        } else {
            dispatch(changeForgotPasswordEmail());
        }
    }

    function handleRemindPassword(e: SyntheticEvent<Element, Event>) {
        e.preventDefault();
        if (token) {
            navigate('/login');
            dispatch(remindPassword());

        } else {
            dispatch(remindPassword());
        }
    }

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: "primary.light" }}>
                        <LockResetRoundedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Восстановление пароля
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit}>
                        <InputBase value={values.token} handleChange={handleChange} flagFailed={flag} type="token" label="Код из письма"/>
                        <PasswordInput value={values.password} helperText={errorToken} onChange={handleChange} error={flag}/>{/*"Неверный код, введите повторно" onChange={handleChange} error={flag}/>*/}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            size="large"
                        >
                            Восстановить
                        </Button>
                        <ButtonSecondary value={"Кажется в почту закралась опечатка? Назад"} onClick={handleChangeEmail}/>
                        <ButtonSecondary value={"Вспомнили пароль? Войти"} onClick={handleRemindPassword}/>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
};
