//@flow

import createReducer from '../createReducer'

const initialState = { messages: { inProgress: false, items: { } } }

export const reducer = createReducer(initialState, {
  ['MESSAGES_REQUESTED'](state, action) {
    const newState = { ...state,
      messages: { inProgress: true, items: { } }
    }
    return newState
  },
  ['MESSAGES_FULFILLED'](state, action) {
    const newState = { ...state,
      messages: { inProgress: false, items: action.items }
    }
    return newState
  },
})
