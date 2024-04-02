import {FC} from "react";
import {UserInfoForm} from "./profile-content";
import ChangePasswordForm from "./profile-forms/form-change-password";


export const ProfileMain: FC = () => {
    return(
        <>
            <UserInfoForm />
            <ChangePasswordForm />
        </>
    )
}