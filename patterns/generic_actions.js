//@flow

import firebase from '../firebase'

export function listenRequested(metaType: string) {
  return {
    type: 'FIREBASE_LISTEN_REQUESTED',
    metaType,
  }
}

export function listenFulfilled(metaType: string, items: Object) {
  return {
    type: 'FIREBASE_LISTEN_FULFILLED',
    metaType,
    items
  }
}

type Action = {
  type: string,
  metaType: string,
  items?: Object
}

export function listenToPath(metaType: string, path: string) {
  return (dispatch: (Action => void)) => {
    dispatch(listenRequested(metaType))
    firebase.database().ref(path)
    .on('value', (snap) => {
      dispatch(listenFulfilled(metaType, snap.val()))
    })
  }
}

export function listenToMessages() {
  return listenToPath('messages', 'messages')
}
export function listenToUserContacts() {
  return listenToPath('userContacts', 'user/contacts')
}
