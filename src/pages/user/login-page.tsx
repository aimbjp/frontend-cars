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
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import { login } from "../../services/thunks/user";
import { useForm } from "../../hooks/form/use-form";
import { PasswordInput, InputBase } from "../../components/input";
import {ButtonResetRegister} from "../../components/button/reset-register-buttons";
import {isEmailValid} from "../../services/functions/checkInputs/email";
import {useDispatch, useSelector} from "../../services/hooks";

const defaultTheme = createTheme({
});

export const LoginPage: FC = () => {
    const dispatch = useDispatch();

    const { values, handleChange } = useForm<{
        email: string;
        password: string;
    }>({
        email: "",
        password: "",
    });

    const authorizationFailed = useSelector((store) => store.userReducer.authorizationFailed)



    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(isEmailValid(values.email)) dispatch(login(values));
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
                        <LockRoundedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Вход
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit}>
                        <InputBase value={values.email} handleChange={handleChange} flagFailed={authorizationFailed} type="email" label="Почтовый адрес"/>
                        <PasswordInput value={values.password} helperText="Неверные данные, введите повторно" onChange={handleChange} error={authorizationFailed}/>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            size="large"
                        >
                            Войти
                        </Button>
                        <ButtonResetRegister/>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
};
