import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#191919'
  },

  header: {
    marginTop: 30,
    alignItems: 'center',
    marginBottom: 50
  },

  top: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  name: {
    fontSize: 20,
    color: '#E02041',
    fontWeight: 'bold',
    marginLeft: 8
  },


  lineTop: {
    height: '0.1%',
    width: 250,
    alignSelf: 'center',
    backgroundColor: '#F2F2F2',
    opacity: 0.5
  },

  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    marginLeft: 24
  },

  buttonText: {
    fontSize: 16,
    fontFamily: 'Roboto_500Medium',
    color: '#FFF',
    marginLeft: 25
  },

  lineBotton: {
    height: '0.1%',
    width: 250,
    marginTop: 15,
    alignSelf: 'center',
    backgroundColor: '#F2F2F2',
    opacity: 0.5
  },

  footerContainer: {
    position: 'absolute',
    bottom: 0
  },

  footerLogo: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 20
  },

  footerLogoText: {
    fontSize: 18,
    marginLeft: 5,
    color: '#E02041'
  },

  exitButton: {
    backgroundColor: '#E02041',
    width: 280,
    height: 50,
    justifyContent: 'center'
  },

  exitButtonText: {
    fontSize: 18,
    fontFamily: 'Roboto_500Medium',
    marginLeft: 25,
    color: '#FFF'
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

  buttonsExitContainer: {
    alignItems: 'center',
    flexDirection: 'row'
  },

  openButton: {
    borderRadius: 20,
    padding: 12,
    elevation: 2,
    marginTop: 10,
    width: 100,
    margin: 10
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

});