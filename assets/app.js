import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import TodoTable from './components/TodoTable';
import AppSnackbar from './components/AppSnackbar';
import TodoContextProvider from './contexts/TodoContext';
import DefaultThemeProvider from './components/themes/DefaultThemeProvider';
import { Typography } from '@material-ui/core';

class App extends Component {
    render() {
        return (
            <TodoContextProvider>
                <TodoTable/>
                <AppSnackbar/>
            </TodoContextProvider>
        );
    }
}
 
ReactDOM.render(
    <DefaultThemeProvider>
        <App/>
    </DefaultThemeProvider>
    , document.getElementById('root'));
