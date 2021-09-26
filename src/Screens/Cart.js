import React, { useState } from 'react'
import { Image } from 'react-native'
import { Container, Content, View, Text, Card, CardItem, Thumbnail, Button, Icon, Left, Body, Right } from 'native-base';
import Header from '../Component/Header/Header'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios';
import serverSetting from '../../serverSetting';
export default function Cart(props) {
    let cartDetails = useSelector(state => state.cartProducts.cart)
    let loggedUser = useSelector(state => state.user)
    let [productsFromCart, setProductsFromCart] = useState([])
    const dispatch = useDispatch()

    //  ****************** FUNCTION TO REMOVE THE PRODUCT FROM CART ****************
    const toRemoveProductFromCart = (id) => {
        const userID = loggedUser._id
        axios.post(`${serverSetting.server_base_URL}/users/remove-product-from-cart/${id}`, { LoggedInUserId: userID })
            .then(updatedCart => {
                alert("Successfully removed from cart")
                if (updatedCart.status) {

                    // ************* GET REQUEST TO GETR THE CURRENT CART IN ORDER TO SAVE THE UPDATED CART IN STORE ***************
                    
                    axios.get(`${serverSetting.server_base_URL}/users/getUser/${loggedUser._id}`)
                        .then(product => {
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
                console.log("Error in removing this product from Client side", err)
            })
    }
    return <>
        <Header navigation={props.navigation} />
        <Content>
            {cartDetails && cartDetails ?

                <>
                    <View style={{ marginLeft: 20, marginTop: 20, marginBottom: 20 }}>
                        <Text style={{ fontSize: 40, fontWeight: 'bold', color: '#fb9300' }}>My Cart</Text>


                    </View>
                    <View>
                        {cartDetails.map(product =>
                            <Card style={{ marginLeft: 20, marginRight: 20, marginBottom: 10 }}>
                                <CardItem>
                                    <Left>

                                        <Body>

                                            <Text >{product.productType} | {product.productName}</Text>
                                        </Body>
                                    </Left>
                                </CardItem>
                                <CardItem cardBody>
                                    <Image source={{ uri: product.productImage }} style={{ height: 200, width: null, flex: 1 }} />
                                </CardItem>
                                <CardItem>
                                    <Body>
                                        <Text note>Rs {product.productPrice}</Text>
                                    </Body>
                                </CardItem>
                                <CardItem>

                                    <Body>
                                        <Button full style={{ backgroundColor: 'red' }} onPress={() => { toRemoveProductFromCart(product._id) }}>

                                            <Text>Remove From Cart</Text>
                                        </Button>
                                    </Body>

                                </CardItem>
                            </Card>
                        )}

                    </View>
                </>
                :
                <>
                    <Text>Currently you have no products in cart</Text>
                </>
            }

        </Content>
    </>
}