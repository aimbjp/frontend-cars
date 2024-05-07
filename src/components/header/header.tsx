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
                    <ListItemText primary="Login" />
                </ListItem>
                <ListItem button component={RouterLink} to="/profile">
                    <ListItemText primary="Profile" />
                </ListItem>
                <ListItem button component={RouterLink} to="/chat">
                    <ListItemText primary="Chat" />
                </ListItem>
                <ListItem button component={RouterLink} to="/car/add-details">
                    <ListItemText primary="Add Car Details" />
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
                            <Button color="inherit" component={RouterLink} to="/">CarsDiscovery</Button>
                        </Typography>
                        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                            <Button color="inherit" component={RouterLink} to="/login">Login</Button>
                            <Button color="inherit" component={RouterLink} to="/profile">Profile</Button>
                            <Button color="inherit" component={RouterLink} to="/chat">Chat</Button>
                            <Button color="inherit" component={RouterLink} to="/car/add-details">Add Car Details</Button>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
            >
                {drawer}
            </Drawer>
        </Box>
    );
};
