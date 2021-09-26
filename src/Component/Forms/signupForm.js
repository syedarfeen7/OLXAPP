import axios from 'axios';
import { Container, Content, View, Text, Form, Item, Input, Icon, Button, Grid, Col, Row } from 'native-base';
import React, { useState } from 'react';
import { StyleSheet, TextInput } from 'react-native'
import { set } from 'react-native-reanimated';
import Header from '../Header/Header'
import TabNavigation from '../TabNavigation/tab';
import serverURL from '../../../serverSetting'
import { useDispatch } from 'react-redux'
export default function Signup({ navigation }) {
    let [firstName, setFirstName] = useState('')
    let [lastName, setLasttName] = useState('')
    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('')
    const dispatch = useDispatch();

    // *********** FUNCTION TO CREATE TH ACCOUNT OF USER *****************
    
    function signupDetails() {
        if(firstName && lastName && email && password){

            let data = {
                signupDetails: { firstName, lastName, email, password }
            }
            axios.post(`${serverURL.server_base_URL}/users/signup`, data)
            .then(signupDetails => {
                if (signupDetails.status) {
                    dispatch({
                        type: "setUserId",
                        payload: signupDetails.data.user._id,
                    })
                    navigation.navigate("Signin")
                }
            })
            .catch(err => {
                console.log("Error in creating account", err)
            })
        }
        else{
            alert("Please fill out all the fields.")
        }
    }
    return <>
        <Header navigation={navigation} />

        <Content style={{ backgroundColor: '#36485f' }}>



            <View style={styles.Container}>
                <View>

                    <Text style={styles.header}>Registeration</Text>
                </View>
                <Form>
                    <Item>
                        <Icon name="user" type="AntDesign" style={styles.icon} />
                        <Input placeholder="First name" style={styles.input} onChangeText={(firstName) => { setFirstName(firstName) }} />
                    </Item>
                    <Item>
                        <Icon name="user" type="AntDesign" style={styles.icon} />
                        <Input placeholder="Last name" style={styles.input} onChangeText={(lastName) => { setLasttName(lastName) }} />
                    </Item>
                    <Item>
                        <Icon name="mail" type="AntDesign" style={styles.icon} />
                        <Input placeholder="Email" style={styles.input} onChangeText={(email) => { setEmail(email) }} />
                    </Item>

                    <Item >
                        <Icon type="FontAwesome" name="lock" style={styles.icon} />

                        <Input placeholder="Password" secureTextEntry style={styles.input} onChangeText={(pass) => { setPassword(pass) }} />
                    </Item>
                    <Button full style={styles.btn} onPress={() => { signupDetails() }}>
                        <Text>Create</Text>
                    </Button>
                </Form>
                <Text style={{ color: '#fff', marginLeft: 15, marginTop: 10 }}>Already have an account?
                            <Text
                        style={{ color: "orange" }}
                        onPress={() => navigation.navigate('Signin')}
                    >Sign in</Text></Text>
            </View>


        </Content>

    </>
}
const styles = StyleSheet.create({
    Container: {
        flex: 1,
        justifyContent: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        marginTop: 150


    },
    header: {
        fontSize: 24,
        color: '#fff',
        paddingBottom: 10,
        marginLeft: 15,
        marginBottom: 40,
        borderBottomColor: '#199187',
        borderBottomWidth: 1,


    },
    icon: {
        color: '#199187'
    },
    input: {
        color: '#fff'
    },
    btn: {
        backgroundColor: '#199187',
        marginTop: 20,
        marginLeft: 15,
    }

})