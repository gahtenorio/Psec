import React from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';

const AppStack = createStackNavigator();

import DrawerRoutes from './drawer.routes';
import MeuPerfil from '../pages/MeuPerfil';
import EditarPerfil from '../pages/EditarPerfil';
import SobreApp from '../pages/SobreApp';
import ConvidarAmigos from '../pages/ConvidarAmigos';
import Login from '../pages/Login';
import CadastroUsuario from '../pages/CadastroUsuario';
import CadastroEndereco from '../pages/CadastroEndereco';
import EsqueciMinhaSenha from '../pages/EsqueciMinhaSenha';
import MenuRegistroOcorrencia from '../pages/MenuRegistroOcorrencia';
import RegistrarOcrrencia from '../pages/RegistrarOcorrencia';
import Ocorrencias from '../pages/Ocorrencias';
import DetalheOcorrencia from '../pages/DetalheOcorrencia';


export default function Routes() {
  return (
    <AppStack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
      }}
    >
      <AppStack.Screen name="Login" component={Login} />
      <AppStack.Screen name="CadastroUsuario" component={CadastroUsuario} />
      <AppStack.Screen name="CadastroEndereco" component={CadastroEndereco} />
      <AppStack.Screen name="EsqueciMinhaSenha" component={EsqueciMinhaSenha} />
      <AppStack.Screen name="Home" component={DrawerRoutes} />
      <AppStack.Screen name="Perfil" component={MeuPerfil} />
      <AppStack.Screen name="EditarPerfil" component={EditarPerfil} />
      <AppStack.Screen name="SobreApp" component={SobreApp} />
      <AppStack.Screen name="ConvidarAmigos" component={ConvidarAmigos} />
      <AppStack.Screen name="MenuRegistroOcorrencia" component={MenuRegistroOcorrencia} />
      <AppStack.Screen name="RegistrarOcorrencia" component={RegistrarOcrrencia} />
      <AppStack.Screen name="Ocorrencias" component={Ocorrencias} />
      <AppStack.Screen name="DetalheOcorrencia" component={DetalheOcorrencia} />
    </AppStack.Navigator>
  );
}