import * as actions from '../actions'
import * as types from '../types'
import { getInitialState, firebaseReducer } from '../reducer'

describe('firebaseReducer reducer', () => {
  test(types.firebase.FIREBASE_UPDATE_REQUESTED, () => {
    const initialState = { [types.metaTypes.updateMessage]: { inProgress: false, error: '' } }
    const action = actions.updateRequested(types.metaTypes.updateMessage)
    const expectedState = { [types.metaTypes.updateMessage]: { inProgress: true, error: '' } }
    expect(
      firebaseReducer(initialState, action)
    ).toEqual(expectedState)
  })

  test(types.firebase.FIREBASE_UPDATE_REJECTED, () => {
    const initialState = { [types.metaTypes.updateMessage]: { inProgress: true, error: '' } }
    const error = 'error'
    const action = actions.updateRejected(types.metaTypes.updateMessage, error)
    const expectedState = { [types.metaTypes.updateMessage]: { inProgress: false, error } }
    expect(
      firebaseReducer(initialState, action)
    ).toEqual(expectedState)
  })

  test(types.firebase.FIREBASE_UPDATE_FULFILLED, () => {
    const initialState = { [types.metaTypes.updateMessage]: { inProgress: true, error: '' } }
    const action = actions.updateFulfilled(types.metaTypes.updateMessage)
    const expectedState = { [types.metaTypes.updateMessage]: { inProgress: false, error: '' } }
    expect(
      firebaseReducer(initialState, action)
    ).toEqual(expectedState)
  })

  test(types.firebase.FIREBASE_REMOVE_REQUESTED, () => {
    const initialState = { [types.metaTypes.removeMessage]: { inProgress: false, error: '' } }
    const action = actions.removeRequested(types.metaTypes.removeMessage)
    const expectedState = { [types.metaTypes.removeMessage]: { inProgress: true, error: '' } }
    expect(
      firebaseReducer(initialState, action)
    ).toEqual(expectedState)
  })

  test(types.firebase.FIREBASE_REMOVE_REJECTED, () => {
    const initialState = { [types.metaTypes.removeMessage]: { inProgress: true, error: '' } }
    const error = 'error'
    const action = actions.removeRejected(types.metaTypes.removeMessage, error)
    const expectedState = { [types.metaTypes.removeMessage]: { inProgress: false, error } }
    expect(
      firebaseReducer(initialState, action)
    ).toEqual(expectedState)
  })

  test(types.firebase.FIREBASE_REMOVE_FULFILLED, () => {
    const initialState = { [types.metaTypes.removeMessage]: { inProgress: true, error: '' } }
    const action = actions.removeFulfilled(types.metaTypes.removeMessage)
    const expectedState = { [types.metaTypes.removeMessage]: { inProgress: false, error: '' } }
    expect(
      firebaseReducer(initialState, action)
    ).toEqual(expectedState)
  })

  test(types.firebase.FIREBASE_LISTEN_REQUESTED, () => {
    const ref = new Object()
    const initialState = { [types.metaTypes.messages]: { inProgress: false, error: '', items: { }, ref: null } }
    const action = actions.listenRequested(types.metaTypes.messages, ref)
    const expectedState = { [types.metaTypes.messages]: { inProgress: true, error: '', items: { }, ref } }
    expect(
      firebaseReducer(initialState, action)
    ).toEqual(expectedState)
  })

  test(types.firebase.FIREBASE_LISTEN_REJECTED, () => {
    const initialState = { [types.metaTypes.messages]: { inProgress: true, error: '', items: { } } }
    const error = 'error'
    const action = actions.listenRejected(types.metaTypes.messages, error)
    const expectedState = { [types.metaTypes.messages]: { inProgress: false, error, items: { } } }
    expect(
      firebaseReducer(initialState, action)
    ).toEqual(expectedState)
  })

  test(types.firebase.FIREBASE_LISTEN_FULFILLED, () => {
    const initialState = { [types.metaTypes.messages]: { inProgress: true, error: '', items: { } } }
    const items = { '1': { text: 'hello' }, '2': { text: 'world' } }
    const action = actions.listenFulfilled(types.metaTypes.messages, items)
    const expectedState = { [types.metaTypes.messages]: { inProgress: false, error: '', items } }
    expect(
      firebaseReducer(initialState, action)
    ).toEqual(expectedState)
  })

  test(types.firebase.FIREBASE_LISTEN_CHILD_ADDED, () => {
    const initialState = { [types.metaTypes.messages]: { inProgress: false, error: '', items: { '1': { text: 'hello' }, '2': { text: 'world' } } } }
    const child_id = '3'
    const child = { text: 'goodbye' }
    const action = actions.listenChildAdded(types.metaTypes.messages, child_id, child)
    const expectedState = { [types.metaTypes.messages]: { inProgress: false, error: '', items: { '1': { text: 'hello' }, '2': { text: 'world' }, '3': { text: 'goodbye' } } } }
    expect(
      firebaseReducer(initialState, action)
    ).toEqual(expectedState)
  })

  test(types.firebase.FIREBASE_LISTEN_CHILD_CHANGED, () => {
    const initialState = { [types.metaTypes.messages]: { inProgress: false, error: '', items: { '1': { text: 'hello' }, '2': { text: 'world' }, '3': { text: 'goodbye' } } } }
    const child_id = '3'
    const child = { text: 'ciao' }
    const action = actions.listenChildChanged(types.metaTypes.messages, child_id, child)
    const expectedState = { [types.metaTypes.messages]: { inProgress: false, error: '', items: { '1': { text: 'hello' }, '2': { text: 'world' }, '3': { text: 'ciao' } } } }
    expect(
      firebaseReducer(initialState, action)
    ).toEqual(expectedState)
  })

  test(types.firebase.FIREBASE_LISTEN_CHILD_REMOVED, () => {
    const initialState = { [types.metaTypes.messages]: { inProgress: false, error: '', items: { '1': { text: 'hello' }, '2': { text: 'world' } } } }
    const child_id = '2'
    const action = actions.listenChildRemoved(types.metaTypes.messages, child_id)
    const expectedState = { [types.metaTypes.messages]: { inProgress: false, error: '', items: { '1': { text: 'hello' } } } }
    expect(
      firebaseReducer(initialState, action)
    ).toEqual(expectedState)
  })

  test(types.firebase.FIREBASE_LISTEN_REMOVED + ' clear items false', () => {
    const initialState = { [types.metaTypes.messages]: { ref: new Object(), inProgress: false, error: '', items: { '1': { text: 'hello' }, '2': { text: 'world' } } } }
    const action = actions.listenRemoved(types.metaTypes.messages, false)
    const expectedState = { [types.metaTypes.messages]: { ref: null, inProgress: false, error: '', items: { '1': { text: 'hello' }, '2': { text: 'world' } } } }
    expect(
      firebaseReducer(initialState, action)
    ).toEqual(expectedState)
  })

  test(types.firebase.FIREBASE_LISTEN_REMOVED + ' clear items true', () => {
    const initialState = { [types.metaTypes.messages]: { ref: new Object(), inProgress: false, error: '', items: { '1': { text: 'hello' }, '2': { text: 'world' } } } }
    const action = actions.listenRemoved(types.metaTypes.messages, true)
    const expectedState = { [types.metaTypes.messages]: { ref: null, inProgress: false, error: '', items: { } } }
    expect(
      firebaseReducer(initialState, action)
    ).toEqual(expectedState)
  })

  test(types.firebase.FIREBASE_RESET_DATA + ' clear items false', () => {
    const initialState = { [types.metaTypes.messages]: { inProgress: false, error: '', items: { '1': { text: 'hello' }, '2': { text: 'world' } } } }
    const action = actions.clearData()
    let expectedState = { }
    Object.keys(types.metaTypes).forEach(metaType => {
      expectedState[metaType] = { ref: null, inProgress: false, error: '', items: { } }
    })
    expect(
      firebaseReducer(initialState, action)
    ).toEqual(expectedState)
  })

  test('bogus action does nothing', () => {
    const initialState = { [types.metaTypes.messages]: { inProgress: false, error: '', items: { '1': { text: 'hello' }, '2': { text: 'world' } } } }
    const action = {
      type: 'DO_NOT_TOUCH_STATE_ACTION'
    }
    expect(
      firebaseReducer(initialState, action)
    ).toBe(initialState)
  })

  test('no initial state', () => {
    const action = {
      type: 'DO_NOT_TOUCH_STATE_ACTION'
    }
    expect(
      firebaseReducer(undefined, action)
    ).toEqual(getInitialState())
  })
})
