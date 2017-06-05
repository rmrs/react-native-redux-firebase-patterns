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
      [action.metaType]: { ...state[action.metaType], inProgress: true }
    }
    return newState
  },
  ['FIREBASE_LISTEN_FULFILLED'](state, action) {
    const newState = {
      ...state,
      [action.metaType]: { ...state[action.metaType], inProgress: false, items: action.items }
    }
    return newState
  },
})
