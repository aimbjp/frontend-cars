
import {animations, motion} from 'framer-motion';
import {
    Autocomplete, Box, Button,
    Card,
    CardContent,
    CardMedia, Checkbox,
    Container,
    Fab, FormControlLabel,
    Grid,
    IconButton,
    TextField,
    Typography
} from "@mui/material";
import {useDispatch, useSelector} from "../../services/hooks";
import React, {useEffect, useState} from "react";
import {addCar, deleteCar, fetchRoadmaps} from "../../services/thunks/roadmaps";
import DeleteIcon from "@mui/icons-material/Delete";
import {BodyType, Brand, Color, Drive, Engine, Model, Transmission} from "../../type/car/cars-details";
import AddIcon from '@mui/icons-material/Add';
import {Roadmap as TRoadmap} from '../../type/roadmap';
import {getBrands, getModelsByBrandId} from "../../services/thunks/cars-details";
import {
    getBodyTypesByModel,
    getColorsByModel,
    getDrivesByModel,
    getEnginesByModel,
    getTransmissionsByModel,
    setActiveBodyType,
    setActiveBrand, setActiveColor, setActiveDescription,
    setActiveDrive,
    setActiveEngine,
    setActiveModel,
    setActiveTransmission, setActiveYear
} from "../../services/thunks/listing-add";
import {AddListingPhoto} from "../../components/listings/add-listing/add-listing-photo";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const containerVariants = {
    hidden: {opacity: 0, y: 20},
    visible: {opacity: 1, y: 0},
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
}

