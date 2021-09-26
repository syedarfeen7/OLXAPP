import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../../Screens/Home';
import About from '../../Screens/About';
import { Icon } from 'native-base'
import AddProductFrom from '../Forms/addProductForm';
import { useSelector } from 'react-redux';
import Profile from '../../Screens/Profile';
import MyAdds from '../../Screens/MyAdds'
import Cart from '../../Screens/Cart';
export default function TabNavigation({ navigation }) {
  const Tab = createBottomTabNavigator();
  const isLogin = useSelector(state => state.user)
  return <>



    <Tab.Navigator
      activeColor="#199187"
      inactiveColor="#199187"
      barStyle={{ backgroundColor: "#f5fafa", height: 70, paddingVertical: 15, }}
    >
      <Tab.Screen name="Home" component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => <Icon name='home' style={{ color: '#006d77', fontWeight: 'bold', fontSize: 30 }} />
        }}
      />
      <Tab.Screen name="ProfilePage" component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => <Icon name='person' style={{ color: '#006d77', fontWeight: 'bold', fontSize: 30 }} />
        }}
      />
      {isLogin ?
        <>
          <Tab.Screen name="addProduct" component={AddProductFrom}

            options={{

              tabBarLabel: 'Sell',
              tabBarIcon: ({ focused }) => (
                <Icon name="add" type="Ionicons" style={{ color: '#006d77', fontWeight: 'bold', fontSize: 40 }} />
              ),

            }}

          />
        </>
        :
        <></>
      }
      <Tab.Screen name="MyAdds" component={MyAdds}
        options={{
          tabBarLabel: 'My Adds',
          tabBarIcon: ({ focused }) => (
            <Icon name="heart" style={{ color: '#006d77', fontWeight: 'bold', fontSize: 30 }} />
          ),
        }}
      />

      <Tab.Screen name="feedback" component={Cart}
        options={{
          tabBarLabel: 'Cart',
          tabBarIcon: ({ focused }) => (
            <Icon name="cart" style={{ color: '#006d77', fontWeight: 'bold', fontSize: 30 }} />
          ),
        }}
      />

    </Tab.Navigator>


  </>
}