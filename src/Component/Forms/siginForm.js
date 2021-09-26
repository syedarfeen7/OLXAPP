import { Container, Content, View, Text, Form, Item, Input, Icon, Button, Spinner } from 'native-base';
import React, { useState } from 'react';
import { StyleSheet, TextInput } from 'react-native'
import Header from '../Header/Header'
import serverURL from '../../../serverSetting'
import { useDispatch, useSelector } from 'react-redux'
import TabNavigation from '../TabNavigation/tab';
import axios from 'axios'
export default function SignIn(props) {
    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('')
    let [resposnsefromServerAgainstLogin, setResponseFromServerAgainstLogin] = useState(false)
    const cleanFields = () => {
        setEmail('')
        setPassword('')
    }
    let data = {
        email: email,
        password: password
    }
    let dispatch = useDispatch();

    // ****************** FUNCTION TO LOGIN THE USER ****************
    const loginWithDetail = () => {
        setResponseFromServerAgainstLogin(true)
        axios.post(`${serverURL.server_base_URL}/users/login`, data, { headers: { "Content-Type": "application/json" } })
            .then(loginUser => {
                cleanFields();
                if (loginUser.status) {
                    cleanFields();
                    dispatch({
                        type: "login",
                        payload: loginUser.data.data
                    })

                    setResponseFromServerAgainstLogin(false)
                    props.navigation.navigate('Tab')

                }
                else {

                }

            })
            .catch(err => {
                alert("Invalid email or password!")
                cleanFields()
                console.log(err)
                setResponseFromServerAgainstLogin(flase)
            })
    }

    return <>
        <Header navigation={props.navigation} />

        <Content style={{ backgroundColor: '#36485f' }}>



            <View style={styles.Container}>

                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>

                    <Text style={{ color: 'purple', fontSize: 50, fontWeight: 'bold' }}>O</Text>
                    <Text style={{ color: 'lightgreen', fontSize: 50, fontWeight: 'bold' }}>L</Text>
                    <Text style={{ color: 'orange', fontSize: 50, fontWeight: 'bold' }}>X</Text>
                </View>
                <Text style={styles.heading}>Welcome to Sign in page</Text>


                <Form>
                    <Item>
                        <Icon name="mail" style={styles.icon} />
                        <Input placeholder="Email"
                            style={styles.input}
                            onChangeText={email => setEmail(email)}
                        />
                    </Item>
                    <Item >
                        <Icon type="FontAwesome" name="lock" style={styles.icon} />

                        <Input placeholder="Password" secureTextEntry
                            style={styles.input}

                            onChangeText={password => setPassword(password)}
                        />
                    </Item>
                    {resposnsefromServerAgainstLogin ? <Spinner color='#fff' />
                        :
                        <>
                            <Button full
                                style={{ marginTop: 20, marginLeft: 12, backgroundColor: '#199187' }}
                                onPress={loginWithDetail}
                            >
                                <Text>Sign in</Text>
                            </Button>
                        </>
                    }

                </Form>

                <View>
                    <Text
                        onPress={() => props.navigation.navigate('Signup')}
                        style={{ color: '#fff', margin: 12 }}

                    >Click to Create an account</Text>

                </View>
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
        marginTop: 120

    },
    heading: {
        textAlign: 'center',
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold'
    },
    icon: {
        color: '#199187'
    },
    input: {
        color: '#fff'
    },
    msgOFSignup: {
        marginLeft: 16,
        marginTop: 10,
        color: '#fff'

    }

})