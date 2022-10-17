import { axiosPrivateOb } from "./axios-helper"

export const addItemToCart=(productId,quantity)=>{

    return axiosPrivateOb.post(`/carts/`,{
        productId:productId,
        quantity:quantity
    }).then(response=>response.data)

}

export const getCart=()=>{
    return axiosPrivateOb.get(`/carts/`).then(res=>res.data)
}

export const removeItemFromCart=(productId)=>{
    return axiosPrivateOb.put(`/carts/${productId}`).then(res=>res.data)
}

