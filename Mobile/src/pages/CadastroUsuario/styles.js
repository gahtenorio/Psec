import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight + 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#191919'
  },

  containerLogo: {
    justifyContent: 'center'
  },

  containerInputs: {
    flex: 1,
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    paddingBottom: 50
  },

  containerName: {
    width: '90%',
    alignItems: 'center',
    flexDirection: 'row'
  },

  inputName: {
    backgroundColor: '#FFF',
    width: '49%',
    marginBottom: 15,
    color: '#222',
    fontFamily: 'Roboto_500Medium',
    fontSize: 17,
    borderRadius: 7,
    padding: 10,
    marginRight: 5
  },

  input: {
    backgroundColor: '#FFF',
    width: '90%',
    marginBottom: 15,
    color: '#222',
    fontFamily: 'Roboto_500Medium',
    fontSize: 17,
    borderRadius: 7,
    padding: 10
  },

  buttonContinue: {
    marginTop: 10,
    backgroundColor: '#e02041',
    width: '90%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7
  },

  buttonContinueText: {
    color: '#FFF',
    fontFamily: 'Roboto_500Medium',
    fontSize: 18
  },

  centeredView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },

  modalView: {
    margin: 20,
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },

  openButton: {
    borderRadius: 20,
    padding: 12,
    elevation: 2,
    marginTop: 10
  },

  textStyle: {
    color: '#FFF',
    fontFamily: 'Roboto_500Medium',
    fontSize: 14,
    textAlign: 'center'
  },

  modalTitle: {
    fontSize: 18,
    fontFamily: 'Ubuntu_700Bold',
    marginBottom: 20
  },

  modalText: {
    marginBottom: 15,
    fontFamily: 'Roboto_400Regular',
    lineHeight: 24,
    textAlign: 'center'
  }
})