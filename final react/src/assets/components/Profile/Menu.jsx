import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  MenuItem,
  Menu,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home'; 
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteUsers } from '../../features/reducer/usersSlice';

const UserProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    handleMenuClose();
    navigate(0); 
    navigate('/',state={to:"logOut"});
  };

  const handleEditProfile = () => {
    handleMenuClose();
    navigate('/editProfile');
  };

  const handleDeleteAccount = () => {
    dispatch(deleteUsers(user.userId));
    handleMenuClose();
    navigate('/');
  };

  const toggleDrawer = (open) => () => {
    setIsDrawerOpen(open);
  };

  const navigateHome = () => {
    navigate('/'); 
  };

  const menuItems = [
    { text: ' my cars', path: '/carlist' },
    { text: 'my rentals ', path: '/rentalsList', state: { from: 'meRenter' } },
    { text: 'my cars rental ', path: '/rentalsList', state: { from: 'mycarsRental' } },
    { text: ' chats with renters ', path: '/chatList', state: { from: 'ChatsWithRenters' } },
    { text: 'chats with landlords  ', path: '/chatList', state: { from: 'ChatsWithLandlords' } },
  ];

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const menuId = 'primary-search-account-menu';
  

  return (
    <div>
     
      <AppBar
        position="fixed"
        sx={{
         bgcolor:   'primary.main',
          color:'white',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          borderBottom: '2px solid',
          borderBottomColor: 'secondary.light',
        }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
       
          <IconButton
  edge="start"
  color="inherit"
  aria-label="open drawer"
  onClick={toggleDrawer(true)}
  sx={{
    transition: 'transform 0.2s ease',
              '&:hover': {
                transform: 'scale(1.2)',
              },
    '&:focus': {
      outline: 'none', 
    },
  }}
>
  <MenuIcon />
</IconButton>

         
          <Typography
  variant="h6"
  component="div"
  sx={{
    fontWeight: 900,
    textAlign: 'center',
    flexGrow: 1,
    color: 'withe', 
    backgroundImage: 'primary.main', 
    backgroundClip: 'text', 
    WebkitBackgroundClip: 'text', 
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)', 
    fontSize: '2rem', 
    
  }}
>
  All Cars In One Place
</Typography>




         
          <IconButton
            size="large"
            edge="end"
            aria-label="home"
            onClick={navigateHome}
            color="inherit"
            sx={{
              transition: 'transform 0.2s ease',
              '&:hover': {
                transform: 'scale(1.2)',
              },
    '&:focus': {
      outline: 'none', 
    },
            }}
          >
            <HomeIcon />
          </IconButton>

         
          <IconButton
  size="large"
  edge="end"
  aria-label="account of current user"
  aria-controls={menuId} 
  aria-haspopup="true" 
  onClick={handleProfileMenuOpen} 
  color="inherit"
  sx={{
    transition: 'transform 0.2s ease',
    '&:hover': {
      transform: 'scale(1.2)',
    },
'&:focus': {
outline: 'none', 
},
  }}
>
  <AccountCircle />
</IconButton>

<Menu
  anchorEl={anchorEl} 
  anchorOrigin={{
    vertical: 'top',
    horizontal: 'right',
  }}
  id={menuId} 
  keepMounted
  transformOrigin={{
    vertical: 'top',
    horizontal: 'right',
  }}
  open={isMenuOpen} 
  onClose={handleMenuClose} 
>
  <Box sx={{ padding: '16px', textAlign: 'center' }}>
    <Typography variant="subtitle1">{`hi, ${user?.name || 'user'}!`}</Typography>
  </Box>
  <MenuItem onClick={handleEditProfile}>edit profile</MenuItem>
  <MenuItem onClick={handleLogout}>log out</MenuItem>
  <MenuItem onClick={handleDeleteAccount}>delete account</MenuItem>
</Menu>
        </Toolbar>
      </AppBar>

   
      <Drawer
        anchor="left"
        open={isDrawerOpen}
        onClose={toggleDrawer(false)}
        sx={{
          '& .MuiDrawer-paper': {
            width: 250,
            bgcolor: 'background.paper',
            color: 'text.primary',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          },
        }}
        onClick={() => {
          toggleDrawer(false)(); 
        }}
      >
        <Box
          sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
        
          <List>
            {menuItems.map((item, index) => (
              <ListItem
                button
                key={index}
                sx={{
                  '&:hover': {
                    bgcolor: 'primary.light',
                    color: 'white',
                    transition: 'all 0.2s ease',
                  },
                }}
              >
                <Link
                  to={item.path}
                  state={item.state}
                  style={{
                    textDecoration: 'none',
                    color: 'inherit',
                    width: '100%',
                  }}
                >
                  <ListItemText primary={item.text} />
                </Link>
              </ListItem>
            ))}
          </List>

        
          <Box sx={{ textAlign: 'center', padding: '16px' }}>
            <Typography variant="caption" color="text.secondary">
              © 2024 All Rights Reserved.
            </Typography>
          </Box>
        </Box>
      </Drawer>
    </div>
  );
};

export default UserProfile;