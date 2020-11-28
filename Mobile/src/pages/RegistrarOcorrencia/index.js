import React, { useEffect, useState } from 'react';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { TextInputMask } from 'react-native-masked-text';
import {
  View,
  Modal,
  Image,
  Text,
  TouchableOpacity,
  Animated,
  TextInput,
  ActivityIndicator,
  AsyncStorage,
} from 'react-native';

import styles from './styles';
import logo from '../../assets/art.png';
import api from '../../services/api';

export default function RegistrarOcorrencia() {

  const navigation = useNavigation();

  function navigateBack() {
    navigation.goBack();
  }

  function navigateToHome() {
    navigation.navigate('Home');
  }

  function navigateToMenuOccurence() {
    navigation.navigate('MenuRegistroOcorrencia');
  }

  const offsetY = new Animated.ValueXY({ x: 0, y: 100 });
  const offsetX = new Animated.ValueXY({ x: 95, y: 0 });
  const opacity = new Animated.Value(0);

  useEffect(() => {
    Animated.parallel([
      Animated.spring(offsetY.y, {
        toValue: 0,
        speed: 4
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

  const [modalVisible, setModalVisible] = useState(false);
  const [modalErrVisible, setModalErrVisible] = useState(false);
  const [modalErrIncompleteVisible, setModalErrIncompleteVisible] = useState(false);

  const [loading, setLoading] = useState(false);

  const [tipo, setTipo] = useState('');
  const [horarioOcorrido, setHorarioOcorrido] = useState('');
  const [rua, setRua] = useState('');
  const [bairro, setBairro] = useState('');
  const [complemento, setComplemento] = useState('');
  const [ocorrido, setOcorrido] = useState('');
  const [cidade, setCidade] = useState('');

  async function register() {

    const tipo = await AsyncStorage.getItem('@TIPO_OCORRENCIA');
    setTipo(tipo);

    if (
      horarioOcorrido.length === 0
      || rua.length === 0
      || bairro.length === 0
      || ocorrido.length === 0
      || cidade.length === 0
    ) {
      setModalErrIncompleteVisible(true);
    } else {
      try {
        setLoading(true);

        const storageToken = await AsyncStorage.getItem('@TOKEN');

        const id = await AsyncStorage.getItem('@ID');

        const idUser = id;

        const res = await api.post('/ocorrencia', {
          usuario: { id },
          idUser,
          horarioOcorrido,
          enderecoOcorrencia: { rua, bairro, complemento },
          ocorrido,
          cidade,
          tipo
        }, {
          headers: {
            Authorization: storageToken
          }
        });

        setModalVisible(true);

      } catch (err) {
        setModalErrVisible(true);
        setLoading(false);
      }
    }
  }

  return (

    <View style={styles.container}>
      <Animated.View
        style={[
          {
            opacity: opacity,
            transform: [
              { translateX: offsetX.x }
            ]
          }
        ]}
      >
        <View style={styles.header}>
          <View style={styles.top}>
            <Image source={logo} />
            <Text style={styles.name}>Psec</Text>

            <TouchableOpacity
              style={styles.buttonBack}
              onPress={navigateBack}
            >
              <Feather name="arrow-left" size={28} color="#E02041" />
            </TouchableOpacity>
          </View>

          <MaterialIcons name="keyboard-arrow-down" size={20} color="#E02041" />
        </View>
      </Animated.View>

      <Animated.ScrollView style={
        {
          opacity: opacity,
          transform: [
            { translateY: offsetY.y }
          ]
        }
      }>
        <View style={styles.inputsContainer}>
          <TextInputMask
            type={'datetime'}
            options={{
              format: 'HH:mm'
            }}
            style={styles.inputs}
            placeholder="Horário do ocorrido"
            placeholderTextColor="#999"
            keyboardType="numeric"
            value={horarioOcorrido}
            onChangeText={horarioOcorrido => setHorarioOcorrido(horarioOcorrido)}

          />

          <TextInput
            style={styles.inputs}
            placeholder="Cidade"
            placeholderTextColor="#999"
            autoCapitalize="words"
            autoCorrect={false}
            value={cidade}
            onChangeText={setCidade}
          />

          <TextInput
            style={styles.inputs}
            placeholder="Rua"
            placeholderTextColor="#999"
            autoCapitalize="words"
            autoCorrect={false}
            value={rua}
            onChangeText={setRua}
          />

          <TextInput
            style={styles.inputs}
            placeholder="Bairro"
            placeholderTextColor="#999"
            autoCapitalize="words"
            autoCorrect={false}
            value={bairro}
            onChangeText={setBairro}
          />

          <TextInput
            style={styles.inputs}
            placeholder="Complemento (Não é obrigatório)"
            placeholderTextColor="#999"
            value={complemento}
            onChangeText={setComplemento}
          />

          <TextInput
            style={styles.inputs}
            multiline={true}
            numberOfLines={4}
            placeholder="Descrição do ocorrido"
            placeholderTextColor="#999"
            value={ocorrido}
            onChangeText={setOcorrido}
          />

          <TouchableOpacity
            style={styles.buttonRegister}
            onPress={register}
          >
            {loading ? (
              <ActivityIndicator color="#FFF" size="small" />
            ) : (
                <Text style={styles.buttonRegisterText}>Registrar Ocorrência</Text>
              )}
          </TouchableOpacity>
        </View>
      </Animated.ScrollView>

      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalErrVisible}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalTitle}>Houve um erro no registro</Text>
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

      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalTitle}>Sucesso!</Text>
              <Text style={styles.modalText}>Ocorrência Registrada!</Text>

              <TouchableOpacity
                style={{ ...styles.openButton, backgroundColor: "#E02041" }}
                onPress={navigateToHome}
              >
                <Text style={styles.textStyle}>Voltar para tela inicial</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{ ...styles.openButton, backgroundColor: "#E02041" }}
                onPress={navigateToMenuOccurence}
              >
                <Text style={styles.textStyle}>Registrar nova ocorrência</Text>
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
    </View>
  );
}