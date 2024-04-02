import { FC, useState } from "react";
import {IconButton, Grid, Button, Paper} from "@mui/material";
import { styled } from "@mui/system";
import { NavLink, useLocation } from "react-router-dom";
import { logout } from "../../../services/thunks/user";
import { useDispatch } from "../../../services/hooks";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const StyledNavLink = styled(NavLink)(({ theme }) => ({
    textDecoration: "none",
    textAlign: "start",
}));

const Overlay = styled("div")({
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 9999,
});

const MenuContainer = styled(Paper)(({ theme }) => ({
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    padding: theme.spacing(2),
    zIndex: 10000,
}));

export const ProfileNavigation: FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();
    const location = useLocation();

    const handleExit = () => {
        dispatch(logout({ refreshToken: localStorage.getItem("refreshToken") || '' }));
    }

    const toggleMenu = () => {
        setIsOpen(prevState => !prevState);
    };

    return (
        <Grid
            container
            direction="column"
            justifyContent="flex-start"
            alignItems="flex-start"
        >
            <IconButton onClick={toggleMenu}>
                {isOpen ? <CloseIcon /> : <MenuIcon />}
            </IconButton>

            {isOpen && (
                <>
                    <Overlay onClick={toggleMenu} />
                    <MenuContainer elevation={3}>
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
                    </MenuContainer>

                </>
            )}
        </Grid>
    );
};
