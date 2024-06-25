// import React, { useState, useEffect } from 'react';
// import { FormControl, InputLabel, Select, MenuItem, Button, Box } from '@mui/material';
// import {
//     addModelBodyTypeAssociation,
//     addModelColorAssociation,
//     addModelDriveAssociation,
//     addModelEngineAssociation, addModelTransmissionAssociation, getBodyTypes,
//     getBrands, getColors, getDrives,
//     getEngines,
//     getModelsByBrandId, getTransmissions
// } from "../../../../services/thunks/cars-details";
// import { useDispatch, useSelector } from "../../../../services/hooks";
// import {BodyType, Brand, Color, Drive, Engine, Model, Transmission} from "../../../../type/car/cars-details";
//
// const ModelEngineAssociation = () => {
//     const dispatch = useDispatch();
//     const { brands, modelsByBrand, engines, drives, bodyTypes, transmissions, colors } = useSelector(state => state.carsDetailsReducer);
//     const [selectedBrand, setSelectedBrand] = useState<string[]>([]);
//     const [selectedModels, setSelectedModels] = useState<string[]>([]);
//     const [selectedEngines, setSelectedEngines] = useState<string[]>([]);
//     const [selectedDrives, setSelectedDrives] = useState<string[]>([]);
//     const [selectedBodyTypes, setSelectedBodyTypes] = useState<string[]>([]);
//     const [selectedTransmissions, setSelectedTransmissions] = useState<string[]>([]);
//     const [selectedColors, setSelectedColors] = useState<string[]>([]);
//
//     useEffect(() => {
//         dispatch(getBrands());
//         dispatch(getEngines());
//         dispatch(getDrives());
//         dispatch(getBodyTypes());
//         dispatch(getTransmissions());
//         dispatch(getColors());
//     }, [dispatch]);
//
//     useEffect(() => {
//         if (selectedBrand.length) {
//             dispatch(getModelsByBrandId(selectedBrand));
//         } else {
//             setSelectedModels([]);
//         }
//     }, [selectedBrand, dispatch]);
//
//     const handleAddAssociationEngine = () => {
//         dispatch(addModelEngineAssociation(selectedModels, selectedEngines));
//     };
//
//
//     const handleAddAssociationDrive = () => {
//         dispatch(addModelDriveAssociation(selectedModels, selectedDrives));
//     };
//
//     const handleAddAssociationTransmission = () => {
//         dispatch(addModelTransmissionAssociation(selectedModels, selectedTransmissions));
//     };
//     const handleAddAssociationColor = () => {
//         dispatch(addModelColorAssociation(selectedModels, selectedColors));
//     };
//
//     const handleAddAssociationBodyType = () => {
//         dispatch(addModelBodyTypeAssociation(selectedModels, selectedBodyTypes));
//     };
//
//     return (
//         <Box sx={{ minWidth: 120 }}>
//             <FormControl fullWidth>
//                 <InputLabel>Brand</InputLabel>
//                 <Select
//                     multiple
//                     value={selectedBrand}
//                     label="Brand"
//                     onChange={e => setSelectedBrand(typeof e.target.value === 'string'
//                         ? e.target.value.split(',')
//                         : e.target.value)}
//                 >
//                     {brands.map((brand: Brand) => <MenuItem key={brand.brandId} value={brand.brandId}>{brand.name}</MenuItem>)}
//                 </Select>
//             </FormControl>
//
//             <FormControl fullWidth>
//                 <InputLabel>Model</InputLabel>
//                 <Select
//                     multiple
//                     value={selectedModels}
//                     label="Model"
//                     onChange={e => setSelectedModels(typeof e.target.value === 'string'
//                         ? e.target.value.split(',')
//                         : e.target.value)}
//                     disabled={!selectedBrand.length}
//                 >
//                     {modelsByBrand.map((model: Model) => <MenuItem key={model.modelId} value={model.modelId}>{model.name}</MenuItem>)}
//                 </Select>
//             </FormControl>
//
//             <FormControl fullWidth>
//                 <InputLabel>Engine</InputLabel>
//                 <Select
//                     multiple
//                     value={selectedEngines}
//                     label="Engine"
//                     onChange={e => setSelectedEngines(typeof e.target.value === 'string'
//                         ? e.target.value.split(',')
//                         : e.target.value)}
//                 >
//                     {engines.map((engine: Engine) => <MenuItem key={engine.engineId} value={engine.engineId}>{engine.type}</MenuItem>)}
//                 </Select>
//             </FormControl>
//
//             <Button variant="contained" onClick={handleAddAssociationEngine} disabled={selectedModels.length === 0 || selectedEngines.length === 0}>
//                 Добавить связь модели и двигателя
//             </Button>
//
//             <FormControl fullWidth>
//                 <InputLabel>Drive</InputLabel>
//                 <Select
//                     multiple
//                     value={selectedDrives}
//                     label="Drive"
//                     onChange={e => setSelectedDrives(typeof e.target.value === 'string'
//                         ? e.target.value.split(',')
//                         : e.target.value)}
//                 >
//                     {drives.map((drive: Drive) => <MenuItem key={drive.driveId} value={drive.driveId}>{drive.type}</MenuItem>)}
//                 </Select>
//             </FormControl>
//
//             <Button variant="contained" onClick={handleAddAssociationDrive} disabled={selectedModels.length === 0 || selectedDrives.length === 0}>
//                 Добавить связь модели и привода
//             </Button>
//
//             <FormControl fullWidth>
//                 <InputLabel>Body types</InputLabel>
//                 <Select
//                     multiple
//                     value={selectedBodyTypes}
//                     label="Body types"
//                     onChange={e => setSelectedBodyTypes(typeof e.target.value === 'string'
//                         ? e.target.value.split(',')
//                         : e.target.value)}
//                 >
//                     {bodyTypes.map((bodyType: BodyType) => <MenuItem key={bodyType.bodyTypeId} value={bodyType.bodyTypeId}>{bodyType.type}</MenuItem>)}
//                 </Select>
//             </FormControl>
//
//             <Button variant="contained" onClick={handleAddAssociationBodyType} disabled={selectedModels.length === 0 || selectedBodyTypes.length === 0}>
//                 Добавить связь модели и типа кузова
//             </Button>
//
//             <FormControl fullWidth>
//                 <InputLabel>Transmissions</InputLabel>
//                 <Select
//                     multiple
//                     value={selectedTransmissions}
//                     label="Transmissions"
//                     onChange={e => setSelectedTransmissions(typeof e.target.value === 'string'
//                         ? e.target.value.split(',')
//                         : e.target.value)}
//                 >
//                     {transmissions.map((transmission: Transmission) => <MenuItem key={transmission.transmissionId} value={transmission.transmissionId}>{transmission.type}</MenuItem>)}
//                 </Select>
//             </FormControl>
//
//             <Button variant="contained" onClick={handleAddAssociationTransmission} disabled={selectedModels.length === 0 || selectedTransmissions.length === 0}>
//                 Добавить связь модели и коробки передач
//             </Button>
//
//             <FormControl fullWidth>
//                 <InputLabel>Colors</InputLabel>
//                 <Select
//                     multiple
//                     value={selectedColors}
//                     label="Colors"
//                     onChange={e => setSelectedColors(typeof e.target.value === 'string'
//                         ? e.target.value.split(',')
//                         : e.target.value)}
//                 >
//                     {colors.map((color: Color) => <MenuItem key={color.colorId} value={color.colorId}>{color.type}</MenuItem>)}
//                 </Select>
//             </FormControl>
//
//             <Button variant="contained" onClick={handleAddAssociationColor} disabled={selectedModels.length === 0 || selectedColors.length === 0}>
//                 Добавить связь модели и цвета
//             </Button>
//         </Box>
//     );
// }
//
// export default ModelEngineAssociation;


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
                sx={{p:2}}
                options={brands}
                getOptionLabel={(option) => option.name}
                value={selectedBrand}
                onChange={(event, newValue) => setSelectedBrand(newValue)}
                renderInput={(params) => <TextField {...params} label="Бренд" placeholder="Выберите Бренд" />}
            />

            <Autocomplete
                multiple
                sx={{p:2}}
                options={modelsByBrand}
                getOptionLabel={(option) => option.name}
                value={selectedModels}
                onChange={(event, newValue) => setSelectedModels(newValue)}
                renderInput={(params) => <TextField {...params} label="Модель" placeholder="Выберите Модель" />}
                disabled={!selectedBrand.length}
            />

            <Autocomplete
                sx={{p:2}}
                multiple
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
                sx={{p:2}}
                multiple
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
                sx={{p:2}}
                multiple
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
                sx={{p:2}}
                multiple
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
                sx={{p:2}}
                multiple
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
