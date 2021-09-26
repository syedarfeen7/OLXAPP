import { createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage'

let initials = {
    user: null,
    signedUserId: null,
    profileDetails: null,
    cartProducts: null,
}

function reduxReducer(state = initials, action) {
    switch (action.type) {
        case 'login':
            return { ...state, user: action.payload }
        case 'setUserId':
            return { ...state, signedUserId: action.payload }
        case 'ProfileDetails':
            return { ...state, profileDetails: action.payload }
        case 'CartProducts':
            return {...state, cartProducts : action.payload}
        case 'Signout':
            return { ...state, user: null, signedUserId: null, profileDetails: null}
        default:
            return { ...state }
    }
}

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
}
const persistedReducer = persistReducer(persistConfig, reduxReducer)
export default () => {
    let Store = createStore(persistedReducer)
    let Persistor = persistStore(Store)
    return { Store, Persistor }
}