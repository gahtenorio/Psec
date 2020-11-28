import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { TextInputMask } from 'react-native-masked-text';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Animated,
  ScrollView,
  Modal,
  AsyncStorage,
  ActivityIndicator
} from 'react-native';

import styles from './styles';
import api from '../../services/api';

export default function EditarPerfil() {

  const navigation = useNavigation();
  const route = useRoute();

  function navigateBack() {
    navigation.goBack();
  }

  function navigateToHome() {
    navigation.navigate('Home');
  }

  const offsetY = new Animated.ValueXY({ x: 0, y: 30 });
  const offsetX = new Animated.ValueXY({ x: 95, y: 0 });
  const opacity = new Animated.Value(0);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalErrVisible, setModalErrVisible] = useState(false);
  const [modalSuccessVisible, setModalSuccessVisible] = useState(false);
  const [modalErrPasswordVisible, setModalErrPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const data = route.params.data;
  const address = route.params.address;

  const cpf = data.cpf;
  const dataNascimento = data.dataNascimento;
  const perfis = [2];
  const [senha, setSenha] = useState('');
  const [nome, setNome] = useState(`${data.nome}`);
  const [sobrenome, setSobrenome] = useState(`${data.sobrenome}`);
  const [telefones, setTelefone] = useState(`${data.telefones}`);
  const [email, setEmail] = useState(`${data.email}`);
  const [cep, setCep] = useState(`${address.cep}`);
  const [rua, setRua] = useState(`${address.rua}`);
  const [numero, setNumero] = useState(`${address.numero}`);
  const [bairro, setBairro] = useState(`${address.bairro}`);
  const [cidade, setCidade] = useState(`${address.cidade}`);
  const [estado, setEstado] = useState(`${address.estado}`);

  async function handleEditProfile() {
    if (senha.length === 0) {
      setModalVisible(false);
      setModalErrPasswordVisible(true);
    } else {
      try {
        setLoading(true);

        const storageToken = await AsyncStorage.getItem('@TOKEN');
        const id = await AsyncStorage.getItem('@ID');

        const res = await api.put(`/user/${id}`, {
          nome,
          sobrenome,
          cpf,
          telefones: [telefones],
          dataNascimento,
          email,
          senha,
          perfis,
          endereco: { cep, rua, numero, bairro, cidade, estado }
        }, {
          headers: {
            Authorization: storageToken
          }
        });
        setModalSuccessVisible(true);
        setModalVisible(false);
      } catch (error) {
        setModalErrVisible(true);
        setModalVisible(false);
      }
    }
  }

  useEffect(() => {
    Animated.parallel([
      Animated.spring(offsetY.y, {
        toValue: 0,
        speed: 4,
      }),
      Animated.spring(offsetX.x, {
        toValue: 0,
        speed: 4
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 200
      })
    ]).start();
  }, []);

  return (

    <ScrollView style={styles.container}>
      <Animated.View
        style={
          {
            opacity: opacity,
            transform: [
              { translateX: offsetX.x }
            ]
          }
        }
      >
        <Text style={styles.title}>Toque para editar</Text>

        <View style={styles.editProfileContainer}>
          <Text style={styles.editProfileTitle}>Nome</Text>
          <TextInput
            style={styles.input}
            placeholderTextColor="#999"
            placeholder="Nome"
            autoCapitalize="words"
            autoCorrect={false}
            value={nome}
            onChangeText={setNome}
          />
        </View>

        <View style={styles.line} />

        <View style={styles.editProfileContainer}>
          <Text style={styles.editProfileTitle}>Sobrenome</Text>
          <TextInput
            style={styles.input}
            placeholderTextColor="#999"
            placeholder="Sobrenome"
            autoCapitalize="words"
            autoCorrect={false}
            value={sobrenome}
            onChangeText={setSobrenome}
          />
        </View>

        <View style={styles.line} />

        <View style={styles.editProfileContainer}>
          <Text style={styles.editProfileTitle}>Telefone</Text>
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
        </View>

        <View style={styles.line} />

        <View style={styles.editProfileContainer}>
          <Text style={styles.editProfileTitle}>Email</Text>
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
        </View>

        <View style={styles.line} />

        <View style={styles.editProfileContainer}>
          <Text style={styles.editProfileTitle}>Endereço</Text>
          <TextInput
            style={styles.input}
            placeholder="Rua"
            placeholderTextColor="#999"
            autoCapitalize="words"
            autoCorrect={false}
            value={rua}
            onChangeText={setRua}
          />
        </View>

        <View style={styles.line} />

        <View style={styles.editProfileContainer}>
          <Text style={styles.editProfileTitle}>Número</Text>
          <TextInput
            style={styles.input}
            placeholder="Número"
            placeholderTextColor="#999"
            keyboardType="numeric"
            autoCorrect={false}
            value={numero}
            onChangeText={setNumero}
          />
        </View>

        <View style={styles.line} />

        <View style={styles.editProfileContainer}>
          <Text style={styles.editProfileTitle}>CEP</Text>
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
        </View>

        <View style={styles.line} />

        <View style={styles.editProfileContainer}>
          <Text style={styles.editProfileTitle}>Bairro</Text>
          <TextInput
            style={styles.input}
            autoCapitalize="words"
            placeholder="Bairro"
            placeholderTextColor="#999"
            autoCorrect={false}
            value={bairro}
            onChangeText={setBairro}
          />
        </View>

        <View style={styles.line} />

        <View style={styles.editProfileContainer}>
          <Text style={styles.editProfileTitle}>Cidade</Text>
          <TextInput
            style={styles.input}
            placeholder="Cidade"
            placeholderTextColor="#999"
            autoCapitalize="words"
            autoCorrect={false}
            value={cidade}
            onChangeText={setCidade}
          />
        </View>

        <View style={styles.line} />

        <View style={styles.editProfileContainer}>
          <Text style={styles.editProfileTitle}>Estado</Text>
          <TextInput
            style={styles.input}
            placeholder="Estado"
            placeholderTextColor="#999"
            autoCapitalize="words"
            autoCorrect={false}
            value={estado}
            onChangeText={setEstado}
          />
        </View>

        <View style={styles.line} />

        <TouchableOpacity
          style={styles.buttonFinish}
          onPress={() => { setModalVisible(true) }}
        >
          <Text style={styles.buttonFinishText}>Concluir</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonCancel}
          onPress={navigateBack}
        >
          <Text style={styles.buttonCancelText}>Cancelar</Text>
        </TouchableOpacity>

        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalTitle}>Digite sua senha para concluir</Text>
                <TextInput
                  style={styles.inputPassword}
                  placeholder="Digite sua senha aqui"
                  placeholderTextColor="#999"
                  autoCompleteType="off"
                  secureTextEntry={true}
                  autoCorrect={false}
                  value={senha}
                  onChangeText={setSenha}
                />

                <TouchableOpacity
                  style={{ ...styles.openButton, backgroundColor: "#E02041" }}
                  onPress={handleEditProfile}
                >
                  {loading ? (
                    <ActivityIndicator color="#FFF" size="small" />
                  ) : (
                      <Text style={[styles.textStyle]}>Concluir</Text>
                    )}
                </TouchableOpacity>

                <TouchableOpacity
                  style={{ ...styles.openButton, backgroundColor: "#E02041" }}
                  onPress={() => { setModalVisible(false) }}
                >
                  <Text style={[styles.textStyle]}>Cancelar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>

        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalErrPasswordVisible}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalTitle}>Ooopsss</Text>
                <Text style={styles.modalText}>Digite sua senha.</Text>

                <TouchableOpacity
                  style={{ ...styles.openButton, backgroundColor: "#E02041" }}
                  onPress={() => { setModalErrPasswordVisible(false), setModalVisible(true) }}
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
            visible={modalSuccessVisible}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalTitle}>Sucesso</Text>
                <Text style={styles.modalText}>Seus dados foram atualizados.</Text>

                <TouchableOpacity
                  style={{ ...styles.openButton, backgroundColor: "#E02041" }}
                  onPress={navigateToHome}
                >
                  <Text style={[styles.textStyle, { width: 60 }]}>OK!</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </Animated.View>

      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalErrVisible}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalTitle}>Houve um erro</Text>
              <Text style={styles.modalText}>Verifique os dados e tente novamente.</Text>

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
    </ScrollView>

  );
}