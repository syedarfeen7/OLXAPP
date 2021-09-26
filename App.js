/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import Home from './src/Screens/Home';

import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import About from './src/Screens/About';
import TabNavigation from './src/Component/TabNavigation/tab';
import Slider from './src/Component/Slider/slider';
import SignIn from './src/Component/Forms/siginForm';
import Signup from './src/Component/Forms/signupForm';
import ProfileForm from './src/Component/Forms/profileForm';
import Profile from './src/Screens/Profile';
import SingleProductDescription from './src/Screens/SingleProductDescr';
import Cart from './src/Screens/Cart';
// import Home from './src/Screens/Home'


const Drawer = createDrawerNavigator();
const App: () => Node = () => {



  return <>
    <NavigationContainer>
      <Drawer.Navigator 
        drawerContent = {props => <Slider {...props} />}
      >
        <Drawer.Screen name="Tab" component={TabNavigation} 
          unmountOnBlur={true}
          options={{ unmountOnBlur: true }}
        />
        <Drawer.Screen name="Signin" component={SignIn}/>
        <Drawer.Screen name="Signup" component={Signup} />
        <Drawer.Screen name="ProfileForm" component={ProfileForm}/>
        <Drawer.Screen name="ProfilePage" component={Profile}/>
        <Drawer.Screen name="SingleProductDescr" component={SingleProductDescription} />
        <Drawer.Screen name="Cart" component={Cart}/>
      </Drawer.Navigator> 

    </NavigationContainer>

  </>
};


export default App;
