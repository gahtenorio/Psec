import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#191919'
  },

  title: {
    fontSize: 25,
    fontFamily: 'Ubuntu_700Bold',
    paddingBottom: 16,
    paddingTop: 20,
    alignSelf: 'center',
    color: '#FFF',

  },

  editProfileContainer: {
    marginTop: 20,
    marginLeft: 24,
    marginRight: 24,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  editProfileTitle: {
    fontSize: 16,
    fontFamily: 'Roboto_400Regular',
    fontWeight: 'bold',
    color: '#FFF'
  },

  input: {
    fontSize: 16,
    fontFamily: 'Roboto_500Medium',
    fontWeight: 'bold',
    color: '#737380',
  },

  line: {
    height: '0.1%',
    width: '90%',
    alignSelf: 'center',
    marginTop: 10,
    backgroundColor: '#F2F2F2',
    opacity: 0.5
  },

  buttonFinish: {
    backgroundColor: '#e02041',
    width: '90%',
    height: 45,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    marginTop: 20,
  },

  buttonFinishText: {
    color: '#FFF',
    fontFamily: 'Roboto_500Medium',
    fontSize: 18
  },

  buttonCancel: {
    backgroundColor: '#e02041',
    width: '90%',
    height: 45,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    marginTop: 10,
    marginBottom: 80
  },

  buttonCancelText: {
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

  inputPassword: {
    marginBottom: 15,
    fontSize: 15,
    fontFamily: 'Roboto_400Regular',
    textAlign: 'center'
  }

});