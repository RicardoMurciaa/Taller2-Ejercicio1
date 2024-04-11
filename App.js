import React, { useState, useEffect } from 'react';
import {
  Text, StyleSheet, View, FlatList, TouchableHighlight, TouchableWithoutFeedback,Keyboard, Platform
} from 'react-native';
import Dato from './componentes/Datos';
import Formulario from './componentes/Formulario';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from './src/utils/colors';
const App = () => {
  // definir el state de datos del cumpleañero
  const [datos, setDatos] = useState([]);
  const [mostrarform, guardarMostrarForm] = useState(false);
  useEffect(() => {
    const obtenerDatosStorage = async () => {
      try {
        const datosStorage = await AsyncStorage.getItem('datos');
        if (datosStorage) {
          setDatos(JSON.parse(datosStorage))
        }
      } catch (error) {
        console.log(error);
      }
    }
    obtenerDatosStorage();
  }, []);
  // Elimina los datos de los cumpleañeros del state
  const eliminarUsuario = id => {
    const datosFiltradas = datos.filter(dato => dato.id !== id);
    setDatos(datosFiltradas);
    guardarDatosStorage(JSON.stringify(datosFiltradas));
  }
  // Muestra u oculta el Formulario
  const mostrarFormulario = () => {
    guardarMostrarForm(!mostrarform);
  }
  // Ocultar el teclado
  const cerrarTeclado = () => {
    Keyboard.dismiss();
  }
  // Almacenar los datos de los cumpleañeros en storage
  const guardarDatosStorage = async (datosJSON) => {
    try {
      await AsyncStorage.setItem('datos', datosJSON);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <TouchableWithoutFeedback onPress={() => cerrarTeclado()}>
      <View style={styles.contenedor}>
        <Text style={styles.titulo}>Administrador de Cumpleaños</Text>
        <View>
          <TouchableHighlight onPress={() => mostrarFormulario()}
            style={styles.btnMostrarForm}>
            <Text style={styles.textoMostrarForm}> {mostrarform ? 'Cancelar Crear Usuario' : 'Crear Nuevo Usuario'} </Text>
          </TouchableHighlight>
        </View>
        <View style={styles.contenido}>
          {mostrarform ? (
            <>
              <Text style={styles.titulo}>Crear Nueva Usuario</Text>
              <Formulario
                datos={datos}
                setDatos={setDatos}
                guardarMostrarForm={guardarMostrarForm}
                guardarDatosStorage={guardarDatosStorage}
              />
            </>
          ) : (
            <>
              <Text style={styles.titulo}> {datos.length > 0 ? 'Administra tus Usuarios' :
                'No hay Usuarios, agrega una'} </Text>
              <FlatList
                style={styles.listado}
                data={datos}
                renderItem={({ item }) => <Dato item={item}
                  eliminarUsuario={eliminarUsuario} />}
                keyExtractor={dato => dato.id}
              />
            </>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: Colors.PRIMARY_COLOR,
    flex: 1
  },
  titulo: {
    color: '#FFF',
    marginTop: Platform.OS === 'ios' ? 40 : 20,
    marginBottom: 20,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  contenido: {
    flex: 1,
    marginHorizontal: '2.5%',
  },
  listado: {
    flex: 1,
  },
  btnMostrarForm: {
    padding: 10,
    backgroundColor: Colors.BUTTON_COLOR,
    marginVertical: 10
  },
  textoMostrarForm: {
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center'
  }
});
export default App;
