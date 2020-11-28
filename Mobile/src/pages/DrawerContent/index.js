import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Modal,
  AsyncStorage
} from 'react-native';

import styles from './styles';
import logo from '../../assets/art.png';


export default function DrawerContent() {

  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  function navigateToProfile() {
    navigation.navigate('Perfil');
  }

  function navigateToHelp() {
    navigation.navigate('SobreApp');
  }

  function navigateToInviteFriends() {
    navigation.navigate('ConvidarAmigos');
  }

  function navigateToLogin() {
    navigation.navigate('Login');
    AsyncStorage.clear();
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.top}>
          <Image source={logo} />
          <Text style={styles.name}>Psec</Text>
        </View>

      </View>

      <View style={styles.lineTop} />

      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={navigateToProfile}
      >
        <MaterialIcons name="person-outline" size={24} color="#FFF" />
        <Text style={styles.buttonText}>Meu Perfil</Text>
      </TouchableOpacity>

      <View style={styles.lineBotton} />

      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={navigateToHelp}
      >
        <MaterialIcons name="help-outline" size={24} color="#FFF" />
        <Text style={styles.buttonText}>Sobre o App</Text>
      </TouchableOpacity>

      <View style={styles.lineBotton} />

      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={navigateToInviteFriends}
      >
        <FontAwesome name="paper-plane-o" size={24} color="#FFF" />
        <Text style={styles.buttonText}>Convidar Amigos</Text>
      </TouchableOpacity>

      <View style={styles.lineBotton} />

      <View style={styles.footerContainer}>
        <View style={styles.footerLogo}>
          <Image source={logo} />
          <Text style={styles.footerLogoText}>Psec</Text>
        </View>

        <TouchableOpacity
          style={styles.exitButton}
          onPress={() => { setModalVisible(true) }}
        >
          <Text style={styles.exitButtonText}>Sair do aplicativo</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalTitle}>Deseja sair?</Text>

              <View style={styles.buttonsExitContainer}>
                <TouchableOpacity
                  style={{ ...styles.openButton, backgroundColor: "#E02041" }}
                  onPress={() => { setModalVisible(false) }}
                >
                  <Text style={styles.textStyle}>NÃO</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{ ...styles.openButton, backgroundColor: "#E02041" }}
                  onPress={navigateToLogin}
                >
                  <Text style={styles.textStyle}>SIM</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </View >
  );
}