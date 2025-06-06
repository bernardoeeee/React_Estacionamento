import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from './src/screens/LoginScreen'
import CadastroScreen from './src/screens/CadastroScreen'
import VagasScreen from './src/screens/VagasScreen'
import EditarUserScreen from "./src/screens/EditarUserScreen";

const Stack = createNativeStackNavigator()

export default function App(){
    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Cadastro" component={CadastroScreen} />
                <Stack.Screen name="Vagas" component={VagasScreen} />
                <Stack.Screen name="Editar" component={EditarUserScreen} />
                
            </Stack.Navigator>
        </NavigationContainer>
    )
}