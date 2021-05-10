//REACT 
import React from 'react';
// MUI COMPONENTS
import {Box, Button, Typography} from "@material-ui/core";
// ROUTER
import {Link} from 'react-router-dom';


const NotFound = () => {
    return (
        <Box textAlign="center">
            <Typography variant="h2"> Page Not Found : error 404</Typography>
            <Link to="/" style={{textDecoration: 'none'}}>
                <Button color="primary" variant="contained" size="large">
                    Retourner à la page principale
                </Button>
            </Link>
        </Box>
    );
};

export default NotFound;