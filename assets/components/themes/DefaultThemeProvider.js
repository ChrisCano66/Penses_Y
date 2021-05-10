// Permet de donner un theme visuel à l'application venant de Material UI 

//REACT
import React from 'react';
//MUI COMPONENTS
import {CssBaseline, MuiThemeProvider, responsiveFontSizes} from '@material-ui/core';
//MUI COLORS
import { createMuiTheme } from '@material-ui/core/styles';


// création d'un theme MUI grâce à "createMuiTheme"
// Ici on reste simple sur la costumization mais pour en savoir plus sur les theme de MUI :
// https://material-ui.com/customization/theming/#theme-provider
// https://material-ui.com/customization/default-theme/
// https://material-ui.com/customization/color/#color
// https://material-ui.com/styles/basics/#why-use-material-uis-styling-solution
// https://material-ui.com/styles/api/#createstyles-styles-styles
const theme = createMuiTheme({
    palette: {
        // theme sombre ("light" par défaut)
        type: 'dark',
        // couleurs primaires
        primary: {
            main: '#ff8f00',
        },
        // couleurs secondaires
        secondary: {
            main: '#c62828',
        },
    },
});

// creation d'un theme responsive au niveau des tailles de police à partir du theme déjà créer grâce à "responsiveFontSizes"
const responsiveTheme = responsiveFontSizes(theme);

// On retourne le theme 
const DefaultThemeProvider = (props) => {
    return (
        /** pemret d'afficher le theme dans l'application */
        <MuiThemeProvider theme={responsiveTheme}>
            <CssBaseline/>
            {/** pour pouvoir transmettre les props */}
            {props.children}
        </MuiThemeProvider>
    );
};
 
export default DefaultThemeProvider;