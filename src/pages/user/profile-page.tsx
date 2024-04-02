import { FC, ReactElement } from "react";
import {
    Container,
    createTheme,
    CssBaseline, Grid,
    ThemeProvider,
} from "@mui/material";
import { ProfileNavigation} from "../../components/profile/navigation/profile-navigation";

const defaultTheme = createTheme({
});

interface IProfilePage {
    element: ReactElement;
}

export const ProfilePage: FC<IProfilePage> = ({element}) => {

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" sx={{ mt:9 }}>
                <CssBaseline />
                <Grid
                    container
                    direction="row"
                    justifyContent="space-around"
                    alignItems="center"
                >
                    <Grid item xs={2}>
                        <ProfileNavigation />
                    </Grid>
                    <Grid item xs={6}>
                        {element}
                    </Grid>
                </Grid>
            </Container>
        </ThemeProvider>
    );
};
