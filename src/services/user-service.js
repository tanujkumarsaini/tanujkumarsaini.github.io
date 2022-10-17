import { axiosOb, axiosPrivateOb } from "./axios-helper"


export const createUser=(data)=>{
    return axiosOb.post(`/users`,data).then(response=>response.data)
}

export const generateToken=(loginData)=>{
    return axiosOb.post(`/auth/login`,loginData).then(response=>response.data)
} 

export const getAllUsers=()=>{
    return axiosPrivateOb.get(`/users`).then(response=>response.data)
}

export const updateUserRole=(email)=>{
    return axiosPrivateOb.put(`/users/role/staff/${email}`).then(response=>response.data)
}

export const searchUserByName=(userName)=>{
    return axiosPrivateOb.get(`/users/search/${userName}`).then(response=>response.data)
}

export const updateUserDetails=(user)=>{
    return axiosPrivateOb.put(`/users/${user.userId}`,user)
}