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
    right: '50%'
  },

  name: {
    fontSize: 20,
    color: '#E02041',
    fontWeight: 'bold',
    marginLeft: 8
  },

  infoContainer: {
    marginTop: 30,
    marginLeft: 24,
    marginRight: 24
  },

  title: {
    fontSize: 18,
    fontFamily: 'Ubuntu_700Bold',
    color: '#FFF',
    marginBottom: 10
  },

  messageText: {
    fontSize: 16,
    fontFamily: 'Roboto_500Medium',
    lineHeight: 24,
    color: '#737380',
  },

  warningContainer: {
    marginTop: 30,
    marginLeft: 24,
    marginRight: 24
  }

});