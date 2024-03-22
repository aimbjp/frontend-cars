import { FC, } from "react";
import {
    Button,
    Container,
    Grid
} from "@mui/material";
import {useDispatch, } from "react-redux";
import { logout, } from "../../../services/actions/user";
import {styled} from "@mui/system";
import {NavLink, useLocation} from "react-router-dom";



const StyledNavLink = styled(NavLink)(({ theme }) => ({
    textDecoration: "none",
    textAlign: "start",

}));

export const ProfileNavigation: FC = () => {
    const dispatch = useDispatch();
    const location = useLocation();

    const handleExit = () => {
        //TODO: When storage typed
        // @ts-ignore
        dispatch(logout(JSON.stringify({refreshToken: localStorage.getItem("refreshToken")})));
    }

    return (
            <Grid
                container
                direction="column"
                justifyContent="flex-start"
                alignItems="flex-start"
            >
                        <StyledNavLink to="/profile">
                            <Button
                                variant="text"
                                color={location.pathname === '/profile' ? 'primary' : 'secondary'}
                                size="large"
                            >
                                Профиль
                            </Button>
                        </StyledNavLink>
                        <StyledNavLink to="/profile/favorites">
                            <Button
                                variant="text"
                                color={location.pathname === '/profile/favorites' ? 'primary' : 'secondary'}
                                size="large"
                            >
                                Избранное
                            </Button>
                        </StyledNavLink>
                        <Button
                            variant="text"
                            color="secondary"
                            size="large"
                            onClick={handleExit}
                        >
                            Выход
                        </Button>
            </Grid>
    );
};
