import { axiosPrivateOb } from "./axios-helper"


export const createOrder=(orderDetail)=>{
    return axiosPrivateOb.post(`/orders/`,orderDetail).then(response=>response.data)
}

export const getOrders=()=>{
return axiosPrivateOb.get(`/orders/`).then(res=>res.data)
}

export const updateOrder=(orderId)=>{
    return axiosPrivateOb.put(`/orders/status/${orderId}`).then(response=>response.data)
}

export const filterOrders=(filterBy)=>{
return axiosPrivateOb.get(`/orders/filter/${filterBy}`).then(response=>response.data)
}

export const getOrdersByUser=(user)=>{
    return axiosPrivateOb.get(`/orders/user/${user.userId}`).then(response=>response.data)
}