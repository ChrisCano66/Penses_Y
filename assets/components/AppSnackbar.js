// Message Popup pour confirmation ou erreur lors des manipulations des penses-bêtes.

//REACT
import React, {useContext, useState} from 'react';
//CONTEXT
import {TodoContext} from '../contexts/TodoContext';
//MUI COMPONENTS
import {Snackbar, useTheme} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';


// fonction de gestion des messages d'erreurs/succes
function AppSnackbar (props) {

    // constante de context sous forme de Hooks utilisant le "useContext" afin de pouvoir utiliser le contextProvider
    const context = useContext(TodoContext);
    // constante récupérant le text et le level des messages du TodoController
    const {text, level} = context.message;

    return (
        // on regarde s'il y a un message de défini dans le context 
        <Snackbar   
            // couleur de theme
            color="primary" 
            // autoHideDuration => permet defaire disparaitre le component au bout de 6s
            autoHideDuration={1000} 
            /** s'ouvre seulement s'il y a un message.text, sinon n'apparait pas */
            open={context.message.text !== undefined}
        >
            {/** la popup d'alert succes ou erreur */}
            <MuiAlert 
                variant="filled" 
                /** quand on ferme la popup */
                onClose={() => context.setMessage({})}
                /** changement de style selon si succes ou erreur */
                severity={level === 'success' ? 'success' : 'warning'}
            >
                {text}
            </MuiAlert>
        </Snackbar>
    )
}

export default AppSnackbar;