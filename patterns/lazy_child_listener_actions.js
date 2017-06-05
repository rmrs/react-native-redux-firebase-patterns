//@flow

import firebase from '../firebase'

export function listenRequested(metaType: string) {
  return {
    type: 'FIREBASE_LISTEN_REQUESTED',
    metaType
  }
}

export function listenRejected(metaType: string, error: string) {
  return {
    type: 'FIREBASE_LISTEN_REJECTED',
    metaType,
    error
  }
}

export function listenFulfilled(metaType: string, items: Object) {
  return {
    type: 'FIREBASE_LISTEN_FULFILLED',
    metaType,
    items
  }
}

export function listenChildAdded(metaType: string, id: string, value: Object) {
  return {
    type: 'FIREBASE_LISTEN_CHILD_ADDED',
    metaType,
    id,
    value,
  }
}

export function listenChildChanged(metaType: string, id: string, value: Object) {
  return {
    type: 'FIREBASE_LISTEN_CHILD_CHANGED',
    metaType,
    id,
    value,
  }
}

export function listenChildRemoved(metaType: string, id: string) {
  return {
    type: 'FIREBASE_LISTEN_CHILD_REMOVED',
    metaType,
    id,
  }
}

type Action = {
  type: string,
  metaType: string,
  error?: string,
  items?: Object,
  id?: string,
  value?: Object,
}

export function listenToPath(path: string, metaType: string) {
  return (dispatch: Action => void, getState: () => Object) => {
    const ref = firebase.database().ref(path)
    dispatch(listenRequested(metaType))
    ref.on('child_added', (snap) => {
      if (getState().database[metaType].inProgress) {
        return
      }
      const val: Object = snap.val()
      dispatch(listenChildAdded(metaType, snap.key, val))
    })
    ref.on('child_changed', (snap) => {
      if (getState().database[metaType].inProgress) {
        return
      }
      const val: Object = snap.val()
      dispatch(listenChildChanged(metaType, snap.key, val))
    })
    ref.on('child_removed', (snap) => {
      if (getState().database[metaType].inProgress) {
        return
      }
      dispatch(listenChildRemoved(metaType, snap.key))
    })
    return ref.once('value').then(snap => {
      //better to have an empty object then a null
      //value if data does not exist
      const val = snap.val()
      const value = val ? val : { }
      dispatch(listenFulfilled(metaType, value))
    })
    .catch(error => {
      dispatch(listenRejected(metaType, error))
    })
  }
}
