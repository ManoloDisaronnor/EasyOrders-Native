import { Button, ButtonText } from "@/components/ui/button"
import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlErrorIcon,
  FormControlLabel,
  FormControlLabelText,
  FormControlHelper,
  FormControlHelperText,
} from "@/components/ui/form-control"
import { Input, InputField } from "@/components/ui/input"
import { VStack } from "@/components/ui/vstack"
import { AlertCircleIcon } from "@/components/ui/icon"
import React, { useEffect, useState } from "react"
import { ScrollView, StyleSheet, SafeAreaView, StatusBar, View, Text } from "react-native"
import { LinearGradient } from "expo-linear-gradient"

export function AltaScreen() {
  const [datosInput, setDatosInput] = useState({
    usuario: "",
    nombre: "",
    apellidos: "",
    correo: "",
    password: "",
    telefono: "",
    imagen: "",
    direccion: "",
    sexo: "N",
  })
  const [datosInputValid, setDatosInputValid] = useState({
    usuario: false,
    nombre: false,
    apellidos: false,
    correo: false,
    password: false,
    telefono: false,
    imagen: false,
    direccion: false,
    sexo: false,
  })

  const [datosInputValidErrorMessage, setDatosInputValidErrorMessage] = useState({
    usuario: "Ya existe un usuario con ese nombre de usuario",
    nombre: "Máximo 50 caracteres.",
    apellidos: "Máximo 100 caracteres.",
    correo: "Debe de seguir el formato yourname@example.xxx",
    password: "Máximo 8 caracteres.",
    telefono: "El teléfono debe de tener una longitud de nueve y empezar por 6 o 7.",
    imagen: "",
    direccion: "Máximo 100 caracteres.",
    sexo: "Debe de ser 'H' (Hombre), 'M' (Mujer), 'N'(No especificar).",
  })

  const [guardarCliente, setGuardarCliente] = useState(false);
  const [loadingInsertion, setLoadingInsertion] = useState(false);

  const handleSubmit = () => {
    if (true) {
      setGuardarCliente(true);
    }
  }

  useEffect(() => {
    async function insertCliente() {
      if (guardarCliente) {
        setLoadingInsertion(true);
        setGuardarCliente(false);
        try {
          const cliente = {
            id_cliente: null,
            usuario: datosInput.usuario,
            nombre: datosInput.nombre,
            apellidos: datosInput.apellidos,
            correo: datosInput.correo,
            password: datosInput.password,
            telefono: datosInput.telefono,
            imagen: datosInput.imagen,
            direccion: datosInput.direccion,
            sexo: datosInput.sexo,
          };
          const response = await fetch("http://localhost:3000/api/clientes/altacliente", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(cliente),
          });
          const data = await response.json();
          if (response.ok) {
            alert("Cliente insertado correctamente");
            setDatosInput({
              usuario: "",
              nombre: "",
              apellidos: "",
              correo: "",
              password: "",
              telefono: "",
              imagen: "",
              direccion: "",
              sexo: "N",
            });
            setDatosInputValid({
              usuario: false,
              nombre: false,
              apellidos: false,
              correo: false,
              password: false,
              telefono: false,
              imagen: false,
              direccion: false,
              sexo: false,
            });
          } else {
            if (data.codError == "FALTAN_DATOS") {
              setDatosInputValid({
                usuario: true,
                nombre: true,
                apellidos: false,
                correo: true,
                password: false,
                telefono: true,
                imagen: false,
                direccion: false,
                sexo: true,
              });
              setDatosInputValidErrorMessage({
                usuario: "Debe de rellenar este campo",
                nombre: "Debe de rellenar este campo",
                apellidos: "Máximo 100 caracteres.",
                correo: "Debe de rellenar este campo",
                password: "Máximo 8 caracteres.",
                telefono: "Debe de rellenar este campo",
                imagen: "",
                direccion: "Máximo 100 caracteres.",
                sexo: "Debe de rellenar este campo",
              });
            } else {
              setDatosInputValidErrorMessage({
                usuario: "Ya existe un usuario con ese nombre de usuario",
                nombre: "Máximo 50 caracteres.",
                apellidos: "Máximo 100 caracteres.",
                correo: "Debe de seguir el formato yourname@example.com",
                password: "Máximo 8 caracteres.",
                telefono: "El teléfono debe de tener una longitud de nueve y empezar por 6 o 7.",
                imagen: "",
                direccion: "Máximo 100 caracteres.",
                sexo: "Debe de ser 'H' (Hombre), 'M' (Mujer), 'N'(No especificar).",
              });
            }
            if (data.codError == "USUARIO_EXISTENTE") {
              setDatosInputValid({
                usuario: true,
                nombre: false,
                apellidos: false,
                correo: false,
                password: false,
                telefono: false,
                imagen: false,
                direccion: false,
                sexo: false,
              });
            } else if (data.codError == "CORREO_EXISTENTE") {
              setDatosInputValid({
                usuario: false,
                nombre: false,
                apellidos: false,
                correo: true,
                password: false,
                telefono: false,
                imagen: false,
                direccion: false,
                sexo: false,
              });
              setDatosInputValidErrorMessage({
                usuario: "Ya existe un usuario con ese nombre de usuario",
                nombre: "Máximo 50 caracteres.",
                apellidos: "Máximo 100 caracteres.",
                correo: "Ya existe este correo vinculado a un usuario",
                password: "Máximo 8 caracteres.",
                telefono: "El teléfono debe de tener una longitud de nueve y empezar por 6 o 7.",
                imagen: "",
                direccion: "Máximo 100 caracteres.",
                sexo: "Debe de ser 'H' (Hombre), 'M' (Mujer), 'N'(No especificar).",
              });
            } else if (data.codError == "TELEFONO_EXISTENTE") {
              setDatosInputValid({
                usuario: false,
                nombre: false,
                apellidos: false,
                correo: false,
                password: false,
                telefono: true,
                imagen: false,
                direccion: false,
                sexo: false,
              });
              setDatosInputValidErrorMessage({
                usuario: "Ya existe un usuario con ese nombre de usuario",
                nombre: "Máximo 50 caracteres.",
                apellidos: "Máximo 100 caracteres.",
                correo: "Debe de seguir el formato yourname@example.com",
                password: "Máximo 8 caracteres.",
                telefono: "Ya existe este teléfono vinculado a un usuario",
                imagen: "",
                direccion: "Máximo 100 caracteres.",
                sexo: "Debe de ser 'H' (Hombre), 'M' (Mujer), 'N'(No especificar).",
              });
            }
            alert("Error al insertar el cliente " + data.mensaje);
          }

        } catch (error) {
          alert("Error al insertar el cliente " + error);
        }
        setLoadingInsertion(false);
      }
    }

    insertCliente();
  }, [guardarCliente]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={['#24c55e', '#1ca24c', '#156e34']}
        style={styles.container}
      >
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Registro de Usuario</Text>
          <Text style={styles.headerSubtitle}>
            Complete todos los campos requeridos para crear su cuenta
          </Text>
        </View>

        <ScrollView style={styles.scrollView}>
          <VStack className="w-full rounded-md border border-background-200 p-4" style={styles.formContainer}>
            <FormControl
              isInvalid={datosInputValid.usuario}
              size="lg"
              isDisabled={false}
              isReadOnly={false}
              isRequired={true}
              className="mb-4"
            >
              <FormControlLabel>
                <FormControlLabelText style={styles.labelText}>Usuario</FormControlLabelText>
              </FormControlLabel>
              <Input className="my-1" style={styles.inputContainer}>
                <InputField
                  type="text"
                  placeholder="Usuario"
                  value={datosInput.usuario}
                  onChangeText={(text) => setDatosInput({ ...datosInput, usuario: text })}
                  style={styles.inputField}
                />
              </Input>
              <FormControlHelper>
                <FormControlHelperText style={styles.helperText}>
                  Debe ser un nombre único
                </FormControlHelperText>
              </FormControlHelper>
              <FormControlError>
                <FormControlErrorIcon as={AlertCircleIcon} />
                <FormControlErrorText>
                  {datosInputValidErrorMessage.usuario}
                </FormControlErrorText>
              </FormControlError>
            </FormControl>

            <FormControl
              isInvalid={datosInputValid.nombre}
              size="lg"
              isDisabled={false}
              isReadOnly={false}
              isRequired={true}
              className="mb-4"
            >
              <FormControlLabel>
                <FormControlLabelText style={styles.labelText}>Nombre</FormControlLabelText>
              </FormControlLabel>
              <Input className="my-1" style={styles.inputContainer}>
                <InputField
                  type="text"
                  placeholder="Nombre"
                  value={datosInput.nombre}
                  onChangeText={(text) => setDatosInput({ ...datosInput, nombre: text })}
                  style={styles.inputField}
                />
              </Input>
              <FormControlHelper>
                <FormControlHelperText style={styles.helperText}>
                  Máximo 50 caracteres.
                </FormControlHelperText>
              </FormControlHelper>
              <FormControlError>
                <FormControlErrorIcon as={AlertCircleIcon} />
                <FormControlErrorText>
                  {datosInputValidErrorMessage.nombre}
                </FormControlErrorText>
              </FormControlError>
            </FormControl>

            <FormControl
              isInvalid={datosInputValid.apellidos}
              size="lg"
              isDisabled={false}
              isReadOnly={false}
              isRequired={false}
              className="mb-4"
            >
              <FormControlLabel>
                <FormControlLabelText style={styles.labelText}>Apellidos</FormControlLabelText>
              </FormControlLabel>
              <Input className="my-1" style={styles.inputContainer}>
                <InputField
                  type="text"
                  placeholder="Apellidos"
                  value={datosInput.apellidos}
                  onChangeText={(text) => setDatosInput({ ...datosInput, apellidos: text })}
                  style={styles.inputField}
                />
              </Input>
              <FormControlHelper>
                <FormControlHelperText style={styles.helperText}>
                  Máximo 100 caracteres.
                </FormControlHelperText>
              </FormControlHelper>
              <FormControlError>
                <FormControlErrorIcon as={AlertCircleIcon} />
                <FormControlErrorText>
                  {datosInputValidErrorMessage.apellidos}
                </FormControlErrorText>
              </FormControlError>
            </FormControl>

            <FormControl
              isInvalid={datosInputValid.correo}
              size="lg"
              isDisabled={false}
              isReadOnly={false}
              isRequired={true}
              className="mb-4"
            >
              <FormControlLabel>
                <FormControlLabelText style={styles.labelText}>Correo</FormControlLabelText>
              </FormControlLabel>
              <Input className="my-1" style={styles.inputContainer}>
                <InputField
                  type="text"
                  placeholder="Correo"
                  value={datosInput.correo}
                  onChangeText={(text) => setDatosInput({ ...datosInput, correo: text })}
                  style={styles.inputField}
                />
              </Input>
              <FormControlHelper>
                <FormControlHelperText style={styles.helperText}>
                  Sigue el formato yourname@example.xxx
                </FormControlHelperText>
              </FormControlHelper>
              <FormControlError>
                <FormControlErrorIcon as={AlertCircleIcon} />
                <FormControlErrorText>
                  {datosInputValidErrorMessage.correo}
                </FormControlErrorText>
              </FormControlError>
            </FormControl>

            <FormControl
              isInvalid={datosInputValid.password}
              size="lg"
              isDisabled={false}
              isReadOnly={false}
              isRequired={true}
              className="mb-4"
            >
              <FormControlLabel>
                <FormControlLabelText style={styles.labelText}>Password</FormControlLabelText>
              </FormControlLabel>
              <Input className="my-1" style={styles.inputContainer}>
                <InputField
                  type="password"
                  placeholder="Password"
                  value={datosInput.password}
                  onChangeText={(text) => setDatosInput({ ...datosInput, password: text })}
                  style={styles.inputField}
                />
              </Input>
              <FormControlHelper>
                <FormControlHelperText style={styles.helperText}>
                  Mínimo 8 caracteres.
                </FormControlHelperText>
              </FormControlHelper>
              <FormControlError>
                <FormControlErrorIcon as={AlertCircleIcon} />
                <FormControlErrorText>
                  {datosInputValidErrorMessage.password}
                </FormControlErrorText>
              </FormControlError>
            </FormControl>

            <FormControl
              isInvalid={datosInputValid.telefono}
              size="lg"
              isDisabled={false}
              isReadOnly={false}
              isRequired={true}
              className="mb-4"
            >
              <FormControlLabel>
                <FormControlLabelText style={styles.labelText}>Teléfono</FormControlLabelText>
              </FormControlLabel>
              <Input className="my-1" style={styles.inputContainer}>
                <InputField
                  type="text"
                  placeholder="Teléfono"
                  value={datosInput.telefono}
                  onChangeText={(text) => setDatosInput({ ...datosInput, telefono: text })}
                  style={styles.inputField}
                />
              </Input>
              <FormControlHelper>
                <FormControlHelperText style={styles.helperText}>
                  El teléfono debe de tener una longitud de nueve y empezar por 6 o 7.
                </FormControlHelperText>
              </FormControlHelper>
              <FormControlError>
                <FormControlErrorIcon as={AlertCircleIcon} />
                <FormControlErrorText>
                  {datosInputValidErrorMessage.telefono}
                </FormControlErrorText>
              </FormControlError>
            </FormControl>

            <FormControl
              isInvalid={datosInputValid.direccion}
              size="lg"
              isDisabled={false}
              isReadOnly={false}
              isRequired={false}
              className="mb-4"
            >
              <FormControlLabel>
                <FormControlLabelText style={styles.labelText}>Dirección</FormControlLabelText>
              </FormControlLabel>
              <Input className="my-1" style={styles.inputContainer}>
                <InputField
                  type="text"
                  placeholder="Dirección"
                  value={datosInput.direccion}
                  onChangeText={(text) => setDatosInput({ ...datosInput, direccion: text })}
                  style={styles.inputField}
                />
              </Input>
              <FormControlHelper>
                <FormControlHelperText style={styles.helperText}>
                  Máximo 100 caracteres.
                </FormControlHelperText>
              </FormControlHelper>
              <FormControlError>
                <FormControlErrorIcon as={AlertCircleIcon} />
                <FormControlErrorText>
                  {datosInputValidErrorMessage.direccion}
                </FormControlErrorText>
              </FormControlError>
            </FormControl>

            <FormControl
              isInvalid={datosInputValid.sexo}
              size="lg"
              isDisabled={false}
              isReadOnly={false}
              isRequired={true}
              className="mb-4"
            >
              <FormControlLabel>
                <FormControlLabelText style={styles.labelText}>Sexo</FormControlLabelText>
              </FormControlLabel>
              <Input className="my-1" style={styles.inputContainer}>
                <InputField
                  type="text"
                  placeholder="Sexo"
                  value={datosInput.sexo}
                  onChangeText={(text) => setDatosInput({ ...datosInput, sexo: text })}
                  style={styles.inputField}
                />
              </Input>
              <FormControlHelper>
                <FormControlHelperText style={styles.helperText}>
                  'H' (Hombre), 'M' (Mujer), 'N'(No especificar).
                </FormControlHelperText>
              </FormControlHelper>
              <FormControlError>
                <FormControlErrorIcon as={AlertCircleIcon} />
                <FormControlErrorText>
                  {datosInputValidErrorMessage.sexo}
                </FormControlErrorText>
              </FormControlError>
            </FormControl>

            <Button
              className="w-fit self-end mt-4"
              size="sm"
              onPress={handleSubmit}
              style={styles.submitButton}
            >
              <ButtonText style={styles.buttonText}>Registrarse</ButtonText>
            </Button>
          </VStack>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingTop: 20,
  },
  headerContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#ffffff',
    textAlign: 'center',
    opacity: 0.9,
    marginBottom: 10,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 15,
  },
  formContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  labelText: {
    color: '#156e34',
    fontWeight: '600',
  },
  inputContainer: {
    borderColor: '#24c55e',
    borderWidth: 1.5,
  },
  inputField: {
    color: '#333333',
  },
  helperText: {
    color: '#666666',
  },
  submitButton: {
    backgroundColor: '#24c55e',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 30,
    alignSelf: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  }
});