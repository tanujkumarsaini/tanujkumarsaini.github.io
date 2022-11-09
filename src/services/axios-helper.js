import axios from "axios";
import { getToken } from "../auth";
//export const BASE_URL="https://my-shop-ap.herokuapp.com"

export const BASE_URL="http://localhost:8082"

export const axiosOb=axios.create({
    baseURL:BASE_URL
})

export const axiosPrivateOb=axios.create({
    baseURL:BASE_URL
})

axiosPrivateOb.interceptors.request.use(request=>{
    console.log('interceptor executed');
    //change therequest :add the Authorization header
    let token=getToken()
    if(token){
        console.log("token added to header")
        request.headers.common.Authorization=`Bearer  ${token}`

    }
    return request;
},error=>Promise.reject(error))