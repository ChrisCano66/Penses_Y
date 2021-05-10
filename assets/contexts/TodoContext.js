// Creation d'un Context et de son provider afin de pouvoir "transférer" l'ensemble des valeurs des
// différentes propriétés de la TodoList vers les différents composant de l'API

import React, { Component, createContext } from 'react';
import axios from 'axios';

export const TodoContext = createContext();

export default class TodoContextProvider extends Component {

    constructor(props) {
        super(props);

        // Etat reprenant l'ensemble des pense-bête (todos) et des messages associés 
        this.state = {
            todos : [],
            message: {},
        };
        this.readTodo();
    }

    // Method Create
    createTodo (event, todo) {
        // permet de na pas tout recharger toute la page lorsqu'il y a un event
        event.preventDefault();

        // on lance axios (méthode post) avec l'url du TodoController (ensemble du routage) 
        // pour la création des données dans la bdd et qui sera gérer par le back-end
        axios.post('api/todo/create', todo)
            // on obtient une réponse que l'on passe directement aux todos de la variable d'état du constructeur
            .then(response => {
                // si message de succes au niveaude axios =>
                if (response.data.message.level === 'success') {
                    // on récupère les penses-bête déjà présents
                    let data = [...this.state.todos];
                    // on rajoute le nouveau pense-bête que l'on veut rajouter
                    data.push(response.data.todo);
                    // on change la constante d'état
                    this.setState( {
                        todos: data,
                        message: response.data.message,
                    })
                } else {
                    this.setState({
                        message: response.data.message,
                    })
                }      
            }).catch(error => {
                console.error(error);
            })
    }

    // Method Read
    // Utilisation de AXIOS pour la liaison entre le Back-end et le Front-end
    readTodo () {
        // on lance axios (methode get) avec l'url du TodoController (ensemble du routage) 
        // pour la lecture des données de la bdd  et qui sera gérer par le back-end
        axios.get('api/todo/read')
            // on obtient une réponse que l'on passe directement aux todos de la variable d'état du constructeur
            .then(response => {
                this.setState({
                    todos: response.data
                });
            }).catch(error => {
                console.error(error);
            })
    }

    // Method Update
    updateTodo (data) {
        // on lance axios (methode put) avec l'url du TodoController (ensemble du routage) 
        // pour la mise à jour des données de la bdd et qui sera gérer par le back-end
        // enlui passant l'id du pênse-bête qui est mis à jour
        axios.put('api/todo/update/' + data.id, data)
            .then(response => {
                // si message de succes au niveaude axios =>
                if (response.data.message.level === 'error') {
                    this.setState({
                        message: response.data.message,
                    });
                } else {
                    // on récupère les penses-bête déjà présents
                    let todos = [...this.state.todos];
                    // on recherche l'id du pense-bête que l'on veut éditer avec l'id dans données récupérées 
                    // et on passe cela à une variable "todo"
                    let todo = todos.find(todo => {
                        return todo.id === data.id
                    }); 
                    // on assigne les nouvelles données de texte (donnée côté serveur et non JS)
                    todo.task = response.data.todo.task;
                    todo.description = response.data.todo.description;
                    // on change la constante d'état
                    this.setState( {
                        todos: todos,
                        message: response.data.message,
                    });
                } 
            }).catch(error => {
                console.error(error);
            })
    }

    // Method Delete
    deleteTodo (data) {
        // on lance axios (methode put) avec l'url du TodoController (ensemble du routage) 
        // pour la mise à jour des données de la bdd et qui sera gérer par le back-end
        // enlui passant l'id du pênse-bête qui est mis à jour
        axios.delete('api/todo/delete/' + data.id)
            .then(response => {
                // si message de succes au niveaude axios =>
                if (response.data.message.level === 'error') {
                    this.setState({
                        message: response.data.message,
                    });
                } else {
                    // on récupère les penses-bête déjà présents
                    let todos = [...this.state.todos];
                    // on recherche l'id du pense-bête que l'on veut éditer avec l'id dans données récupérées 
                    // et on passe cela à une variable "todo"
                    let todo = todos.find(todo => {
                        return todo.id === data.id
                    });
                    // on récupère alors l'ensemble des datas en enlevant le pense-bête que l'on veut supprimer (grâce au Splice)
                    datas.splice(todos.indexOf(todo),1)
                    // on change la constante d'état
                    this.setState( {
                        todos: todos,
                        message: response.data.message,
                    });
                }
            }).catch(error => {
                console.error(error);
            })
    }


    render() {
        return (
            <TodoContext.Provider value={{
                ...this.state,
                createTodo: this.createTodo.bind(this),
                updateTodo: this.updateTodo.bind(this),
                deleteTodo: this.deleteTodo.bind(this),
                setMessage: (message) => this.setState({message: message}),
            }}>
                {this.props.children}
            </TodoContext.Provider>
        )
    }
}
