import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "../../../services/hooks";
import { getListings } from "../../../services/thunks/listings";
import { Grid, Card, CardMedia, CardContent, Typography, Button } from "@mui/material";

export const Listings: FC = () => {
    const dispatch = useDispatch();
    const { listings, parameters
        // , isLoading, hasMore
    } = useSelector(store => store.listingsReducer);

    useEffect(() => {
        dispatch(getListings(parameters));
    }, [dispatch, parameters]);

    // Функция для подгрузки следующей страницы
    const loadMore = () => {
        // if (hasMore && !isLoading) {
        if(parameters?.page) dispatch(getListings({...parameters, page: parameters.page + 1}));
        // }
    };

    return (
        <Grid container spacing={2}>
            {listings?.data && listings.data.map((listing) => (
                <Grid item key={listing.listingId} xs={12} sm={6} md={4}>
                    <Card>
                        <CardMedia
                            component="img"
                            height="140"
                            image={listing.media_url[0]}
                            alt="Car Image"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {listing.car.model.name} - {listing.car.year}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                Price: {listing.price} ₽<br />
                                Location: {listing.place}<br />
                                Views: {listing.views}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
            {
                // hasMore &&
                (
                <Button onClick={loadMore}
                        disabled={ false
                            // isLoading
                    }>
                    Посмотреть еще
                </Button>
            )}
        </Grid>
    );
};
