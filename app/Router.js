//Import des components core et community
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';

//Import de mes screens
import Home from "./screens/Home";
import AjoutRecette from "./screens/AjoutRecette";
import Recette from "./screens/Recette";

const Stack = createStackNavigator();


export default Router = () => {
    
    return(
        
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                
                <Stack.Screen name="Home"component={Home} options={{title:"Recettes", headerStyle: {
                    backgroundColor: '#eff9fe',
                }}}/>
                
                <Stack.Screen name="AjoutRecette"component={AjoutRecette} options={{title:"Ajouter une recette", headerStyle: {
                    backgroundColor: '#eff9fe',
                }}}/>
                
                <Stack.Screen name="Recette"component={Recette} options={({route}) => ({title:route.params.categorie, headerStyle: {
                    backgroundColor: '#eff9fe',
                }})}/>

            </Stack.Navigator>
        </NavigationContainer>
        
    );
};

