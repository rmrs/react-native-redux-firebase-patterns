import * as actions from '../actions'
import * as types from '../types'
import RNFirebase from 'react-native-firebase'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { getInitialState } from '../reducer'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

describe('firebase actions', () => {
  beforeEach(() => {
    RNFirebase.reset()
  })

  test(types.firebase.FIREBASE_RESET_DATA, () => {
    const expectedAction = {
      type: types.firebase.FIREBASE_RESET_DATA,
    }
    expect(actions.clearData()).
    toEqual(expectedAction)
  })

  test(types.firebase.FIREBASE_UPDATE_REQUESTED, () => {
    const expectedAction = {
      type: types.firebase.FIREBASE_UPDATE_REQUESTED,
      metaType: types.metaTypes.updateMessage
    }
    expect(actions.updateRequested(types.metaTypes.updateMessage)).
    toEqual(expectedAction)
  })

  test(types.firebase.FIREBASE_UPDATE_REJECTED, () => {
    const error = 'error'
    const expectedAction = {
      type: types.firebase.FIREBASE_UPDATE_REJECTED,
      metaType: types.metaTypes.updateMessage,
      error
    }
    expect(actions.updateRejected(types.metaTypes.updateMessage, error)).
    toEqual(expectedAction)
  })

  test(types.firebase.FIREBASE_UPDATE_FULFILLED, () => {
    const expectedAction = {
      type: types.firebase.FIREBASE_UPDATE_FULFILLED,
      metaType: types.metaTypes.updateMessage
    }
    expect(actions.updateFulfilled(types.metaTypes.updateMessage)).
    toEqual(expectedAction)
  })

  test(types.firebase.FIREBASE_REMOVE_REQUESTED, () => {
    const expectedAction = {
      type: types.firebase.FIREBASE_REMOVE_REQUESTED,
      metaType: types.metaTypes.removeMessage
    }
    expect(actions.removeRequested(types.metaTypes.removeMessage)).
    toEqual(expectedAction)
  })

  test(types.firebase.FIREBASE_REMOVE_REJECTED, () => {
    const error = 'error'
    const expectedAction = {
      type: types.firebase.FIREBASE_REMOVE_REJECTED,
      metaType: types.metaTypes.removeMessage,
      error
    }
    expect(actions.removeRejected(types.metaTypes.removeMessage, error)).
    toEqual(expectedAction)
  })

  test(types.firebase.FIREBASE_REMOVE_FULFILLED, () => {
    const expectedAction = {
      type: types.firebase.FIREBASE_REMOVE_FULFILLED,
      metaType: types.metaTypes.removeMessage,
    }
    expect(actions.removeFulfilled(types.metaTypes.removeMessage)).
    toEqual(expectedAction)
  })

  test(types.firebase.FIREBASE_LISTEN_REQUESTED, () => {
    const ref = new Object()
    const expectedAction = {
      type: types.firebase.FIREBASE_LISTEN_REQUESTED,
      ref,
      metaType: types.metaTypes.messages
    }
    expect(actions.listenRequested(types.metaTypes.messages, ref)).
    toEqual(expectedAction)
  })

  test(types.firebase.FIREBASE_LISTEN_REJECTED, () => {
    const error = 'error'
    const expectedAction = {
      type: types.firebase.FIREBASE_LISTEN_REJECTED,
      metaType: types.metaTypes.messages,
      error
    }
    expect(actions.listenRejected(types.metaTypes.messages, error)).
    toEqual(expectedAction)
  })

  test(types.firebase.FIREBASE_LISTEN_FULFILLED, () => {
    const items = { }
    const expectedAction = {
      type: types.firebase.FIREBASE_LISTEN_FULFILLED,
      items,
      metaType: types.metaTypes.messages,
    }
    expect(actions.listenFulfilled(types.metaTypes.messages, items)).
    toEqual(expectedAction)
  })

  test(types.firebase.FIREBASE_LISTEN_CHILD_ADDED, () => {
    const id = 1
    const value = { text: 'hello' }
    const expectedAction = {
      type: types.firebase.FIREBASE_LISTEN_CHILD_ADDED,
      id,
      value,
      metaType: types.metaTypes.messages,
    }
    expect(actions.listenChildAdded(types.metaTypes.messages, id, value)).
    toEqual(expectedAction)
  })

  test(types.firebase.FIREBASE_LISTEN_CHILD_CHANGED, () => {
    const id = 1
    const value = { text: 'bye' }
    const expectedAction = {
      type: types.firebase.FIREBASE_LISTEN_CHILD_CHANGED,
      id,
      value,
      metaType: types.metaTypes.messages,
    }
    expect(actions.listenChildChanged(types.metaTypes.messages, id, value)).
    toEqual(expectedAction)
  })

  test(types.firebase.FIREBASE_LISTEN_CHILD_REMOVED, () => {
    const id = 1
    const expectedAction = {
      type: types.firebase.FIREBASE_LISTEN_CHILD_REMOVED,
      id,
      metaType: types.metaTypes.messages,
    }
    expect(actions.listenChildRemoved(types.metaTypes.messages, id)).
    toEqual(expectedAction)
  })

  test('updateItem rejected', () => {
    const store = mockStore({ })
    const ref = RNFirebase.firebase.database().ref('messages/1')
    const error = 'BOOM!'

    const expectedActions = [
      actions.updateRequested(types.metaTypes.updateMessage),
      actions.updateRejected(types.metaTypes.updateMessage, error),
    ]

    ref.update = jest.fn(() => Promise.reject(error))

    return store.dispatch(actions.updateItem(types.metaTypes.updateMessage, {}, 'messages/1')).then(() => {
       expect(store.getActions()).toEqual(expectedActions)
    })
  })

  test('removeItem rejected', () => {
    const store = mockStore({ })
    const ref = RNFirebase.firebase.database().ref('messages/1')
    const error = 'BOOM!'

    const expectedActions = [
      actions.removeRequested(types.metaTypes.removeMessage),
      actions.removeRejected(types.metaTypes.removeMessage, error),
    ]

    ref.remove = jest.fn(() => Promise.reject(error))

    return store.dispatch(actions.removeItem(types.metaTypes.removeMessage, 'messages/1')).then(() => {
       expect(store.getActions()).toEqual(expectedActions)
    })
  })

  test('removeListenerRef', () => {
    const ref = RNFirebase.firebase.database().ref('messages')

    return actions.removeListenerRef(
      { messages: { ref } }, types.metaTypes.messages
    ).then(() => {
      expect(ref.off.mock.calls.length).toBe(1)
    })
  })

  test('listenToPath inProgress == true skips childs', () => {
    let initialState = getInitialState()
    initialState[types.metaTypes.messages].inProgress = true
    const store = mockStore(initialState)
    const ref = RNFirebase.firebase.database().ref('messages')

    const expectedActions = [
      actions.listenRequested(types.metaTypes.messages, ref),
      actions.listenFulfilled(types.metaTypes.messages, { }),
    ]

    const callbacks = []
    ref.on = jest.fn((event, callback) => {
      callbacks.push({ event, callback })
    })

    ref.once = jest.fn(() => {
      callbacks.forEach(({ event, callback }) => {
        callback({ key: 1, val: () => { } })
      })
      return Promise.resolve({ val: () => { }})
    })


    return store.dispatch(actions.listenToPath(types.metaTypes.messages, 'messages')).then(() => {
       expect(store.getActions()).toEqual(expectedActions)
    })
  })

  test('listenToPath inProgress == false handle childs', () => {
    let initialState = getInitialState()
    initialState[types.metaTypes.messages].inProgress = false
    const store = mockStore(initialState)
    const ref = RNFirebase.firebase.database().ref('messages')

    const expectedActions = [
      actions.listenRequested(types.metaTypes.messages, ref),
      actions.listenChildAdded(types.metaTypes.messages, 1, { }),
      actions.listenChildChanged(types.metaTypes.messages, 1, { }),
      actions.listenChildRemoved(types.metaTypes.messages, 1),
      actions.listenFulfilled(types.metaTypes.messages, { }),
    ]

    const callbacks = []
    ref.on = jest.fn((event, callback) => {
      callbacks.push({ event, callback })
    })

    ref.once = jest.fn(() => {
      callbacks.forEach(({ event, callback }) => {
        callback({ key: 1, val: () => ({ })})
      })
      return Promise.resolve({ val: () => ({ })})
    })


    return store.dispatch(actions.listenToPath(types.metaTypes.messages, 'messages')).then(() => {
       expect(store.getActions()).toEqual(expectedActions)
    })
  })

  test('listenToPath rejected', () => {
    let initialState = getInitialState()
    initialState[types.metaTypes.messages].inProgress = true
    const store = mockStore(initialState)
    const ref = RNFirebase.firebase.database().ref('messages')
    const error = 'BOOM!'

    const expectedActions = [
      actions.listenRequested(types.metaTypes.messages, ref),
      actions.listenRejected(types.metaTypes.messages, error),
    ]

    ref.once = jest.fn(() => Promise.reject(error))

    return store.dispatch(actions.listenToPath(types.metaTypes.messages, 'messages')).then(() => {
       expect(store.getActions()).toEqual(expectedActions)
    })
  })

  test('listenToMessages', () => {
    let initialState = getInitialState()
    initialState[types.metaTypes.messages].inProgress = true
    const store = mockStore(initialState)
    const ref = RNFirebase.firebase.database().ref('messages')

    const expectedActions = [
      actions.listenRequested(types.metaTypes.messages, ref),
      actions.listenFulfilled(types.metaTypes.messages, { }),
    ]

    return store.dispatch(actions.listenToMessages()).then(() => {
       expect(store.getActions()).toEqual(expectedActions)
    })
  })

  test('listenToUserContacts', () => {
    let initialState = getInitialState()
    initialState[types.metaTypes.userContacts].inProgress = true
    const store = mockStore(initialState)
    const ref = RNFirebase.firebase.database().ref('users/1/contacts')

    const expectedActions = [
      actions.listenRequested(types.metaTypes.userContacts, ref),
      actions.listenFulfilled(types.metaTypes.userContacts, { }),
    ]

    return store.dispatch(actions.listenToUserContacts(1)).then(() => {
       expect(store.getActions()).toEqual(expectedActions)
    })
  })

  test('updateMessage', () => {
    const store = mockStore({ })
    const ref = RNFirebase.firebase.database().ref('')

    const expectedActions = [
      actions.updateRequested(types.metaTypes.updateMessage),
      actions.updateFulfilled(types.metaTypes.updateMessage)
    ]

    return store.dispatch(actions.updateMessage('1', 'hello')).then(() => {
       expect(store.getActions()).toEqual(expectedActions)
       expect(ref.update.mock.calls.length).toBe(1)
       expect(ref.update.mock.calls[0][0]).toEqual({
         [`messages/1/text`]: 'hello'
       })
    })
  })

  test('removeMessage', () => {
    const store = mockStore({ })
    const ref = RNFirebase.firebase.database().ref('messages/1')

    const expectedActions = [
      actions.removeRequested(types.metaTypes.removeMessage),
      actions.removeFulfilled(types.metaTypes.removeMessage)
    ]

    return store.dispatch(actions.removeMessage('1')).then(() => {
       expect(store.getActions()).toEqual(expectedActions)
       expect(ref.remove.mock.calls.length).toBe(1)
    })
  })

  test('removeAllListeners', () => {
    const store = mockStore({ })

    const expectedActions = Object.keys(types.metaTypes).map(metaType => {
      return actions.listenRemoved(metaType, true)
    })

    return store.dispatch(actions.removeAllListeners()).then(() => {
       expect(store.getActions()).toEqual(expectedActions)
    })
  })

  test('removeListener clear items true', () => {
    const store = mockStore({ })

    const expectedActions = [
      actions.listenRemoved(types.metaTypes.messages, true)
    ]

    return store.dispatch(actions.removeListener(types.metaTypes.messages, true)).then(() => {
       expect(store.getActions()).toEqual(expectedActions)
    })
  })

  test('removeListener default value', () => {
    const store = mockStore({ })

    const expectedActions = [
      actions.listenRemoved(types.metaTypes.messages, false)
    ]

    return store.dispatch(actions.removeListener(types.metaTypes.messages)).then(() => {
       expect(store.getActions()).toEqual(expectedActions)
    })
  })
})
