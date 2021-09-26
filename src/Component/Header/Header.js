import React, { useEffect, useState } from 'react'
import { Header, Left, Body, Right, Title, Button, Icon, Text } from 'native-base';
import { Badge } from 'react-native-elements'
import { DrawerActions } from '@react-navigation/native'
import MaterialCommunityIcons from 'react-native-vector-icons/FontAwesome5'
import { useSelector } from 'react-redux';
import { View } from 'react-native'
import axios from 'axios';
import serverSetting from '../../../serverSetting';
export default function HeaderCom({ navigation }) {
    const isLogin = useSelector(state => state.user)
    let cartProductsFromStore = useSelector(state => state.cartProducts)
    // console.log(cartProductsFromStore)




    return <>

        <Header style={{ backgroundColor: "#006d77" }}>
            <Left>
                <Button transparent >
                    <Icon name='menu' onPress={() => navigation.dispatch(DrawerActions.openDrawer())} />
                </Button>
            </Left>
            <Body>
                <Title>OLX</Title>
            </Body>
            <Right>
                {isLogin && isLogin ?
                    <>

                        <Button transparent >
                            <MaterialCommunityIcons name="shopping-cart" size={25} color={'#ffff'} onPress={() => { navigation.navigate("Cart") }} />
                            <Badge value={cartProductsFromStore.cart.length} status="error" containerStyle={{ position: 'absolute', right: 0, top: 0 }} />
                        </Button>
                    </>
                    :
                    <></>
                }

            </Right>
        </Header>



    </>
}