import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#191919'
  },

  header: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 30
  },

  top: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },

  buttonDrawer: {
    position: 'absolute',
    right: '55%'
  },

  name: {
    fontSize: 20,
    color: '#E02041',
    fontWeight: 'bold',
    marginLeft: 8
  },

  textContainer: {
    width: 350,
    marginTop: 60,
  },

  title: {
    fontSize: 30,
    fontFamily: 'Ubuntu_700Bold',
    marginBottom: 20,
    color: '#FFF',
  },

  description: {
    fontSize: 17,
    fontFamily: 'Roboto_400Regular',
    color: '#737380'
  },

  buttonContainer: {
    flex: 1,
    marginTop: 50,
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%'
  },

  buttonList: {
    backgroundColor: '#e02041',
    width: '90%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7
  },

  listText: {
    color: '#FFF',
    fontFamily: 'Roboto_500Medium',
    fontSize: 18
  },

  buttonRegister: {
    marginTop: 10,
    backgroundColor: '#e02041',
    width: '90%',
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7
  },

  registerText: {
    color: '#FFF',
    fontFamily: 'Roboto_500Medium',
    fontSize: 25
  }
});