import {FC} from "react";
import {UserInfoForm} from "./profile-content";
import ChangePasswordForm from "./profile-forms/form-change-password";
import {Container} from "@mui/material";


export const ProfileMain: FC = () => {
    return(
        <Container>
            <UserInfoForm />
            <ChangePasswordForm />
        </Container>
    )
}