['FIREBASE_LISTEN_REQUESTED'](state, action) {
  const newState = {
    ...state,
    [action.metaType]: {
      ...state[action.metaType],
      inProgress: true, error: '', ref: action.ref
    }
  }
  return newState
},
...
['FIREBASE_LISTEN_REMOVED'](state, action) {
  const newState = {
    ...state,
    [action.metaType]: {
      ...state[action.metaType],
      inProgress: false, error: '', ref: null
    }
  }
  return newState
},
