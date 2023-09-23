import axios from "axios";
import { useEffect, useState } from "react";
import { createContext } from "react";
export let cartContext = createContext()
export function CartContextProvider(porps) {
    const [cartId, setcartId] = useState(null)
    const [numOfCartItems, setnumOfCartItems] = useState(0)

    async function getCart() {
        let response = await getLogUserCart()
        if (response?.data?.status === "success") {
            setnumOfCartItems(response.data.numOfCartItems)
            setcartId(response.data.data._id)
        }
    }
    useEffect(() => {

        getCart()
    }, [])

    let headers = {
        token: localStorage.getItem("userToken")
    }
    function addToCart(x) {
        return axios.post('https://route-ecommerce.onrender.com/api/v1/cart', {
            productId: x
        }, {
            headers: headers
        }).then((response) => response).catch((error) => error)
    }
    function getLogUserCart() {
        return axios.get('https://route-ecommerce.onrender.com/api/v1/cart',
            {
                headers: headers
            }).then((response) => response).catch((error) => error)
    }
    function removeProduct(productId) {
        return axios.delete(`https://route-ecommerce.onrender.com/api/v1/cart/${productId}`, {
            headers: headers
        }).then((response) => response)
            .catch((error) => error)
    }
    function updateCount(productId, count) {
        return axios.put(`https://route-ecommerce.onrender.com/api/v1/cart/${productId}`,
            {
                count: count
            }, {
            headers: headers
        }).then((response) => response)
            .catch((error) => error)
    }
    function onlinePayment(cartId, shippingAddress) {

        return axios.post(`https://route-ecommerce.onrender.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,
            {
                shippingAddress: shippingAddress
            }, {
            headers: headers
        }).then((response) => response)
            .catch((error) => error)
    }

    return <cartContext.Provider value={{ setnumOfCartItems, numOfCartItems, cartId, onlinePayment, addToCart, getLogUserCart, removeProduct, updateCount }}>

        {porps.children}

    </cartContext.Provider>

}