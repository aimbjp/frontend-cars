import React, { FC, useEffect, useState} from "react";
import {
    Autocomplete,
    Box,
    Checkbox,
    FormControlLabel,
    TextField,
    Typography
} from "@mui/material";
import { useDispatch, useSelector } from "../../../services/hooks";
import { Brand, Model, Engine, Drive, Transmission, BodyType, Color } from "../../../type/car/cars-details";
import { motion, Variants } from 'framer-motion';
import {
    setActiveBrand,
    setActiveModel,
    setActiveEngine,
    setActiveDrive,
    setActiveTransmission,
    setActiveBodyType,
    setActiveColor,
    getBodyTypesByModel,
    getColorsByModel,
    getDrivesByModel,
    getEnginesByModel,
    getTransmissionsByModel,
    setActiveDescription,
    setActivePrice,
    setActiveMileage,
    setActiveOwnersCount,
    setActiveVIN,
    setActivePlace, setActiveYear,
} from "../../../services/thunks/listing-add";
import {getBrands, getModelsByBrandId} from "../../../services/thunks/cars-details";
import {AddListingPhoto} from "./add-listing-photo";
import {AddListingAddButton} from "./add-listing-add-button";



const containerVariants = {
    hidden: {opacity: 0, y: 20},
    visible: {opacity: 1, y: 0},
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
}

