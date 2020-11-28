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

  occurrence: {
    padding: 24,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
    margin: 24,
  },

  occurrenceProperty: {
    fontSize: 14,
    fontFamily: 'Ubuntu_700Bold',
    color: '#41414D',
  },

  occurrenceValue: {
    marginTop: 5,
    fontSize: 16,
    fontFamily: 'Roboto_400Regular',
    lineHeight: 24,
    marginBottom: 24,
    color: '#737380'
  },

}); 