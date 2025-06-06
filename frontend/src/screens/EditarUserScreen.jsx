import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  ScrollView,
  Pressable,
  Platform,
} from "react-native";
import { editarUsuario } from "../services/api";

export default function EditUserScreen({ route, navigation }) {
  const { user } = route.params;

  const [form, setForm] = useState({
    username: user.username || "",
    email: user.email || "",
    password: "",
    placa: user.placa || "",
    cor: user.cor || "",
    modelo: user.modelo || "",
  });

  const handleChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const salvar = async () => {
    try {
      const dadosParaEnviar = { ...form };
      if (dadosParaEnviar.password === "") {
        delete dadosParaEnviar.password;
      }

      const result = await editarUsuario(user.id, dadosParaEnviar);

      if (result.success) {
        Alert.alert("Sucesso", "Dados atualizados com sucesso!");
        navigation.goBack();
      } else {
        Alert.alert("Erro", result.message || "Erro ao atualizar dados");
      }
    } catch (error) {
      Alert.alert("Erro", "Não foi possível conectar ao servidor");
      console.error(error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Editar Usuário</Text>

        <TextInput
          style={styles.input}
          value={form.username}
          onChangeText={(value) => handleChange("username", value)}
          placeholder="Nome de usuário"
        />

        <TextInput
          style={styles.input}
          value={form.email}
          onChangeText={(value) => handleChange("email", value)}
          placeholder="E-mail"
          keyboardType="email-address"
        />

        <TextInput
          style={styles.input}
          value={form.password}
          onChangeText={(value) => handleChange("password", value)}
          placeholder="Nova senha (opcional)"
          secureTextEntry
        />

        <TextInput
          style={styles.input}
          value={form.placa}
          onChangeText={(value) => handleChange("placa", value)}
          placeholder="Placa do veículo"
        />

        <TextInput
          style={styles.input}
          value={form.cor}
          onChangeText={(value) => handleChange("cor", value)}
          placeholder="Cor do veículo"
        />

        <TextInput
          style={styles.input}
          value={form.modelo}
          onChangeText={(value) => handleChange("modelo", value)}
          placeholder="Modelo do veículo"
        />

        <Pressable style={styles.button} onPress={salvar}>
          <Text style={styles.buttonText}>Salvar</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
    backgroundColor: "#f0f4f5",
  },
  container: {
    backgroundColor: "#e3f2f2",
    padding: 25,
    borderRadius: 20,
    width: "100%",
    maxWidth: 500,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  title: {
    fontSize: 26,
    marginBottom: 25,
    textAlign: "center",
    fontWeight: "bold",
    color: "#1e2ca4",
  },
  input: {
    borderWidth: 1,
    borderColor: "#bbb",
    marginBottom: 15,
    padding: 12,
    borderRadius: 10,
    backgroundColor: "#ffffff",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#1e2ca4",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
});
