import React, { useEffect } from 'react';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Animated
} from 'react-native';

import styles from './styles';
import logo from '../../assets/art.png';


export default function SobreApp() {

  const navigation = useNavigation();

  function navigateBack() {
    navigation.goBack();
  }

  const offsetY = new Animated.ValueXY({ x: 0, y: 30 });
  const offsetX = new Animated.ValueXY({ x: 95, y: 0 });
  const opacity = new Animated.Value(0);

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

      <Animated.View style={
        {
          opacity: opacity,
          transform: [
            { translateY: offsetY.y }
          ]
        }
      }>

        <View style={styles.infoContainer}>
          <Text style={styles.title}>Como Funciona?</Text>
          <Text style={styles.messageText}>O serviço está disponível 24hrs por dia.
          </Text>
          <Text style={styles.messageText}>Após o registro, o Boletim de Ocorrência (BO) é validado pela equipe da
          Delegacia Online, que analisa dados pessoais do requerente, assim como a
          descrição do fato.
        </Text>
        </View>

        <View style={styles.warningContainer}>
          <Text style={styles.title}>Avisos:</Text>
          <Text style={styles.messageText}>
            Falsa comunicação à Polícia constitui crime
            previsto no artigo 340 do Código Penal Brasileiro.
           </Text>
          <Text style={[styles.messageText, { marginTop: 10 }]}>
            Art. 340 - Provocar a ação de autoridade,
            comunicando-lhe a ocorrência de crime ou de contravenção
            que sabe não se ter verificado: Pena - detenção,
           de 1 (um) a 6 (seis) meses, ou multa.</Text>
        </View>
      </Animated.View>
    </View>
  );
}

