// import {FC, useEffect} from "react";
// import {TextDetailAdd, AssociationComponent, ModelEngineAssociation} from "../../../components/car/car-details";
// import {useDispatch, useSelector} from "../../../services/hooks";
// import {
//     addBodyType,
//     addBrand, addColor,
//     addDrive,
//     addEngine,
//     addModel, addTransmission,
// } from "../../../services/thunks/cars-details";
//
//
// export const CarsDetailsPage: FC = () => {
//     const dispatch = useDispatch();
//
//     const {
//         brandAddSucceed, modelAddSucceed, driveAddSucceed, engineAddSucceed,
//         bodyTypeAddSucceed, transmissionAddSucceed, colorAddSucceed,
//     } = useSelector(store => store.carsDetailsReducer);
//
//     function handleBrand (name: string) {
//         dispatch(addBrand(name));
//     }
//
//     function handleModel (name: string) {
//         dispatch(addModel(name));
//     }
//
//     function handleDrive(name: string) {
//         dispatch(addDrive(name));
//     }
//
//     function handleEngine(name: string) {
//         dispatch(addEngine(name));
//     }
//
//     function handleBodyType(name: string) {
//         dispatch(addBodyType(name));
//     }
//
//     function handleTransmission(name: string) {
//         dispatch(addTransmission(name));
//     }
//
//     function handleColor(name: string) {
//         dispatch(addColor(name));
//     }
//
//     return(
//         <main>
//             <TextDetailAdd buttonText={'Добавить бренд'} label={'Название бренда'} handleAdd={handleBrand} added_success={brandAddSucceed}/>
//             <TextDetailAdd buttonText={'Добавить модель'} label={'Название модели'} handleAdd={handleModel} added_success={modelAddSucceed}/>
//
//             <AssociationComponent />
//
//             <TextDetailAdd buttonText={'Добавить привод'} label={'Название привода'} handleAdd={handleDrive} added_success={driveAddSucceed} />
//             <TextDetailAdd buttonText={'Добавить двигатель'} label={'Название двигателя'} handleAdd={handleEngine} added_success={engineAddSucceed}/>
//             <TextDetailAdd buttonText={'Добавить тип кузова'} label={'Тип кузова'} handleAdd={handleBodyType} added_success={bodyTypeAddSucceed}/>
//             <TextDetailAdd buttonText={'Добавить трансмиссию'} label={'Трансмиссия'} handleAdd={handleTransmission} added_success={transmissionAddSucceed}/>
//             <TextDetailAdd buttonText={'Добавить цвет'} label={'Цвет'} handleAdd={handleColor} added_success={colorAddSucceed}/>
//
//             <ModelEngineAssociation />
//         </main>
//     )
// }

import React, { useState } from 'react';
import { Box, Tab, Tabs, Paper, useMediaQuery, useTheme } from '@mui/material';
import { useDispatch, useSelector } from '../../../services/hooks';
import {
    addBodyType,
    addBrand,
    addColor,
    addDrive,
    addEngine,
    addModel,
    addTransmission,
} from '../../../services/thunks/cars-details';
import { TextDetailAdd, AssociationComponent, ModelEngineAssociation } from '../../../components/car/car-details';

const CarsDetailsPage: React.FC = () => {
    const dispatch = useDispatch();
    const {
        brandAddSucceed, modelAddSucceed, driveAddSucceed, engineAddSucceed,
        bodyTypeAddSucceed, transmissionAddSucceed, colorAddSucceed,
    } = useSelector((state) => state.carsDetailsReducer);
    const [tabValue, setTabValue] = useState<number>(0);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const handleChangeTab = (event: React.SyntheticEvent, newValue: number): void => {
        setTabValue(newValue);
    };

    function handleBrand (name: string) {
        dispatch(addBrand(name));
    }

    function handleModel (name: string) {
        dispatch(addModel(name));
    }

    function handleDrive(name: string) {
        dispatch(addDrive(name));
    }

    function handleEngine(name: string) {
        dispatch(addEngine(name));
    }

    function handleBodyType(name: string) {
        dispatch(addBodyType(name));
    }

    function handleTransmission(name: string) {
        dispatch(addTransmission(name));
    }

    function handleColor(name: string) {
        dispatch(addColor(name));
    }

    return (
        <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: '100%', flexDirection: 'column' }}>
            <Paper square>
                <Tabs
                    value={tabValue}
                    onChange={handleChangeTab}
                    indicatorColor="primary"
                    textColor="primary"
                    variant={isMobile ? 'scrollable' : 'standard'}
                    scrollButtons="auto"
                    aria-label="disabled tabs example"
                >
                    <Tab label="Add Attributes" />
                    <Tab label="Add Brand & Model" />
                    <Tab label="Manage Associations" />
                </Tabs>
            </Paper>
            <Box sx={{ p: 3 }}>
                {tabValue === 0 && (
                    <>
                        <TextDetailAdd buttonText="Add Drive" label="Drive Name" handleAdd={handleDrive} added_success={driveAddSucceed} />
                        <TextDetailAdd buttonText="Add Engine" label="Engine Type" handleAdd={handleEngine} added_success={engineAddSucceed} />
                        <TextDetailAdd buttonText="Add Body Type" label="Body Type" handleAdd={handleBodyType} added_success={bodyTypeAddSucceed} />
                        <TextDetailAdd buttonText="Add Transmission" label="Transmission Type" handleAdd={handleTransmission} added_success={transmissionAddSucceed} />
                        <TextDetailAdd buttonText="Add Color" label="Color" handleAdd={handleColor} added_success={colorAddSucceed} />
                    </>
                )}
                {tabValue === 1 && (
                    <>
                        <TextDetailAdd buttonText="Add Brand" label="Brand Name" handleAdd={handleBrand} added_success={brandAddSucceed} />
                        <TextDetailAdd buttonText="Add Model" label="Model Name" handleAdd={handleModel} added_success={modelAddSucceed} />
                    </>
                )}
                {tabValue === 2 && (
                    <>
                        <AssociationComponent />
                        <ModelEngineAssociation />
                    </>
                )}
            </Box>
        </Box>
    );
}

export default CarsDetailsPage;
