import { useState, useEffect } from 'react';
import { FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';
import {createAssociationModelBrand, getBrands, getModelsWithoutBrand} from "../../../../services/thunks/cars-details";
import {useDispatch, useSelector} from "../../../../services/hooks";
import {Brand, ModelWoBrand} from "../../../../type/car/cars-details";

export default function AssociationComponent() {
    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedModel, setSelectedModel] = useState('');
    const dispatch = useDispatch();
    const {brands, modelsWithoutBrand} = useSelector(store => store.carsDetailsReducer)

    useEffect(() => {
        dispatch(getBrands())
        dispatch(getModelsWithoutBrand())
    }, [dispatch]);

    const handleAddAssociation = () => {
        dispatch(createAssociationModelBrand(parseInt(selectedModel), parseInt(selectedBrand)));
    };


    return (
        <div>
            <FormControl variant="outlined" style={{ minWidth: 120, margin: 10 }}>
                <InputLabel>Brand</InputLabel>
                <Select
                    value={selectedBrand}
                    onChange={(e) => setSelectedBrand(e.target.value)}
                    label="Brand"
                >
                    {brands.map((brand: Brand) => (
                        <MenuItem key={brand.brandId} value={brand.brandId}>
                            {brand.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl variant="outlined" style={{ minWidth: 120, margin: 10 }}>
                <InputLabel>Model</InputLabel>
                <Select
                    value={selectedModel}
                    onChange={(e) => setSelectedModel(e.target.value)}
                    label="Model"
                >
                    {modelsWithoutBrand.map((model: ModelWoBrand) => (
                        <MenuItem key={model.modelId} value={model.modelId}>
                            {model.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <Button
                variant="contained"
                color="primary"
                onClick={handleAddAssociation}
                style={{ marginTop: 20 }}
            >
                Добавить связь
            </Button>
        </div>
    );
}
