// REACT
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
// COMPONENTS
import Router from './components/Router';
import DefaultThemeProvider from './components/themes/DefaultThemeProvider';

class App extends Component {
    render() {
        // On retourne un Router qui va permettre de dispatché les différentes pages de l'application (cf Fichier Router.js)
        return <Router/>;
    }
}
 
ReactDOM.render(
    // Application du theme MUI autour de l'App afin que le theme soit pris en compte sur l'ensemble de l'application
    <DefaultThemeProvider>
        <App/>
    </DefaultThemeProvider>
    , document.getElementById('root')
);
