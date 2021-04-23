import React, { useState, useEffect } from 'react';
import {View, StyleSheet, Text, Pressable, Modal, Image, SafeAreaView, FlatList, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/EvilIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';


FlatList
export default Recette = ({route}) => {

    const navigation = useNavigation();
    const [listeRecette, setListeRecette] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);

    //Permet de charger au démarrage les recettes enregistrées dans l'asyncStorage
    useEffect(() => {
        getRecettes();
        }, []);

    const getRecettes = async () =>{
        try {
            const jsonValue = await AsyncStorage.getItem("@recette_Key");
            return jsonValue != null
                ? setListeRecette(JSON.parse(jsonValue))
                : null;
        } catch (error) {
            console.log("Erreur dans le getRecette");
        }
    };

    //fonction de suppression de Recette.
    const suppressionRecette = async () => {

        const recetteASupprimer = route.params.id;
        let listeRecetteTemporaire = listeRecette;
        listeRecetteTemporaire = listeRecette.filter((recette) => recette.id !== recetteASupprimer);

        //On écrase le AsyncStorage avec le nouveau tableau allégé d'une recette.
        try {
            const jsonValue = JSON.stringify(listeRecetteTemporaire)
            await AsyncStorage.setItem("@recette_Key", jsonValue)
        } catch (error) {
            console.log("Une erreur lors de l'utilisation du AsyncStorage c'est produite");
        }

        //On retourne à la page d'accueil à la fin de la suppression.
        navigation.navigate("Home");
    };
    
    //Paramétrage du header
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => <Icon.Button name="trash" size={50} color="#000" backgroundColor="#eff9fe" onPress={() => setModalVisible(true)}/>,
        });
    }, [navigation]);


    //Début du RETURN
    return(
        <SafeAreaView style={styles.container} >
            <View>
                {/* Modal demandant la validation avant suppression */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>“Voulez-vous supprimer définitivement cette recette ?</Text>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => {setModalVisible(!modalVisible); suppressionRecette()}}
                            >
                                <Text style={styles.textStyle}>Oui</Text>
                            </Pressable>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setModalVisible(!modalVisible)}
                            >
                                <Text style={styles.textStyle}>Annuler</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
                {/* Fin de la modal */}

                
                {/* Affichage d'une image uniquement si une URL a été renseignée dans la recette. */}
                {route.params.imageUrl == "" ? null : <Image style={styles.image} source={{uri: route.params.imageUrl}} />}
                
                {/* Affichage du nom de la recette avec un style légèrement différent si il y a une photo ou non */}
                {route.params.imageUrl == "" ? 
                <Text style={styles.textTitreAlternatif} >{route.params.nomRecette}</Text>
                : 
                <Text style={styles.textTitre} >{route.params.nomRecette}</Text>}
                
                <Text style={styles.textTitreN2}>Ingrédients</Text>
                <Text style={styles.text}>{route.params.ingredients}</Text>
                
                <Text style={styles.textTitreN2}>Description</Text>
                <Text style={styles.text}>{route.params.description}</Text>
            </View>
        </SafeAreaView>
    );


};

//Styles
const styles = StyleSheet.create({
    container: {
    flex: 1,
    textAlign: "center",
    backgroundColor:"#eff9fe",
    },

    image:{
        width: "100%",
        height: "50%",
    },

    textTitre:{
        backgroundColor:"#00243b",
        color: "white",
        marginRight:"30%",
        marginTop:-20,
        fontSize: 25,
        paddingVertical: 10,
        borderTopRightRadius: 15,
        borderBottomRightRadius: 15,
        textAlign: "center",
    },

    textTitreAlternatif:{
        backgroundColor:"#00243b",
        color: "white",
        marginRight:"30%",
        fontSize: 25,
        paddingVertical: 10,
        borderTopRightRadius: 15,
        borderBottomRightRadius: 15,
        textAlign: "center",
    },

    textTitreN2:{
        fontSize: 20,
        paddingLeft: 40,
        marginVertical: 10,
        color: "#013c62",
        fontWeight: "bold",
    },

    text:{
        fontSize: 15,
        paddingLeft: 20,
        marginVertical:10,
        color: "#013c62",
        fontWeight: "bold",
    },


//Style de la modale
    wrapperCustom: {
        borderRadius: 8,
        padding: 0,
        marginHorizontal: "40%",
        marginTop: 20,
        paddingVertical: 8,
    },

    logBox: {
        padding: 20,
        margin: 10,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#f0f0f0',
        backgroundColor: '#f9f9f9',
    },

    centeredView: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        marginTop: 22,
    },
    
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        paddingVertical: 20,
        paddingHorizontal: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },

    modalText: {
        marginBottom: 15,
        textAlign: "center",
        fontSize: 15,
    },

    textStyle:{
        height: 30,
        textAlignVertical: "center",
        marginVertical: 10,
        fontSize: 15,
        fontWeight: "bold",
    },


});
