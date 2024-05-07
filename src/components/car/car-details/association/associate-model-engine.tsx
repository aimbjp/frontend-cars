import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, Select, MenuItem, Button, Box } from '@mui/material';
import {
    addModelEngineAssociation,
    getBrands,
    getEngines,
    getModelsByBrandId
} from "../../../../services/thunks/cars-details";
import { useDispatch, useSelector } from "../../../../services/hooks";
import { Brand, Engine, Model } from "../../../../type/car/cars-details";

const ModelEngineAssociation = () => {
    const dispatch = useDispatch();
    const { brands, modelsByBrand, engines } = useSelector(state => state.carsDetailsReducer);
    const [selectedBrand, setSelectedBrand] = useState<string[]>([]);
    const [selectedModels, setSelectedModels] = useState<string[]>([]);
    const [selectedEngines, setSelectedEngines] = useState<string[]>([]);

    useEffect(() => {
        dispatch(getBrands());
        dispatch(getEngines());
    }, [dispatch]);

    useEffect(() => {
        if (selectedBrand.length) {
            dispatch(getModelsByBrandId(selectedBrand));
        } else {
            setSelectedModels([]);
        }
    }, [selectedBrand, dispatch]);

    const handleAddAssociation = () => {
        dispatch(addModelEngineAssociation(selectedModels, selectedEngines));
    };

    const handleBrandChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (e.target instanceof HTMLSelectElement) {
            setSelectedBrand(Array.from(e.target.selectedOptions, option => option.value));
        }
    };

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel>Brand</InputLabel>
                <Select
                    multiple
                    value={selectedBrand}
                    label="Brand"
                    onChange={e => setSelectedBrand(typeof e.target.value === 'string'
                        ? e.target.value.split(',')
                        : e.target.value)}
                >
                    {brands.map((brand: Brand) => <MenuItem key={brand.brandId} value={brand.brandId}>{brand.name}</MenuItem>)}
                </Select>
            </FormControl>

            <FormControl fullWidth>
                <InputLabel>Model</InputLabel>
                <Select
                    multiple
                    value={selectedModels}
                    label="Model"
                    onChange={e => setSelectedModels(typeof e.target.value === 'string'
                        ? e.target.value.split(',')
                        : e.target.value)}
                    disabled={!selectedBrand.length}
                >
                    {modelsByBrand.map((model: Model) => <MenuItem key={model.modelId} value={model.modelId}>{model.name}</MenuItem>)}
                </Select>
            </FormControl>

            <FormControl fullWidth>
                <InputLabel>Engine</InputLabel>
                <Select
                    multiple
                    value={selectedEngines}
                    label="Engine"
                    onChange={e => setSelectedEngines(typeof e.target.value === 'string'
                        ? e.target.value.split(',')
                        : e.target.value)}
                >
                    {engines.map((engine: Engine) => <MenuItem key={engine.engineId} value={engine.engineId}>{engine.type}</MenuItem>)}
                </Select>
            </FormControl>

            <Button variant="contained" onClick={handleAddAssociation} disabled={selectedModels.length === 0 || selectedEngines.length === 0}>
                Добавить связь
            </Button>
        </Box>
    );
}

export default ModelEngineAssociation;