const ref = firebase.database().ref(path)
dispatch(listenRequested(metaType, ref))
