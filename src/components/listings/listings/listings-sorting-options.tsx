import {Box, Button, MenuItem, Select, Typography} from "@mui/material";
import {useDispatch, useSelector} from "../../../services/hooks";
import {updateSearchParameters} from "../../../services/thunks/listings";
import {useState} from "react";

export const SortingOptions = () => {
    // const dispatch = useDispatch();
    // const {searchParameters} = useSelector(store => store.listingsReducer);
    // const [sortType, setSortType] = useState(searchParameters.sortType || '');
    //
    // const handleSortChange = (event) => {
    //     const newSortType = event.target.value;
    //     setSortType(newSortType);
    //     dispatch(updateSearchParameters({ ...searchParameters, sortType: newSortType, page: "1" }));
    // };

    return (
        <Box sx={{p:2, boxShadow: '0 4px 8px rgba(0,0,0,0.1)', borderRadius: '16px', backgroundColor: 'white', m: 'auto', maxWidth: 900}} data-cy="sorting-options">
            <Typography variant="h5" sx={{mb:2}}>Сортировка</Typography>
            <Select
                // value={sortType}
                // onChange={handleSortChange}
                fullWidth
                sx={{ mb: 2 }}
                data-cy="sort-select"
            >
                <MenuItem value="price_asc">По возрастанию цены</MenuItem>
                <MenuItem value="price_desc">По убыванию цены</MenuItem>
                <MenuItem value="year_asc">По возрастанию года</MenuItem>
                <MenuItem value="year_desc">По убыванию года</MenuItem>
            </Select>
        </Box>
    );
};
