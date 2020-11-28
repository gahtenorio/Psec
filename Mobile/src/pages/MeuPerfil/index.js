import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons, Feather } from '@expo/vector-icons';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  ScrollView,
  AsyncStorage
} from 'react-native';

import styles from './styles';
import api from '../../services/api';

export default function MeuPerfil() {

  const navigation = useNavigation();

  function navigateBack() {
    navigation.goBack();
  }

  function navigateToEditProfile(data, address) {
    navigation.navigate('EditarPerfil', { data, address });
  }

  const offsetY = new Animated.ValueXY({ x: 0, y: 30 });
  const offsetX = new Animated.ValueXY({ x: 95, y: 0 });
  const opacity = new Animated.Value(0);

  const [visible, setVisible] = useState(false);

  const [data, setData] = useState({});
  const [address, setAddress] = useState({});

  async function loadData() {
    const storageCpf = await AsyncStorage.getItem('@USER_CPF');
    const storageToken = await AsyncStorage.getItem('@TOKEN');

    const res = await api.get(`/user/${storageCpf}`, {
      headers: {
        Authorization: storageToken,
      }
    })
    setData(res.data);
    setAddress(res.data.endereco);
    setVisible(true);
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
        <View style={styles.header}>
          <View style={styles.top}>
            <Text style={styles.title}>Meu Perfil</Text>

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
        <View style={styles.profileContainer}>
          <Text style={styles.profileTitle}>Nome</Text>
          <ShimmerPlaceHolder
            style={{ height: 15, borderRadius: 8, width: 250 }}
            autoRun={true}
            visible={visible}
          >
            <Text style={styles.profileText}>{data.nome} {data.sobrenome}</Text>
          </ShimmerPlaceHolder>
        </View>

        <View style={styles.line} />

        <View style={styles.profileContainer}>
          <Text style={styles.profileTitle}>CPF</Text>
          <ShimmerPlaceHolder
            style={{ height: 15, borderRadius: 8, width: 150 }}
            autoRun={true}
            visible={visible}
          >
            <Text style={styles.profileText}>{data.cpf}</Text>
          </ShimmerPlaceHolder>
        </View>

        <View style={styles.line} />

        <View style={styles.profileContainer}>
          <Text style={styles.profileTitle}>Telefone</Text>
          <ShimmerPlaceHolder
            style={{ height: 15, borderRadius: 8, width: 160 }}
            autoRun={true}
            visible={visible}
          >
            <Text style={styles.profileText}>{data.telefones}</Text>
          </ShimmerPlaceHolder>
        </View>

        <View style={styles.line} />

        <View style={styles.profileContainer}>
          <Text style={styles.profileTitle}>Data de Nascimento</Text>
          <ShimmerPlaceHolder
            style={{ height: 15, borderRadius: 8, width: 120 }}
            autoRun={true}
            visible={visible}
          >
            <Text style={styles.profileText}>{data.dataNascimento}</Text>
          </ShimmerPlaceHolder>
        </View>

        <View style={styles.line} />

        <View style={styles.profileContainer}>
          <Text style={styles.profileTitle}>Email</Text>
          <ShimmerPlaceHolder
            style={{ height: 15, borderRadius: 8, width: 200 }}
            autoRun={true}
            visible={visible}
          >
            <Text style={styles.profileText}>{data.email}</Text>
          </ShimmerPlaceHolder>
        </View>

        <View style={styles.line} />
        <View style={styles.profileContainer}>
          <Text style={styles.profileTitle}>Endereço</Text>
          <ShimmerPlaceHolder
            style={{ height: 15, borderRadius: 8, width: 220 }}
            autoRun={true}
            visible={visible}
          >
            <Text style={styles.profileText}>{address.rua}</Text>
          </ShimmerPlaceHolder>
        </View>

        <View style={styles.line} />

        <View style={styles.profileContainer}>
          <Text style={styles.profileTitle}>CEP</Text>
          <ShimmerPlaceHolder
            style={{ height: 15, borderRadius: 8, width: 90 }}
            autoRun={true}
            visible={visible}
          >
            <Text style={styles.profileText}>{address.cep}</Text>
          </ShimmerPlaceHolder>
        </View>

        <View style={styles.line} />

        <View style={styles.profileContainer}>
          <Text style={styles.profileTitle}>Bairro</Text>
          <ShimmerPlaceHolder
            style={{ height: 15, borderRadius: 8, width: 150 }}
            autoRun={true}
            visible={visible}
          >
            <Text style={styles.profileText}>{address.bairro}</Text>
          </ShimmerPlaceHolder>
        </View>

        <View style={styles.line} />

        <View style={styles.profileContainer}>
          <Text style={styles.profileTitle}>Cidade</Text>
          <ShimmerPlaceHolder
            style={{ height: 15, borderRadius: 8, width: 140 }}
            autoRun={true}
            visible={visible}
          >
            <Text style={styles.profileText}>{address.cidade}</Text>
          </ShimmerPlaceHolder>
        </View>

        <View style={styles.line} />

        <View style={styles.profileContainer}>
          <Text style={styles.profileTitle}>Estado</Text>
          <ShimmerPlaceHolder
            style={{ height: 15, borderRadius: 8, width: 140 }}
            autoRun={true}
            visible={visible}
          >
            <Text style={styles.profileText}>{address.estado}</Text>
          </ShimmerPlaceHolder>
        </View>

        <View style={styles.line} />

        <TouchableOpacity
          style={styles.buttonEditProfile}
          onPress={() => navigateToEditProfile(data, address)}
        >
          <Text style={styles.buttonEditProfileText}>Editar Informações</Text>
        </TouchableOpacity>
      </Animated.ScrollView>
    </ScrollView>
  );
}

