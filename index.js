/**
 * @format
 */
import React from 'react'
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import reduxReducer from './Reducer/reducer'
import {Provider} from 'react-redux'
import {PersistGate} from 'redux-persist/integration/react'

const Redux = () => {
    const { Store, Persistor} = reduxReducer()
    return <Provider store={Store}>
        <PersistGate loading={null} persistor={Persistor}>
            <App />
        </PersistGate>
    </Provider>
}
AppRegistry.registerComponent(appName, () => Redux);
