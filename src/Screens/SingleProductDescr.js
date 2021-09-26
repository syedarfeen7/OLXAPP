import React, { useEffect, useState } from 'react';
import { Content, Text, View, Body, Icon, ListItem, Button } from 'native-base';
import { StyleSheet } from 'react-native'
import { Image } from 'react-native-elements'
import Header from '../Component/Header/Header'
import axios from 'axios';
import serverSetting from '../../serverSetting'; import { color } from 'react-native-elements/dist/helpers';
import { useSelector, useDispatch } from 'react-redux';
import { data } from 'browserslist';
export default function SingleProductDescription(props) {
    const productID = props.route.params.productID
    let loggedInUser = useSelector(state => state.user)
    const dispatch = useDispatch();
    const profileDetailsFromReduxStore = useSelector(state => state.profileDetails)
    let [productsFromCart, setProductsFromCart] = useState([])
    let [productDetials, setProductDetails] = useState(null);
    useEffect(() => {
        props.navigation.addListener('focus', () => {
            axios.get(`${serverSetting.server_base_URL}/product/get-single-product/${productID}`)
                .then(product => {
                    // console.log(product.data.product)
                    setProductDetails(product.data.product)
                })
                .catch(err => {
                    console.log("Not found", err)
                })
        });
    }, [productID])
    const toGoBack = () => {
        setProductDetails(null)
        props.navigation.navigate("Tab");
    }

    const addProductIntoCart = () => {
        if(!loggedInUser){
            props.navigation.navigate('Signin')
            return;
        }
        const productName = productDetials.productName
        const productType = productDetials.productType
        const productPrice = productDetials.productPrice
        const productID = productDetials._id
        const productImage = productDetials.productImage
        let data = { productDetailsForCart: { productName, productType, productPrice, productImage, productID } }
        axios.post(`${serverSetting.server_base_URL}/users/add-product-into-cart/${loggedInUser._id}`, data)
            .then(sucess => {
                alert("Successfully added Product into Cart")
                console.log(sucess.status)
                if (sucess.status) {
                    axios.get(`${serverSetting.server_base_URL}/users/getUser/${loggedInUser._id}`)
                        .then(product => {
                            console.log(product.data.data.cart.length)
                            setProductsFromCart(product.data.data)
                            dispatch({
                                type: "CartProducts",
                                payload: product.data.data
                            })

                        })
                        .catch(err => {
                            console.log("error======>", err)
                        })
                }
            })
            .catch(err => {
                console.log("Error", err)
            })
    }

    return <>

        <Header navigation={props.navigation} />
        {productDetials && productDetials ?
            <>
                <Content>
                    <View >


                        <View >
                            <Icon type="Ionicons" color="green" name="arrow-back" onPress={() => { toGoBack() }} />

                        </View>
                        <View>
                            <Image source={{ uri: productDetials.productImage }} style={{ height: 300 }} />
                        </View>

                        <View>
                            <ListItem>
                                <Body>
                                    <View style={{ display: 'flex', flexDirection: 'column' }}>

                                        <Text style={{ fontWeight: 'bold' }}>Rs {productDetials.productPrice}</Text>
                                        <Text style={{ fontWeight: 'bold' }}>{productDetials.productName}</Text>

                                    </View>
                                </Body>
                            </ListItem>


                        </View>
                        <View>
                            <ListItem>
                                <Body>
                                    <View style={{ display: 'flex' }}>

                                        <Text style={{ fontWeight: 'bold', color: '#199187', fontSize: 24 }}>Details</Text>
                                    </View>
                                </Body>
                            </ListItem>
                            <ListItem >
                                <Body >
                                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>

                                        <Text style={{ fontWeight: 'bold' }}>Price</Text>
                                        <Text>{productDetials.productPrice}</Text>
                                    </View>
                                </Body>
                            </ListItem>
                            <ListItem>
                                <Body>
                                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>

                                        <Text style={{ fontWeight: 'bold' }}>Type</Text>
                                        <Text>{productDetials.productTypeName}</Text>
                                    </View>

                                </Body>
                            </ListItem>
                            <ListItem>
                                <Body>
                                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>

                                        <Text style={{ fontWeight: 'bold' }}>Location</Text>
                                        <Text>Karchi Pakistan</Text>
                                    </View>

                                </Body>
                            </ListItem>
                            <ListItem>
                                <Body>
                                    <View style={{ display: 'flex', flexDirection: 'column' }}>

                                        <Text style={{ fontWeight: 'bold' }}>Description</Text>
                                        <Text>{productDetials.productDescription}</Text>
                                    </View>
                                </Body>
                            </ListItem>

                            <Button full style={{ backgroundColor: '#199187', height: 60, margin: 15 }} onPress={() => { addProductIntoCart() }}>
                                <Text>Add to Cart</Text>
                            </Button>

                        </View>

                        <View>
                            <Text style={{ textAlign: 'center', margin: 20, fontWeight: "bold", fontSize: 24, }}>Seller Profile</Text>

                        </View>

                    </View>

                </Content>

            </>
            :



            <></>}


    </>
}

const styles = StyleSheet.create({
    btn: {
        paddingTop: 100

    }
})