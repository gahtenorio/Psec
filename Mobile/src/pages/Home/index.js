import React, { useEffect, useState } from 'react';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  Animated,
  AsyncStorage, Modal
} from 'react-native';

import styles from './styles';
import logo from '../../assets/art.png';
import api from '../../services/api';

export default function Home() {

  const [visible, setVisible] = useState(true);

  const navigation = useNavigation();

  function navigateToOccurrences() {
    navigation.navigate('Ocorrencias');
  }

  function navigateToRegisterOccurrences() {
    navigation.navigate('MenuRegistroOcorrencia');
  }

  function openDrawer() {
    navigation.dispatch(DrawerActions.openDrawer);
  }

  const offsetY = new Animated.ValueXY({ x: 0, y: 30 });
  const offsetX = new Animated.ValueXY({ x: 95, y: 0 });
  const opacity = new Animated.Value(0);

  const [name, setName] = useState('');
  const [id, setId] = useState('');

  AsyncStorage.setItem('@ID', id);

  async function loadData() {
    const storageCpf = await AsyncStorage.getItem('@USER_CPF');
    const storageToken = await AsyncStorage.getItem('@TOKEN');

    const res = await api.get(`/user/${storageCpf}`, {
      headers: {
        Authorization: storageToken,
      }
    })
    setName(res.data.nome);
    setId(JSON.stringify(res.data.id));
    setTimeout(() => setVisible(false), 1500)

  }


  useEffect(() => {
    loadData();

    Animated.parallel([
      Animated.spring(offsetY.y, {
        toValue: 0,
        speed: 4,
      }),
      Animated.spring(offsetX.x, {
        toValue: 0,
        speed: 4,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 200
      })
    ]).start();
  }, []);

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
              style={styles.buttonDrawer}
              onPress={openDrawer}
            >
              <Feather name="align-left" size={28} color="#E02041" />
            </TouchableOpacity>
          </View>

          <MaterialIcons name="keyboard-arrow-down" size={20} color="#E02041" />
        </View>

        <View style={styles.textContainer}>
            <Text style={styles.title}>Olá, {name}!</Text>
          <Text style={styles.description}>Escolha o que deseja fazer.</Text>
        </View>
      </Animated.View>

      <Animated.View
        style={[
          styles.buttonContainer,
          {
            opacity: opacity,
            transform: [
              { translateY: offsetY.y }
            ]
          }
        ]}
      >
        <TouchableOpacity
          style={styles.buttonList}
          onPress={navigateToOccurrences}
        >
          <Text style={styles.listText}>Visualizar minhas ocorrências</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonRegister}
          onPress={navigateToRegisterOccurrences}
        >
          <Text style={styles.registerText}>Registrar Ocorrências</Text>
        </TouchableOpacity>
      </Animated.View>

      <Modal
      visible={visible}
      animationType='none'
      >
        <View style={{flex: 1, backgroundColor: '#191919', justifyContent: 'center', alignItems: 'center'}}>
      <LottieView
      autoPlay
      loop
      resizeMode='contain'
      source={require('../../assets/lf30_editor_39aAuE.json')}
      />
      </View>
      </Modal>
    </View>
  );
}
