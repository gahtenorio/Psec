import React, { useEffect, useState } from 'react';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
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
import assalto from '../../assets/assalto.png';
import agressao from '../../assets/agressao.png';
import assedio from '../../assets/assedio.png';
import homicidio from '../../assets/homicidio.png';
import violenciaContraMulher from '../../assets/violenciaDomesticaContraMulher.png';
import acidente from '../../assets/acidente.png';
import ocorrencia from '../../assets/ocorrencia.png'

export default function MenuRegistroOcorrencia() {

  const navigation = useNavigation();

  function Assalto() {
    navigation.navigate('RegistrarOcorrencia');
    setOccurrence('Assalto');
  }

  function violenciaDomestica() {
    navigation.navigate('RegistrarOcorrencia');
    setOccurrence('ViolenciaDomestica');
  }

  function Assedio() {
    navigation.navigate('RegistrarOcorrencia');
    setOccurrence('Assedio');
  }

  function Agressao() {
    navigation.navigate('RegistrarOcorrencia');
    setOccurrence('Agressao');
  }

  function Homicidio() {
    navigation.navigate('RegistrarOcorrencia');
    setOccurrence('Homicidio');
  }

  function Acidente() {
    navigation.navigate('RegistrarOcorrencia');
    setOccurrence('Acidente');
  }

  function Outros() {
    navigation.navigate('RegistrarOcorrencia');
    setOccurrence('Outros');
  }

  function navigateBack() {
    navigation.goBack();
  }

  const offsetY = new Animated.ValueXY({ x: 0, y: 30 });
  const offsetX = new Animated.ValueXY({ x: 95, y: 0 });
  const opacity = new Animated.Value(0);

  const [occurrence, setOccurrence] = useState('');

  if (occurrence.length != 0) {
    AsyncStorage.setItem('@TIPO_OCORRENCIA', occurrence);
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

    <View style={styles.container}>
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
        <Animated.View
          style={
            {
              opacity: opacity,
              transform: [
                { translateX: offsetX.x }
              ]
            }}>
          <Text style={styles.title}>Registrar Ocorrência</Text>
          <Text style={styles.description}>Selecione o tipo de ocorrência a ser registrada.</Text>
        </Animated.View>

        <Animated.View
          style={[
            styles.tabsContainer,
            {
              opacity: opacity,
              transform: [
                { translateX: offsetX.x }
              ]
            }]}>
          <ScrollView
            horizontal={true}
            contentContainerStyle={{ paddingLeft: 10, paddingRight: 20 }}
            showsHorizontalScrollIndicator={false}
          >
            <TouchableOpacity
              style={styles.tabItem}
              onPress={Assalto}
            >
              <Image source={assalto} style={{ height: 37, width: 37 }} />
              <Text style={styles.tabText}>Assalto</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.tabItem}
              onPress={violenciaDomestica}
            >
              <Image source={violenciaContraMulher} style={{ height: 37, width: 37 }} />
              <Text style={styles.tabText}>Violência doméstica</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.tabItem}
              onPress={Assedio}
            >
              <Image source={assedio} style={{ height: 37, width: 37 }} />
              <Text style={styles.tabText}>Assédio</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.tabItem}
              onPress={Agressao}
            >
              <Image source={agressao} style={{ height: 37, width: 37 }} />
              <Text style={styles.tabText}>agressão</Text>
            </TouchableOpacity>


            <TouchableOpacity
              style={styles.tabItem}
              onPress={Homicidio}
            >
              <Image source={homicidio} style={{ height: 40, width: 40 }} />
              <Text style={styles.tabText}>Homicídio</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.tabItem}
              onPress={Acidente}
            >
              <Image source={acidente} style={{ height: 37, width: 37 }} />
              <Text style={styles.tabText}>Acidente</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.tabItem}
              onPress={Outros}
            >
              <Image source={ocorrencia} style={{ height: 37, width: 37 }} />
              <Text style={styles.tabText}>Outros</Text>
            </TouchableOpacity>
          </ScrollView>
        </Animated.View>

        <Animated.View
          style={[
            styles.warningContainer,
            {
              opacity: opacity,
              transform: [
                { translateY: offsetY.y }
              ]
            }]}>
          <Text style={styles.warningTitle}>Avisos:</Text>
          <Text style={styles.warningText}>
            Falsa comunicação à Polícia constitui crime
            previsto no artigo 340 do Código Penal Brasileiro.
           </Text>
          <Text style={styles.warningText}>
            Art. 340 - Provocar a ação de autoridade,
            comunicando-lhe a ocorrência de crime ou de contravenção
            que sabe não se ter verificado: Pena - detenção,
           de 1 (um) a 6 (seis) meses, ou multa.</Text>
        </Animated.View>
      </ScrollView>
    </View>
  );
} 