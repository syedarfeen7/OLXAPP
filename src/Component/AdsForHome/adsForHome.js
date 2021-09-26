import React, { useEffect, useState } from 'react'
import { Image } from 'react-native'
import { Container, Content, Form, Item, Icon, Text, View, Card, CardItem, Left, Thumbnail, Body, Right, Button } from 'native-base';
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { Input } from 'react-native-elements';
import serverURL from '../../../serverSetting'
import axios from 'axios'
import Header from '../Header/Header'
export default function AdsForHome({ navigation }) {

    let loggedInUser = useSelector(state => state.user)
    let profileDetails = useSelector(state => state.ProfileDetails)
    let [userProfile, setUserProfile] = useState(null)
    let [productsFromCart, setProductsFromCart] = useState([])
    let [products, setProducts] = useState([])
    let [copyProducts, setCopyProducts] = useState([])

    const dispatch = useDispatch();

    useEffect(() => {
        navigation.addListener('focus', () => {
            if (loggedInUser) {
                gettingUserProfileForStoringInStore();
                gettingAllTheProductsExceptLoggedInUser()
                toGetCartProducts(loggedInUser._id)
                return;
            }
            else {
                gettingAllProducts()

            }
        });
    }, [])
    const toGetCartProducts = (id) => {
        axios.get(`${serverURL.server_base_URL}/users/getUser/${id}`)
            .then(product => {
                // console.log(product.data.data.cart.length)
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
    const gettingAllTheProductsExceptLoggedInUser = () => {
        axios.get(`${serverURL.server_base_URL}/product/get-product-except-logoin-user/${loggedInUser._id}`)
            .then(products => {

                setProducts(products.data.products)
                setCopyProducts(products.data.products)

            })
            .catch(err => {
                console.log("Error in getting all the products except currently logged in user", err)
            })
    }
    const gettingAllProducts = () => {
        axios.get(`${serverURL.server_base_URL}/product/all-product`)
            .then(allProducts => {
                setProducts(allProducts.data.products)
                setCopyProducts(allProducts.data.products)


            })
            .catch(err => {
                console.log("Error in getting all the products", err)
            })
    }
    const gettingUserProfileForStoringInStore = () => {

        axios.get(`${serverURL.server_base_URL}/users/getUserProfile/${loggedInUser._id}`)
            .then(profile => {
                setUserProfile(profile.data.data)

                dispatch({
                    type: "ProfileDetails",
                    payload: profile.data.data
                })

            })
            .catch(err => {
                console.log("Error in getting profile Details", err)
            })
    }
    const toShopThisProduct = (id) => {
        if (!loggedInUser) {
            navigation.navigate('Signin')
        }
        navigation.navigate("SingleProductDescr", {
            productID: id,
        })
    }

    const filterArray = (p) => {
        console.log(copyProducts.productTypeName)
        let filterArray = products.filter(pro =>
            pro.productTypeName.includes(p) || pro.productType.includes(p))
        if (!p) {
            filterArray = [...products]
            console.log(filterArray)
        }
        setCopyProducts(filterArray)
    }
    return <>

        <Header navigation={navigation} />

        <Content style={{ paddingBottom: 200 }}>
            <Form style={{ backgroundColor: '#f8f9fa' }}>
                <Item inlineLabel last style={{ padding: 20 }}>

                    <Input
                        onChangeText={(e) => { filterArray(e) }}
                        placeholder='Search products by name, category'
                        rightIcon={
                            <Icon
                                type="FontAwesome"
                                name='search'
                                style={{ color: '#006d77', fontWeight: 'bold', fontSize: 30 }}

                            />
                        }
                    />
                </Item>
            </Form>

            <View>
                <Text style={{ fontSize: 30, fontWeight: 'bold', marginLeft: 20, marginTop: 20, marginBottom: 20 }}>What <Text style={{ fontSize: 30, color: '#006d77' }}>We Have</Text></Text>

                {copyProducts.map(pro =>
                    <Card style={{ marginLeft: 20, marginRight: 20, marginBottom: 10 }}>
                        <CardItem>
                            {loggedInUser ?

                                <>
                                    <Left>
                                        <Thumbnail source={{ uri: pro.profileImage }} />
                                        <Body>
                                            <Text>{pro.productOwnerName}</Text>
                                            <Text note>{pro.productType} | {pro.productName}</Text>
                                        </Body>
                                    </Left>
                                </>

                                :


                                <>
                                    <Left>

                                        <Thumbnail source={{ uri: pro.profileImage }} />
                                        <Body>
                                            <Text note>{pro.productType} | {pro.productName}</Text>
                                        </Body>
                                    </Left>
                                </>}

                        </CardItem>
                        <CardItem cardBody>
                            <Image source={{ uri: pro.productImage }} style={{ height: 200, width: null, flex: 1 }} />
                        </CardItem>
                        <CardItem>

                            <Body>
                                <Button full style={{ backgroundColor: 'orange' }} onPress={() => { toShopThisProduct(pro._id) }}>

                                    <Text>Shop Now</Text>
                                </Button>
                            </Body>

                        </CardItem>
                    </Card>
                )}

            </View>

        </Content>



    </>
}