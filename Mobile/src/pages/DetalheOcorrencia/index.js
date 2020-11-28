import React, { useEffect, useState } from 'react';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  Animated,
  ScrollView,
  AsyncStorage
} from 'react-native';

import styles from './styles';
import logo from '../../assets/art.png';
import api from '../../services/api';

export default function Ocorrencias() {

  const navigation = useNavigation();

  function navigateBack() {
    navigation.goBack();
  }

  const offsetY = new Animated.ValueXY({ x: 0, y: 30 });
  const offsetX = new Animated.ValueXY({ x: 95, y: 0 });
  const opacity = new Animated.Value(0);

  const [visible, setVisible] = useState(false);

  const [detailOccurrence, setDetailOccurrence] = useState({});
  const [address, setAddress] = useState({});

  async function loadOccurences() {
    const idOccurrence = await AsyncStorage.getItem('@ID_OCORRENCIA');
    const storageToken = await AsyncStorage.getItem('@TOKEN');

    const res = await api.get(`/ocorrencia/${idOccurrence}`, {
      headers: {
        Authorization: storageToken
      }
    });

    setDetailOccurrence(res.data);
    setAddress(res.data.enderecoOcorrencia);
    setVisible(true);
  }

  useEffect(() => {
    loadOccurences();

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

      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        <Animated.View style={[styles.occurrence,
        {
          opacity: opacity,
          transform: [
            { translateY: offsetY.y }
          ]
        }
        ]}
        >

          <Text style={styles.occurrenceProperty}>Ocorrido:</Text>
          <ShimmerPlaceHolder
            style={{ height: 15, borderRadius: 8, width: 300, marginTop: 15, marginBottom: 24 }}
            autoRun={true}
            visible={visible}
          >
            <Text style={styles.occurrenceValue}>{detailOccurrence.tipo}</Text>
          </ShimmerPlaceHolder>


          <Text style={styles.occurrenceProperty}>Detalhes:</Text>
          <ShimmerPlaceHolder
            style={{ height: 15, borderRadius: 8, width: 300, marginTop: 15, marginBottom: 24 }}
            autoRun={true}
            visible={visible}
          >
            <Text style={styles.occurrenceValue}>{detailOccurrence.ocorrido}</Text>
          </ShimmerPlaceHolder>

          <Text style={styles.occurrenceProperty}>Horário do ocorrido:</Text>
          <ShimmerPlaceHolder
            style={{ height: 15, borderRadius: 8, width: 300, marginTop: 15, marginBottom: 24 }}
            autoRun={true}
            visible={visible}
          >
            <Text style={styles.occurrenceValue}>{detailOccurrence.horarioOcorrido}</Text>
          </ShimmerPlaceHolder>

          <Text style={styles.occurrenceProperty}>Data de Registro:</Text>
          <ShimmerPlaceHolder
            style={{ height: 15, borderRadius: 8, width: 300, marginTop: 15, marginBottom: 24 }}
            autoRun={true}
            visible={visible}
          >
            <Text style={styles.occurrenceValue}>{detailOccurrence.dataRegistro}</Text>
          </ShimmerPlaceHolder>

          <Text style={styles.occurrenceProperty}>Cidade:</Text>
          <ShimmerPlaceHolder
            style={{ height: 15, borderRadius: 8, width: 300, marginTop: 15, marginBottom: 24 }}
            autoRun={true}
            visible={visible}
          >
            <Text style={styles.occurrenceValue}>{detailOccurrence.cidade}</Text>
          </ShimmerPlaceHolder>

          <Text style={styles.occurrenceProperty}>Rua:</Text>
          <ShimmerPlaceHolder
            style={{ height: 15, borderRadius: 8, width: 300, marginTop: 15, marginBottom: 24 }}
            autoRun={true}
            visible={visible}
          >
            <Text style={styles.occurrenceValue}>{address.rua}</Text>
          </ShimmerPlaceHolder>

          <Text style={styles.occurrenceProperty}>Bairro:</Text>
          <ShimmerPlaceHolder
            style={{ height: 15, borderRadius: 8, width: 300, marginTop: 15, marginBottom: 24 }}
            autoRun={true}
            visible={visible}
          >
            <Text style={styles.occurrenceValue}>{address.bairro}</Text>
          </ShimmerPlaceHolder>

          <Text style={styles.occurrenceProperty}>Complemento:</Text>
          <ShimmerPlaceHolder
            style={{ height: 15, borderRadius: 8, width: 300, marginTop: 15, marginBottom: 24 }}
            autoRun={true}
            visible={visible}
          >
            <Text style={styles.occurrenceValue}>{address.complemento}</Text>
          </ShimmerPlaceHolder>
        </Animated.View>
      </ScrollView>
    </View>
  );
}