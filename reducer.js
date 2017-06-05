//@flow

import createReducer from './createReducer'
import * as types from './types'
import type {
  MetaType, MetaAction, MetaActionWithError, MetaActionWithItems,
  MetaActionWithRef, MetaActionWithId, MetaActionWithChild,
  MetaActionWithClear, EmptyAction
} from './types'

type SubState = {
  ref: ?Object,
  inProgress: boolean,
  error: string,
  items: Object
}

type FirebaseState = { [MetaType]: SubState }

export function getInitialState() {
  let state: FirebaseState = { }
  Object.keys(types.metaTypes).forEach((key) => {
    const subState: SubState = { ref: null, inProgress: false, error: '', items: { } }
    state[key] = subState
  })

  return state
}

const initialState: FirebaseState = getInitialState()

export const firebaseReducer = createReducer(initialState, {
  [types.firebase.FIREBASE_RESET_DATA](state: FirebaseState, action: EmptyAction) {
    const newState = getInitialState()
    return newState
  },
  [types.firebase.FIREBASE_UPDATE_REQUESTED](state: FirebaseState, action: MetaAction) {
    const property = action.metaType
    let newState = { ...state, [property]: { inProgress: true, error: '' } }
    return newState
  },
  [types.firebase.FIREBASE_UPDATE_FULFILLED](state: FirebaseState, action: MetaAction) {
    const property = action.metaType
    let newState = { ...state, [property]: { inProgress: false, error: '' } }
    return newState
  },
  [types.firebase.FIREBASE_UPDATE_REJECTED](state: FirebaseState, action: MetaActionWithError) {
    const property = action.metaType
    const error = action.error
    let newState = { ...state, [property]: { inProgress: false, error } }
    return newState
  },
  [types.firebase.FIREBASE_REMOVE_REQUESTED](state: FirebaseState, action: MetaAction) {
    const property = action.metaType
    let newState = { ...state, [property]: { inProgress: true, error: '' } }
    return newState
  },
  [types.firebase.FIREBASE_REMOVE_FULFILLED](state: FirebaseState, action: MetaAction) {
    const property = action.metaType
    let newState = { ...state, [property]: { inProgress: false, error: '' } }
    return newState
  },
  [types.firebase.FIREBASE_REMOVE_REJECTED](state: FirebaseState, action: MetaActionWithError) {
    const property = action.metaType
    const error = action.error
    let newState = { ...state, [property]: { inProgress: false, error } }
    return newState
  },
  [types.firebase.FIREBASE_LISTEN_REQUESTED](state: FirebaseState, action: MetaActionWithRef) {
    const ref = action.ref
    const property = action.metaType
    const propertyState = state[property]

    let newState = { ...state, [property]: { ...propertyState, inProgress: true, error: '', ref } }
    return newState
  },
  [types.firebase.FIREBASE_LISTEN_FULFILLED](state: FirebaseState, action: MetaActionWithItems) {
    const items = action.items
    const property = action.metaType
    const propertyState = state[property]

    let newState = { ...state, [property]: { ...propertyState, inProgress: false, error: '', items: action.items } }
    return newState
  },
  [types.firebase.FIREBASE_LISTEN_REJECTED](state: FirebaseState, action: MetaActionWithError) {
    const property = action.metaType
    const propertyState = state[property]
    const error = action.error

    let newState = { ...state, [property]: { ...propertyState, inProgress: false, error } }
    return newState
  },
  //notice child added and changed are the same at the moment
  [types.firebase.FIREBASE_LISTEN_CHILD_ADDED](state: FirebaseState, action: MetaActionWithChild) {
    const property = action.metaType
    const propertyState = state[property]
    const items = { ...propertyState.items, [action.id]: action.value }

    let newState = { ...state, [property]: { ...propertyState, inProgress: false, error: '', items } }
    return newState
  },
  [types.firebase.FIREBASE_LISTEN_CHILD_CHANGED](state: FirebaseState, action: MetaActionWithChild) {
    const property = action.metaType
    const propertyState = state[property]
    const items = { ...propertyState.items, [action.id]: action.value }

    let newState = { ...state, [property]: { ...propertyState, inProgress: false, error: '', items } }
    return newState
  },
  [types.firebase.FIREBASE_LISTEN_CHILD_REMOVED](state: FirebaseState, action: MetaActionWithId) {
    const property = action.metaType
    const propertyState = state[property]
    const items = { ...propertyState.items }
    delete items[action.id]

    let newState = { ...state, [property]: { ...propertyState, inProgress: false, error: '', items } }
    return newState
  },
  [types.firebase.FIREBASE_LISTEN_REMOVED](state: FirebaseState, action: MetaActionWithClear) {
    const property = action.metaType
    const propertyState = state[property]
    const items = action.clearItems ? { } : propertyState.items

    let newState = { ...state, [property]: { ...propertyState, ref: null, inProgress: false, error: '', items } }
    return newState
  },
})
