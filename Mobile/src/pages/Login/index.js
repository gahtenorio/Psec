import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { TextInputMask } from 'react-native-masked-text';
import {
  View,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Text,
  Animated,
  Keyboard,
  Modal,
  ActivityIndicator,
  AsyncStorage
} from 'react-native';

import logoImg from '../../assets/logo.png';
import styles from './styles';
import api from '../../services/api';


export default function Login() {

  const navigation = useNavigation();

  function navigateToRegisterUser() {
    navigation.navigate('CadastroUsuario');
  }

  function navigateToForgotPassword() {
    navigation.navigate('EsqueciMinhaSenha');
  }

  const [offset] = useState(new Animated.ValueXY({ x: 0, y: 95 }));
  const [opacity] = useState(new Animated.Value(0));
  const [logo] = useState(new Animated.ValueXY({ x: 130, y: 155 }));

  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [CampModalVisible, setCampModalVisible] = useState(false);

  async function handleLogin() {
    Keyboard.dismiss();

    if (cpf.length === 0 || senha.length === 0) {
      setCampModalVisible(true);
    } else {
      try {
        setLoading(true);

        const res = await api.post('/login', { cpf, senha });

        await AsyncStorage.setItem('@USER_CPF', cpf);
        await AsyncStorage.setItem('@TOKEN', res.headers.authorization);

        navigation.navigate('Home');

        setCpf('');
        setSenha('');
        setLoading(false);

      } catch (error) {
        setModalVisible(true);
        setLoading(false);
        setCpf('');
        setSenha('');
      }
    }
  }

  useEffect(() => {
    KeyboardDidShowListener = Keyboard.addListener('keyboardDidShow', keyboardDidShow);
    KeyboardDidHideListener = Keyboard.addListener('keyboardDidHide', keyboardDidHide);

    Animated.parallel([
      Animated.spring(offset.y, {
        toValue: 0,
        speed: 4,
        bounciness: 20
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 200
      })
    ]).start();
  }, []);

  function keyboardDidShow() {
    Animated.parallel([
      Animated.timing(logo.x, {
        toValue: 90,
        duration: 200
      }),
      Animated.timing(logo.y, {
        toValue: 115,
        duration: 200
      })
    ]).start();
  }

  function keyboardDidHide() {
    Animated.parallel([
      Animated.timing(logo.x, {
        toValue: 130,
        duration: 200
      }),
      Animated.timing(logo.y, {
        toValue: 155,
        duration: 200
      })
    ]).start();
  }

  return (

    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.containerLogo}>
        <Animated.Image
          style={{
            width: logo.x,
            height: logo.y
          }}
          source={logoImg}
        />
      </View>

      <Animated.View
        style={[
          styles.containerInputs,
          {
            opacity: opacity,
            transform: [
              { translateY: offset.y }
            ]
          }
        ]}
      >
        <TextInputMask
          type={'cpf'}
          style={styles.input}
          placeholder="Seu CPF"
          placeholderTextColor="#999"
          autoCompleteType="off"
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="numeric"
          value={cpf}
          onChangeText={cpf => { setCpf(cpf) }}
        />

        <TextInput
          style={styles.input}
          placeholder="Sua senha"
          placeholderTextColor="#999"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry
          returnKeyType="send"
          value={senha}
          onChangeText={setSenha}
        />

        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleLogin}
        >
          {loading ? (
            <ActivityIndicator color="#FFF" size="small" />
          ) : (
              <Text style={styles.submitButtonText}>Acessar</Text>
            )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.createButton}
          onPress={navigateToRegisterUser}
        >
          <Text style={styles.createButtonText}>Criar conta</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.forgotPasswordButton}
          onPress={navigateToForgotPassword}
        >
          <Text style={styles.forgotPasswordButtonText}>Esqueci minha senha </Text>
          <Feather name="lock" size={15} color="#e02041" />
        </TouchableOpacity>
      </Animated.View>

      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalTitle}>Houve um erro no login</Text>
              <Text style={styles.modalText}>Verifique seus dados e tente novamente.</Text>

              <TouchableOpacity
                style={{ ...styles.openButton, backgroundColor: "#E02041" }}
                onPress={() => { setModalVisible(false) }}
              >
                <Text style={styles.textStyle}>Tentar novamente</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>

      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={CampModalVisible}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalTitle}>Ooopsss</Text>
              <Text style={styles.modalText}>Preencha CPF e senha para continuar!</Text>

              <TouchableOpacity
                style={{ ...styles.openButton, backgroundColor: "#E02041" }}
                onPress={() => { setCampModalVisible(false) }}
              >
                <Text style={[styles.textStyle, { width: 60 }]}>OK!</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </KeyboardAvoidingView>
  );
}