//@flow

export function listenRemoved(metaType: string) {
  return {
    type: 'FIREBASE_LISTEN_REMOVED',
    metaType,
  }
}

export function removeListenerRef(state: Object, metaType: string) {
  if (state && state.database &&  state.database[metaType] &&
    state.database[metaType].ref) {
    return state.database[metaType].ref.off()
  }
  return Promise.resolve()
}

type Action = {
  type: string,
  metaType: string,
}

export function removeListener(metaType: string) {
  return (dispatch: Action => void, getState: () => Object) => {
    return removeListenerRef(getState(), metaType).then(() => {
      dispatch(listenRemoved(metaType))
    })
  }
}
