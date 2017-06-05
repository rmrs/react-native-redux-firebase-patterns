['FIREBASE_LISTEN_REQUESTED'](state, action) {
  const newState = {
    ...state,
    [action.metaType]: {
      inProgress: true, error: '', items: { }, ref: action.ref
    }
  }
  return newState
},
...
['FIREBASE_LISTEN_REMOVED'](state, action) {
  const metaState = state[action.metaType]
  const newState = {
    ...state,
    [action.metaType]: {
      inProgress: false, error: '', items: { }, ref: null
    }
  }
  return newState
},
