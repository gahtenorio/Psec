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

  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#E02041'
  },

  profileContainer: {
    marginTop: 20,
    marginLeft: 24,
    marginRight: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  profileTitle: {
    fontSize: 16,
    fontFamily: 'Roboto_400Regular',
    fontWeight: 'bold',
    color: '#FFF'
  },

  profileText: {
    fontSize: 16,
    fontFamily: 'Roboto_500Medium',
    fontWeight: 'bold',
    color: '#737380'
  },

  line: {
    height: '0.1%',
    width: '90%',
    alignSelf: 'center',
    marginTop: 10,
    backgroundColor: '#F2F2F2',
    opacity: 0.5
  },

  buttonEditProfile: {
    backgroundColor: '#e02041',
    width: '90%',
    height: 45,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    marginTop: 50,
    marginBottom: 20
  },

  buttonEditProfileText: {
    color: '#FFF',
    fontFamily: 'Roboto_500Medium',
    fontSize: 18
  },

});