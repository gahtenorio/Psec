import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
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

import styles from './styles';
import img from '../../assets/endereco.png';
import api from '../../services/api';

export default function endereco() {

  const navigation = useNavigation();

  function navigateToLogin() {
    navigation.navigate('Login');
    AsyncStorage.clear();
  }

  const [modalVisible, setModalVisible] = useState(false);
  const [modalErrVisible, setModalErrVisible] = useState(false);
  const [modalErrIncompleteVisible, setModalErrIncompleteVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const [offset] = useState(new Animated.ValueXY({ x: 0, y: 95 }));
  const [opacity] = useState(new Animated.Value(0));
  const [logo] = useState(new Animated.ValueXY({ x: 115, y: 135 }));

  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [cpf, setCpf] = useState('');
  const [telefones, setTelefone] = useState('');
  const [dataNascimento, setNascimento] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const perfis = [2];
  const [cep, setCep] = useState('');
  const [rua, setRua] = useState('');
  const [numero, setNumero] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');

  async function finishRegister() {
    const nome = await AsyncStorage.getItem('@NOME');
    setNome(nome);

    const sobrenome = await AsyncStorage.getItem('@SOBRENOME');
    setSobrenome(sobrenome);

    const cpf = await AsyncStorage.getItem('@CPF');
    setCpf(cpf);

    const telefones = await AsyncStorage.getItem('@TELEFONE');
    setTelefone(telefones);

    const dataNascimento = await AsyncStorage.getItem('@NASCIMENTO');
    setNascimento(dataNascimento);

    const email = await AsyncStorage.getItem('@EMAIL');
    setEmail(email);

    const senha = await AsyncStorage.getItem('@SENHA');
    setSenha(senha);

    Keyboard.dismiss();

    if (nome === null
      || sobrenome === null
      || cpf === null
      || telefones === null
      || dataNascimento === null
      || email === null
      || senha === null
      || cep.length === 0
      || rua.length === 0
      || numero.length === 0
      || bairro.length === 0
      || cidade.length === 0
      || estado.length === 0
    ) {
      setModalErrIncompleteVisible(true);
    } else {
      try {
        setLoading(true);

        const res = await api.post('/user', {
          nome,
          sobrenome,
          cpf,
          telefones: [telefones],
          dataNascimento,
          email,
          senha,
          perfis,
          endereco: { cep, rua, numero, bairro, cidade, estado }
        });

        setModalVisible(true);

      } catch (err) {
        setModalErrVisible(true);
        setLoading(false);
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
        toValue: 0,
        duration: 200
      }),
      Animated.timing(logo.y, {
        toValue: 0,
        duration: 200
      })
    ]).start();
  }

  function keyboardDidHide() {
    Animated.parallel([
      Animated.timing(logo.x, {
        toValue: 115,
        duration: 300
      }),
      Animated.timing(logo.y, {
        toValue: 135,
        duration: 300
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
          source={img}
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
          type={'custom'}
          options={{
            mask: '99999-999'
          }}
          style={styles.input}
          placeholder="CEP"
          placeholderTextColor="#999"
          keyboardType="numeric"
          autoCorrect={false}
          value={cep}
          onChangeText={cep => setCep(cep)}
        />

        <TextInput
          style={styles.input}
          placeholder="Rua"
          placeholderTextColor="#999"
          autoCapitalize="words"
          autoCorrect={false}
          value={rua}
          onChangeText={setRua}
        />

        <TextInput
          style={styles.input}
          placeholder="Número"
          placeholderTextColor="#999"
          keyboardType="numeric"
          autoCorrect={false}
          value={numero}
          onChangeText={setNumero}
        />

        <TextInput
          style={styles.input}
          autoCapitalize="words"
          placeholder="Bairro"
          placeholderTextColor="#999"
          autoCorrect={false}
          value={bairro}
          onChangeText={setBairro}
        />

        <TextInput
          style={styles.input}
          placeholder="Cidade"
          placeholderTextColor="#999"
          autoCapitalize="words"
          autoCorrect={false}
          value={cidade}
          onChangeText={setCidade}
        />

        <TextInput
          style={styles.input}
          placeholder="Estado"
          placeholderTextColor="#999"
          autoCapitalize="words"
          autoCorrect={false}
          value={estado}
          onChangeText={setEstado}
        />

        <TouchableOpacity
          style={styles.finishButton}
          onPress={finishRegister}
        >
          {loading ? (
            <ActivityIndicator color="#FFF" size="small" />
          ) : (
              <Text style={styles.finishButtonText}>Finalizar cadastro</Text>
            )}
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
              <Text style={styles.modalTitle}>Sucesso!</Text>
              <Text style={styles.modalText}>Sua conta foi criada, agora faça login para entrar no app.</Text>

              <TouchableOpacity
                style={{ ...styles.openButton, backgroundColor: "#E02041" }}
                onPress={navigateToLogin}
              >
                <Text style={styles.textStyle}>Fazer Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>

      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalErrVisible}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalTitle}>Houve um erro no cadastro</Text>
              <Text style={styles.modalText}>Verifique seus dados e tente novamente.</Text>

              <TouchableOpacity
                style={{ ...styles.openButton, backgroundColor: "#E02041" }}
                onPress={() => { setModalErrVisible(false) }}
              >
                <Text style={[styles.textStyle, { width: 60 }]}>OK!</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>

      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalErrIncompleteVisible}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalTitle}>Ooopsss</Text>
              <Text style={styles.modalText}>Preencha todos os dados para continuar.</Text>

              <TouchableOpacity
                style={{ ...styles.openButton, backgroundColor: "#E02041" }}
                onPress={() => { setModalErrIncompleteVisible(false) }}
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