import React, {FC} from "react";
import { Box, } from "@mui/material";

import { CarDetailsForm} from "../../components/listings/add-listing/brand-model-choose";


export const ListingAddPage: FC = () => {


    return(
        <Box>
            <CarDetailsForm />
        </Box>
    )
}