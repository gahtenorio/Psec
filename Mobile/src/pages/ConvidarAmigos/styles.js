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

  messageContainer: {
    marginTop: 50,
    alignItems: 'center'
  },

  messageTitle: {
    marginTop: 20,
    fontSize: 22,
    fontFamily: 'Ubuntu_700Bold',
    fontWeight: 'bold',
    color: '#FFF'
  },

  textContainer: {
    marginHorizontal: 60,
    marginTop: 24
  },

  messageText: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 18,
    fontFamily: 'Roboto_500Medium',
    lineHeight: 24,
    color: '#737380'
  },

  buttonContainer: {
    width: '90%',
    alignSelf: 'center',
    position: 'absolute',
    bottom: 40
  },

  buttonInviteFriends: {
    backgroundColor: '#e02041',
    width: '90%',
    height: 45,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7
  },

  buttonInviteFriendsText: {
    color: '#FFF',
    fontFamily: 'Roboto_500Medium',
    fontSize: 18
  },

}); 