//@flow

import firebase from '../firebase'

firebase.database().ref('messages').on('value', (snap) => {
  //do something with snap
})
