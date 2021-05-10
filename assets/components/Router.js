// REACT
import React from 'react';
// COMPONENTS
import TodoTable from './TodoTable';
import AppSnackbar from './AppSnackbar';
import Navigation from './Navigation';
import NotFound from './NotFound';
// CONTEXT
import TodoContextProvider from '../contexts/TodoContext';
// ROUTER
import BrowserRouter from 'react-router-dom/BrowserRouter';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';
import Redirect from 'react-router-dom/Redirect';
// MUI COMPONENT
import {makeStyles} from "@material-ui/core";


// Le gros de l'application que l'on rajoutera dans le routeur ci-après
const TodoList = () => (
    <TodoContextProvider>
        <TodoTable/>
        <AppSnackbar/>
    </TodoContextProvider>
);

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
        // Mise en place du routeur
        <BrowserRouter>
            {/** affichage de la navigation quoi qu'il arrive au niveau routeur */}
            <Navigation/>
            {/** div de séparation pour éviter que la navigation ne soit au dessus du contenu de l'application */}
            <div className={classes.divider}/>
            {/** Le Routeur en soit qui affichera la bonne route selon l'url */}
            <Switch>
                <Redirect exact from="/" to="/todo-list"/>
                <Route exact path="/todo-list" component={TodoList}/>
                <Route exact path="/tag-list" component={null}/>
                <Route component={NotFound}/>
            </Switch>
        </BrowserRouter>
    )
}

export default Router;