import React, { useState, useEffect } from 'react';
import { Button, Box, TextField, Autocomplete } from '@mui/material';
import {
    addModelBodyTypeAssociation,
    addModelColorAssociation,
    addModelDriveAssociation,
    addModelEngineAssociation,
    addModelTransmissionAssociation,
    getBodyTypes,
    getBrands,
    getColors,
    getDrives,
    getEngines,
    getModelsByBrandId,
    getTransmissions
} from "../../../../services/thunks/cars-details";
import { useDispatch, useSelector } from "../../../../services/hooks";
import { BodyType, Brand, Color, Drive, Engine, Model, Transmission } from "../../../../type/car/cars-details";

const ModelEngineAssociation: React.FC = () => {
    const dispatch = useDispatch();
    const { brands, modelsByBrand, engines, drives, bodyTypes, transmissions, colors } = useSelector((state) => state.carsDetailsReducer);
    const [selectedBrand, setSelectedBrand] = useState<Brand[]>([]);
    const [selectedModels, setSelectedModels] = useState<Model[]>([]);
    const [selectedEngines, setSelectedEngines] = useState<Engine[]>([]);
    const [selectedDrives, setSelectedDrives] = useState<Drive[]>([]);
    const [selectedBodyTypes, setSelectedBodyTypes] = useState<BodyType[]>([]);
    const [selectedTransmissions, setSelectedTransmissions] = useState<Transmission[]>([]);
    const [selectedColors, setSelectedColors] = useState<Color[]>([]);

    useEffect(() => {
        dispatch(getBrands());
        dispatch(getEngines());
        dispatch(getDrives());
        dispatch(getBodyTypes());
        dispatch(getTransmissions());
        dispatch(getColors());
    }, [dispatch]);

    useEffect(() => {
        if (selectedBrand.length) {
            dispatch(getModelsByBrandId(selectedBrand.map(brand => brand.brandId.toString())));
        } else {
            setSelectedModels([]);
        }
    }, [selectedBrand, dispatch]);

    const handleAddAssociation = (actionCreator: Function, selectedItems: any[]) => {
        const modelIds = selectedModels.map(model => model.modelId);
        let itemIds = selectedItems.map(item => item.id);

        dispatch(actionCreator(modelIds, itemIds));
    };

    return (
        <Box sx={{ p: 3 }}>
            <Autocomplete
                multiple
                data-testid="brand-autocomplete"
                options={brands}
                getOptionLabel={(option) => option.name}
                value={selectedBrand}
                onChange={(event, newValue) => setSelectedBrand(newValue)}
                renderInput={(params) => <TextField {...params} label="Бренд" placeholder="Выберите Бренд" />}
            />

            <Autocomplete
                multiple
                data-testid="model-autocomplete"
                options={modelsByBrand}
                getOptionLabel={(option) => option.name}
                value={selectedModels}
                onChange={(event, newValue) => setSelectedModels(newValue)}
                renderInput={(params) => <TextField {...params} label="Модель" placeholder="Выберите Модель" />}
                disabled={!selectedBrand.length}
            />

            <Autocomplete
                multiple
                data-testid="engine-autocomplete"
                options={engines}
                getOptionLabel={(option) => option.type}
                value={selectedEngines}
                onChange={(event, newValue) => setSelectedEngines(newValue)}
                renderInput={(params) => <TextField {...params} label="Двигатель" placeholder="Выберите Двигатель" />}
            />

            <Button sx={{ml:2}} variant="contained"
                    onClick={() => handleAddAssociation(addModelEngineAssociation, selectedEngines.map(engine => ({ id: engine.engineId })))}
                    disabled={selectedModels.length === 0 || selectedEngines.length === 0}>
                Добавить связь модели и двигателя
            </Button>

            <Autocomplete
                multiple
                data-testid="drive-autocomplete"
                options={drives}
                getOptionLabel={(option) => option.type}
                value={selectedDrives}
                onChange={(event, newValue) => setSelectedDrives(newValue)}
                renderInput={(params) => <TextField {...params} label="Привод" placeholder="Выберите Привод" />}
            />
            <Button sx={{ml:2}} variant="contained" onClick={() => handleAddAssociation(addModelDriveAssociation, selectedDrives.map(drive => ({ id: drive.driveId })))} disabled={selectedModels.length === 0 || selectedDrives.length === 0}>
                Добавить связь модели и привода
            </Button>

            <Autocomplete
                multiple
                data-testid="bodytype-autocomplete"
                options={bodyTypes}
                getOptionLabel={(option) => option.type}
                value={selectedBodyTypes}
                onChange={(event, newValue) => setSelectedBodyTypes(newValue)}
                renderInput={(params) => <TextField {...params} label="Тип кузова" placeholder="Выберите тип кузова" />}
            />
            <Button sx={{ml:2}} variant="contained" onClick={() => handleAddAssociation(addModelBodyTypeAssociation, selectedBodyTypes.map(body => ({ id: body.bodyTypeId})))} disabled={selectedModels.length === 0 || selectedBodyTypes.length === 0}>
                Добавить связь модели и типа кузова
            </Button>

            <Autocomplete
                multiple
                data-testid="transmission-autocomplete"
                options={transmissions}
                getOptionLabel={(option) => option.type}
                value={selectedTransmissions}
                onChange={(event, newValue) => setSelectedTransmissions(newValue)}
                renderInput={(params) => <TextField {...params} label="Коробка передач" placeholder="Выберите коробку передач" />}
            />
            <Button sx={{ml:2}} variant="contained" onClick={() => handleAddAssociation(addModelTransmissionAssociation, selectedTransmissions.map(transmission => ({ id: transmission.transmissionId })))} disabled={selectedModels.length === 0 || selectedTransmissions.length === 0}>
                Добавить связь модели и коробки передач
            </Button>

            <Autocomplete
                multiple
                data-testid="color-autocomplete"
                options={colors}
                getOptionLabel={(option) => option.type}
                value={selectedColors}
                onChange={(event, newValue) => setSelectedColors(newValue)}
                renderInput={(params) => <TextField {...params} label="Цвет" placeholder="Выберите цвет" />}
            />
            <Button sx={{ml:2}} variant="contained" onClick={() => handleAddAssociation(addModelColorAssociation, selectedColors.map(colors => ({ id: colors.colorId })))} disabled={selectedModels.length === 0 || selectedColors.length === 0}>
                Добавить связь модели и цвета
            </Button>
        </Box>
    );
}

export default ModelEngineAssociation;
