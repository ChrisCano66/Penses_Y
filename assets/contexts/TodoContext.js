// Creation d'un Context et de son provider afin de pouvoir "transférer" l'ensemble des valeurs des
// différentes propriétés de la TodoList vers les différents composant de l'API

import React, { Component, createContext } from 'react';
import axios from 'axios';

export const TodoContext = createContext();

export default class TodoContextProvider extends Component {

    constructor(props) {
        super(props);

        // Etat reprenant l'ensemble des pense-bête
        this.state = {
            todos : [],
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
                console.log(response.data);
                // on récupère les penses-bête déjà présents
                let data = [...this.state.todos];
                // on rajoute le nouveau pense-bête que l'on veut rajouter
                data.push(response.data.todo);
                // on change la constante d'état
                this.setState( {
                    todos: data,
                })
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
        // on récupère les penses-bête déjà présents
        let datas = [...this.state.todos];
        // on recherche l'id du pense-bête que l'on veut éditer avec l'id dans données récupérées 
        // et on passe cela à une variable "todo"
        let todo = datas.find(todo => {
            return todo.id === data.id
        }); 
        // on assigne les nouvelles données de texte
        todo.text = data.text
        // on change la constante d'état
        this.setState( {
            todos: datas,
        })
    }

    // Method Delete
    deleteTodo (data) {
        // on récupère les penses-bête déjà présents
        let datas = [...this.state.todos];
        // on recherche l'id du pense-bête que l'on veut éditer avec l'id dans données récupérées 
        // et on passe cela à une variable "todo"
        let todo = datas.find(todo => {
            return todo.id === data.id
        });
        // on récupère alors l'ensemble des datas en enlevant le pense-bête que l'on veut supprimer (grâce au Splice)
        datas.splice(datas.indexOf(todo),1)
        // on change la constante d'état
        this.setState( {
            todos: datas,
        })
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
