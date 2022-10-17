import { createContext, useState } from "react";

//1.creating context
export const context1=createContext({
cart:{
    items:[]
}
})


//2.Create provider
export const CartProvider=({children})=>{
    const [cart,setCart]=useState({
        items:[],
    });

return (
    <context1.Provider value={{cart:cart,setCart:setCart}}>
        {children}
    </context1.Provider>
);


};