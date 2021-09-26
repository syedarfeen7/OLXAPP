import React, { useEffect, useState } from 'react'
import { Container, Content, View, Text, Spinner, ListItem, Body, Icon } from 'native-base';
import { StyleSheet } from 'react-native'
import { Button } from 'react-native'
import Header from '../Component/Header/Header'
import AppSetting from '../../serverSetting'
import { Image, } from 'react-native-elements'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux';
export default function Profile({ navigation }) {
    let [userProfileDetails, setUserProfileDetails] = useState('')
    const userProfile = useSelector(state => state.user)
    const userProfileDetailsFromStore = useSelector(state => state.profileDetails)
    useEffect(() => {
        navigation.addListener('focus', () => {

            //  ***************** IF USER ACCOUNT IS NOT CREATED YET THEN HE WILL NAVIGATE TI SIGNIN PAGE ********
            if (!userProfile) {
                navigation.navigate("Signin");
                return;
            //  ***************** IF USER PROFILE IS CREATED THE GET THE DETAILS OF PROFILE FROM STORE **************
            } else if (userProfileDetailsFromStore) {
                gettingInformationAfterProfileCreation();
            }
            getUserProfileFromStore();
        });
    }, [])
    const getUserProfileFromStore = () => {
        setUserProfileDetails(userProfileDetailsFromStore);
        return;
    }
    const gettingInformationAfterProfileCreation = () => {
        setUserProfileDetails(userProfileDetailsFromStore)
        return;
    }
    return <>
        {userProfile ?


            <>
                <Header navigation={navigation} />


                <Content>

                    {userProfileDetailsFromStore ?

                        <>
                            <View >
                                <View style={{ marginLeft: 20, marginTop: 10 }}>
                                    <Icon type="Ionicons" name="chevron-back" style={{ color: '#199187', fontSize: 40 }}
                                        onPress={() => { navigation.navigate("Home") }}
                                    />

                                </View>
                                <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: 50 }}>
                                    <Image
                                        source={{ uri: userProfileDetails.profileImage }}
                                        style={styles.profileImage}
                                    />
                                </View>
                                <View >
                                    <ListItem>

                                        <Body style={styles.sameStyling}>
                                            <Text style={styles.headerStyle}>Name</Text>
                                            <Text style={styles.sameStylingForDetails}>{userProfileDetails.fullName}</Text>
                                        </Body>
                                    </ListItem>
                                    <ListItem>

                                        <Body style={styles.sameStyling}>
                                            <Text style={styles.headerStyle}>Email</Text>
                                            <Text style={styles.sameStylingForDetails}>{userProfileDetails.email}</Text>
                                        </Body>
                                    </ListItem>
                                    <ListItem>

                                        <Body style={styles.sameStyling}>
                                            <Text style={styles.headerStyle}>Phone</Text>
                                            <Text style={styles.sameStylingForDetails}>{userProfileDetails.phone}</Text>
                                        </Body>
                                    </ListItem>
                                    <ListItem>

                                        <Body style={styles.sameStyling}>
                                            <Text style={styles.headerStyle}>Gender</Text>
                                            <Text style={styles.sameStylingForDetails}>{userProfileDetails.gender}</Text>
                                        </Body>
                                    </ListItem>
                                    <ListItem>

                                        <Body style={styles.sameStyling}>
                                            <Text style={styles.headerStyle}>Address</Text>
                                            <Text style={styles.sameStylingForDetails}>{userProfileDetails.address}</Text>
                                        </Body>
                                    </ListItem>

                                </View>
                                <View style={{ display: "flex", justifyContent: 'center', alignItems: 'center', marginTop: 10, marginBottom: 20 }}>
                                    <Button title="Update Profile" color="#199187" onPress={() => navigation.navigate("ProfileForm")} />

                                </View>

                            </View>
                        </>


                        :

                        <>
                            <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', paddingTop: 200 }}>
                                <Text>You haven't created your Profile</Text>
                                <Button title="Create Profile" onPress={() => navigation.navigate('ProfileForm')} />
                            </View>


                        </>}

                </Content>
            </>


            :


            <>
            </>
        }




    </>
}

const styles = StyleSheet.create({
    profileImage: {
        width: 200,
        height: 200,
        borderRadius: 100,
        borderStyle: 'solid',
        borderWidth: 5,
        borderColor: '#199187'
    },
    sameStyling: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 10,

    },
    sameStylingForDetails: {
        // paddingLeft: 60,
        fontSize: 18
    },
    headerStyle: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#199187'
    }
})