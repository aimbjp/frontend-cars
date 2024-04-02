import {SyntheticEvent} from "react";

export interface IButtonSecondaryWithLink {
    value: string;
    link: string;
    onClick?: (e: SyntheticEvent<Element, Event>) => void;
}