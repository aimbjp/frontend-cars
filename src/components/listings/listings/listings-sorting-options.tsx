import { FC } from "react";
import { FormControl, InputLabel, Select, MenuItem, Box } from "@mui/material";

export const SortingOptions: FC = () => {
    return (
        <Box sx={{mb: 2}}>
            <FormControl fullWidth>
                <InputLabel>Sort By</InputLabel>
                <Select label="Sort By" defaultValue="">
                    <MenuItem value="price">Price</MenuItem>
                    <MenuItem value="datePosted">Date Posted</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
};
