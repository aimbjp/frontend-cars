import {FC, ReactElement, useState} from "react";
import {
    Box,
    Container,
    createTheme,
    CssBaseline, Grid, Hidden, IconButton,
    ThemeProvider,
} from "@mui/material";
import { ProfileNavigation} from "../../components/profile/navigation/profile-navigation";
import MenuIcon from "@mui/icons-material/Menu";

const defaultTheme = createTheme({
});

interface IProfilePage {
    element: ReactElement;
}

export const ProfilePage: FC<IProfilePage> = ({element}) => {

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container sx={{ mt: 9 }}>
                <CssBaseline />
                <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                            <ProfileNavigation />
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <Box>
                            {element}
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </ThemeProvider>
    );
};
