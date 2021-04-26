import React, { useState, useEffect } from 'react';
import {View, StyleSheet, Text, TextInput, Pressable, Alert, Modal, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/EvilIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Picker} from '@react-native-picker/picker';



export default Home = () => {

    const navigation = useNavigation();
    const [nomRecette, setNomRecette] = useState("");
    const [urlImage, setUrlImage] = useState("");
    const [categorie, setCategorie] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [description, setDescription] = useState("");
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
//fgsdfg
    //Fonction permettant d'ajouter la recette saisie à la liste des recettes, et de les sauvegarder dans une AsyncStorage
    const ajoutRecette = async () => {
        //Vérification que tout les textInput obligatoires soit bien remplis:
        if (nomRecette && categorie && ingredients && description ) {
            let idRandom = (((1+Math.random())*0x10000)|0).toString(16).substring(1);
            let listeRecetteTemporaire = listeRecette;
            listeRecetteTemporaire.push({
                name:nomRecette,
                url:urlImage,
                cat:categorie,
                ing:ingredients,
                desc:description,
                id:idRandom
            });
            setListeRecette (listeRecetteTemporaire);
            
            //On réinitialise les champs remplis par l'utilisateur afin de mieux comprendre que l'action a été prise en compte
            setNomRecette(""); 
            setUrlImage(""); 
            setCategorie(""); 
            setIngredients("");
            setDescription("");
            
            //On affiche la modale afin de confirmer l'ajout de la recette.
            setModalVisible(true);
            
        } else{
            //Nous affichons une alerte en cas d'oubli d'un champ obligatoire
            Alert.alert("Veuillez remplir tout les champs obligatoires");
        }

        //Nous enregistrons le tableau dans l'AsyncStorage
        try {
            const jsonValue = JSON.stringify(listeRecette)
            await AsyncStorage.setItem("@recette_Key", jsonValue)
        } catch (error) {
            console.log("Une erreur lors de l'utilisation du AsyncStorage c'est produite");
        }
    };

    //Customisation du header avec le bouton de fermeture X
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => <Icon.Button name="close" size={50} color="#000" backgroundColor="#eff9fe" onPress={() => navigation.navigate("Home")}/>,
        });
    }, [navigation]);


    //Début du RETURN
    return(
        <View style={styles.container}>

    {/* Cette modale indique quand la recette a bien été ajoutée. */}
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
                        <Pressable
                        onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text style={styles.textStyle}>Recette ajoutée avec succès</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
    {/* Fin de la modale */}
    
    {/* Formulaire pour la recette */}
            <ScrollView>
                <Text style={styles.textCategorie}>Nom de la recette</Text>
                <TextInput
                    onChangeText={setNomRecette}
                    value={nomRecette}
                    style={styles.textInput}
                    placeholder="Ce champ est obligatoire"
                />

                <Text style={styles.textCategorie}>URL de l'image</Text>
                <TextInput
                    onChangeText={setUrlImage}
                    value={urlImage}
                    style={styles.textInput}
                />

                <Text style={styles.textCategorie}>Catégorie</Text>

                <Picker
                    style={styles.picker}
                    selectedValue={categorie}
                    onValueChange={(itemValue, itemIndex) =>
                        setCategorie(itemValue)
                    }
                >
                    <Picker.Item label="Sélectionnez une catégorie" value=""/>
                    <Picker.Item label="Apéritif" value="Apéritif"/>
                    <Picker.Item label="Entrée" value="Entrée"/>
                    <Picker.Item label="Plat" value="Plat"/>
                    <Picker.Item label="Dessert" value="Dessert"/>
                </Picker>

                <Text style={styles.textCategorie}>Ingrédients</Text>
                <TextInput
                    onChangeText={setIngredients}
                    value={ingredients}
                    style={styles.textInputGrand}
                    placeholder="Ce champ est obligatoire"
                />

                <Text style={styles.textCategorie} >Description</Text>
                <TextInput
                    onChangeText={setDescription}
                    value={description}
                    style={styles.textInputGrand}
                    placeholder="Ce champ est obligatoire"
                />
                
                {/* Bouton de validation */}
                <Pressable
                    onPress={() => {ajoutRecette();
                    }}
                    style={({ pressed }) => [
                        {backgroundColor: pressed ? "#00243b" : "#013b61"},
                        styles.wrapperCustom
                    ]}
                >
                    <Text style={styles.textButton}>Valider</Text>
                </Pressable>
            </ScrollView>
        </View>
    );
};


//Styles
const styles = StyleSheet.create({
    container: {
        padding: 10,
        textAlign: "center",
        backgroundColor: "#eff9fe",
        height: "100%",
    },

    textInput: {
        backgroundColor: "#d6e7f0",
        paddingHorizontal: 10,
        marginHorizontal: 10,
        borderRadius: 10,
    },

    textInputGrand: {
        backgroundColor: "#d6e7f0",
        paddingHorizontal: 10,
        marginHorizontal: 10,
        borderRadius: 10,
        height: 80,
    },
    
    textButton: {
        color: "white",
        textAlignVertical: "center",
        textAlign: "center",
    },

    textCategorie:{
        fontSize: 20,
        paddingLeft: 10,
        marginVertical: 10,
        color: "#013c62",
        fontWeight: "bold",
    },

    picker: {
        paddingHorizontal: 10,
        marginHorizontal: 10,
    },

    //Style de la modal
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
        marginTop: 22
    },
    
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },

    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});