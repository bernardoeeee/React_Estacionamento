import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  Alert,
  ImageBackground,
} from "react-native";
import { cadastro } from "../services/api";

export default function CadastroScreen({ navigation }) {
  const [form, setForm] = useState({
    username: "",
    password: "",
    email: "",
    placa: "",
    cor: "",
    modelo: "",
  });

  const handleChange = (name, value) => setForm({ ...form, [name]: value });

  const handleSubmit = async () => {
    const result = await cadastro(form);
    console.log(form);

    if (result.success) {
      Alert.alert("Sucesso", result.message);
      navigation.navigate("Login");
    } else {
      Alert.alert("Erro", result.message);
    }
  };

  return (
    <ImageBackground
      source={require("./Imagem-Condomínio.11.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container0}>
        <View style={styles.container}>
          <Text style={styles.title}> Cadastro </Text>
          {["username", "password", "email", "placa", "cor", "modelo"].map(
            (field) => (
              <TextInput
                key={field}
                placeholder={field}
                secureTextEntry={field === "password"}
                onChangeText={(value) => handleChange(field, value)}
                style={styles.input}
              />
            )
          )}
          <Button color={"#1e2ca4"} title="Cadastrar" onPress={handleSubmit} />
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    width: "100%", // força ocupar a largura
    height: "100%", // força ocupar a altura
    alignItems: "center",
  },
  title: { fontSize: 24, marginBottom: 20, textAlign: "center" },
  container0: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 200,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    width: 600,
    border: "solid black 3px",
    borderRadius: 30,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
  input: { borderWidth: 1, marginBottom: 10, padding: 10, borderRadius: 5 },
});
