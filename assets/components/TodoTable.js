import React, {useContext, useState} from 'react';
import {TodoContext} from "../contexts/TodoContext.js";
import {IconButton, Table, TableBody, TableCell, TableHead, TableRow, TextField} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';


function TodoTable () {

    // constante de context sous forme de Hooks utilisant le "useContext" afin de pouvoir utiliser le contextProvider
    const context = useContext(TodoContext);
    // constante d'état sous forme de Hooks utilisant le "state" et qui est initialiser par une String vide
    const [addTodo, setAddTodo] = useState('');

    return (

        // Formulaire qui reprend les différents pense-bête et qui peut "submit" pour l'ajout, l'édition et la suppression d'un pense-bête =>
        // onSubmit -> method createTodo de la class TodoContextProvider qui va récupérer la valeur rajouter pour un nouveau pense-bête

        <form onSubmit={(event) => {context.createTodo(event, {name: addTodo})}}>
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
                            <TableCell align="left">{todo.name}</TableCell>
                            <TableCell align="right">
                                <IconButton>
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