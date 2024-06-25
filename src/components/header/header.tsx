import React, { useState, FC } from 'react';
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
    ListItemText
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

export const AppHeader: FC = () => {
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ width: 250 }}>
            <List>
                <ListItem button component={RouterLink} to="/login">
                    <ListItemText primary="Вход" />
                </ListItem>
                <ListItem button component={RouterLink} to="/profile">
                    <ListItemText primary="Профиль" />
                </ListItem>
                <ListItem button component={RouterLink} to="/chat">
                    <ListItemText primary="Чат" />
                </ListItem>
                <ListItem button component={RouterLink} to="/car/add-details">
                    <ListItemText primary="Добавить детали" />
                </ListItem>
                <ListItem button component={RouterLink} to="/listings/add">
                    <ListItemText primary="Добавить объявление" />
                </ListItem>
                <ListItem button component={RouterLink} to="/listings">
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
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            <Button color="inherit" component={RouterLink} to="/">Cars</Button>
                        </Typography>
                        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                            <Button color="inherit" component={RouterLink} to="/login">Вход</Button>
                            <Button color="inherit" component={RouterLink} to="/profile">Профиль</Button>
                            <Button color="inherit" component={RouterLink} to="/chat">Чат</Button>
                            <Button color="inherit" component={RouterLink} to="/car/add-details">Добавить детали</Button>
                            <Button color="inherit" component={RouterLink} to="/listings/add">Добавить объявление</Button>
                            <Button color="inherit" component={RouterLink} to="/listings">Список объявлений</Button>
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
