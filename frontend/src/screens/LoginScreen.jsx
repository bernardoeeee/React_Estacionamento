import React, { useState } from "react";
import {
    View,
    TextInput,
    Button,
    Text,
    StyleSheet,
    Alert,
    ImageBackground,
    TouchableOpacity
} from 'react-native';
import { login } from '../services/api';

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); 

    const handleLogin = async () => {
        const result = await login(email, password);
        if (result.success){
            navigation.navigate('Vagas', {user: result.user})
        } else {
            Alert.alert('Erro', result.message)
        }
    }

    return (
        <ImageBackground 
            source={require('./Imagem-Condomínio.11.jpg')} 
            style={styles.background}
            resizeMode="cover"
        >
            <View style={styles.container0}>
                <View style={styles.container}>
                    <Text style={styles.title}> Login </Text>

                    <TextInput 
                        style={styles.input} 
                        placeholder="E-mail" 
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />

                    <View>
                        <TextInput 
                            style={styles.input} 
                            placeholder="Senha" 
                            onChangeText={setPassword}
                            secureTextEntry={!showPassword}
                        />
                        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                            <Text style={styles.toggleText}>
                                {showPassword ? 'Ocultar Senha' : 'Mostrar Senha'}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <Button color={'#1e2ca4'} title="Entrar" onPress={handleLogin} />

                    <Text style={styles.link1} onPress={() => navigation.navigate('Cadastro')}>
                        Criar Conta
                    </Text>
                </View>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        alignItems: 'center'
    },
    container0: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 200,
        height: 10,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        width: 600,
        borderWidth: 3,
        borderColor: 'black',
        borderRadius: 30,
        height: 30,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
    },
    input: {
        borderWidth: 1,
        marginBottom: 10,
        padding: 10,
        borderRadius: 5
    },
    toggleText: {
        color: 'blue',
        marginBottom: 20,
        marginLeft: 5
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
    },
    link: {
        marginTop: 20,
        color: 'blue',
        textAlign: 'center'
    },
    link1: {
        marginTop: 20,
        fontSize: 'large',
        color: 'blue',
        textAlign: 'center'
    },
});
