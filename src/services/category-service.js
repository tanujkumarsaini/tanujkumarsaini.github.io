import { axiosOb, axiosPrivateOb } from "./axios-helper";
export const loadCategories=()=>{
    return axiosOb.get(`/category`).then(response=>response.data)
}

export const addCategory=(data)=>{
    console.log("from service"+data)
    return axiosPrivateOb.post(`/category`,data).then(response => response.data)
}

export function deleteCategory(catId){
    return axiosPrivateOb.delete(`/category/${catId}`).then(res => res.data)
}