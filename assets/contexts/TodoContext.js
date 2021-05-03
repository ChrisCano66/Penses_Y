// Creation d'un Context et de son provider afin de pouvoir "transférer" l'ensemble des valeurs des
// différentes propriétés de la TodoList vers les différents composant de l'API

import React, { Component, createContext } from 'react'

export const TodoContext = createContext();

export default class TodoContextProvider extends Component {

    constructor(props) {
        super(props);

        // Etat reprenant l'ensemble des pense-bête
        this.state = {
            todos : [
                {name: 'do somethink'},
                {name: 'do somethink'},
                {name: 'do somethink'},
            ],
        }

    }

    // Method Create
    createTodo (event, todo) {
        // permet de na pas tout recharger toute la page lorsqu'il y a un event
        event.preventDefault();
        // on récupère les penses-bête déjà présents
        let data = [...this.state.todos];
        // on rajoute le nouveau pense-bête que l'on veut rajouter
        data.push(todo);
        // on change la constante d'état
        this.setState( {
            todos: data,
        })
    }

    // Method Read
    readTodo () {

    }

    // Method Update
    updateTodo () {

    }

    // Method Delete
    deleteTodo () {

    }


    render() {
        return (
            <TodoContext.Provider value={{
                ...this.state,
                createTodo: this.createTodo.bind(this),
                updateTodo: this.updateTodo.bind(this),
                deleteTodo: this.deleteTodo.bind(this),
            }}>
                {this.props.children}
            </TodoContext.Provider>
        )
    }
}
