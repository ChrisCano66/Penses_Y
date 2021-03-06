import React, {Fragment, useContext, useState} from 'react';
import {TodoContext} from "../contexts/TodoContext.js";
import DeleteDialog from './DeleteDialog.js';
import {IconButton, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography, makeStyles} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';


// constante permettant d'utiliser les styles du theme
const useStyles = makeStyles(theme => ({
    thead: {
        // ici on change la couleur du header de la table en lui appliquant la couleur primary
        backgroundColor: theme.palette.primary.main,
    },
}));


function TodoTable () {

    // constante de context sous forme de Hooks utilisant le "useContext" afin de pouvoir utiliser le contextProvider
    const context = useContext(TodoContext);
    // constante d'état permettant l'ajout d'un pense-bête ("le nom") sous forme de Hooks utilisant le "state" et qui est initialiser par une String vide
    const [addTodoTask, setAddTodoTask] = useState('');
    // constante d'état permettant l'ajout d'un pense-bête ("description") sous forme de Hooks utilisant le "state" et qui est initialiser par une String vide
    const [addTodoDescription, setAddTodoDescription] = useState('');
    // constante d'état permettant de savoir l'état de l'action d'édition d'un pense-bête sous forme de Hooks utilisant le "state"
    const [editIsShown, setEditIsShown] = useState(false);
    // constante d'état permettant d'édition du nom d'un pense-bête sous forme de Hooks utilisant le "state" et qui est initialiser par une String vide
    const [editTodoTask, setEditTodoTask] = useState('');
    // constante d'état permettant d'édition de la description d'un pense-bête sous forme de Hooks utilisant le "state" et qui est initialiser par une String vide
    const [editTodoDescription, setEditTodoDescription] = useState('');
    // constante d'état permettant de savoir l'état de l'action de suppression d'un pense-bête sous forme de Hooks utilisant le "state"
    const [deleteConfirmationIsShown, setDeleteConfirmationIsShown] = useState(false);
    // constante d'état permettant de savoir quel pense-bête va être supprimer (contient l'id et le texte)
    const [todoToDelete, setTodoToDelete] = useState(null);

    // const qui permet de créer un Pense-bête en reliant l'information Front-end (TodoTable) au transfert de l'info back-end (TodoContext + axios)
    const onCreateSubmit = (event) => {
        event.preventDefault();
        context.createTodo(event, {task: addTodoTask, description: addTodoDescription});
        setAddTodoTask('');
        setAddTodoDescription('');
    }

    // const qui permet de mettre à jour un Pense-bête en reliant l'information Front-end (TodoTable) au transfert de l'info back-end (TodoContext + axios)
    const onEditSubmit = (todoId, event) => {
        event.preventDefault();
        context.updateTodo({id: todoId, task: editTodoTask, description: editTodoDescription});
        setEditIsShown(false);
    }

    // constante récupérant les style du theme
    const classes = useStyles();

    // HTML Retourné pour l'application
    return (

        // Formulaire qui reprend les différents pense-bête et qui peut "submit" pour l'ajout, l'édition et la suppression d'un pense-bête =>
        // onSubmit -> method createTodo de la class TodoContextProvider qui va récupérer la valeur rajouter pour un nouveau pense-bête
        <Fragment>
                <Table size="small">
                    {/* En-tête de l'application */}
                    <TableHead>
                        {/* Champ text pour l'ajout d'un nouveau pense-bête (nom + description) */}
                        <TableRow>
                            <TableCell>
                                <form onSubmit={onCreateSubmit}>
                                    {/* Le Field permettra de rajouter du contenu pour un pense-bête, 
                                        la valeur sera rajouter à la constante d'état (hook) "addTodoText", 
                                        la méthode "onChange" va contrôler le changement d'état de la constante -> sur un event il va 
                                        donc rajouter la valeur du TextField à la constante d'état La validation du champ avec 
                                        la touche entrée permet le submit ! */}
                                    <TextField                                        
                                        color="primary"
                                        variant="outlined"
                                        size="small"
                                        type="text"
                                        value={addTodoTask}
                                        onChange={(event) => {setAddTodoTask(event.target.value)}}
                                        label="Titre"
                                        fullWidth={true}/>
                                </form>
                            </TableCell>
                            <TableCell>
                                <form>
                                    <TextField
                                        color="primary"
                                        variant="outlined"
                                        size="small"
                                        type="text"
                                        value={addTodoDescription}
                                        onChange={(event) => {setAddTodoDescription(event.target.value)}}
                                        label="Description"
                                        fullWidth={true} multiline={true}/>
                                </form>
                            </TableCell>
                            <TableCell width={130} align="right">
                                <IconButton 
                                    color="primary" 
                                    onClick={onCreateSubmit}
                                >
                                    <AddIcon/>
                                </IconButton>
                            </TableCell>
                        </TableRow>
                        {/* En-tête de la table */}
                        <TableRow className={classes.thead}>
                            <TableCell width={180}>Pense-Bête</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    {/* Corps de la table */}
                    <TableBody>
                        {/* Zone d'icônes pour l'édition d'un pense-bête (nom + description) */}
                        {/* Récupération des pense-bête dans le context (TodoContextProvider)
                            slice() => permet de copier une partie d'un tableau et de le renvoyer
                            Reverse() => permet de mettre "à l'envers" un tableau => permet d'avoir les nouveaux ajouts directement en début de liste
                            map() => permet de créer un nouveu tableau à partir de toutes les donées de tableau avec une clef */}
                        {context.todos.slice().reverse().map((todo, index) => (
                            // key => pour les states du context car a chaque nouveau rajout on aura une nouvelle clé par pense-bête
                            <TableRow key={'todo ' + index}>
                                <TableCell align="left">
                                    {/* Expression regulière permettant de vérifier l'état de l'éditiion d'un pense-bête :
                                    si oui, on permet l'édition / si non, on affiche le text */}
                                    {editIsShown === todo.id ?
                                        <form onSubmit={onEditSubmit.bind(this, todo.id)}>
                                            <TextField
                                                type="text"
                                                fullWidth={true}
                                                autoFocus={true}
                                                value={editTodoTask}
                                                onChange={(event) => {setEditTodoTask(event.target.value);}}
                                            />
                                        </form>
                                        :
                                        // typography => juste donné plus de style à l'écriture
                                        <Typography>{todo.task}</Typography>
                                    }
                                </TableCell>
                                <TableCell>
                                    {editIsShown === todo.id ?
                                        <TextField
                                            type="text"
                                            fullWidth={true}
                                            value={editTodoDescription}
                                            // on récupère la nouvelle valeur du texte et on l'assigne à la varaible d'état
                                            onChange={(event) => {setEditTodoDescription(event.target.value);}}
                                            multiline={true}
                                        />
                                        :
                                        // typography => 'pre-wrap' permet d'aller à la ligne quand on fait "entrée"
                                        <Typography style={{whiteSpace: 'pre-wrap'}}>{todo.description}</Typography>
                                    }
                                </TableCell>

                                <TableCell align="right">
                                    {editIsShown === todo.id ?
                                        <Fragment>
                                            {/* Bouton permettant de valider l'edition et de lancer la méthode d'Update du Context et en lui
                                            passant un objet contenant l'id et le nouveau texte du pense-bête sélectionnée */}
                                            <IconButton color="primary" onClick={onEditSubmit.bind(this, todo.id)}>
                                                <DoneIcon/>
                                            </IconButton>
                                            {/* Bouton permettant d'annuler l'edition */}
                                            <IconButton color="secondary" onClick={() => {setEditIsShown(false);}}>
                                                <CloseIcon/>
                                            </IconButton>
                                        </Fragment>
                                        :
                                        <Fragment>
                                            {/* Bouton permettant l'édition d'un pense-bête et ses actions liées */}
                                            <IconButton color="primary" onClick={() => {
                                                setEditIsShown(todo.id);
                                                setEditTodoTask(todo.task);
                                                setEditTodoDescription(todo.description);
                                            }}>
                                                <EditIcon/>
                                            </IconButton>
                                            {/* Zone d'icônes pour la suppression d'un pense-bête */}
                                            {/* Bouton permettant la suppression d'un pense-bête et ses actions liées */}
                                            <IconButton color="secondary" onClick={() => {
                                                setDeleteConfirmationIsShown(true);
                                                setTodoToDelete(todo);
                                            }}>
                                                <Delete/>
                                            </IconButton>
                                        </Fragment>
                                    }
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            
            {/* Informations à passer à la fonction DeleteDialog lorsque l'on clique sur le bouton de suppression d'un pense-bête */}
            {deleteConfirmationIsShown && (
                <DeleteDialog todo={todoToDelete} 
                              open={deleteConfirmationIsShown} 
                              setDeleteConfirmationIsShown={setDeleteConfirmationIsShown}
                />
            )}

        </Fragment>
    );
}

export default TodoTable;