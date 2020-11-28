import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
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
    right: '55%'
  },

  name: {
    fontSize: 20,
    color: '#E02041',
    fontWeight: 'bold',
    marginLeft: 8
  },

  title: {
    fontSize: 25,
    fontFamily: 'Ubuntu_700Bold',
    marginBottom: 16,
    marginTop: 48,
    color: '#FFF',

  },

  contText: {
    fontSize: 16,
    fontFamily: 'Roboto_400Regular',
    color: '#737380'
  },

  contTextBold: {
    fontFamily: 'Ubuntu_700Bold',
  },

  occurrenceList: {
    marginTop: 32
  },

  occurrence: {
    padding: 24,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
    marginBottom: 16,
  },

  buttonTrash: {
    top: '5%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: '10%'
  },

  occurrenceProperty: {
    fontSize: 14,
    fontFamily: 'Ubuntu_700Bold',
    color: '#41414D',
  },

  occurrenceValue: {
    marginTop: 8,
    fontSize: 16,
    fontFamily: 'Roboto_400Regular',
    marginBottom: 24,
    color: '#737380'
  },

  detailsButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  detailsButtonText: {
    color: '#E02041',
    fontSize: 15,
    fontFamily: 'Roboto_500Medium',
    fontWeight: 'bold'
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
  }

});