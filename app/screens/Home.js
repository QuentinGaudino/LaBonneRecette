import React, { useState, useEffect } from 'react';
import {View, StyleSheet, Text, FlatList} from 'react-native';
import {TuileRecette} from "../components/TuileRecette";
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/EvilIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';



export default Home = () => {

    const navigation = useNavigation();
    const [listeRecette, setListeRecette] = useState([]);

    //Permet le chargement de GetRecettes au lancement
    useEffect(() => {
        getRecettes();
        });

    //Permet de récupérer la liste de recette du AsyncStorage
    const getRecettes = async () =>{
        try {
            const jsonValue = await AsyncStorage.getItem("@recette_Key");
            if (jsonValue) {
                setListeRecette(JSON.parse(jsonValue))
            } else {
                setListeRecette([]);
            }
        } catch (error) {
            console.log("Erreur dans le getRecette");
        }
    };
    
    //Permet de "customiser" le header avec bouton +
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => <Icon.Button name="plus" size={50} color="#000" backgroundColor="#eff9fe" onPress={() => navigation.navigate("AjoutRecette")}/>,
        });
    }, [navigation]);


    //Début du RETURN
    return (
        
        <View style={styles.container} >
            {/* Affichage d'un message invitant a rajouter une recette si l'application n'en possède pas. */}
            {listeRecette.length != 0 ? null :
            <Text style={styles.text} >Cliquez sur “+” pour ajouter une première recette.</Text>
            }

            {/* Affichage de la liste de recette dans une FlatList */}
            <FlatList
                data={listeRecette}
                renderItem={({item}) => (
                    
                    <TuileRecette nomRecette={item.name} categorie={item.cat} imageUrl={item.url} ingredients={item.ing} description={item.desc} id={item.id}/>
                )}
                keyExtractor={item => item.id}
            />
        </View>
    );
};


//Styles
const styles = StyleSheet.create({
    container: {
        backgroundColor: "#eff9fe",
        height: "100%",
    },

    text: {
        fontSize: 40,
        fontWeight: "bold",
        textAlignVertical: "center",
        textAlign: "center",
    },
});