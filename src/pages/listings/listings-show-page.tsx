import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getListingById } from "../../services/api/listings";
import { Listing } from "../../type/listings/listings";
import {
    Grid,
    Card,
    CardContent,
    Typography,
    CircularProgress,
    Box,
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    Button,
    useTheme,
    useMediaQuery,
    Menu,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    SelectChangeEvent,
} from "@mui/material";
import Carousel from "react-material-ui-carousel";
import CloseIcon from '@mui/icons-material/Close';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Chat from "../../components/chat/chat";
import MobileFooter from "../../components/footer/footer-listing-show/mobile-footer-listing-show";
import {OnlyAuth} from "../../components/protected-route/protected-route";
import {useDispatch, useSelector} from "../../services/hooks";
import {getListingsStatuses, setListingStatus} from "../../services/thunks/listings";

export const ListingShowPage: FC = () => {
    const { listingId } = useParams();
    const [activeListing, setActiveListing] = useState<Listing | null>(null);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [chatOpen, setChatOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState<number>(0);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const dispatch = useDispatch();
    const { user } = useSelector(store => store.userReducer);
    const { listingsStatuses } = useSelector(store => store.listingsReducer);

    const [listingStatus, setLocalListingStatus] = useState<string | undefined>(undefined);

    useEffect(() => {
        if (listingId) {
            getListingById(listingId)
                .then(data => {
                    if (data.success) {
                        setActiveListing(data.listing);
                        setLocalListingStatus(data.listing.listStatus?.listStatusId.toString());
                    } else {
                        console.error("Failed to fetch listing:", data.message);
                    }
                })
                .catch(err => console.error("Error fetching listing:", err))
                .finally(() => setLoading(false));
        }
    }, [listingId]);

    useEffect(() => {
        dispatch(getListingsStatuses());
    }, [dispatch]);

    const handleClickOpen = (index: number) => {
        setSelectedImage(index);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChatOpen = () => {
        setChatOpen(true);
    };

    const handleChatClose = () => {
        setChatOpen(false);
    };

    const handleCarPageOpen = () => {
        setChatOpen(false);
    };

    const handleStatusButtonClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleStatusMenuClose = () => {
        setAnchorEl(null);
    };

    const handleStatusChange = (event: SelectChangeEvent<string>) => {
        if (activeListing) {
            const statusId = event.target.value;
            dispatch(setListingStatus(activeListing.listingId.toString(), statusId))
            setLocalListingStatus(statusId);
        }
        handleStatusMenuClose();
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <CircularProgress />
            </Box>
        );
    }

    if (!activeListing) {
        return <Typography variant="h6">Объявление не найдено</Typography>;
    }

    const CustomNavButtons = ({ onClick, direction }: { onClick: () => void; direction: 'left' | 'right' }) => (
        <button
            onClick={onClick}
            style={{
                backgroundColor: 'rgba(0,0,0,0.5)',
                borderRadius: '50%',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                padding: '5px',
                position: 'absolute',
                top: '50%',
                [direction === 'left' ? 'left' : 'right']: '10px',
                transform: 'translateY(-50%)',
                zIndex: 1,
            }}
        >
            {direction === 'left' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </button>
    );

    return (
        <Box sx={{ p: 4, maxWidth: '80vw', margin: 'auto' }}>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <Grid container justifyContent="space-between" alignItems="center">
                        <Grid item>
                            <Typography variant={isMobile ? "h5" : "h4"} component="div">
                                {activeListing.car.model.brand.name} {activeListing.car.model.name} - {activeListing.car.year}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant={isMobile ? "h6" : "h5"} color="primary">
                                Цена: {parseInt(activeListing.price).toLocaleString()} ₽
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                Дата публикации: {new Date(activeListing.datePosted).toLocaleDateString()}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                Просмотры: {activeListing.views}
                            </Typography>
                            {user?.userId && activeListing?.user?.userId && user?.userId === activeListing?.user?.userId && (
                                <>
                                    <Typography variant="body2" color="textSecondary">
                                        Статус: {listingsStatuses?.find(status => status.listStatusId.toString() === listingStatus)?.type || activeListing.listStatus?.type}
                                    </Typography>
                                    <Button
                                        variant="outlined"
                                        color="secondary"
                                        onClick={handleStatusButtonClick}
                                    >
                                        Изменить статус
                                    </Button>
                                    <Menu
                                        anchorEl={anchorEl}
                                        open={Boolean(anchorEl)}
                                        onClose={handleStatusMenuClose}
                                    >
                                        <FormControl fullWidth>
                                            <InputLabel id="status-label">Статус</InputLabel>
                                            <Select
                                                labelId="status-label"
                                                id="status-select"
                                                value={listingStatus ?? ""}
                                                onChange={handleStatusChange}
                                            >
                                                {listingsStatuses?.map(status => (
                                                    <MenuItem key={status.listStatusId} value={status.listStatusId.toString()}>
                                                        {status.type}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Menu>
                                </>
                            )}
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={12}>
                    <Card>
                        {activeListing.media_url.length > 1 ? (
                            <Carousel
                                autoPlay={false}
                                navButtonsAlwaysVisible
                                indicators={true}
                                animation="slide"
                                NavButton={({ onClick, className, style, next, prev }) => {
                                    if (next) return <CustomNavButtons onClick={onClick as () => void} direction="right" />;
                                    if (prev) return <CustomNavButtons onClick={onClick as () => void} direction="left" />;
                                    return null;
                                }}
                            >
                                {activeListing.media_url.map((url, index) => (
                                    <Box
                                        key={index}
                                        sx={{ display: 'flex', justifyContent: 'center', cursor: 'pointer' }}
                                        onClick={() => handleClickOpen(index)}
                                    >
                                        <img src={url} alt={`Car Image ${index + 1}`} style={!isMobile ? { maxHeight: '60vh', width: 'auto' } : { maxHeight: '45vh', width: '95vw' }} />
                                    </Box>
                                ))}
                            </Carousel>
                        ) : (
                            <Box
                                key={0}
                                sx={{ display: 'flex', justifyContent: 'center', cursor: 'pointer' }}
                                onClick={() => handleClickOpen(0)}
                            >
                                <img src={activeListing.media_url[0]} alt="Car Image" style={{ maxHeight: '60vh', width: 'auto' }} />
                            </Box>
                        )}
                    </Card>
                </Grid>

                {isMobile ? (
                    <>
                        <Grid item xs={12}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6">Описание</Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        {activeListing.description}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6">Характеристики</Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Налог: {activeListing.tax ? `${parseInt(activeListing.tax).toLocaleString()} ₽` : "N/A"}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Место осмотра: {activeListing.place}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Количество владельцев: {activeListing.ownersCount}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Возможен обмен: {activeListing.exchange ? "Да" : "Нет"}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Тип двигателя: {activeListing.car.engine.type}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Коробка передач: {activeListing.car.transmission.type}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Привод: {activeListing.car.drive.type}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Кузов: {activeListing.car.bodyType.type}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Цвет: {activeListing.car.color.type}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </>
                ) : (
                    <>
                        <Grid item xs={12} md={3}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6">Характеристики</Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Налог: {activeListing.tax ? `${parseInt(activeListing.tax).toLocaleString()} ₽` : "N/A"}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Место осмотра: {activeListing.place}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Количество владельцев: {activeListing.ownersCount}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Возможен обмен: {activeListing.exchange ? "Да" : "Нет"}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Тип двигателя: {activeListing.car.engine.type}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Коробка передач: {activeListing.car.transmission.type}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Привод: {activeListing.car.drive.type}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Кузов: {activeListing.car.bodyType.type}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Цвет: {activeListing.car.color.type}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={9}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6">Описание</Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        {activeListing.description}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </>
                )}

                {!isMobile && <Grid item xs={12}>
                    <Button variant="contained" color="primary" fullWidth onClick={handleChatOpen}>
                        Написать владельцу
                    </Button>
                </Grid>}
            </Grid>

            <Dialog open={open} onClose={handleClose} fullScreen={fullScreen} maxWidth="md" fullWidth={true}>
                <DialogTitle>
                    <IconButton
                        edge="end"
                        color="inherit"
                        onClick={handleClose}
                        aria-label="close"
                        sx={{ position: 'absolute', right: 8, top: 8 }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <Carousel
                        autoPlay={false}
                        navButtonsAlwaysVisible
                        indicators={true}
                        animation="slide"
                        index={selectedImage}
                        sx={{ width: '100%' }}
                    >
                        {activeListing.media_url.map((url, index) => (
                            <Box
                                key={index}
                                sx={{ display: 'flex', justifyContent: 'center' }}
                            >
                                <img src={url} alt={`Car Image ${index + 1}`} style={{ maxHeight: '80vh', width: 'auto', maxWidth: '100%' }} />
                            </Box>
                        ))}
                    </Carousel>
                </DialogContent>
            </Dialog>

            <Dialog open={chatOpen} onClose={handleChatClose} fullScreen={fullScreen} maxWidth="md" fullWidth={true}>
                <DialogTitle>
                    <IconButton
                        edge="end"
                        color="inherit"
                        onClick={handleChatClose}
                        aria-label="close"
                        sx={{ position: 'absolute', right: 8, top: 8 }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <OnlyAuth component={<Chat id={activeListing.user?.userId} />} />
                </DialogContent>
            </Dialog>

            {isMobile && (
                <MobileFooter
                    onChatOpen={handleChatOpen}
                    onCarPageOpen={handleCarPageOpen}
                    chatOpen={chatOpen}
                    openTab="listing"
                />
            )}
        </Box>
    );
};

export default ListingShowPage;
