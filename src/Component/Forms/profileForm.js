import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Text, Content, View, Form, Item, Input, Icon, Spinner } from 'native-base'
import { StyleSheet, Button } from 'react-native'
import { Image } from 'react-native-elements'
import Header from '../Header/Header'
import TabNavigation from '../TabNavigation/tab'
import { Picker } from '@react-native-picker/picker'
import { useDispatch } from 'react-redux'
import serverURL from '../../../serverSetting'
import axios from 'axios'
import { launchImageLibrary } from 'react-native-image-picker';
export default function ProfileForm(props) {
    const isUserSigned = useSelector(state => state.user)
    const profileDetails = useSelector(state => state.profileDetails)
    let [userID, setUserID] = useState('')
    let [fullName, setUserFullName] = useState('')
    let [phone, setPhone] = useState('')
    let [email, setEmail] = useState('')
    let [gender, setGender] = useState('')
    let [address, setAddress] = useState('')
    let [profileImage, setProfileImage] = useState('')
    let [profile, setProfile] = useState(null)
    const dispatch = useDispatch();
    let [responseAgainstProfileSubmission, setResponseAgainstProfileSubmission] = useState(false)
    let CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dxgymgbbb/image/upload";

    // **************** FUNCTION TO GET THE IMAGE **************
    const toGetImage = async () => {
        let options = {
            mediaType: "photo",
            includeBase64: true,
            maxHeight: 200,
            quality: 1,
            saveToPhotos: true,
        };
        launchImageLibrary(options, (res) => {
            if (res.didCancel) {
                alert("Something went Wrong in Picking Image");
                return
            }
            else if (res.errorMessage) {
                alert("Error In picking Image", + res.errorMessage)
            }
            setProfileImage(res.assets[0].base64)
        })
    }

    useEffect(() => {
        props.navigation.addListener('focus', () => {
            if (profileDetails) {
                gettingUserProfileDetailsToUpdate()
                return;
            }
            gettingUserProfileDetails()
        });
    }, [])

    // ******************* FUNCTION TO GETTING THE PROFILE DETAILS FOR UPDATE ******************

    const gettingUserProfileDetailsToUpdate = () => {
        if (profileDetails) {

            setUserFullName(profileDetails.fullName)
            setPhone(profileDetails.phone)
            setEmail(profileDetails.email)
            setGender(profileDetails.gender)
            setAddress(profileDetails.address)
            setProfileImage(profileDetails.profileImage)
            return;
        }
        props.navigation.navigate("Signup")
    }

    // ************** FUNCTION TO ASSIGNED THE USER EMAIL BY DEFAULT IN PROFILE FOR DETAILS IF ALREADY PROFILE CREATED **************

    const gettingUserProfileDetails = () => {
        if (isUserSigned) {
            setEmail(isUserSigned.email)
            return;
        }
        props.navigation.navigate("Signup")
    }

    // ********************** FUNCTION TO CLEAN THE FIELDS **************************

    const cleanFields = () => {
        setUserFullName('')
        setPhone('')
        setEmail('')
        setGender('')
        setAddress('')
        setProfileImage('')
    }


    // ****************** FUNCTION TO SAVE THE PROFILE DETAILS ******************
    
    const saveProfileDetails = () => {

        setResponseAgainstProfileSubmission(true)
        let base64Img = `data:image/jpg;base64,${profileImage}`;
        let data = {
            "file": base64Img,
            "upload_preset": "fp9fuz42",
        }

        //  ********** FETCH REQUEST TO SAVE THE IMAGE IN CLOUDINARY ****************

        fetch(CLOUDINARY_URL, { body: JSON.stringify(data), headers: { 'content-type': 'application/json' }, method: 'POST', })
            .then(r => r.json())
            .then(cloundnaryUploadedImageUrl => {
                let data = { profileData: { fullName, email, phone, gender, address, profileImage: cloundnaryUploadedImageUrl.url, userSignupID: isUserSigned._id } }
                
                // **************** AXIOS API TO SAVE THE PRODILE DETAILS **********

                return axios.post(`${serverURL.server_base_URL}/users/userProfile`, data)
                    .then(profile => {
                        if (profile.status) {
                            setResponseAgainstProfileSubmission(false)
                            dispatch({
                                type: "ProfileDetails",
                                payload: profile.data.user
                            })
                            alert("Profile created Successfuly")
                            cleanFields()
                            props.navigation.navigate("ProfilePage")
                            return
                        }
                    })

            })
            .catch(err => {
                setResponseAgainstProfileSubmission(false)
                console.log("something went wrong", err)
            })
    }

    // *************** FUNCTION TO SAVE THE EDITED PROFILE DETAILS *************

    const saveEditedProfileDetails = () => {
        let updatedUserProfile = { fullName, email, phone, gender, address, profileImage }

        axios.post(`${serverURL.server_base_URL}/users/updatedUserProfile/${profileDetails._id}`, updatedUserProfile)
            .then(updated => {

                axios.get(`${serverURL.server_base_URL}/users/getUserProfile/${isUserSigned._id}`)
                    .then(updatedData => {
                        if (updatedData.status) {
                            dispatch({
                                type: "ProfileDetails",
                                payload: updatedData.data.data
                            })
                            cleanFields()
                            props.navigation.navigate("ProfilePage")

                        }
                    })
            })
            .catch(err => {
                console.log("Error in updating profile", err)
            })
    }
    return <>
        <Header navigation={props.navigation} />
        <Content style={{ backgroundColor: '#e9ecef' }}>
            <View style={{ display: "flex", alignItems: 'flex-end', marginTop: 10, marginRight: 10 }}>
                <Button title="Back to home" onPress={() => props.navigation.navigate("Tab")} />
            </View>



            <View style={styles.Container}>
                <View>

                    <Text style={styles.header}>Create your profile</Text>
                </View>
                <Form>
                    <Item>
                        <Icon name="user" type="AntDesign" style={styles.icon} />
                        <Input placeholder="Full name" style={styles.input} value={fullName} onChangeText={(name) => setUserFullName(name)} />
                    </Item>
                    <Item>
                        <Icon name="phone" type="AntDesign" style={styles.icon} />
                        <Input placeholder="phone" style={styles.input} value={phone} onChangeText={(phone) => setPhone(phone)} />
                    </Item>
                    <Item>
                        <Icon name="mail" type="AntDesign" style={styles.icon} />
                        <Input placeholder="Email" style={styles.input} value={email} onChangeText={(email) => setEmail(email)} />
                    </Item>

                    <Item>


                        <Picker
                            mode="dropdown"
                            style={styles.picker}
                            onValueChange={(g) => setGender(g)}
                            selectedValue={gender}
                        >
                            <Picker.Item label="Select your gender" enabled={false} value="0" key="0" />
                            <Picker.Item label="Male" value="Male" key="1" />
                            <Picker.Item label="Female" value="Female" key="2" />

                        </Picker>
                    </Item>

                    <Item >
                        <Icon type="FontAwesome" name="address-card-o" style={styles.icon} />

                        <Input placeholder="Address" style={styles.input} value={address} onChangeText={(address) => setAddress(address)} />
                    </Item>
                    <Item>

                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 15, marginBottom: 10 }}>

                            <Button
                                value={profileImage}
                                title="Choose Photo"
                                onPress={toGetImage}
                            />


                        </View>
                    </Item>
                    {responseAgainstProfileSubmission ?
                        <>

                            <Spinner color='green' />
                        </>
                        :
                        <>
                            {profileDetails ?
                                <>
                                    <Button color="#199187" title="Edit Profile" onPress={saveEditedProfileDetails} />
                                </>
                                :
                                <>
                                    <Button color="#199187" title="Create Profile" onPress={saveProfileDetails} />
                                </>
                            }


                        </>
                    }
                </Form>

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
        color: '#000',
        paddingBottom: 10,
        fontWeight: 'bold',
        marginLeft: 15,
        marginBottom: 40,
        borderBottomColor: '#199187',
        borderBottomWidth: 1,


    },
    icon: {
        color: '#199187'
    },
    input: {
        color: '#000'
    },
    btn: {
        backgroundColor: '#199187',
        marginTop: 20,
        marginLeft: 15,
    },
    picker: {
        width: 370,
        marginTop: 10,
        marginLeft: -13,
    }

})