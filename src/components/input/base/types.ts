import {ChangeEvent} from "react";

export interface IInputBase {
    value: string;
    handleChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    flagFailed: boolean;
    type: string;
    label: string;
    helperText?: string;
}