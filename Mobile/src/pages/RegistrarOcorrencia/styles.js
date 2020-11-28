import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
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

  buttonBack: {
    position: 'absolute',
    right: 190
  },

  name: {
    fontSize: 20,
    color: '#E02041',
    fontWeight: 'bold',
    marginLeft: 8
  },

  inputsContainer: {
    alignItems: 'center',
    marginTop: 50
  },

  inputs: {
    backgroundColor: '#FFF',
    width: '90%',
    marginBottom: 15,
    color: '#222',
    fontSize: 17,
    fontFamily: 'Roboto_500Medium',
    borderRadius: 7,
    padding: 10
  },

  buttonRegister: {
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: '#e02041',
    width: '90%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7
  },

  buttonRegisterText: {
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
    marginBottom: 10
  },

  textStyle: {
    color: '#FFF',
    fontSize: 14,
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
    fontSize: 15,
    fontFamily: 'Roboto_400Regular',
    lineHeight: 24,
    textAlign: 'center'
  }
});