import React, { useState, useEffect } from 'react';
import { Icon, Container, Header, Content, Left, Body, Right, Button, Text, ListItem, Switch } from 'native-base';
import { View, StyleSheet } from 'react-native';
import { Image } from 'react-native-elements'
import { DrawerActions } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { useIsDrawerOpen } from '@react-navigation/drawer';


export default function Slider(props) {
    const isLogin = useSelector(state => state.user);
    const profileDetails = useSelector(state => state.profileDetails)
    // console.log(profileDetails)
    const dispatch = useDispatch();


    const logoutUser = () => {
        dispatch({
            type: 'Signout'
        })
        props.navigation.navigate("Signin")
    }
    useEffect(() => {

        if (!isLogin) {
            props.navigation.navigate("Signin")
            // return;
        }



    }, []);




    return <>
        <Container>
            <Header style={{ backgroundColor: "white" }}>
                <Left>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginLeft: 20 }}>

                        <Text style={{ color: 'purple', fontSize: 30, fontWeight: 'bold' }}>O</Text>
                        <Text style={{ color: 'lightgreen', fontSize: 30, fontWeight: 'bold' }}>L</Text>
                        <Text style={{ color: 'orange', fontSize: 30, fontWeight: 'bold' }}>X</Text>
                    </View>
                </Left>



                <Body />
                <Right >

                    <Icon name='close' style={{}} onPress={() => props.navigation.dispatch(DrawerActions.closeDrawer())} />
                </Right>
            </Header>
            <Content>
                <View>
                    {isLogin ?

                        <>

                            <View>
                                {profileDetails && profileDetails ?
                                    <>
                                        <ListItem style={{ display: 'flex', justifyContent: 'center', }}>
                                            <Image
                                                source={{ uri: profileDetails.profileImage }}
                                                style={styles.profileImage}
                                            />
                                        </ListItem>
                                    </>
                                    :
                                    <></>
                                }

                                <ListItem icon>



                                    <Body style={styles.sameStyleForIcons}>
                                        <Icon name="user" type="FontAwesome" style={{ color: '#199187' }} />
                                        <Text style={styles.sameStyleForText}>{isLogin.firstName + " " + isLogin.lastName}</Text>
                                    </Body>

                                </ListItem>
                                <ListItem icon>



                                    <Body style={styles.sameStyleForIcons}>
                                        <Icon name="email" type="MaterialCommunityIcons" style={{ color: '#199187' }} />
                                        <Text style={styles.sameStyleForText}>{isLogin.email}</Text>
                                    </Body>

                                </ListItem>
                                <Text style={{ textAlign: 'center', marginTop: 5, marginBottom: 5, color: '#FF9501', fontWeight: 'bold', fontSize: 24 }}>Actions</Text>

                                <ListItem icon onPress={() => props.navigation.navigate("Tab")}>
                                    <Body style={styles.sameStyleForIcons} >
                                        <Icon name="home" type="FontAwesome5" style={{ color: '#199187' }} />
                                        <Text style={styles.sameStyleForText}>Home</Text>
                                    </Body>

                                </ListItem>
                                <ListItem icon onPress={() => props.navigation.navigate("Cart")}>


                                    <Body style={styles.sameStyleForIcons}>
                                        <Icon name="shopping-cart" type="FontAwesome5" style={{ color: '#199187' }} />
                                        <Text style={styles.sameStyleForText}>My Cart</Text>
                                    </Body>

                                </ListItem>

                            </View>
                            <ListItem icon onPress={logoutUser}>

                                <Body style={styles.sameStyleForIcons}>
                                    <Icon name="person" type="Ionicons" style={{ color: '#199187' }} />
                                    <Text style={styles.sameStyleForText}>Sign out</Text>
                                </Body>

                            </ListItem>
                        </>

                        :


                        <>

                            <ListItem icon onPress={() => { props.navigation.navigate('Tab') }}>
                                <Left>
                                    <Button style={{ backgroundColor: "#FF9501" }}>
                                        <Icon name="home" type="FontAwesome" />
                                    </Button>
                                </Left>
                                <Body>
                                    <Text >Home</Text>
                                </Body>

                            </ListItem>
                            <ListItem icon onPress={() => { props.navigation.navigate('Signin') }}>
                                <Left>
                                    <Button style={{ backgroundColor: "#FF9501" }}>
                                        <Icon name="person" type="Ionicons" />
                                    </Button>
                                </Left>
                                <Body>
                                    <Text >Sign in</Text>
                                </Body>

                            </ListItem>
                            <ListItem icon onPress={() => { props.navigation.navigate('Signup') }}>
                                <Left>
                                    <Button style={{ backgroundColor: "#FF9501" }}>
                                        <Icon type="Ionicons" name="person" />
                                    </Button>
                                </Left>
                                <Body>
                                    <Text>Sign up</Text>
                                </Body>

                            </ListItem>

                        </>

                    }

                </View>
            </Content>


        </Container>

    </>
}
const styles = StyleSheet.create({
    sameStyleForIcons: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    sameStyleForText: {
        marginLeft: 10
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 100,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#199187'
    }
})