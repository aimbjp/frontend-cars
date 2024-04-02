import {styled} from "@mui/system";
import {Link} from "react-router-dom";

export const StyledLink = styled(Link)(({ theme }) => ({
    textDecoration: "none",
    color: theme.palette.secondary.main,
    "&:hover": {
        color: theme.palette.secondary.light,
        textDecoration: "underline",
    },
    fontSize: "16px",
}));