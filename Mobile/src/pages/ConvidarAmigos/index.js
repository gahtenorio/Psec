import React, { useEffect } from 'react';
import { Feather, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  Share,
  Animated
} from 'react-native';

import styles from './styles';
import logo from '../../assets/art.png';


export default function ConvidarAmigos() {

  const navigation = useNavigation();

  function navigateBack() {
    navigation.goBack();
  }

  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'Psec || Registre Ocorrências Online!\nO Psec é um aplicativo rápido, simples e seguro para registrar ocorrências.\nBaixe-o gratuitamente clicando em: www.psec.com.br'
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
        } else {
        }
      } else if (result.action === Share.dismissedAction) {
      }
    } catch (error) {
      alert(error.message);
    }
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
        <View style={styles.messageContainer}>
          <FontAwesome name="paper-plane-o" size={50} color="#FFF" />
          <Text style={styles.messageTitle}>Compartilhe com seus amigos!</Text>

          <View style={styles.textContainer}>
            <Text style={styles.messageText}>
              O Psec é um aplicativo rápido, simples
              e seguro usado para registrar ocorrências.
            </Text>
            <Text style={styles.messageText}>Convide seus amigos!</Text>
          </View>
        </View>
      </Animated.View>
      
      <Animated.View style={[
        styles.buttonContainer,
        {
          opacity: opacity,
          transform: [
            { translateY: offsetY.y }
          ]
        }
      ]}>
      <TouchableOpacity
          style={styles.buttonInviteFriends}
          onPress={onShare}
        >
          <Text style={styles.buttonInviteFriendsText}>Convidar Amigos</Text>
        </TouchableOpacity>
        </Animated.View>
    </View>
  );
}
