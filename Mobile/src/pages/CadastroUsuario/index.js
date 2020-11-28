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
  AsyncStorage,
} from 'react-native';

import styles from './styles';
import cadastroImg from '../../assets/cadastro.png';

export default function CadastroUsuario() {

  const navigation = useNavigation();

  const [modalErrIncompleteVisible, setModalErrIncompleteVisible] = useState(false);

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

  async function handleContinue() {
    if (
      nome.length === 0
      || sobrenome.length === 0
      || cpf.length < 14
      || telefones.length < 14
      || dataNascimento.length < 10
      || email.length === 0
      || senha.length === 0
    ) {
      setModalErrIncompleteVisible(true);
    } else {
      await AsyncStorage.setItem('@NOME', nome);
      await AsyncStorage.setItem('@SOBRENOME', sobrenome);
      await AsyncStorage.setItem('@CPF', cpf);
      await AsyncStorage.setItem('@TELEFONE', telefones);
      await AsyncStorage.setItem('@NASCIMENTO', dataNascimento);
      await AsyncStorage.setItem('@EMAIL', email);
      await AsyncStorage.setItem('@SENHA', senha);

      navigation.navigate('CadastroEndereco');
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
        duration: 400
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
          source={cadastroImg}
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
        <View style={styles.containerName}>
          <TextInput
            style={styles.inputName}
            placeholderTextColor="#999"
            placeholder="Nome"
            autoCapitalize="words"
            autoCorrect={false}
            value={nome}
            onChangeText={setNome}
          />

          <TextInput
            style={styles.inputName}
            placeholderTextColor="#999"
            placeholder="Sobrenome"
            autoCapitalize="words"
            autoCorrect={false}
            value={sobrenome}
            onChangeText={setSobrenome}
          />
        </View>

        <TextInputMask
          type={'cpf'}
          style={styles.input}
          placeholderTextColor="#999"
          placeholder="CPF"
          autoCompleteType="off"
          keyboardType="numeric"
          autoCorrect={false}
          value={cpf}
          onChangeText={cpf => { setCpf(cpf) }}
        />

        <TextInputMask
          type={'cel-phone'}
          options={{
            maskType: 'BRL',
            withDDD: true,
            dddMask: '(99)'
          }}
          style={styles.input}
          placeholderTextColor="#999"
          placeholder="Telefone"
          keyboardType="phone-pad"
          autoCorrect={false}
          value={telefones}
          onChangeText={telefones => setTelefone(telefones)}
        />

        <TextInputMask
          type={'datetime'}
          options={{
            format: 'DD/MM/YYYY'
          }}
          style={styles.input}
          placeholderTextColor="#999"
          placeholder="Nascimento"
          keyboardType="numeric"
          autoCorrect={false}
          value={dataNascimento}
          onChangeText={dataNascimento => setNascimento(dataNascimento)}
        />

        <TextInput
          style={styles.input}
          placeholderTextColor="#999"
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize={'none'}
          autoCorrect={false}
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={styles.input}
          placeholderTextColor="#999"
          placeholder="Senha"
          autoCompleteType="off"
          secureTextEntry={true}
          autoCorrect={false}
          value={senha}
          onChangeText={setSenha}
        />

        <TouchableOpacity
          style={styles.buttonContinue}
          onPress={handleContinue}
        >
          <Text style={styles.buttonContinueText}>Continuar</Text>
        </TouchableOpacity>
      </Animated.View>

      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalErrIncompleteVisible}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalTitle}>Houve um erro</Text>
              <Text style={styles.modalText}>Verifique seus dados e tente novamente.</Text>

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