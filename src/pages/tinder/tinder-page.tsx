import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardMedia, Typography, IconButton, Container, Grid } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ClearIcon from '@mui/icons-material/Clear';

const mockData = [
    {
        "listingId": 29,
        "price": "6543322",
        "tax": "654",
        "pts": null,
        "VIN": "3213213",
        "place": "Саратов",
        "media_url": [
            "http://pumase.ru/media-chats/1715674449995-591036013.webp",
            "http://pumase.ru/media-chats/1715704018633-720614842.jpeg"
        ],
        "ownersCount": 1,
        "customs": null,
        "exchange": false,
        "datePosted": "2024-05-14T16:27:01.338Z",
        "views": 0,
        "description": "",
        "car": {
            "carId": 10,
            "year": 2020,
            "model": {
                "modelId": 58,
                "name": "5 Series",
                "brand": {
                    "brandId": 124,
                    "name": "BMW"
                }
            },
            "color": {
                "colorId": 3,
                "type": "Черный"
            },
            "bodyType": {
                "bodyTypeId": 4,
                "type": "Седан"
            },
            "transmission": {
                "transmissionId": 2,
                "type": "Автоматическая"
            },
            "engine": {
                "engineId": 2,
                "type": "Бензиновый",
                "capacity": null
            },
            "drive": {
                "driveId": 3,
                "type": "Полный"
            }
        }
    },
    // Добавьте больше мока данных здесь
];

const TinderCard = () => {
    const [cars, setCars] = useState<any>([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        // Имитация загрузки данных с сервера
        setCars(mockData);
    }, []);

    const handleLike = () => {
        // Логика для лайка
        if (currentIndex < cars.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const handleDislike = () => {
        // Логика для дизлайка
        if (currentIndex < cars.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    if (!cars.length) {
        return <Typography>Загрузка...</Typography>;
    }

    const car: any = cars[currentIndex];

    return (
        <Container>
            <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardMedia
                            component="img"
                            alt={car.car.model.name}
                            height="140"
                            image={car.media_url[0]}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {car.car.model.brand.name} {car.car.model.name} ({car.car.year})
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {car.description || "Описание отсутствует"}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Цена: {car.price} руб.
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Цвет: {car.car.color.type}
                            </Typography>
                        </CardContent>
                        <Grid container justifyContent="space-around" alignItems="center" padding={2}>
                            <IconButton color="secondary" onClick={handleDislike}>
                                <ClearIcon />
                            </IconButton>
                            <IconButton color="primary" onClick={handleLike}>
                                <FavoriteIcon />
                            </IconButton>

                        </Grid>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
};

export default TinderCard;
