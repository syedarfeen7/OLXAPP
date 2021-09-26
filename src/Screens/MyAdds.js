import React from 'react';
import { Container, Content, View, Text, Card, CardItem, Thumbnail, Button, Icon, Left, Body, Right } from 'native-base';
import { Image } from 'react-native'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import serverSetting from '../../serverSetting'
import Header from '../Component/Header/Header'
export default function MyAdds(props) {
    let [productDetails, setProductDetails] = useState([])
    const loggedUserDetails = useSelector(state => state.user)
    const profileDetails = useSelector(state => state.profileDetails)
    const dispatch = useDispatch();
    useEffect(() => {

        props.navigation.addListener('focus', () => {
            if (!loggedUserDetails) {
                props.navigation.navigate("Signin");
                return;
            }
            toGetUserPostedProducts()
        });
    }, [])


    //  ****************** FUNCTION TO GET THE ALL PRODUCT OF LOGGED IN USER ********************

    const toGetUserPostedProducts = () => {
        axios.get(`${serverSetting.server_base_URL}/product/get-products/${loggedUserDetails._id}`)
            .then(allProducts => {
                console.log(allProducts.data.products)
                setProductDetails(allProducts.data.products)

            })
            .catch(err => {
                console.log("Error in getting all the products", err)
            })
    }


    //  ************** FUNCTION TO DELETE THE PRODUCT FROM MY ADDS *************
    
    const toDeleteThisProduct = (id) => {
        axios.post(`${serverSetting.server_base_URL}/product/delete-product/${id}`)
            .then(success => {
                alert("Successfully delete this product")
                toGetUserPostedProducts()
                if (success.status) {

                    //  **************** POST REQUEST TO DELETE THIS PRODUCT FROM ALL USER CART ****************

                    axios.post(`${serverSetting.server_base_URL}/users/remove-product-from-all-users-cart/${id}`)
                        .then(updatedCart => {
                            console.log("Succesfully deleted this product from all user carts")
                        })
                        .catch(err => {
                            console.log("Error in removing this product from Client side", err)
                        })
                }
            })
            .catch(err => {
                alert("Error in deleting this product")
                console.log(err)
            })
    }
    return <>

        <Header navigation={props.navigation} />
        {productDetails && productDetails ?

            <>
                <Content>
                    <View style={{ marginLeft: 20, marginTop: 20, marginBottom: 20 }}>
                        <Text style={{ fontSize: 40, fontWeight: 'bold', color: '#fb9300' }}>My Adds</Text>


                    </View>
                    <View>
                        {productDetails.map(product =>
                            <Card style={{ marginLeft: 20, marginRight: 20, marginBottom: 10 }}>
                                <CardItem>
                                    <Left>
                                        <Thumbnail source={{ uri: profileDetails.profileImage }} />
                                        <Body>
                                            <Text>{profileDetails.fullName}</Text>
                                            <Text note>{product.productType} | {product.productName}</Text>
                                        </Body>
                                    </Left>
                                </CardItem>
                                <CardItem cardBody>
                                    <Image source={{ uri: product.productImage }} style={{ height: 200, width: null, flex: 1 }} />
                                </CardItem>
                                <CardItem>

                                    <Body>
                                        <Button full style={{ backgroundColor: 'red' }} onPress={() => { toDeleteThisProduct(product._id) }}>

                                            <Text>Delete Product</Text>
                                        </Button>
                                    </Body>

                                </CardItem>
                            </Card>
                        )}

                    </View>
                </Content>
            </>

            :

            <>
                <Content>
                    <View style={{ display: 'flex', alignSelf: 'center' }}>

                        <Text style={{ color: 'grey', fontWeight: 'bold' }}>You have not posted a single product yet!</Text>
                    </View>
                </Content>
            </>}


    </>
}