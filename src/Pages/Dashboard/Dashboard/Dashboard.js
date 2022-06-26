import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Outlet, Link } from 'react-router-dom';
import { Button } from '@mui/material';
import useAuth from '../../../hooks/useAuth'
import './Dashboard.css'

const drawerWidth = 240;

const Dashboard = (props) => {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const {admin} = useAuth()
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div className='dashboard'>
            <Toolbar />
            <Divider />
            <List>
                <Button className='dashboard-buttons' component={Link} to='/home' sx={{ width: '100%', my: 2, py:1 }}>Home</Button>
                <Button className='dashboard-buttons' component={Link} to='/games' sx={{ width: '100%', my: 2, py:1 }}>Games</Button>
                <Button className='dashboard-buttons' component={Link} to='/dashboard/myorders' sx={{ width: '100%', my: 2, py:1 }}>My Orders</Button>
                <Button className='dashboard-buttons' component={Link} to='/dashboard/payment' sx={{ width: '100%', my: 2, py:1 }}>Payment</Button>
                {admin && <Box>
                    <Button className='dashboard-buttons' component={Link} to="/dashboard/addgames" sx={{ width: '100%', my: 2, py:1 }}>Add Games</Button>
                    <Button className='dashboard-buttons' component={Link} to="/dashboard/makeadmin" sx={{ width: '100%', my: 2, py:1 }}>Make Admin</Button>
                    <Button className='dashboard-buttons' component={Link} to="/dashboard/editgames" sx={{ width: '100%', my: 2, py:1 }}>Edit Games</Button>
                    <Button className='dashboard-buttons' component={Link} to="/dashboard/manageorders" sx={{ width: '100%', my: 2, py:1 }}>Manage Orders</Button>
                </Box>}
            </List>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}
            >
                <Toolbar style={{backgroundColor:'#222222'}}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ m: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Dashboard
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Toolbar />
                
                <Outlet />

            </Box>
        </Box>
    );
};

export default Dashboard;