import React, { useState } from 'react';
import {
    Text, StyleSheet, View, TextInput, Button, TouchableHighlight, Alert, ScrollView
} from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import shortid from "react-id-generator";
import colors from '../src/utils/colors';
const Formulario = ({ datos, setDatos, guardarMostrarForm, guardarDatosStorage }) => {
    //variables para el formulario
    const [nombre, guardarNombre] = useState('');
    const [apellido, guardarApellido] = useState('');
    const [telefono, guardarTelefono] = useState('');
    const [correo, guardarCorreo] = useState('');
    const [cumple, guardarCumple] = useState('');
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };
    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };
    const confirmarCumple = date => {
        const opciones = { year: 'numeric', month: 'long', day: "2-digit" };
        guardarCumple(date.toLocaleDateString('es-ES', opciones));
        hideDatePicker();
    };
    // Crear nueva dato
    const crearNuevaDato = () => {
        // Validar
        if (nombre.trim() === '' ||
            apellido.trim() === '' ||
            telefono.trim() === '' ||
            cumple.trim() === '' ||
            correo.trim() === '') {
            // Falla la validación
            mostrarAlerta();
            return;
        }
        // Crear una nueva dato
        const dato = { nombre, apellido, telefono, cumple, correo };
        dato.id = shortid();
        // console.log(dato);
        // Agregar al state
        const datosNuevo = [...datos, dato];
        setDatos(datosNuevo);
        // Pasar las nuevas datos a storage
        guardarDatosStorage(JSON.stringify(datosNuevo));
        // Ocultar el formulario
        guardarMostrarForm(false);
        // Resetear el formulario
        guardarNombre('');
        guardarApellido('');
        guardarCorreo('');
        guardarCumple('');
        guardarTelefono('');
    }
    // Muestra la alerta si falla la validación
    const mostrarAlerta = () => {
        Alert.alert(
            'Error', // Titulo
            'Todos los campos son obligatorios', // mensaje
            [{
                text: 'OK' // Arreglo de botones
            }]
        )
    }
    return (
        <>
            <ScrollView style={styles.formulario}>
                <View>
                    <Text style={styles.label}>Nombre:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={texto => guardarNombre(texto)}
                    />
                </View>
                <View>
                    <Text style={styles.label}>Apellido:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={texto => guardarApellido(texto)}
                    />
                </View>
                <View>
                    <Text style={styles.label}>Correo:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={texto => guardarCorreo(texto)}
                    />
                </View>
                <View>
                    <Text style={styles.label}>Teléfono Contacto:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={texto => guardarTelefono(texto)}
                        keyboardType='numeric'
                    />
                </View>
                <View>
                    <Text style={styles.label}>Fecha de cumpleaños:</Text>
                    <Button title="Seleccionar Fecha" onPress={showDatePicker} />
                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={confirmarCumple}
                        onCancel={hideDatePicker}
                        locale='es_ES'
                        headerTextIOS="Elige la fecha"
                        cancelTextIOS="Cancelar"
                        confirmTextIOS="Confirmar"
                    />
                    <Text>{cumple}</Text>
                </View>
                <View>
                    <TouchableHighlight onPress={() => crearNuevaDato()}
                        style={styles.btnSubmit}>
                        <Text style={styles.textoSubmit}>Crear Nueva Datos</Text>
                    </TouchableHighlight>
                </View>
            </ScrollView>
        </>
    );
}
const styles = StyleSheet.create({
    formulario: {
        backgroundColor: '#FFF',
        paddingHorizontal: 20,
        paddingVertical: 10,
        flex: 1
    },
    label: {
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 20
    },
    input: {
        marginTop: 10,
        height: 50,
        borderColor: '#e1e1e1',
        borderWidth: 1,
        borderStyle: 'solid'
    },
    btnSubmit: {
        padding: 10,
        backgroundColor: colors.BUTTON_COLOR,
        marginVertical: 10
    },
    textoSubmit: {
        color: '#FFF',
        fontWeight: 'bold',
        textAlign: 'center'
    }
})
export default Formulario;