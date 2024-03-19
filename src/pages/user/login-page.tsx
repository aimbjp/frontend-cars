import { FC, FormEvent } from "react";
import {
    Avatar,
    Box,
    Button,
    Container,
    createTheme,
    CssBaseline,
    Grid,
    TextField,
    ThemeProvider,
    Typography
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {useDispatch, useSelector} from "react-redux";
import { login } from "../../services/actions/user";
import { useForm } from "../../hooks/form/use-form";
import {StyledLink} from "./styles";

const defaultTheme = createTheme({
    // your custom theme values
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

    // @ts-ignore
    const authorizationFailed = useSelector((store) => store.userReducer.authorizationFailed)

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // TODO: remove ts-ignore
        // @ts-ignore
        dispatch(login(JSON.stringify(values)));
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
                    <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Вход
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Почтовый адрес"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={values.email}
                            onChange={handleChange}
                            {...(authorizationFailed ? { error: true } : {})}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Пароль"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={values.password}
                            onChange={handleChange}
                            {...(authorizationFailed ? { error: true } : {})}
                            {...(authorizationFailed ? { helperText: "Неверные данные, введите повторно" } : {})}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Войти
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Button variant="text" color="secondary" size="small">
                                    <StyledLink to='/remind-password'>
                                        Забыли пароль?
                                    </StyledLink>
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button variant="text" color="secondary" size="small">
                                    <StyledLink to='/register'>
                                        Нет аккаунта? Зарегистрироваться
                                    </StyledLink>
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
};
