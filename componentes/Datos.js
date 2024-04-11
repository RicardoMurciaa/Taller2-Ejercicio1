import React from 'react';
import { Text, StyleSheet, View, TouchableHighlight } from 'react-native';
const Dato = ({ item, eliminarUsuario }) => {
    const dialogoEliminar = id => {
        console.log('eliminando....', id);
        eliminarUsuario(id);
    }
    return (
        <View style={styles.dato}>
            <View>
                <Text style={styles.label}>Nombre: </Text>
                <Text style={styles.texto}>{item.nombre}</Text>
            </View>
            <View>
                <Text style={styles.label}>Apellido: </Text>
                <Text style={styles.texto}>{item.apellido}</Text>
            </View>
            <View>
                <Text style={styles.label}>Correo: </Text>
                <Text style={styles.texto}>{item.correo}</Text>
            </View>
            <View>
                <Text style={styles.label}>Numero de Telefono: </Text>
                <Text style={styles.texto}>{item.telefono}</Text>
            </View>
            <View>
                <Text style={styles.label}>Fecha de Cumpleaños: </Text>
                <Text style={styles.texto}>{item.cumple}</Text>
            </View>
            <View>
                <TouchableHighlight onPress={() => dialogoEliminar(item.id)}
                    style={styles.btnEliminar}>
                    <Text style={styles.textoEliminar}> Eliminar &times; </Text>
                </TouchableHighlight>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    dato: {
        backgroundColor: '#FFF',
        borderBottomColor: '#e1e1e1',
        borderStyle: 'solid',
        borderBottomWidth: 1,
        paddingVertical: 20,
        paddingHorizontal: 10
    },
    label: {
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 20
    },
    texto: {
        fontSize: 18,
    },
    btnEliminar: {
        padding: 10,
        backgroundColor: 'red',
        marginVertical: 10
    },
    textoEliminar: {
        color: '#FFF',
        fontWeight: 'bold',
        textAlign: 'center'
    }
})
export default Dato;