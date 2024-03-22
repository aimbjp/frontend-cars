import {FC, FormEvent, SyntheticEvent, useState} from "react";
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
import {useDispatch, } from "react-redux";
import {changeForgotPasswordEmail, remindPassword, resetPassword} from "../../services/actions/user";
import { useForm } from "../../hooks/form/use-form";
import { PasswordInput, InputBase } from "../../components/input";
import {
    ButtonSecondary,
} from "../../components/button/reset-register-buttons";

const defaultTheme = createTheme({
});

export const ResetPasswordPage: FC = () => {
    const dispatch = useDispatch();

    const [errorToken, setErrorToken] = useState<string>('')
    const [flag, setFlag] = useState<boolean>(false)

    const {values, handleChange} = useForm<{password: string, token: string}>({password: "", token: ""});

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const payload = JSON.stringify(values);

        //TODO: When storage typed
        // @ts-ignore
        dispatch(resetPassword(payload, setErrorToken, setFlag));

    }

    const handleChangeEmail = (e: SyntheticEvent<Element, Event>) => {
        e.preventDefault();

        //TODO: When storage typed
        // @ts-ignore
        dispatch(changeForgotPasswordEmail());
    }

    function handleRemindPassword(e: SyntheticEvent<Element, Event>) {
        e.preventDefault();

        //TODO: When storage typed
        // @ts-ignore
        dispatch(remindPassword());
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
                        {/*TODO: add onCLick handleChangeEmail, handleRemindPassword*/}
                        <ButtonSecondary value={"Кажется в почту закралась опечатка? Назад"} onClick={handleChangeEmail}/>
                        <ButtonSecondary value={"Вспомнили пароль? Войти"} onClick={handleRemindPassword}/>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
};
