import React, { useState } from 'react'
import { useEffect } from 'react'
import { Button, Card, CardBody, CardText, Col, Container, FormGroup, Input, Row } from 'reactstrap'
import { addItemToCart, getCart } from '../services/cart-service'
import Base from './Base'
import { removeItemFromCart } from '../services/cart-service'
import { useContext } from 'react'
import { context1 } from '../context'
import { toast } from 'react-toastify'
import {BASE_URL} from '../services/axios-helper'
import { createOrder as createOrderService} from '../services/order-service'
import {createOrder as paymentOrder,successPayment} from '../services/payment_service'
import {useNavigate} from "react-router-dom";
function Cart() {


  const navigate=useNavigate()

  let imageStyle={
    width:'100%',
    height:'100px',
    objectFit:'contain',
    margin:'15px 0 '
}

const value=useContext(context1)
const [orderProceed,setOrderProceed]=useState(false)
  const [cart,setCart]=useState(null)

  const [orderCreated,setOrderCreated]=useState(false)

  const [orderDetail,setOrderDetail]=useState({
    address:'',
    cartId:''
  })

  useEffect(()=>{
  setTimeout(()=>{
    getCart().then(data=>{

      setCart(data)
      value.setCart(data)
    }).catch(error=>{
      console.log(error)
    })
  },1000)
  },[])


const changeQuantity=(productId,quantity)=>{
  addItemToCart(productId,quantity)
  .then(
    data=>{
      setCart({...data })
    }
  )
  .catch(error=>{
    console.log(error)
    toast.error("Error in changing the quantity")
  })
}


const initializeRazorpay=()=>{
return new Promise((res)=>{
  const script=document.createElement("script")
  script.src='https://checkout.razorpay.com/v1/checkout.js'
  script.onload=()=>{
    res(true)
  }
  script.onerror=()=>{
    res(false)
  }
  document.body.appendChild(script)
})
}

//initiate payment
async function initiatePayment(data){
  console.log(data)
  const res=await initializeRazorpay();
  if(res){
    //
    
    paymentOrder(data.orderAmount).then(res =>{
      console.log(res)
      toast.success("Order created")

      if (res.message === 'CREATED') {


        //open payment form


        var options = {
            "key": "rzp_test_EGsQvPvh17P2vy", // Enter the Key ID generated from the Dashboard
            "amount": res.price, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": "INR",
            "name": "TANUJ KUMAR SAINI",
            "description": "This is learning payment module",
            "image": "",
            "order_id": res.orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "prefill": {
                "name": "",
                "email": "",
                "contact": "9999999999"
            },
            "notes": {
                "address": ""
            },
            "theme": {
                "color": "#3399cc"
            }
        };


        options.handler = (response) => {


            response['user_order_id'] = data.orderId
            console.log(response)

            successPayment(response).then(r => {
                console.log(r)
                if (r.captured) {
                    toast.success("Payment done .. your order proceeded")
                    navigate("/user/orders")

                }

            }).catch(error => {
                console.log(error)
                toast.error("Error while capturing the payment :")
            })


        }


        const rzp = new window.Razorpay(options);
        rzp.open()


    } 

    }).catch(error=>{
      console.log(error)
      toast.error("Error in creating order")
    })

  }
  else{
    toast.error("Error in initializing razorpay")
  }
}

const deleteProductFromCart=(item)=>{
removeItemFromCart(item.product.productId).then(data=>{
  setCart(data)
  value.setCart(data)
}).catch(error=>{
  console.log(error)
})
}

const createOrder=()=>{
  let f=window.confirm("Are you sure want to proceed ?")
  if(f==false){
    console.log(f)
    return
  }
  //updating the cart id of order detail
  orderDetail.cartId=cart.cartId
  createOrderService(orderDetail).then((data)=>{
  toast.success("Order Created : Redirecting to payment page...")
  setOrderCreated(true)
  initiatePayment(data);
  })
  .catch(error=>{

    console.log(error)
    toast.error("Error in creating order")
  })
}


const orderProceedHtml=()=>{
  return(
    <div>
      <h1>Fill the detail:</h1>
      <FormGroup>
        <Input 
        style={{
          height:'300px'
        }}
        type='textarea' placeholder='Enter your address here' value={orderDetail.address} onChange={(event)=>setOrderDetail({...orderDetail,address:event.target.value})}/>
      </FormGroup>

      <Container className='text-center'>
      <Button color='secondary' size='lg' onClick={()=>setOrderProceed(false)}>Back</Button>
        <Button onClick={createOrder} color='success' className='ms-3' size='lg'>Create Order & Proceed for payment</Button>
      </Container>
    </div>
  )
}


const cartItemsHtml=()=>{
  return(
    <div className='mt-3'>
    {cart.items.map((item,index)=>(
     <Card className='mt-3 border-0 shadow-sm' key={index}>
       <CardBody>
         <Row>
          <Col md={8}>
          <h3>{item.product.productName}</h3>
         <CardText>
           Quantity :<b>{item.quantity}</b>
         </CardText>
         <div>
         <Button color='primary' size='sm' onClick={()=>changeQuantity(item.product.productId,(item.quantity+1))}>Increase Quantity</Button>
         <Button color='warning'  className='ms-2' size='sm' onClick={()=>changeQuantity(item.product.productId,(item.quantity-1))}>Decrease Quantity</Button>
         <Button color='danger'  className='ms-2' size='sm' onClick={(event)=>{deleteProductFromCart(item)} }>Remove Item</Button>
         </div>
         <CardText className='mt-2'>
           Total Price : <b>{item.totalProductPrice}</b>
         </CardText>

          </Col>

          <Col md={4}>
          <img style={imageStyle} src={BASE_URL+'/products/images/'+item.product.productId}/>
          </Col>
         </Row>

       </CardBody>
     </Card>
    ))}

    <Container className='my-3 text-center'>
    {cart.items.length>0?<Button onClick={()=>setOrderProceed(true)} color='success' size='lg'>Click here to proceed</Button>:' '}
    </Container>


   </div>

  )
}



const cartHtml=()=>{
  return (
    <Container>
      
      <h1>Cart Items({cart.items.length})</h1>
      {orderProceed? orderCreated?<h1>Order created , Redirecting to payment page...</h1> :  orderProceedHtml():cartItemsHtml()}
      
     
    </Container>
  )
}


  return (
    <Base>
    {cart ? cartHtml():(
    <Container>
      <h1>Loading...</h1>
    </Container>
    )}
    </Base>
  )
}

export default Cart