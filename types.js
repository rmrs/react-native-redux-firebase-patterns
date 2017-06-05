//@flow

export const firebase = {
  FIREBASE_UPDATE_REQUESTED: 'FIREBASE_UPDATE_REQUESTED',
  FIREBASE_UPDATE_FULFILLED: 'FIREBASE_UPDATE_FULFILLED',
  FIREBASE_UPDATE_REJECTED: 'FIREBASE_UPDATE_REJECTED',

  FIREBASE_REMOVE_REQUESTED: 'FIREBASE_REMOVE_REQUESTED',
  FIREBASE_REMOVE_FULFILLED: 'FIREBASE_REMOVE_FULFILLED',
  FIREBASE_REMOVE_REJECTED: 'FIREBASE_REMOVE_REJECTED',

  FIREBASE_LISTEN_REQUESTED: 'FIREBASE_LISTEN_REQUESTED',
  FIREBASE_LISTEN_FULFILLED: 'FIREBASE_LISTEN_FULFILLED',
  FIREBASE_LISTEN_REJECTED: 'FIREBASE_LISTEN_REJECTED',
  FIREBASE_LISTEN_CHILD_ADDED: 'FIREBASE_LISTEN_CHILD_ADDED',
  FIREBASE_LISTEN_CHILD_CHANGED: 'FIREBASE_LISTEN_CHILD_CHANGED',
  FIREBASE_LISTEN_CHILD_REMOVED: 'FIREBASE_LISTEN_CHILD_REMOVED',
  FIREBASE_LISTEN_REMOVED: 'FIREBASE_LISTEN_REMOVED',

  FIREBASE_RESET_DATA: 'FIREBASE_RESET_DATA'
}

export const metaTypes = {
  messages: 'messages',
  userContacts: 'userContacts',
  updateMessage: 'updateMessage',
  removeMessage: 'removeMessage',
}

export type MetaType = $Keys<typeof metaTypes>

export type EmptyAction = {
  type: string,
}

export type MetaAction = EmptyAction & { metaType: MetaType }

export type MetaActionWithError = MetaAction & { error: string }

export type MetaActionWithItems = MetaAction & { items: Object }

export type MetaActionWithRef =  MetaAction & { ref: Object }

export type MetaActionWithId = MetaAction & { id: string }

export type MetaActionWithChild = MetaActionWithId & { value: Object }

export type MetaActionWithClear = MetaAction & { clearItems: boolean }

export type UpdateItemsActions = MetaAction | MetaActionWithError

export type RemoveItemActions = MetaAction | MetaActionWithError

export type ListenToPathActions = MetaAction | MetaActionWithRef |
  MetaActionWithChild | MetaActionWithId | MetaActionWithError |
  MetaActionWithItems | MetaActionWithClear
