import React, {FC, useEffect} from "react";
import {addListing, setActiveBrand, setActivePhotos} from "../../../services/thunks/listing-add";
import {Box, Button, TextField, Typography} from "@mui/material";
import {useDispatch, useSelector} from "../../../services/hooks";
import {LoaderWithoutMargin} from "../../elements";


export const AddListingAddButton: FC = () => {
    const dispatch = useDispatch();
    const {
        activeBrand,
        activeModel,
        activeEngine,
        activeDrive,
        activeTransmission,
        activeBodyType,
        activeColor, activeMileage,
        activeDescription, activeExchange, activeImages, activeOwnersCount, activePlace, activePrice, activeVIN, activeYear,
        user,
        loading, loadingSuccess
    } = useSelector(state => ({
        ...state.listingReducer,
        ...state.userReducer
    }));

    useEffect(
        () => {
            if (loadingSuccess) {
                dispatch(setActiveBrand(null));
                dispatch(setActivePhotos(null));
                dispatch(setActivePhotos(null));
            }
        }, [loadingSuccess]
    )


    return(
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 2,
                margin: 'auto',
                maxWidth: 700,
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                borderRadius: '16px',
                backgroundColor: 'white',
                mt: 4,
                gap: 2
            }}
        >
        <Button onClick={() => {
            dispatch(addListing({
                modelId: activeModel?.modelId || 1,
                engineId: activeEngine?.engineId || 1,
                transmissionId: activeTransmission?.transmissionId || 1,
                driveId: activeDrive?.driveId || 1,
                bodyTypeId: activeBodyType?.bodyTypeId || 1,
                colorId: activeColor?.colorId || 1,
                year: activeYear || 1,
                price: activePrice || '',
                VIN: activeVIN || '',
                place: activePlace || "",
                ownersCount: activeOwnersCount || 1,
                description: activeDescription || "",
                userId: parseInt(user.userId || "1"),
                images: activeImages ? [...activeImages] : null,
            }))}}
                variant="contained"
                disabled={!(activeBrand && activeModel && activeBodyType && activeEngine && activeDrive && activeTransmission && activeColor && activePrice && activeMileage && activeYear)}

        >
            Добавить объявление
        </Button>
            {loading && <LoaderWithoutMargin />}
            {!loading && loadingSuccess && <Typography> Объявление добавлено </Typography>}
        </Box>
    )
}