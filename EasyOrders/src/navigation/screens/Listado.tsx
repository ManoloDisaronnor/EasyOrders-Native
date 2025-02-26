import React, { useEffect, useState } from 'react';
import { ScrollView, View, StyleSheet, Alert, SafeAreaView, StatusBar } from 'react-native';
import { Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { LinearGradient } from 'expo-linear-gradient';
import { Image } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

export function ListadoScreen() {
  const isFocused = useIsFocused();
  const [error, setError] = useState("");
  interface Cliente {
    id_cliente: number;
    usuario: string;
    nombre: string;
    apellidos: string;
    correo: string;
    telefono: string;
    imagen: string;
    direccion: string;
    sexo: string;
  }

  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [recargarClientes, setRecargarClientes] = useState(false);

  interface IconProps {
    sexo: string;
  }

  const getIcono = ({ sexo }: IconProps): JSX.Element => {
    switch (sexo) {
      case "H":
        return <Icon name="male" size={24} color="#ffffff" />;
      case "M":
        return <Icon name="female" size={24} color="#ffffff" />;
      default:
        return <Icon name="transgender" size={24} color="#ffffff" />;
    }
  };

  useEffect(() => {
    async function cargarClientes() {
      try {
        const respuesta = await fetch("http://localhost:3000/api/clientes/");
        const datos = await respuesta.json();
        if (respuesta.ok) {
          setClientes(datos.datos);
        } else {
          setError(datos.mensaje);
          alert(error);
        }
      } catch (error) {
        alert("Error al recuperar los clientes " + error);
      }
    }

    if (isFocused) {
      cargarClientes();
    }
  }, [recargarClientes, isFocused]);

  const handleDelete = async (id: number) => {
    try {
      const respuesta = await fetch("http://localhost:3000/api/clientes/eliminarcliente/" + id, {
        method: "DELETE"
      });
      const data = await respuesta.json();
      if (respuesta.ok) {
        alert("Cliente " + id + " eliminado correctamente");
        setRecargarClientes(!recargarClientes);
      } else {
        alert(data.mensaje);
      }
    } catch (error) {
      alert("Error al eliminar el cliente " + id + " " + error);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={['#24c55e', '#1ca24c', '#156e34']}
        style={styles.container}
      >
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Listado de Clientes</Text>
          <Text style={styles.headerSubtitle}>
            Gestiona los clientes de EasyOrders
          </Text>
        </View>

        <ScrollView style={styles.scrollView}>
          {clientes.map((cliente) => {
            return (
              <View key={cliente.id_cliente} style={styles.card}>
                <Image
                  source={
                    cliente.imagen
                      ? { uri: `data:image/png;base64,${cliente.imagen}` }
                      : require('../../assets/ImagenPerfilPorDefecto.png')
                  }
                  style={styles.clientImage}
                />
                <View style={styles.clientInfoHeader}>
                  <Text style={styles.clientName}>
                    {cliente.nombre} {cliente.apellidos}
                  </Text>
                  <View style={styles.iconContainer}>
                    {getIcono({ sexo: cliente.sexo })}
                  </View>
                </View>
                <View style={styles.clientInfoContainer}>
                  <Text style={styles.clientInfo}>
                    Usuario: {cliente.usuario}
                  </Text>
                  <Text style={styles.clientInfo}>
                    Correo: {cliente.correo}
                  </Text>
                  <Text style={styles.clientInfo}>
                    Teléfono: {cliente.telefono}
                  </Text>
                  <Text style={styles.clientInfo}>
                    Dirección: {cliente.direccion ? cliente.direccion : "No especificada"}
                  </Text>
                </View>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity style={styles.button} onPress={() => handleDelete(cliente.id_cliente)}>
                    <Text style={styles.buttonText}>Eliminar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 10,
  },
  headerContainer: {
    padding: 15,
    alignItems: 'center',
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#ffffff',
    textAlign: 'center',
    opacity: 0.9,
  },
  scrollView: {
    flex: 1,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 15,
    marginVertical: 8,
    marginHorizontal: 5,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  clientImage: {
    height: 250,
    width: '100%',
    borderRadius: 10,
    marginBottom: 15,
  },
  clientInfoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  clientName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#156e34',
    flex: 1,
  },
  iconContainer: {
    backgroundColor: '#24c55e',
    borderRadius: 20,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clientInfoContainer: {
    marginBottom: 15,
  },
  clientInfo: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button: {
    backgroundColor: '#24c55e',
    paddingVertical: 8,
    paddingHorizontal: 25,
    borderRadius: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  }
});