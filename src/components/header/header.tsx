// import React, { useState, FC } from 'react';
// import { Link as RouterLink } from 'react-router-dom';
// import {
//     AppBar,
//     Toolbar,
//     Typography,
//     Button,
//     Box,
//     Container,
//     IconButton,
//     Drawer,
//     List,
//     ListItem,
//     ListItemText
// } from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';
//
// export const AppHeader: FC = () => {
//     const [mobileOpen, setMobileOpen] = useState(false);
//
//     const handleDrawerToggle = () => {
//         setMobileOpen(!mobileOpen);
//     };
//
//     const drawer = (
//         <Box onClick={handleDrawerToggle} sx={{ width: 250 }}>
//             <List>
//                 <ListItem button component={RouterLink} to="/login" data-testid="menu-login">
//                     <ListItemText primary="Вход" />
//                 </ListItem>
//                 <ListItem button component={RouterLink} to="/profile" data-testid="menu-profile">
//                     <ListItemText primary="Профиль" />
//                 </ListItem>
//                 <ListItem button component={RouterLink} to="/chat" data-testid="menu-chat">
//                     <ListItemText primary="Чат" />
//                 </ListItem>
//                 <ListItem button component={RouterLink} to="/car/add-details" data-testid="menu-add-details">
//                     <ListItemText primary="Добавить детали" />
//                 </ListItem>
//                 <ListItem button component={RouterLink} to="/listings/add" data-testid="menu-add-listing">
//                     <ListItemText primary="Добавить объявление" />
//                 </ListItem>
//                 <ListItem button component={RouterLink} to="/listings" data-testid="menu-listings">
//                     <ListItemText primary="Список объявлений" />
//                 </ListItem>
//             </List>
//         </Box>
//     );
//
//     return (
//         <Box sx={{ flexGrow: 1 }}>
//             <AppBar position="static">
//                 <Container maxWidth="lg">
//                     <Toolbar>
//                         <IconButton
//                             color="inherit"
//                             aria-label="open drawer"
//                             edge="start"
//                             onClick={handleDrawerToggle}
//                             sx={{ mr: 2, display: { sm: 'none' } }}
//                             data-testid="menu-button"
//                         >
//                             <MenuIcon />
//                         </IconButton>
//                         <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
//                             <Button color="inherit" component={RouterLink} to="/" data-testid="menu-cars">Cars</Button>
//                         </Typography>
//                         <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
//                             <Button color="inherit" component={RouterLink} to="/login" data-testid="menu-login">Вход</Button>
//                             <Button color="inherit" component={RouterLink} to="/profile" data-testid="menu-profile">Профиль</Button>
//                             <Button color="inherit" component={RouterLink} to="/chat" data-testid="menu-chat">Чат</Button>
//                             <Button color="inherit" component={RouterLink} to="/car/add-details" data-testid="menu-add-details">Добавить детали</Button>
//                             <Button color="inherit" component={RouterLink} to="/listings/add" data-testid="menu-add-listing">Добавить объявление</Button>
//                             <Button color="inherit" component={RouterLink} to="/listings" data-testid="menu-listings">Список объявлений</Button>
//                         </Box>
//                     </Toolbar>
//                 </Container>
//             </AppBar>
//             <Drawer
//                 variant="temporary"
//                 open={mobileOpen}
//                 onClose={handleDrawerToggle}
//                 ModalProps={{
//                     keepMounted: true,
//                 }}
//             >
//                 {drawer}
//             </Drawer>
//         </Box>
//     );
// };


import React, { useState, FC, MouseEvent } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box,
    Container,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemText,
    Menu,
    MenuItem,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';

export const AppHeader: FC = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [anchorElMenu, setAnchorElMenu] = useState<null | HTMLElement>(null);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleMenu = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleMenuOpen = (event: MouseEvent<HTMLElement>) => {
        setAnchorElMenu(event.currentTarget);
    };

    const handleMenuCloseDropDown = () => {
        setAnchorElMenu(null);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ width: 250 }}>
            <List>
                <ListItem button component={RouterLink} to="/login" data-testid="menu-login">
                    <ListItemText primary="Вход" />
                </ListItem>
                <ListItem button component={RouterLink} to="/profile" data-testid="menu-profile">
                    <ListItemText primary="Профиль" />
                </ListItem>
                <ListItem button component={RouterLink} to="/chat" data-testid="menu-chat">
                    <ListItemText primary="Чат" />
                </ListItem>
                <ListItem button component={RouterLink} to="/car/add-details" data-testid="menu-add-details">
                    <ListItemText primary="Добавить детали" />
                </ListItem>
                <ListItem button component={RouterLink} to="/listings/add" data-testid="menu-add-listing">
                    <ListItemText primary="Добавить объявление" />
                </ListItem>
                <ListItem button component={RouterLink} to="/listings" data-testid="menu-listings">
                    <ListItemText primary="Список объявлений" />
                </ListItem>
            </List>
        </Box>
    );

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Container maxWidth="lg">
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2, display: { sm: 'none' } }}
                            data-testid="menu-button"
                        >
                            <MenuIcon />
                        </IconButton>

                        <Button
                            color="inherit"
                            aria-controls="simple-menu"
                            aria-haspopup="true"
                            onClick={handleMenuOpen}
                            sx={{ display: { xs: 'none', sm: 'block' } }}
                        >
                            <MenuIcon />
                        </Button>
                        <Menu
                            id="simple-menu"
                            anchorEl={anchorElMenu}
                            keepMounted
                            open={Boolean(anchorElMenu)}
                            onClose={handleMenuCloseDropDown}
                        >
                            <MenuItem component={RouterLink} to="/chat" data-testid="menu-chat">Чат</MenuItem>
                            <MenuItem component={RouterLink} to="/listings/add" data-testid="menu-add-listing">Добавить объявление</MenuItem>
                            <MenuItem component={RouterLink} to="/car/add-details" data-testid="menu-add-details">Добавить детали</MenuItem>
                            <MenuItem component={RouterLink} to="/roadmap" data-testid="menu-add-roadmap">Roadmap</MenuItem>
                        </Menu>
                        <Button
                            color="inherit"
                            component={RouterLink}
                            to="/listings"
                            data-testid="menu-listings"
                            sx={{ display: { xs: 'none', sm: 'block' } }}
                        >
                            Список объявлений
                        </Button>
                        {/*<Typography variant="h6" component={RouterLink} to="/" sx={{ flexGrow: 1, textAlign: 'center', textStyle: 'none' }} data-testid="menu-cars">*/}
                        {/*    Cars*/}
                        {/*</Typography>*/}
                        <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
                            <IconButton
                                edge="end"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorEl)}
                                onClose={handleMenuClose}
                            >
                                <MenuItem component={RouterLink} to="/profile" data-testid="menu-profile">Профиль</MenuItem>
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true,
                }}
            >
                {drawer}
            </Drawer>
        </Box>
    );
};


