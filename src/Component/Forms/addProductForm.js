import React, { useState } from 'react';
import { Content, View, Form, Item, Icon, Input, Text, Spinner } from 'native-base';
import { StyleSheet, Button } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { launchImageLibrary } from 'react-native-image-picker';

import { Image } from 'react-native-elements'

import Header from '../Header/Header'
import { useSelector } from 'react-redux'
import axios from 'axios';
import serverSetting from '../../../serverSetting';
export default function AddProductFrom(props) {

    let [productName, setProductName] = useState('')
    let [productType, setProductType] = useState('')
    let [productPrice, setProductPrice] = useState('')
    let [productTypeName, setProductTypeName] = useState('')
    let [productDescription, setProductDescription] = useState('')
    let [productImage, setProductImage] = useState('')
    let [copySubCategory, setCopySubCategory] = useState([])
    let [responseAgainstProductSubmission, setResponseAgainstProductSubmission] = useState(false)
    let CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dxgymgbbb/image/upload";
    const isUserSigned = useSelector(state => state.user)
    const profileDetails = useSelector(state => state.profileDetails)

    // ****************** PRE DEFINDE CATEGORY **********************
    let productCategory = ["Vehicle", "Bike", "Phone", "Clothes", "Electronics"]
    
    // ****************** PRE DEFINED SUB CATEGORY **********************
    let productSubCategory = [
        { productCategory: "Vehicle", productCompanyName: "BMW" },
        { productCategory: "Vehicle", productCompanyName: "Toyota" },
        { productCategory: "Vehicle", productCompanyName: "Audi" },
        { productCategory: "Bike", productCompanyName: "Yamaha" },
        { productCategory: "Bike", productCompanyName: "Honda" },
        { productCategory: "Bike", productCompanyName: "Unique" },
        { productCategory: "Phone", productCompanyName: "Motorola" },
        { productCategory: "Phone", productCompanyName: "Redmi" },
        { productCategory: "Phone", productCompanyName: "Samsung" },
        { productCategory: "Clothes", productCompanyName: "J." },
        { productCategory: "Clothes", productCompanyName: "MTJ" },
        { productCategory: "Clothes", productCompanyName: "Al KaramS" },
        { productCategory: "Electronics", productCompanyName: "MI" },
        { productCategory: "Electronics", productCompanyName: "Audionic" },
        { productCategory: "Electronics", productCompanyName: "Haier" },
        { productCategory: "Electronics", productCompanyName: "Orient" },
        { productCategory: "Electronics", productCompanyName: "Dell" },

    ]
    // ****************** FUNCTION TO CLEAN FIELDS **********************

    const cleanFields = () => {
        console.log("Hello inside clean fields")
        setProductName("")
        setProductType('')
        setProductTypeName('')
        setProductPrice('')
        setProductDescription('')
        setProductImage('')
    }

    // FUNCTION TO GET IMAGE **********************
    const toGetImage = () => {
        const options = {
            mediaType: "photo",
            includeBase64: true,
            maxHeight: 200,
            quality: 1,
            saveToPhotos: true,
        };
        launchImageLibrary(options, response => {
            if (response.didCancel) {
                alert("Something went Wrong in Picking Image");
                return
            }
            else if (response.errorMessage) {
                alert("Error In picking Image", + response.errorMessage)
            }
            setProductImage(response.assets[0].base64)
            console.log(productImage)

        })
    }

    // ****************** FUNCTION TO SAVE THE PRODUCT DETAILS **********************
    const saveProductDetails = () => {
        if (productName && productType && productTypeName && productPrice && productDescription && productImage) {

            setResponseAgainstProductSubmission(true)
            let base64Img = `data:image/jpg;base64,${productImage}`;
            let data = {
                "file": base64Img,
                "upload_preset": "fp9fuz42",
            }
            // ****************** TO SAVE THA IMAGE IN CLOUDINARY **********************

            fetch(CLOUDINARY_URL, { body: JSON.stringify(data), headers: { 'content-type': 'application/json' }, method: 'POST' })
                .then(r => r.json())
                .then(cloudinaryImageURL => {
                    let data = {
                        productDetails: { productName, productType, productTypeName, productPrice, productDescription, productOwnerName: `${isUserSigned.firstName} ${isUserSigned.lastName}`, profileImage: profileDetails.profileImage, productImage: cloudinaryImageURL.url, userSignedID: isUserSigned._id }
                    }
                    //  ****************** TO ADD THE PRODUCT IN DATA BASE **********************
                    return axios.post(`${serverSetting.server_base_URL}/product/add-product`, data)
                        .then(product => {
                            if (product.status) {
                                setResponseAgainstProductSubmission(false)
                                cleanFields()
                                alert("Product created successfully")

                            }
                        })

                })
        }
        else {
            alert("Please fill out all the fields")
        }
    }
    
    // ****************** FUNCTION TO SET THE SUB CATEGRORY IN RESPONSE OF SLECTED CATEGORY **********************

    const filterCategory = (cat) => {
        let toSetSubCat = []
        productSubCategory.forEach(p => {
            if (p.productCategory === cat) {
                toSetSubCat.push(p)
            }

        })
        setCopySubCategory(toSetSubCat)
    }
    return <>
        <Header navigation={props.navigation} />
        <Content >
            <View style={styles.Container}>
                <View>

                    <Text style={styles.header}>Add details about your Product</Text>
                </View>
                <Form>
                    <Item>

                        <Input placeholder="Product name" style={styles.input} value={productName} onChangeText={(prName) => setProductName(prName)} />
                    </Item>
                    <Item>

                        <Picker
                            mode="dropdown"
                            style={styles.picker}
                            selectedValue={productType}
                            value={productType}
                            onValueChange={(prType) => {

                                setProductType(prType)
                                filterCategory(prType)
                            }}
                        >
                            <Picker.Item label="Select any one category" enabled={false} value="0" key="0" />
                            {productCategory.map(cat => <Picker.Item label={cat} value={cat} key="1" />)}

                        </Picker>
                    </Item>
                    {productType.length > 0 ?

                        <Item>

                            <Picker
                                mode="dropdown"
                                style={styles.picker}
                                selectedValue={productType}
                                onValueChange={(prType) => setProductTypeName(prType)}
                            >

                                <Picker.Item label="Select Company Name" enabled={false} value="0" key="0" />
                                {copySubCategory.map(cat => <Picker.Item label={cat.productCompanyName} value={cat.productCompanyName} key="1" />)}

                            </Picker>
                        </Item>
                        :
                        <></>
                    }
                    <Item>

                        <Input placeholder="Price" style={styles.input} value={productPrice} onChangeText={(prPrice) => setProductPrice(prPrice)} />
                    </Item>


                    <Item >


                        <Input placeholder="Product Description" style={styles.input} value={productDescription} onChangeText={(prDescription) => setProductDescription(prDescription)} />
                    </Item>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10, marginBottom: 10, marginLeft: 13 }}>
                        
                        {/*  TO CHECK THE STATUS OF SELECTED IMAGE*/}
                        {productImage ?
                            <>
                                <Button

                                    title="Selected"
                                    disabled
                                />
                            </>
                            :
                            <>
                                <Button

                                    title="Choose Photo"
                                    onPress={toGetImage}
                                />
                            </>
                        }



                        <Image source={{ uri: productImage }} style={{ width: 100, height: 100 }} />


                        {responseAgainstProductSubmission ?
                            <>
                                <Spinner color="green" />
                            </>


                            :
                            <>
                                <Button color="#199187" title="Add Product" onPress={saveProductDetails} />

                            </>
                        }
                    </View>


                </Form>
                <Button title="Refresh" onPress={cleanFields} />

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
        fontWeight: 'bold',
        color: '#36485f',
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
        color: '#000'
    },
    picker: {
        width: 300,
        marginTop: 10,
        marginLeft: -13,
    }

})