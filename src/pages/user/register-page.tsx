import {FC, FormEvent } from "react";
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
import { register} from "../../services/thunks/user";
import { useForm } from "../../hooks/form/use-form";
import { PasswordInput, InputBase } from "../../components/input";
import { ButtonSecondaryWithLink} from "../../components/button/reset-register-buttons";
import {isEmailValid} from "../../services/functions/checkInputs/email";
import AppRegistrationRoundedIcon from '@mui/icons-material/AppRegistrationRounded';
import {useDispatch, useSelector} from "../../services/hooks";

const defaultTheme = createTheme({
});

export const RegisterPage: FC = () => {
    const dispatch = useDispatch();

    const { values, handleChange } = useForm<{
        email: string;
        password: string;
        name: string;
        username: string;
    }>({
        email: "",
        password: "",
        name: "",
        username: "",
    });

    const registerFailed = useSelector((store) => store.userReducer.registerFailed)

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (isEmailValid(values.email)) dispatch(register(values));
    };

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
                        <AppRegistrationRoundedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Регистрация
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} sx={{ alignItems: "center", }}>
                        <InputBase value={values.name} handleChange={handleChange} flagFailed={registerFailed} type="name" label="Имя"/>
                        <InputBase value={values.username} handleChange={handleChange} flagFailed={registerFailed} type="username" label="Псевдоним (никнейм)"/>
                        <InputBase value={values.email} handleChange={handleChange} flagFailed={registerFailed} type="email" label="Почтовый адрес"/>
                        <PasswordInput value={values.password} helperText="Такой пользователь уже зарегистрирован, измените никнейм или почту" onChange={handleChange} error={registerFailed}/>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            size="large"
                        >
                            Зарегистрироваться
                        </Button>
                        <ButtonSecondaryWithLink value="Вспомнили пароль? Войти" link="/login"/>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
};
