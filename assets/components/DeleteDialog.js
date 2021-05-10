import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import {TodoContext} from "../contexts/TodoContext.js";
import Dialog from '@material-ui/core/Dialog';
import { DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core';

function DeleteDialog (props) {

    // constante de context sous forme de Hooks utilisant le "useContext" afin de pouvoir utiliser le contextProvider
    const context = useContext(TodoContext);

    // constante qui prend la fonction d'annulation de la fenêtre de dialogue lors de la suppression d'un pense-bête
    const hideDialog = () => {props.setDeleteConfirmationIsShown(false)};

    return (
        // spécial type de dialog de Material Ui qui permet de créer une "fenêtre pop-up" qui demande une confirmation / annulation
        <Dialog open={props.open} close={hideDialog}>
            <DialogTitle>Êtes-vous sûr de vouloir supprimer ce Pense-bête ?</DialogTitle>
            <DialogContent>
                {props.todo.task}
            </DialogContent>
            <DialogActions>
                {/* Action déclancchée pour l'annulation de la suppression d'un pense-bête */} 
                <Button onClick={hideDialog}>Annuler</Button>
                {/* Action déclanchée pour la confirmation de la suppression d'un pense-bête */} 
                <Button onClick={() => {
                    context.deleteTodo({id: props.todo.id, task: props.todo.task});
                    hideDialog();
                }}>Supprimer</Button>
            </DialogActions>
        </Dialog>
    )
}

// Création des PropTypes de la function DeleteDialog qui permettront de forcer le type de donnée de l'on veut dans les
// variables/paramètres qui sont crées dans la fonction DeleteDialog. Mais aussi ce sont les varaibles qui seront transmisent 
// à la fonction via le TodoTable
DeleteDialog.propTypes ={
    // On force la paramètre "todo" à renvoyer un objet qui récupère une id et un nom/description du pense-bête sélectionné ({id: PropTypes.number, text:propTypes.string})
    todo: PropTypes.shape({
        id: PropTypes.number.isRequired, 
        task: PropTypes.string.isRequired,
    }),
    // On force la paramètre "Open" à être un booleen
    open: PropTypes.bool.isRequired,
    // On demande au DeleteDialog de paser une fonction (qui est la fonction du même nom "setDeleteConfirmationIsShown")
    setDeleteConfirmationIsShown: PropTypes.func.isRequired,
};

export default DeleteDialog;
