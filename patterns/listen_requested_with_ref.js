//@flow

export function listenRequested(metaType: string, ref: Object) {
  return {
    type: 'FIREBASE_LISTEN_REQUESTED',
    metaType,
    ref
  }
}
