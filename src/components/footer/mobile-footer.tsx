import {ChangeEvent, FC} from "react";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import FilterListIcon from '@mui/icons-material/FilterList';
import {useDispatch, useSelector} from "../../services/hooks";
import {setActiveTab} from "../../services/thunks/listings";



export const MobileFooter: FC = () => {
    const dispatch = useDispatch();
    const {activeTab} = useSelector(store => store.listingsReducer);

    const handleChange = (event: ChangeEvent<{}>, newValue: number) => {
        const tabMap = ['search', 'listings', 'sort'];
        dispatch(setActiveTab(tabMap[newValue]));
    };

    return (
        <BottomNavigation
            showLabels
            onChange={handleChange}
            style={{ position: 'fixed', bottom: 0, width: '100%' }}
        >
            <BottomNavigationAction label="Поиск" icon={<SearchIcon />} style={ activeTab === 'search' ? {color: 'blue'} : {}}/>
            <BottomNavigationAction label="Объявления" icon={<DirectionsCarIcon />}  style={ activeTab === 'listings' ? {color: 'blue'} : {}}/>
            <BottomNavigationAction label="Фильтры" icon={<FilterListIcon />}  style={ activeTab === 'sort' ? {color: 'blue'} : {}}/>
        </BottomNavigation>
    );
};
