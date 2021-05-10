// REACT
import React from 'react';
// COMPONENTS
import TodoTable from './TodoTable';
import AppSnackbar from './AppSnackbar';
import Navigation from './Navigation';
// CONTEXT
import TodoContextProvider from '../contexts/TodoContext';
// MUI COMPONENT
import {makeStyles} from "@material-ui/core";

// création de style MUI pour la partie Router
const useStyles = makeStyles(theme => ({
    divider : theme.mixins.toolbar,
}));

// Rendu du Router
const Router = () => {

    // on récupère les styules pour la partie navigation afin de les appliquer
    const classes = useStyles();

    // Rendu
    return (
        <div>
            <Navigation/>
            <div className={classes.divider}/>
            <TodoContextProvider>
                <TodoTable/>
                <AppSnackbar/>
            </TodoContextProvider>
        </div>
    )
}

export default Router;