const Roadmap: React.FC = () => {
    const dispatch = useDispatch();
    const {roadmaps} = useSelector((state) => state.roadmapReducer);
    const [showAddForm, setShowAddForm] = useState(false);

    useEffect(() => {
        dispatch(fetchRoadmaps());
    }, [dispatch]);

    const handleAddCar = (car: Partial<TRoadmap>) => {
        dispatch(addCar(car));
        setShowAddForm(false);
    };

    const handleDeleteCar = (roadmapId: number) => {
        dispatch(deleteCar(roadmapId));
    };





    //////////////////////////////////
    //////////////////////////////////
    //////////////////////////////////
    //////////////////////////////////
    //////////////////////////////////

    const [skipDescription, setSkipDescription] = useState(false);
    const [activeName, setActiveName] = useState<string>('');

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

    //////////////////////////////////
    //////////////////////////////////
    //////////////////////////////////
    //////////////////////////////////






    return (
        <Container>
            <Grid container spacing={3} sx={{mt:3}}>
                {/*{roadmaps && roadmaps.map((roadmap: any) => (*/}
                {/*    <Grid item xs={12} sm={6} md={4} key={roadmap.roadmap_id}>*/}
                {/*        <motion.div whileHover={{ scale: 1.05 }}>*/}
                {/*            <RoadmapItem roadmap={roadmap} onDelete={handleDeleteCar} />*/}
                {/*        </motion.div>*/}
                {/*    </Grid>*/}
                {/*))}*/}
                {roadmaps && roadmaps.map((roadmap: any, index: number) => (
                    <Grid item xs={12} key={roadmap.roadmap_id} >
                        <motion.div whileHover={{ scale: 1.05 }}>
                            <RoadmapItem roadmap={roadmap} onDelete={handleDeleteCar} />
                        </motion.div>
                        {index < roadmaps.length - 1 && (
                            <Box display="flex" justifyContent="center" alignItems="center" mt={2} mb={2}>
                                <ArrowDownwardIcon />
                            </Box>
                        )}
                    </Grid>
                ))}
                <Grid item xs={12} sm={6} md={4}>
                    {showAddForm ? (
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
                                <motion.div  initial="initial" animate="animate" exit="exit">
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



                            {activeBrand && activeModel && activeBodyType && activeEngine && activeDrive && activeTransmission && <motion.div
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
                                    {/*<FormControlLabel*/}
                                    {/*    control={*/}
                                    {/*        <Checkbox*/}
                                    {/*            checked={skipDescription}*/}
                                    {/*            onChange={(event) => {*/}
                                    {/*                setSkipDescription(event.target.checked)*/}
                                    {/*            }}*/}
                                    {/*            color="primary"*/}
                                    {/*        />*/}
                                    {/*    }*/}
                                    {/*    label="Пропустить описание"*/}
                                    {/*/>*/}
                                </Box>
                            </motion.div>
                            }

                            {activeBrand && activeModel && activeBodyType && activeEngine && activeDrive && activeTransmission && <motion.div
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
                                    <Typography variant="h6">Название</Typography>
                                    <TextField
                                        label="Название"
                                        fullWidth
                                        value={activeName}
                                        onChange={(event) => setActiveName(event.target.value)}
                                        margin="normal"
                                        variant="outlined"
                                        multiline
                                        rows={4}
                                    />
                                    {/*<FormControlLabel*/}
                                    {/*    control={*/}
                                    {/*        <Checkbox*/}
                                    {/*            checked={skipDescription}*/}
                                    {/*            onChange={(event) => {*/}
                                    {/*                setSkipDescription(event.target.checked)*/}
                                    {/*            }}*/}
                                    {/*            color="primary"*/}
                                    {/*        />*/}
                                    {/*    }*/}
                                    {/*    label="Пропустить описание"*/}
                                    {/*/>*/}
                                </Box>
                            </motion.div>
                            }

                            {activeBrand && activeModel && activeBodyType && activeEngine && activeDrive && activeTransmission && activeColor && (
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
                                        <Typography variant="h6">Год планируемой покупки</Typography>
                                        <TextField
                                            fullWidth
                                            label="Год планируемой покупки автомобиля"
                                            value={activeYear}
                                            onChange={(event) => dispatch(setActiveYear(!event.target.value ? null : Number(event.target.value)))}
                                            margin="normal"
                                            variant="outlined"
                                            type="number"
                                        />
                                    </Box>
                                </motion.div>
                            )}

                            {activeBrand && activeModel && activeBodyType && activeEngine && activeDrive && activeTransmission && activeColor && activeYear &&
                                <AddListingPhoto/>}


                        </Box>
                            <Button onClick={() => handleAddCar(
                                {
                                    // "model_id": 58,
                                    // "engine_id": 2,
                                    // "transmission_id": 2,
                                    // "drive_id": 5,
                                    // "year": 2021,
                                    // "body_type_id": 4,
                                    // "color_id": 4,
                                    // "name": "Second",
                                    // "description": "http://pumase.ru/media-chats/1715368087150-380722709.jpg",
                                    // "media_url": "[\"http://pumase.ru/media-chats/1715674449995-591036013.webp\"]",
                                    // "next_car_id": null,
                                    // "prev_car_id": null
                                    //
                                    //

                                    model_id: activeModel?.modelId || 1,
                                    engine_id: activeEngine?.engineId || 1,
                                    transmission_id: activeTransmission?.transmissionId || 1,
                                    drive_id: activeDrive?.driveId || 1,
                                    body_type_id: activeBodyType?.bodyTypeId || 1,
                                    color_id: activeColor?.colorId || 1,
                                    year: activeYear || 2020,
                                    name: activeName || '',
                                    description: activeDescription || 'Дата создания ' + Date.now(),
                                    media_url: activeImages ? [...activeImages] : [],
                                }
                            )}
                                    disabled={!(activeBrand && activeModel && activeBodyType && activeEngine && activeDrive && activeTransmission && activeColor && activeYear)}
                            >Добавить</Button>
                        </>
                    ) : (
                        <Fab color="primary" aria-label="add" onClick={() => setShowAddForm(true)}>
                            <AddIcon/>
                        </Fab>
                    )}
                </Grid>
            </Grid>
        </Container>
    );
};

export default Roadmap;

interface RoadmapItemProps {
    roadmap: TRoadmap;
    onDelete: (id: number) => void;
}

const RoadmapItem: React.FC<RoadmapItemProps> = ({ roadmap, onDelete }) => {
    return (
        <Card>
            <CardMedia
                component="img"
                alt={roadmap.name}
                height="140"
                image={roadmap.media_url ? roadmap.media_url[0] : 'default_image_url'}
                title={roadmap.name}
            />
            <CardContent>
                <Typography variant="h5" component="div">
                    {roadmap.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    {roadmap.description}
                </Typography>
                <IconButton aria-label="delete" onClick={() => onDelete(roadmap.roadmap_id)}>
                    <DeleteIcon />
                </IconButton>
            </CardContent>
        </Card>
    );
};


