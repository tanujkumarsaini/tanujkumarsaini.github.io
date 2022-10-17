import { axiosOb, axiosPrivateOb } from "./axios-helper";

export const loadProducts=(
pageNumber='0',
pageSize='9',
sortBy='productId',
sortDir='desc'
)=>{
    
    return axiosOb.get(`/products?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBY=${sortBy}&sortDir=${sortDir}`).then(response=>response.data)
};

export const loadProductsByCategory=(
    categoryId,
    pageNumber='0',
    pageSize='9',
    sortBy='productId',
    sortDir='desc'
    )=>{
        
        return axiosOb.get(`/categories/${categoryId}/products?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBY=${sortBy}&sortDir=${sortDir}`).then(response=>response.data)
    };
    

export const loadProductsBySearch=(searchData)=>{
    return axiosOb.get(`/products/search/${searchData}`).then(response=>response.data)
};


export const getProduct=(productId)=>{
    return axiosOb.get(`/products/${productId}`).then(res =>res.data)
};

//delete product
export function deleteProduct(productId){
    return axiosPrivateOb.delete(`/products/${productId}`).then(res=> res.data)
};

export function addProduct(product){
    console.log(product.categoryId)
    return axiosPrivateOb.post(`/categories/${product.categoryId}/products`,product).then(res=>res.data)
}

export const uploadProductImage =(image,productId)=>{
    let formData=new FormData();
    formData.append("product_image",image);
    return axiosPrivateOb.post(`/products/images/${productId}`,formData,{
        headers:{
            'Content-Type':'multipart/form-data'
        }
    })
    .then((response)=> response.data);
}


export const updateProductDetails=(productId,product)=>{
    console.log(product.category.categoryId)
    return axiosPrivateOb.put(`/products/${productId}`,product).then(response=>response.data)
}













