// REACT
import React, {useState} from 'react';
// MUI COMPONENTS
import {AppBar, Toolbar, IconButton, Link, Box, Button, Drawer, List, ListItem, ListItemText, ListItemIcon, makeStyles} from "@material-ui/core";
// MUI ICON
import {Menu as MenuIcon, List as ListIcon, Label as LabelIcon} from '@material-ui/icons';

// création de style MUI pour la partie navigation
const useStyles = makeStyles(theme => ({
    menuIcon:{
        marginRight: theme.spacing(15),
    },
    loginButton:{
        marginLeft: theme.spacing(15),
    },
    list:{
        width: '200px',
    },
}));


// 
const Navigation = () => {

    // on récupère les styules pour la partie navigation afin de les appliquer
    const classes = useStyles();

    // les constantes d'états pour la partie navigation :
    // 
    const [drawerOpen, setDrawerOpen] = useState(false);

    // Toggle fonction pour la partie BarMenu :
    const toggleDrawer = () => {
        // change l'état de "drawerOpen" selon son état (passe de false à true ou l'inverse)
        setDrawerOpen(!drawerOpen);
    };

    // Array d'objet permettant de faire le liste des items de la BarMenu
    // un objet reprennant le nom de l'item et l'icône associé
    // un objet reprenant le tag associé et le label de l'icône
    const drawerItems= [
        {text: 'TodoList', icon: <ListIcon/>},
        {text: 'Tags', icon: <LabelIcon/>}
    ];

    return (
        // on fixe la BarMenu pour qu'elle soit toujours visible
        <AppBar position="fixed" >
            {/** Partie Fixe de la BarMenu */}
            <Toolbar>
                {/** IconButton edge permet de placé l'icône Menu plus vers la gauche */}
                <IconButton 
                    edge="start"
                    className={classes.menuIcon}
                    onClick={toggleDrawer}
                ><MenuIcon/></IconButton>

                {/** Titre principale de l'application */}
                <Link 
                    href="/"
                    style={{flexGrow: 1}}
                    align="center"
                    color="textPrimary" 
                    underline="none" 
                    variant="h4"
                >Penser-Y !</Link>

                {/** Bouton Login pour l'application */}
                <Button 
                    size="large"
                    className={classes.loginButton}
                >Login</Button>
            </Toolbar>
            {/** Partie Toggle de la BarMenu */}
            <Drawer 
                // on applique une ancre à gauche pour la partie de ce menu
                anchor="left"
                variant="temporary"
                onClose={toggleDrawer}
                open={drawerOpen}
            >
                {/** liste d'item cliquable */}
                <List className={classes.list}>
                    {/** on récupère la liste des items contenu dans drawerItems */}
                    {drawerItems.map(prop => (
                        // On crée chaque item
                        <ListItem 
                            // car c'est cliquable
                            button 
                            // nécessaire car nous somme dans une fonction map (ici on prendra le text des drawerItems)
                            key={prop.text}
                            onClick={toggleDrawer}
                        >
                            <ListItemIcon>{prop.icon}</ListItemIcon>
                            <ListItemText>{prop.text}</ListItemText>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </AppBar>
    );
};

export default Navigation;