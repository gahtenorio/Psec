import React, { useEffect, useState } from 'react';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  Animated,
  AsyncStorage,
  Modal
} from 'react-native';

import styles from './styles';
import logo from '../../assets/art.png';
import api from '../../services/api';

export default function RegistroOcorrencia() {

  const navigation = useNavigation();

  function navigateBack() {
    navigation.goBack();
  }

  const offsetY = new Animated.ValueXY({ x: 0, y: 30 });
  const offsetX = new Animated.ValueXY({ x: 95, y: 0 });
  const opacity = new Animated.Value(0);

  const [modalVisible, setModalVisible] = useState(false);

  const [occurrences, setOccurrences] = useState([]);

  const total = occurrences.length;

  async function loadOccurrences() {
    const storageToken = await AsyncStorage.getItem('@TOKEN');
    const idUser = await AsyncStorage.getItem('@ID');

    const res = await api.get(`/ocorrencia/user?idUser=${idUser}`, {
      headers: {
        Authorization: storageToken,
      }
    });
    setOccurrences(res.data);
  }

  async function deleteOccurrence(id) {
    setModalVisible(false);

    const storageToken = await AsyncStorage.getItem('@TOKEN');

    try {
      await api.delete(`/ocorrencia/${id}`, {
        headers: {
          Authorization: storageToken
        }
      })
      setOccurrences(occurrences.filter(occurrence => occurrence.id !== id));
    } catch (error) {
    }
  }

  async function detailOccurrence(id) {

    await AsyncStorage.setItem('@ID_OCORRENCIA', JSON.stringify(id));

    navigation.navigate('DetalheOcorrencia');

  }

  useEffect(() => {
    loadOccurrences();

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

        <Text style={styles.title}>Minhas Ocorrências</Text>
        <Text style={styles.contText}>
          Total de<Text style={styles.contTextBold}> {total} Ocorrêcias</Text>
        </Text>
      </Animated.View>

      <Animated.FlatList
        style={[styles.occurrenceList,
        {
          opacity: opacity,
          transform: [
            { translateY: offsetY.y }
          ]
        }
        ]}
        data={occurrences}
        keyExtractor={occurrence => String(occurrence.id)}
        showsVerticalScrollIndicator={false}
        renderItem={({ item: occurrence }) => (
          <View style={styles.occurrence}>
            <TouchableOpacity
              style={styles.buttonTrash}
              onPress={() => { setModalVisible(true) }}
            >
              <Feather name="trash-2" size={25} color="#E02041" />
            </TouchableOpacity>

            <Text style={styles.occurrenceProperty}>Ocorrido:</Text>
            <Text style={styles.occurrenceValue}>{occurrence.tipo}</Text>

            <Text style={styles.occurrenceProperty}>Cidade:</Text>
            <Text style={styles.occurrenceValue}>{occurrence.cidade}</Text>

            <Text style={styles.occurrenceProperty}>Horário do ocorrido:</Text>
            <Text style={styles.occurrenceValue}>{occurrence.horarioOcorrido}</Text>

            <Text style={styles.occurrenceProperty}>Data de Registro:</Text>
            <Text style={styles.occurrenceValue}>{occurrence.dataRegistro}</Text>

            <TouchableOpacity
              style={styles.detailsButton}
              onPress={() => detailOccurrence(occurrence.id)}
            >
              <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
              <Feather name="arrow-right" size={20} color="#E02041" />
            </TouchableOpacity>

            <View style={styles.centeredView}>
              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
              >
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <Text style={styles.modalTitle}>Deseja excluir?</Text>

                    <View style={styles.buttonsExitContainer}>
                      <TouchableOpacity
                        style={{ ...styles.openButton, backgroundColor: "#E02041" }}
                        onPress={() => { setModalVisible(false) }}
                      >
                        <Text style={styles.textStyle}>NÃO</Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={{ ...styles.openButton, backgroundColor: "#E02041" }}
                        onPress={() => deleteOccurrence(occurrence.id)}
                      >
                        <Text style={styles.textStyle}>SIM</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Modal>
            </View>
          </View>
        )}
      />
    </View>
  );
}