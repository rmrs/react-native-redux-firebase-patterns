import RNFirebase from 'react-native-firebase'

const configurationOptions = {
    debug: false
}

firebase = RNFirebase.initializeApp(configurationOptions)

export default firebase