export const CarDetailsForm: FC = () => {
    const dispatch = useDispatch();
    const [skipDescription, setSkipDescription] = useState(false);

    const {
        brands,
        modelsByBrand,
        activeBrand,
        activeModel,
        activeEngine,
        activeDrive,
        activeTransmission,
        activeBodyType,
        activeColor, activeMileage,
        activeDescription, activeExchange, activeImages, activeOwnersCount, activePlace, activePrice, activePTS, activeVIN, activeYear,
        colorsByModel, enginesByModel, drivesByModel, transmissionsByModel, bodyTypesByModel,
    } = useSelector(state => ({
        ...state.carsDetailsReducer,
        ...state.listingReducer
    }));

    useEffect(() => {
        dispatch(getBrands());
    }, [dispatch]);

    useEffect(() => {
        if (activeBrand) {
            dispatch(getModelsByBrandId([activeBrand.brandId.toString()]));
        }
    }, [activeBrand, dispatch]);

    useEffect(() => {
        if (activeModel) {
            dispatch(getEnginesByModel(activeModel.modelId.toString()));
            dispatch(getDrivesByModel(activeModel.modelId.toString()));
            dispatch(getTransmissionsByModel(activeModel.modelId.toString()));
            dispatch(getBodyTypesByModel(activeModel.modelId.toString()));
            dispatch(getColorsByModel(activeModel.modelId.toString()));
        }
    }, [activeModel, dispatch]);

    const handleSelectChange = (type: string, newValue: any) => {
        switch (type) {
            case 'brand':
                dispatch(setActiveBrand(newValue));
                dispatch(setActiveModel(null));
                break;
            case 'model':
                dispatch(setActiveModel(newValue));
                dispatch(setActiveBodyType(null));
                break;
            case 'engine':
                dispatch(setActiveEngine(newValue));
                dispatch(setActiveDrive(null));
                break;
            case 'drive':
                dispatch(setActiveDrive(newValue));
                dispatch(setActiveTransmission(null));
                break;
            case 'transmission':
                dispatch(setActiveTransmission(newValue));
                dispatch(setActiveColor(null));
                break;
            case 'bodyType':
                dispatch(setActiveBodyType(newValue));
                dispatch(setActiveEngine(null));
                break;
            case 'color':
                dispatch(setActiveColor(newValue));
                break;
        }
    };

    const animations: Variants = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 }
    };

    return (
        <>
            <Box sx={{
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
            }}>
                <Typography variant="h5">Добавление объявления</Typography>
                <Typography variant="h6" hidden={!!activeBrand}>Выберите марку</Typography>
                <Autocomplete
                    sx={{width: 300}}
                    options={brands}
                    getOptionLabel={(option) => option.name}
                    value={activeBrand}
                    onChange={(event, newValue: Brand | null) => handleSelectChange('brand', newValue)}
                    renderInput={(params) => <TextField {...params} label="Марка"/>}
                />

                {activeBrand && (
                    <motion.div variants={animations} initial="initial" animate="animate" exit="exit">
                        <Typography variant="h6" hidden={!!activeModel}>Выберите модель</Typography>
                        <Autocomplete
                            sx={{minWidth: 200}}
                            options={modelsByBrand}
                            getOptionLabel={(option) => option.name}
                            value={activeModel}
                            onChange={(event, newValue: Model | null) => handleSelectChange('model', newValue)}
                            renderInput={(params) => <TextField {...params} label="Модель"/>}
                        />
                    </motion.div>
                )}

                {activeBrand && activeModel && (
                    <motion.div
                        initial={{x: 100, opacity: 0}}
                        animate={{x: 0, opacity: 1}}
                        transition={{duration: 1}}
                    >
                        <Typography variant="h6" hidden={!!activeBodyType}>Выберите кузов</Typography>
                        <Autocomplete
                            sx={{minWidth: 200}}
                            options={bodyTypesByModel}
                            getOptionLabel={(option) => option.type}
                            value={activeBodyType}
                            onChange={(event, newValue: BodyType | null) => handleSelectChange('bodyType', newValue)}
                            renderInput={(params) => <TextField {...params} label="Кузов"/>}
                        />
                    </motion.div>
                )}

                {activeBrand && activeModel && activeBodyType && (
                    <motion.div
                        initial={{x: 100, opacity: 0}}
                        animate={{x: 0, opacity: 1}}
                        transition={{duration: 1}}
                    >
                        <Typography variant="h6" hidden={!!activeEngine}>Выберите двигатель</Typography>
                        <Autocomplete
                            sx={{minWidth: 200}}
                            options={enginesByModel}
                            getOptionLabel={(option) => option.type}
                            value={activeEngine}
                            onChange={(event, newValue: Engine | null) => handleSelectChange('engine', newValue)}
                            renderInput={(params) => <TextField {...params} label="Двигатель"/>}
                        />
                    </motion.div>
                )}

                {activeBrand && activeModel && activeBodyType && activeEngine && (
                    <motion.div
                        initial={{y: -50, opacity: 0}}
                        animate={{y: 0, opacity: 1}}
                        transition={{duration: 0.6}}
                    >
                        <Typography variant="h6" hidden={!!activeDrive}>Выберите привод</Typography>
                        <Autocomplete
                            sx={{minWidth: 200}}
                            options={drivesByModel}
                            getOptionLabel={(option) => option.type}
                            value={activeDrive}
                            onChange={(event, newValue: Drive | null) => handleSelectChange('drive', newValue)}
                            renderInput={(params) => <TextField {...params} label="Привод"/>}
                        />
                    </motion.div>
                )}

                {activeBrand && activeModel && activeBodyType && activeEngine && activeDrive && (
                    <motion.div
                        initial={{x: 200, opacity: 0}}
                        animate={{x: 0, opacity: 1}}
                        transition={{duration: 0.7}}
                    >
                        <Typography variant="h6" hidden={!!activeTransmission}>Выберите коробку передач</Typography>
                        <Autocomplete
                            sx={{minWidth: 200}}
                            options={transmissionsByModel}
                            getOptionLabel={(option) => option.type}
                            value={activeTransmission}
                            onChange={(event, newValue: Transmission | null) => handleSelectChange('transmission', newValue)}
                            renderInput={(params) => <TextField {...params} label="Коробка передач"/>}
                        />
                    </motion.div>
                )}

                {activeBrand && activeModel && activeBodyType && activeEngine && activeDrive && activeTransmission && (
                    <motion.div
                        initial={{y: 50, opacity: 0}}
                        animate={{y: 0, opacity: 1}}
                        transition={{duration: 0.8}}
                    >
                        <Typography variant="h6" hidden={!!activeColor}>Выберите цвет</Typography>
                        <Autocomplete
                            sx={{minWidth: 200}}
                            options={colorsByModel}
                            getOptionLabel={(option) => option.type}
                            value={activeColor}
                            onChange={(event, newValue: Color | null) => {
                                handleSelectChange('color', newValue)
                            }}
                            renderInput={(params) => <TextField {...params} label="Цвет"/>}
                        />
                    </motion.div>
                )}


            </Box>
            {activeBrand && activeModel && activeBodyType && activeEngine && activeDrive && activeTransmission && activeColor && (
                <>
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{duration: 0.5}}
                        style={{width: '100%'}}
                    >
                        <Box sx={{
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
                        }}>
                            <Typography variant="h6">Цена</Typography>
                            <TextField
                                fullWidth
                                label="Укажите цену"
                                value={activePrice}
                                onChange={(event) => dispatch(setActivePrice(event.target.value))}
                                margin="normal"
                                variant="outlined"
                            />
                        </Box>
                    </motion.div>

                    {activeBrand && activeModel && activeBodyType && activeEngine && activeDrive && activeTransmission && activeColor && activePrice && (
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            transition={{duration: 0.5}}
                            style={{width: '100%'}}
                        >
                            <Box sx={{
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
                            }}>
                                <Typography variant="h6">Пробег</Typography>
                                <TextField
                                    fullWidth
                                    label="Пробег в километрах"
                                    value={activeMileage}
                                    onChange={(event) => dispatch(setActiveMileage(!event.target.value ? null : Number(event.target.value)))}
                                    margin="normal"
                                    variant="outlined"
                                    type="number"
                                />
                            </Box>
                        </motion.div>
                    )}

                    {activeBrand && activeModel && activeBodyType && activeEngine && activeDrive && activeTransmission && activeColor && activePrice && activeMileage && (
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            transition={{duration: 0.5}}
                            style={{width: '100%'}}
                        >
                            <Box sx={{
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
                            }}>
                                <Typography variant="h6">Год покупки</Typography>
                                <TextField
                                    fullWidth
                                    label="Год покупки автомобиля"
                                    value={activeYear}
                                    onChange={(event) => dispatch(setActiveYear(!event.target.value ? null : Number(event.target.value)))}
                                    margin="normal"
                                    variant="outlined"
                                    type="number"
                                />
                            </Box>
                        </motion.div>
                    )}

                    {activeBrand && activeModel && activeBodyType && activeEngine && activeDrive && activeTransmission && activeColor && activePrice && activeMileage && activeYear && (
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            transition={{duration: 0.5}}
                            style={{width: '100%'}}
                        >
                            <Box sx={{
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
                            }}>
                                <Typography variant="h6">VIN</Typography>
                                <TextField
                                    fullWidth
                                    label="VIN номер"
                                    value={activeVIN}
                                    onChange={(event) => dispatch(setActiveVIN(event.target.value))}
                                    margin="normal"
                                    variant="outlined"
                                />
                            </Box>
                        </motion.div>
                    )}

                    {activeBrand && activeModel && activeBodyType && activeEngine && activeDrive && activeTransmission && activeColor && activePrice && activeMileage && activeYear && activeVIN && (
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            transition={{duration: 0.5}}
                            style={{width: '100%'}}
                        >
                            <Box sx={{
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
                            }}>
                                <Typography variant="h6">Количество владельцев</Typography>
                                <TextField
                                    fullWidth
                                    label="Количество предыдущих владельцев"
                                    value={activeOwnersCount}
                                    onChange={(event) => dispatch(setActiveOwnersCount(!event.target.value ? null : Number(event.target.value)))}
                                    margin="normal"
                                    variant="outlined"
                                    type="string"
                                />
                            </Box>
                        </motion.div>
                    )}

                    {activeBrand && activeModel && activeBodyType && activeEngine && activeDrive && activeTransmission && activeColor && activePrice && activeMileage && activeYear && activeVIN && (activeOwnersCount || activeOwnersCount === 0) && (
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            transition={{duration: 0.5}}
                            style={{width: '100%'}}
                        >
                            <Box sx={{
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
                            }}>
                                <Typography variant="h6">Описание</Typography>
                                <TextField
                                    fullWidth
                                    label="Описание автомобиля"
                                    value={activeDescription}
                                    onChange={(event) => dispatch(setActiveDescription(event.target.value))}
                                    margin="normal"
                                    variant="outlined"
                                    multiline
                                    rows={4}
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={skipDescription}
                                            onChange={(event) => {
                                                setSkipDescription(event.target.checked)
                                            }}
                                            color="primary"
                                        />
                                    }
                                    label="Пропустить описание"
                                />
                            </Box>
                        </motion.div>
                    )}

                    {activeBrand && activeModel && activeBodyType && activeEngine && activeDrive && activeTransmission && activeColor && activePrice && activeMileage && activeYear && activeVIN && (activeOwnersCount || activeOwnersCount === 0) && (activeDescription || skipDescription) && (
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            transition={{duration: 0.5}}
                            style={{width: '100%'}}
                        >
                            <Box sx={{
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
                            }}>
                                <Typography variant="h6">Место осмотра</Typography>
                                <TextField
                                    fullWidth
                                    label="Место, где можно осмотреть автомобиль"
                                    value={activePlace}
                                    onChange={(event) => dispatch(setActivePlace(event.target.value))}
                                    margin="normal"
                                    variant="outlined"
                                />
                            </Box>
                        </motion.div>
                    )}
                </>
            )}

            <AddListingPhoto/>

            <AddListingAddButton />
        </>
    );
};
