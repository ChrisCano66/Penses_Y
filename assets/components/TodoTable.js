import React, {Fragment, useContext, useState} from 'react';
import {TodoContext} from "../contexts/TodoContext.js";
import {IconButton, Table, TableBody, TableCell, TableHead, TableRow, TextField} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';


function TodoTable () {

    // constante de context sous forme de Hooks utilisant le "useContext" afin de pouvoir utiliser le contextProvider
    const context = useContext(TodoContext);
    // constante d'état permettant l'ajout d'un pense-bête sous forme de Hooks utilisant le "state" et qui est initialiser par une String vide
    const [addTodo, setAddTodo] = useState('');
    // constante d'état permettant de savoir l'état de l'action d'édition d'un pense-bête sous forme de Hooks utilisant le "state"
    const [editIsShown, setEditIsShown] = useState('');
    // constante d'état permettant d'édition d'un pense-bête sous forme de Hooks utilisant le "state" et qui est initialiser par une String vide
    const [editTodo, setEditTodo] = useState('');

    return (

        // Formulaire qui reprend les différents pense-bête et qui peut "submit" pour l'ajout, l'édition et la suppression d'un pense-bête =>
        // onSubmit -> method createTodo de la class TodoContextProvider qui va récupérer la valeur rajouter pour un nouveau pense-bête

        <form onSubmit={(event) => {context.createTodo(event, {text: addTodo})}}>
            <Table>
                {/* En-tête de la table */}
                <TableHead>
                    <TableRow>
                        <TableCell align="left">Pense-Bête</TableCell>
                        <TableCell align="left">Actions</TableCell>
                    </TableRow>
                </TableHead>
                {/* Corps de la table */}
                <TableBody>
                    {/* Champ text pour l'ajout d'un nouveau pense-bête */}
                    <TableRow>
                        <TableCell>
                            {/* Le Field permettra de rajouter du contenu pour un pense-bête, la valeur sera rajouter
                                à la constante d'état (hook) "addTodo", la méthode "onChange" va contrôler le changement
                                d'état de la constante -> sur un event il va donc rajouter la valeur du TextField à la
                                constante d'état La validation du champ avec la touche entrée permet le submit !
                                Rajout du "type='submit'" pour l'icône d'ajout */}
                            <TextField
                                value={addTodo}
                                onChange={(event) => {setAddTodo(event.target.value)}}
                                label="Ajouter un nouveau Pense-Bête"
                                fullWidth={true}
                            />
                        </TableCell>
                        <TableCell align="right">
                            <IconButton type="submit">
                                <AddIcon/>
                            </IconButton>
                        </TableCell>
                    </TableRow>
                    {/* Zone d'icônes pour l'édition et la suppression d'un pense-bête
                        Récupération des pense-bête dans le context (TodoContextProvider)
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
                                    <TextField
                                        fullWidth={true}
                                        value={editTodo}
                                        // on récupère la nouvelle valeur du texte et on l'assigne à la varaible d'état
                                        onChange={(event) => {
                                            setEditTodo(event.target.value);
                                        }}
                                        InputProps={{
                                            // Permet de rajouter des actions/éléments au TextFeild : ici une "div" avec des boutons
                                            endAdornment: <Fragment>
                                                {/* Bouton permettant d'annuler l'edition */}
                                                <IconButton onClick={() => {
                                                    setEditIsShown(false);
                                                }}><CloseIcon/></IconButton>
                                                {/* Bouton permettant de valider l'edition et de lancer la méthode d'Update du Context et en lui
                                                passant un objet contenant l'id et le nouveau texte du pense-bête sélectionnée */}
                                                <IconButton onClick={() => {
                                                    context.updateTodo({id: todo.id, text: editTodo});
                                                    setEditIsShown(false);
                                                }}><DoneIcon/></IconButton>
                                            </Fragment>
                                        }}
                                    />
                                    :
                                    todo.text
                                }
                            </TableCell>
                            <TableCell align="right">
                                <IconButton onClick={() => {
                                    setEditIsShown(todo.id);
                                    setEditTodo(todo.text);
                                }}>
                                    <EditIcon/>
                                </IconButton>
                                <IconButton>
                                    <Delete/>
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </form>
    );
}

export default TodoTable;