import { Button, Grid} from "@mui/material";
import { StyledLink} from "../../pages/user/styles";
import { FC} from "react";
import { IButtonSecondaryWithLink} from "./types";


export const ButtonSecondary: FC<Omit<IButtonSecondaryWithLink, 'link'>> = ({value, ...rest}) => {
    return (
        <div style={{textAlign: 'center'}}> {/* Центрируем кнопку */}
            <Button variant="text" color="secondary" size="small" style={{textTransform: 'none'}} {...rest}>
                    {value}
            </Button>
        </div>
    )
}

export const ButtonSecondaryWithLink: FC<IButtonSecondaryWithLink> = ({value, link}) => {
    return (
        <div style={{textAlign: 'center'}}> {/* Центрируем кнопку */}
            <Button variant="text" color="secondary" size="small" style={{textTransform: 'none'}}>
                <StyledLink to={link}>
                    {value}
                </StyledLink>
            </Button>
        </div>
    )
}

export const ButtonResetRegister: FC = () => {
    return (
        <Grid container>
            <Grid item xs>
                <ButtonSecondaryWithLink value="Нет аккаунта? Зарегистрироваться" link='/register'/>
            </Grid>
            <Grid item xs>
                <ButtonSecondaryWithLink value="Забыли пароль? Восстановить" link='/forgot-password'/>
            </Grid>
        </Grid>
    );
}

