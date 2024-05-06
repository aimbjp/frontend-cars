import {FC} from "react";
import {Link} from "react-router-dom";
import {Box, Grid} from "@mui/material";


export const HomePage: FC = () => {
    return (
        <Grid>
            <Link to={'/login'}>Login</Link>
            <br/>
            <br/>
            <br/>
            <Link to={'/profile'}>Profile</Link>
            <br/>
            <br/>
            <br/>
            <Link to={'/chat'}>Chat</Link>
        </Grid>
    )
}