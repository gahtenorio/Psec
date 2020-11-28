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

  title: {
    fontSize: 25,
    fontFamily: 'Ubuntu_700Bold',
    marginBottom: 16,
    marginTop: 48,
    marginLeft: 24,
    color: '#FFF',
    fontWeight: 'bold'
  },

  description: {
    fontSize: 16,
    fontFamily: 'Roboto_400Regular',
    alignSelf: 'center',
    color: '#737380'
  },

  tabsContainer: {
    height: 100,
    marginTop: 20,
  },

  tabItem: {
    width: 100,
    height: 100,
    backgroundColor: '#E02041',
    borderRadius: 3,
    marginLeft: 10,
    padding: 10,
    justifyContent: 'space-between'
  },

  tabText: {
    fontSize: 13,
    fontFamily: 'Roboto_500Medium',
    color: '#FFF'
  },

  warningContainer: {
    padding: 24,
    margin: 24,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
    marginBottom: 16,
    marginTop: 46
  },

  warningTitle: {
    fontSize: 20,
    fontFamily: 'Ubuntu_700Bold',
    marginTop: 10,
  },

  warningText: {
    fontSize: 18,
    fontFamily: 'Roboto_400Regular',
    lineHeight: 24,
    marginTop: 20,
    color: '#737380'
  }
})