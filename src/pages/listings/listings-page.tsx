import { FC, useState } from "react";
import {Grid, useMediaQuery, Theme, useTheme} from "@mui/material";
import {ListingsSearch} from "../../components/listings/listings/listings-search";
import {Listings} from "../../components/listings/listings/listings";
import {SortingOptions} from "../../components/listings/listings/listings-sorting-options";
import {MobileFooter} from "../../components/footer/mobile-footer";
import {useDispatch, useSelector} from "../../services/hooks";
import {setActiveTab} from "../../services/thunks/listings";

export const ListingsPage: FC = () => {
    const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
    const {activeTab} = useSelector(store => store.listingsReducer)

    return (
        <>
            {isMobile ?
                <Grid container spacing={2}>
                    <Grid item xs={12} md={3}>
                        {(activeTab === 'search') && <ListingsSearch data-cy="listings-search"/>}
                    </Grid>
                    <Grid item xs={12} md={9} sx={{mb: 5}}>
                        {activeTab === 'listings' && <Listings data-cy="listings"/>}
                        {/*{activeTab === 'sort' && <SortingOptions data-cy="sorting-options"/>}*/}
                    </Grid>
                    {isMobile && (
                        <MobileFooter data-cy="mobile-footer"/>
                    )}
                </Grid>
                :
                <Grid container spacing={2}
                      sx={{
                          p: 5
                      }}
                >
                    <Grid item xs={12} md={3}>
                        <ListingsSearch data-cy="listings-search"/>
                    </Grid>
                    <Grid item xs={12} md={9} sx={{gap: 4}}>
                        {/*<SortingOptions data-cy="sorting-options"/>*/}
                        <Listings data-cy="listings"/>
                    </Grid>
                </Grid>
            }

        </>
    );
};
