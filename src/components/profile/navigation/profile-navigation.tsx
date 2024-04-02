import { FC, } from "react";
import {
    Button,
    Grid
} from "@mui/material";
import {styled} from "@mui/system";
import {NavLink, useLocation} from "react-router-dom";
import {logout} from "../../../services/thunks/user";
import {useDispatch} from "../../../services/hooks";



const StyledNavLink = styled(NavLink)(({ theme }) => ({
    textDecoration: "none",
    textAlign: "start",

}));

export const ProfileNavigation: FC = () => {
    const dispatch = useDispatch();
    const location = useLocation();

    const handleExit = () => {
        dispatch(logout({refreshToken: localStorage.getItem("refreshToken") || ''}));
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
