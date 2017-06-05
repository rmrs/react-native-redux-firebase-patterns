//@flow

import createReducer from '../createReducer'

export const metaTypes = {
  messages: 'messages',
  userContacts: 'userContacts',
}

function getInitialState() {
  let initialState = { }
  Object.keys(metaTypes).forEach((metaType) => {
    initialState[metaType] = { inProgress: false, items: { } }
  })

  return initialState
}

const initialState = getInitialState()

export const reducer = createReducer(initialState, {
  ['FIREBASE_LISTEN_REQUESTED'](state, action) {
    const newState = {
      ...state,
      [action.metaType]: {
        inProgress: true, error: '', items: { }
      }
    }
    return newState
  },
  ['FIREBASE_LISTEN_FULFILLED'](state, action) {
    const newState = {
      ...state,
      [action.metaType]: {
        inProgress: true, error: '', items: action.items
      }
    }
    return newState
  },
  ['FIREBASE_LISTEN_REJECTED'](state, action) {
    const error = action.error
    const newState = {
      ...state,
      [action.metaType]: { inProgress: false, error, items: { } }
    }
    return newState
  },
  ['FIREBASE_LISTEN_CHILD_ADDED'](state, action) {
    const currentItems = state[action.metaType].items
    const items = { ...currentItems, [action.id]: action.value }
    const newState = {
      ...state,
      [action.metaType]: { inProgress: false, error: '', items }
    }
    return newState
  },
  ['FIREBASE_LISTEN_CHILD_CHANGED'](state, action) {
    const currentItems = state[action.metaType].items
    const items = { ...currentItems, [action.id]: action.value }
    const newState = {
     ...state,
     [action.metaType]: { inProgress: false, error: '', items }
    }
    return newState
  },
  ['FIREBASE_LISTEN_CHILD_REMOVED'](state, action) {
    const currentItems = state[action.metaType].items
    const items = { ...currentItems }
    delete items[action.id]
    const newState = {
      ...state,
      [action.metaType]: { inProgress: false, error: '', items }
    }
    return newState
  },
})
