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
import LockResetRoundedIcon from "@mui/icons-material/LockOutlined";
import {useDispatch, useSelector} from "react-redux";
import {checkEmailExist} from "../../services/actions/user";
import { useForm } from "../../hooks/form/use-form";
import { InputBase } from "../../components/input";
import { ButtonSecondaryWithLink} from "../../components/button/reset-register-buttons";
import { isEmailValid} from "../../services/functions/checkInputs/email";

const defaultTheme = createTheme({
});

export const ForgotPasswordPage: FC = () => {
    const dispatch = useDispatch();

    const { values, handleChange } = useForm<{
        email: string;
    }>({
        email: "",
    });

    // @ts-ignore
    const isEmailExist = useSelector((store) => store.userReducer.checkEmailExistFailed)

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // TODO: remove ts-ignore
        // @ts-ignore
        if(isEmailValid(values.email)) dispatch(checkEmailExist(JSON.stringify(values)));
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
                        <LockResetRoundedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Восстановление пароля
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit}>
                        <InputBase value={values.email} handleChange={handleChange} flagFailed={isEmailExist} type="email" label="Почтовый адрес" {...(isEmailExist ? { helperText:"Почта не найдена" } : {} ) } />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            size="large"
                        >
                            Отправить код
                        </Button>
                        <ButtonSecondaryWithLink value="Вспомнили пароль? Войти" link='/login'/>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
};
