import React, { FC, useState, useEffect, ChangeEvent } from "react";
import {
    TextField, Button, Box, Typography, Autocomplete, Collapse, Grid, useMediaQuery, Theme
} from "@mui/material";
import { useDispatch, useSelector } from "../../../services/hooks";
import {
    getBodyTypesByModel,
    getBrands, getColorsByModel,
    getDrivesByModel, getEnginesByModel, getListings,
    getModelsByBrandId, getTransmissionsByModel, resetModelsByBrandId,
    setActiveTab,
    updateSearchParameters
} from "../../../services/thunks/listings";
import { IParametersSearch } from "../../../type/listings/listings";
import { Brand, Model, Engine, Transmission, Drive, Color, BodyType } from "../../../type/car/cars-details";
import {getBodyTypes, getColors, getDrives, getEngines, getTransmissions} from "../../../services/thunks/cars-details";

export const ListingsSearch: FC = () => {
    const dispatch = useDispatch();
    const { listings, parameters, brands, modelsByBrand, colorsByModel, enginesByModel, drivesByModel, transmissionsByModel, bodyTypesByModel } = useSelector((store) => store.listingsReducer);
    const { engines, drives, transmissions, colors, bodyTypes } = useSelector((store) => store.carsDetailsReducer);
    const [localSearchParams, setLocalSearchParams] = useState<IParametersSearch>(parameters);

    const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

    useEffect(() => {
        dispatch(getBrands());
        dispatch(getDrives());
        dispatch(getEngines());
        dispatch(getColors());
        dispatch(getBodyTypes());
        dispatch(getTransmissions());
    }, [dispatch]);

    useEffect(() => {
        if (parameters.page === "1") {
            dispatch(getListings(parameters));
        }
    }, [parameters]);



    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setLocalSearchParams(prev => ({
            ...prev,
            [name]: value === '' ? undefined : value
        }));

        dispatch(updateSearchParameters({...localSearchParams, [name]: value === '' ? undefined : value, page: "1"}));

    };

    const handleSubmit = () => {
        dispatch(updateSearchParameters({...localSearchParams, page: "1"}))
        dispatch(setActiveTab('listings'));
    };

    return (
        <Box sx={{
            p: 2, boxShadow: '0 4px 8px rgba(0,0,0,0.1)', borderRadius: '16px', backgroundColor: 'white', m: 'auto', maxWidth: 900
        }} data-cy="search-box">
            <Typography variant="h5" sx={{ mb: 2 }} data-cy="search-title">Параметры поиска</Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} >
                    <Autocomplete
                        multiple
                        options={brands}
                        getOptionLabel={(option: Brand) => option.name}
                        onChange={(event, newValue) => {
                            setLocalSearchParams(prev => ({
                                ...prev,
                                brandIds: newValue.map(value => value.brandId.toString())
                            }))

                            dispatch(updateSearchParameters({...localSearchParams, brandIds: newValue.map(value => value.brandId.toString())}));

                            if (newValue.map(value => value.brandId.toString()).length > 0) {
                                dispatch(getModelsByBrandId(newValue.map(value => value.brandId.toString())));
                            } else {
                                setLocalSearchParams(prev => ({
                                    ...prev,
                                    modelIds: undefined
                                }))
                                dispatch(resetModelsByBrandId());
                            }
                        }}
                        renderInput={(params) => <TextField {...params} label="Бренд" data-cy="brand-input"/>}
                        value={brands.filter(brand => localSearchParams.brandIds?.includes(brand.brandId.toString()))}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Collapse in={!!(localSearchParams.brandIds?.length || 0 > 0 )}>
                        <Autocomplete
                            multiple
                            sx={{p:2}}
                            options={modelsByBrand}
                            getOptionLabel={(option) => option.name}
                            value={modelsByBrand.filter(modelByBrand => localSearchParams.modelIds?.includes(modelByBrand.modelId.toString()))}
                            onChange={(event, newValue) => {
                                setLocalSearchParams(prev => ({
                                    ...prev,
                                    modelIds: newValue.map(value => value.modelId.toString())
                                }))

                                dispatch(updateSearchParameters({...localSearchParams, modelIds: newValue.map(value => value.modelId.toString())}));
                                dispatch(getDrivesByModel(newValue.map(value => value.modelId.toString())));
                                dispatch(getEnginesByModel(newValue.map(value => value.modelId.toString())));
                                dispatch(getTransmissionsByModel(newValue.map(value => value.modelId.toString())));
                                dispatch(getColorsByModel(newValue.map(value => value.modelId.toString())));
                                dispatch(getBodyTypesByModel(newValue.map(value => value.modelId.toString())));
                            }}
                            renderInput={(params) => <TextField {...params} label="Модель" placeholder="Выберите Модель" data-cy="model-input"/>}
                        />
                    </Collapse>
                </Grid>
                <Grid item xs={12} md={24} container spacing={2}>
                    <Autocomplete
                        sx={{ width: '40%', p: 2 }}
                        multiple
                        options={ localSearchParams.modelIds?.length || 0 > 0 ? enginesByModel : engines }
                        getOptionLabel={(option) => option.type}
                        value={
                            localSearchParams.modelIds?.length || 0 > 0 ? enginesByModel.filter(engineByModel => localSearchParams.engineTypes?.includes(engineByModel.type.toString()))
                                : engines.filter(engine => localSearchParams.engineTypes?.includes(engine.type.toString()))
                        }
                        onChange={(event, newValue) => {
                            setLocalSearchParams(prev => ({
                                ...prev,
                                engineTypes: newValue.map(value => value.type.toString())
                            }))

                            dispatch(updateSearchParameters({...localSearchParams, engineTypes: newValue.map(value => value.type.toString())}));
                        }}
                        renderInput={(params) => <TextField {...params} label="Двигатель" placeholder="Выберите Двигатель" data-cy="engine-input"/>}
                    />
                    <Autocomplete
                        sx={{ width: '40%', p: 2 }}
                        multiple
                        options={drives}
                        getOptionLabel={(option) => option.type}
                        value={
                            localSearchParams.modelIds?.length || 0 > 0 ? drivesByModel.filter(engineByModel => localSearchParams.driveTypes?.includes(engineByModel.type.toString()))
                                : drives.filter(engine => localSearchParams.driveTypes?.includes(engine.type.toString()))
                        }
                        onChange={(event, newValue) => {
                            setLocalSearchParams(prev => ({
                                ...prev,
                                driveTypes: newValue.map(value => value.type.toString())
                            }));
                            dispatch(updateSearchParameters({...localSearchParams, driveTypes: newValue.map(value => value.type.toString())}));
                        }}
                        renderInput={(params) => <TextField {...params} label="Привод" placeholder="Выберите Привод" data-cy="drive-input"/>}
                    />
                </Grid>

                <Grid item xs={12} md={24} container spacing={2}>
                    <Autocomplete
                        sx={{ width: '40%', p: 2 }}
                        multiple
                        options={bodyTypes}
                        getOptionLabel={(option) => option.type}
                        value={
                            localSearchParams.modelIds?.length || 0 > 0 ? bodyTypesByModel.filter(engineByModel => localSearchParams.bodyTypeIds?.includes(engineByModel.bodyTypeId.toString()))
                                : bodyTypes.filter(engine => localSearchParams.bodyTypeIds?.includes(engine.bodyTypeId.toString()))
                        }
                        onChange={(event, newValue) => {
                            setLocalSearchParams(prev => ({
                                ...prev,
                                bodyTypeIds: newValue.map(value => value.bodyTypeId.toString())
                            }));
                            dispatch(updateSearchParameters({...localSearchParams, bodyTypeIds: newValue.map(value => value.bodyTypeId.toString())}));
                        }}
                        renderInput={(params) => <TextField {...params} label="Тип кузова" placeholder="Выберите тип кузова" data-cy="body-input"/>}
                    />

                    <Autocomplete
                        sx={{ width: '40%', p: 2 }}
                        multiple
                        options={transmissions}
                        getOptionLabel={(option) => option.type}
                        value={
                            localSearchParams.modelIds?.length || 0 > 0 ? transmissionsByModel.filter(engineByModel => localSearchParams.transmissionTypes?.includes(engineByModel.transmissionId.toString()))
                                : transmissions.filter(engine => localSearchParams.transmissionTypes?.includes(engine.transmissionId.toString()))
                        }
                        onChange={(event, newValue) => {
                            setLocalSearchParams(prev => ({
                                ...prev,
                                transmissionTypes: newValue.map(value => value.transmissionId.toString())
                            }));
                            dispatch(updateSearchParameters({...localSearchParams, transmissionTypes: newValue.map(value => value.transmissionId.toString())}));
                        }}
                        renderInput={(params) => <TextField {...params} label="Коробка передач" placeholder="Выберите коробку передач" data-cy="transmission-input"/>}
                    />
                </Grid>


                <Grid item xs={12} md={24} container spacing={2}>
                    <Autocomplete
                        sx={{ width: '30%', p: 2 }}
                        multiple
                        options={colors}
                        getOptionLabel={(option) => option.type}
                        value={
                            localSearchParams.modelIds?.length || 0 > 0 ? colorsByModel.filter(engineByModel => localSearchParams.colorIds?.includes(engineByModel.colorId.toString()))
                                : colors.filter(engine => localSearchParams.colorIds?.includes(engine.colorId.toString()))
                        }
                        onChange={(event, newValue) => {
                            setLocalSearchParams(prev => ({
                                ...prev,
                                colorIds: newValue.map(value => value.colorId.toString())
                            }));
                            dispatch(updateSearchParameters({...localSearchParams, colorIds: newValue.map(value => value.colorId.toString())}));
                        }}
                        renderInput={(params) => <TextField {...params} label="Цвет" placeholder="Выберите цвет" data-cy="color-input"/>}
                    />
                    <TextField
                        sx={{ width: '50%', m: 2 }}
                        name="places"
                        label="Место осмотра"
                        type="string"
                        onChange={handleInputChange}
                        value={localSearchParams.places || ''}
                        data-cy="places-input"
                    />
                </Grid>

                <Grid item xs={12} container spacing={2}>
                    <TextField
                        sx={{
                            maxWidth: '40%',
                            m: 2
                        }}
                        name="priceMin"
                        label="Цена от"
                        type="number"
                        onChange={handleInputChange}
                        value={localSearchParams.priceMin || ''}
                        data-cy="price-min-input"
                    />
                    <TextField
                        sx={{
                            maxWidth: '40%',
                            m: 2
                        }}
                        name="priceMax"
                        label="до"
                        type="number"
                        onChange={handleInputChange}
                        value={localSearchParams.priceMax || ''}
                        data-cy="price-max-input"
                    />
                </Grid>
            </Grid>

            <Box sx={{display: 'grid', justifyContent: 'center'}} data-cy="listings-box">
                {listings && <Typography data-cy="total-listings">Всего объявлений: {listings.total}</Typography>}

                {isMobile && <Button variant="contained" color="primary" onClick={handleSubmit} data-cy="search-button">
                    Поиск
                </Button>}
            </Box>
        </Box>
    );
};
