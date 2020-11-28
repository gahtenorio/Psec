import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
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
} from 'react-native';

import styles from './styles';
import recoverPassword from '../../assets/recuperarSenha.png';

export default function EsqueciMinhaSenha() {

  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalErrVisible, setModalErrVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  function navigateBack() {
    navigation.goBack();
  }

  function navigateToLogin() {
    navigation.navigate('Login');
  }

  async function handleSubmit() {

    Keyboard.dismiss();

    try {
      setLoading(true);
      setModalVisible(true);

    } catch (err) {
      console.log(err);
      setModalVisible(true);
      setLoading(false);
    }
  }

  const offset = new Animated.ValueXY({ x: 0, y: 95 });
  const opacity = new Animated.Value(0);
  const logo = new Animated.ValueXY({ x: 245, y: 170 });

  useEffect(() => {
    KeyboardDidShowListener = Keyboard.addListener('keyboardDidShow', keyboardDidShow);
    KeyboardDidHideListener = Keyboard.addListener('keyboardDidHide', keyboardDidHide);

    Animated.parallel([
      Animated.spring(offset.y, {
        toValue: 0,
        speed: 4
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
        toValue: 190,
        duration: 200
      }),
      Animated.timing(logo.y, {
        toValue: 130,
        duration: 200
      })
    ]).start();
  }

  function keyboardDidHide() {
    Animated.parallel([
      Animated.timing(logo.x, {
        toValue: 245,
        duration: 200
      }),
      Animated.timing(logo.y, {
        toValue: 170,
        duration: 200
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
          source={recoverPassword}
        />
      </View>

      <Animated.View
        style={[
          styles.containerInput,
          {
            opacity: opacity,
            transform: [
              { translateY: offset.y }
            ]
          }
        ]}
      >
        <TextInput
          style={styles.input}
          placeholder="Digite seu e-mail"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={() => { }}
        />

        <TouchableOpacity
          style={styles.sendEmailButton}
          onPress={handleSubmit}
        >
          {loading ? (
            <ActivityIndicator color="#FFF" size="small" />
          ) : (
              <Text style={styles.sendEmailButtonText}>Recuperar senha</Text>
            )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.backLoginButton}
          onPress={navigateBack}
        >
          <Text style={styles.backLoginButtonText}>Voltar ao login</Text>
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
              <Text style={styles.modalTitle}>Desculpe</Text>
              <Text style={styles.modalText}>Este serviço está indisponível no momento.</Text>

              <TouchableOpacity
                style={{ ...styles.openButton, backgroundColor: "#E02041" }}
                onPress={navigateToLogin}
              >
                <Text style={styles.textStyle}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </KeyboardAvoidingView>
  );
}

