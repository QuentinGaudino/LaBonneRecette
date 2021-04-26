import React from 'react';
import {View, StyleSheet, Text, Pressable, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/EvilIcons';



export const TuileRecette = props => {

    const navigation = useNavigation();

    return (

        //Ce component sers représente la "tuile" de chaque recette à l'écran d'acceuil, nous utilisons <Pressable> plutôt que <TouchableOpacity> par recommendation de la documentation technique
        <View style={styles.container} >
            
            <Pressable
                onPress={() => {
                    navigation.navigate("Recette",{nomRecette:props.nomRecette, imageUrl:props.imageUrl, categorie:props.categorie, ingredients:props.ingredients, description:props.description, id:props.id});
                }}

                style={({ pressed }) => [
                    {backgroundColor: pressed ? "#00243b" : "#013b61"},
                    styles.wrapperCustom
            ]}>

            {({ pressed }) => (
                <React.Fragment>
                    {props.imageUrl == "" ? null :<Image style={styles.image} source={{uri: props.imageUrl}} />}
                    <Text style={styles.textCategorie}>
                        {props.categorie}
                    </Text>
                    <Text style={styles.textPlat}>
                        {pressed ? props.nomRecette : props.nomRecette}
                    </Text>
                    <Icon name="eye" style={styles.eye}/>
                </React.Fragment>
            )}

            </Pressable>
        </View>

    );

};


//Styles utilisés
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor:"#eff9fe",
    },

    textCategorie: {
        fontSize: 12,
        color : "#013c62",
        backgroundColor:"white",
        height: 20,
        width: 70,
        textAlign: "center",
        textAlignVertical: "center",
        marginRight: 20,
    },

    textPlat: {
        fontSize: 20,
        color : "white",
        fontWeight: "bold",
        textAlign: "center",
        textAlignVertical: "center",
    },

    wrapperCustom: {
        borderRadius: 12,
        padding: 0,
        flexDirection: "row",
        height: 70,
        marginVertical: 5,
        marginHorizontal: 5,
    },

    logBox: {
        padding: 20,
        margin: 10,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#f0f0f0',
        backgroundColor: '#f9f9f9'
    },

    image:{
        width: 70,
        height: 70,
        borderTopLeftRadius: 12,
        borderBottomLeftRadius: 12,
    },

    eye:{
        textAlignVertical: "center",
        marginLeft: "50%",
        fontSize: 50,
        color: "white",
    },
});