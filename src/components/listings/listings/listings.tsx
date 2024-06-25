import { FC, useEffect, useState, MouseEvent } from "react";
import { useDispatch, useSelector } from "../../../services/hooks";
import { getListings, updateSearchParameters } from "../../../services/thunks/listings";
import { Grid, Card, CardMedia, CardContent, Typography, CircularProgress, Box } from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";
import Carousel from "react-material-ui-carousel";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

export const Listings: FC = () => {
    const dispatch = useDispatch();
    const { listings, parameters, listingsRequest } = useSelector(store => store.listingsReducer);

    useEffect(() => {
        dispatch(getListings(parameters));
    }, [dispatch, parameters.page]);

    const loadMore = () => {
        if ((listings?.last_page !== listings?.page && !listingsRequest)) {
            if (parameters?.page) {
                dispatch(updateSearchParameters({ ...parameters, page: (+parameters.page + 1).toString() }));
            }
        }
    };

    const CustomNavButtons = ({ onClick, direction }: { onClick: (event: MouseEvent<HTMLButtonElement>) => void; direction: 'left' | 'right' }) => (
        <button
            onClick={(e: MouseEvent<HTMLButtonElement>) => {
                e.stopPropagation();
                onClick(e);
            }}
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
            {direction === 'left' ? '﹤' : '﹥'}
        </button>
    );

    return (
        <>
            {listingsRequest && parameters.page === "1" &&
                <div style={{display: 'flex', justifyContent: 'center', padding: '20px'}} data-cy="loader">
                    <CircularProgress/>
                </div>}
            {(!listingsRequest || parameters.page !== "1") && <InfiniteScroll
                dataLength={listings?.data?.length || 0}
                next={loadMore}
                hasMore={listings?.last_page !== listings?.page}
                loader={<div style={{display: 'flex', justifyContent: 'center', padding: '20px'}} data-cy="loader">
                    <CircularProgress/>
                </div>}
                endMessage={<p style={{textAlign: 'center'}} data-cy="end-message"><b>Больше нет объявлений</b></p>}
            >
                <Grid container spacing={2} style={{display: 'flex', justifyContent: 'center', padding: '20px'}}
                      data-cy="listings-grid">
                    {listings?.data && listings.data.map((listing) => (
                        <Grid item key={listing.listingId} xs={12} sm={6} md={10}
                              data-cy={`listing-item-${listing.listingId}`}>
                            <Link to={`/listing/${listing.listingId}`} style={{textDecoration: 'none'}}
                                  data-cy={`listing-link-${listing.listingId}`}>
                                <Card data-cy="listing-card">
                                    <Box position="relative">
                                        {listing.media_url.length > 1 &&
                                            <Carousel
                                                autoPlay={true}
                                                interval={10000}
                                                animation="slide"
                                                indicators={false}
                                                navButtonsAlwaysVisible={false}
                                            >
                                                {listing.media_url.map((url, index) => (
                                                    <div key={index} data-cy={`carousel-image-${index}`}>
                                                        <CardMedia
                                                            component="img"
                                                            image={url}
                                                            alt={`Car Image ${index + 1}`}
                                                            data-cy="listing-image"
                                                        />
                                                    </div>
                                                ))}
                                            </Carousel>
                                        }
                                        {listing.media_url.length < 2 &&
                                            <CardMedia
                                                component="img"
                                                image={listing.media_url[0]}
                                                alt="Car Image"
                                                data-cy="listing-image"
                                            />
                                        }
                                    </Box>

                                    <CardContent data-cy="listing-card-content">
                                        <Typography gutterBottom variant="h5" component="div" data-cy="listing-title">
                                            {listing.car.model.brand.name} {listing.car.model.name} - {listing.car.year}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" data-cy="listing-details">
                                            Цена: {parseInt(listing.price).toLocaleString()} ₽<br/>
                                            Место осмотра: {listing.place}<br/>
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Link>
                        </Grid>
                    ))}
                </Grid>
            </InfiniteScroll>}
        </>
    );
};
