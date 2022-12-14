import React, { useState } from 'react'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { Button, Card, CardBody, CardText, Col, Container, Row,Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { getOrders, getOrdersByUser } from '../services/order-service'
import Base from './Base'
import {BASE_URL} from '../services/axios-helper'
import { useContext } from 'react'
import { context1 } from '../context'
import { getCurrentUser } from '../auth'
import {createOrder as paymentOrder,successPayment} from '../services/payment_service'
import {useNavigate} from "react-router-dom";

function Orders() {

    let imageStyle={
        width:'100%',
        height:'100px',
        objectFit:'contain',
        margin:'15px 0 '
    }
    
    const navigate=useNavigate()

const [orders,setOrders]=useState(null)
const [modal, setModal] = useState(false);
const [selectedItem,setSelectedItem]=useState(null)
const toggle = () => setModal(!modal);

const closeModal = () => setModal(false);
const openModal = (order) =>{
    setSelectedItem(order)   
    setModal(true);
}




    useEffect(()=>{
      
        getOrdersByUser(getCurrentUser()).then(data=>{
            console.log(data)
            setOrders({...data})
        }).catch(error=>{  
            console.log(error) 
            toast.error("Error in loading orders")
        })
    },[])




    const formData=(time)=>{
return new Date(time).toDateString()
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
                     // navigate("/user/orders")
                     getOrdersByUser(getCurrentUser()).then(data=>{
                        console.log(data)
                        setOrders({...data})
                    }).catch(error=>{  
                        console.log(error) 
                        toast.error("Error in loading orders")
                    })
                     
                      
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
  





const modalHtml=()=>{
    return(
        <Modal isOpen={modal} toggle={closeModal} className="lg">
        <ModalHeader toggle={closeModal}>Products or Order {selectedItem && 'MYSHOP'+selectedItem.orderId}</ModalHeader>
        <ModalBody>
       
        {
          selectedItem &&  selectedItem.items.map((item,index)=>(

            <Card className='mt-3 border-0 shadow-sm' key={index}>
            <CardBody>
                <Row key={index}>
                <Col md={8}>
                <h3>{item.product.productName}</h3>
               <CardText>
                 Quantity :<b>{item.quantity}</b>
               </CardText>
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
            ))
        }
        
        </ModalBody>
       
      </Modal>
    )
}

const htmlCode=()=>{
return (
    <Row>
    <Col md={{size:8,offset:2}}>
       {
        orders.content.map(order=>(
            <Card className={order.paymentStatus==='PAID'?'border-success':'border-danger mt-2'} key={order.orderId}>
            <CardBody>
                <Row>
                    <Col md={6}>
                        
                <CardText>
                    ORDER NUMBER : <b> MYSHOP{order.orderId}</b>
                </CardText>
                    </Col>

                    <Col md={6}>
                        CREATED AT: <b>{formData(order.orderCreated)}</b>

                    </Col>
                </Row>

                <Row>
                    <Col md={6}>
                        
                <CardText>
                    ORDER STATUS : <b> {order.orderStatus}</b>
                </CardText>
                    </Col>

                    <Col md={6}>
                       ORDER AMOUNT : <b> ???{order.orderAmount }</b>
                     </Col>
                </Row>

                <Row>
                    <Col md={6}>
                        
                <CardText>
                    PAYMENT STATUS : <b className={order.paymentStatus==='PAID' ? 'text-success' : 'text-danger'}> {order.paymentStatus}</b>
                </CardText>
                    </Col>

                    <Col md={6}>
                       ORDER DELIVERED : <b> {order.orderDelivered?formData(order.orderDelivered):'Not delivered yet' }</b>
                     </Col>
                </Row>

                <CardText className='mt-2 text-mutted'>
                    {order.billingAddress}
                </CardText>

                <Container className='text-center
                '>
                    {order.paymentStatus==='Not PAID' ? <Button size='sm' onClick={event=>initiatePayment(order)} className='border-0' color='success'>Pay Now</Button>:''}
                   <Button color='primary' size='sm' onClick={()=>openModal(order)} className='ms-2'>View Products</Button>
                </Container>




            </CardBody>
        </Card>
        ))
       }
    </Col>
</Row>

)
}

  return (
    <Base>
    <Container>
        {orders ? htmlCode():<h1>Loading....</h1>}
    </Container>
    {modalHtml()}
    </Base>
  )
}

export default Orders