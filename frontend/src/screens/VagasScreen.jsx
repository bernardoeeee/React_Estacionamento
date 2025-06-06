import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  Button,
  FlatList,
  Alert,
  View,
  StyleSheet,
  Platform,
  ScrollView,
  Pressable,
} from "react-native";
import { listarVagas, ocuparVaga, desocuparVaga } from "../services/api";

export default function VagasScreen({ navigation, route }) {
  const [vagas, setVagas] = useState([]);
  const userId = route.params.user.id;

  const fetchVagas = async () => {
    const result = await listarVagas();
    if (result.success) setVagas(result.vagas);
  };

  const handleOcupar = async (vagaId) => {
    const result = await ocuparVaga(vagaId, userId);
    Alert.alert(result.message);
    fetchVagas();
  };

  const handleDesocupar = async (vagaId) => {
    const result = await desocuparVaga(vagaId, userId);
    Alert.alert(result.message);
    fetchVagas();
  };

  useEffect(() => {
    fetchVagas();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.text}>
        Vaga: {item.id} - {item.preferencial_int ? "Preferencial" : "Comum"}
      </Text>
      <Text style={styles.text}>
        Disponível: {item.disponivel ? "Sim" : "Não"}
      </Text>
      <Pressable
        style={[
          styles.button,
          { backgroundColor: item.disponivel ? "#4CAF50" : "#D32F2F" },
        ]}
        onPress={() =>
          item.disponivel
            ? handleOcupar(item.id)
            : handleDesocupar(item.id)
        }
      >
        <Text style={styles.buttonText}>
          {item.disponivel ? "Ocupar" : "Desocupar"}
        </Text>
      </Pressable>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text
        style={styles.link}
        onPress={() => navigation.navigate("Editar", { user: route.params.user })}
      >
        ✏️ Editar usuário
      </Text>
      <FlatList
        data={vagas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    paddingTop: Platform.OS === "android" ? 25 : 0,
  },
  listContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    border:"solid black 1px",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: "500",
  },
  button: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  link: {
    textAlign: "center",
    marginVertical: 20,
    color: "#1e2ca4",
    fontWeight: "bold",
    fontSize: 18,
  },
});
