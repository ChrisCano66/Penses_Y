// Message Popup pour confirmation ou erreur lors des manipulations des penses-bêtes.

import React, {useContext} from 'react'
import {TodoContext} from "../contexts/TodoContext.js";
import {Snackbar, Button} from '@material-ui/core';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { Fragment } from 'react';

function checkLevel (level) {
    switch (level) {
        case 'success':
            return 'green';
        case 'error':
            return 'red';
        default:
            return 'white';
    }
}

function AppSnackbar () {

    // constante de context sous forme de Hooks utilisant le "useContext" afin de pouvoir utiliser le contextProvider
    const context = useContext(TodoContext);

    return (
        // on regarde s'il y a un message de défini dans le context 
        // autoHideDuration => permet defaire disparaitre le component au bout de 6s
        <Snackbar autoHideDuration={6000} open={context.message.text !== undefined}>
            {/** on check si test du message dans le context existe ou non, si oui, on affiche le message */}
            {context.message.text && (
                /** on passe alors le message au component et une action sous forme de bouton */
                <SnackbarContent 
                    style={{backgroundColor: checkLevel(context.message.level)}}
                    /** permet de "personalisé" le text du bouton avec le text du message multi-lignes (TodoController) */
                    message={context.message.text} 
                    action={
                        /** bouton qui apparait comme une popup avec le message de réussite et qui peut être enlever en cliquant */
                        <Button 
                            onClick={() => {context.setMessage({})}} 
                            key='dismiss'
                            color='inherit'
                        >Enlever</Button>
                }/>
            )}
        </Snackbar>
    )
}

export default AppSnackbar;