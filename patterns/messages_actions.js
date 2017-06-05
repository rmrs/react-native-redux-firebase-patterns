//@flow

import firebase from '../firebase'

export function messagesRequested() {
  return {
    type: 'MESSAGES_REQUESTED'
  }
}

export function messagesFulfilled(items: Object) {
  return {
    type: 'MESSAGES_FULFILLED',
    items,
  }
}

type Action = {
  type: string,
  items?: Object
}

export function listenToMessages() {
  return (dispatch: (Action => void)) => {
    dispatch(messagesRequested())
    firebase.database().ref('messages')
    .on('value', (snap) => {
      dispatch(messagesFulfilled(snap.val()))
    })
  }
}
