import {FC} from "react";
import {Link} from "react-router-dom";
import {Box, Grid} from "@mui/material";


export const HomePage: FC = () => {
    return (
        <Grid>
            <Link to={'/login'}>login</Link>
            <Link to={'/profile'}>profile</Link>
        </Grid>
    )
}