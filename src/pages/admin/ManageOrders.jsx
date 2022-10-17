import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { Button, Card, CardBody, CardHeader, Col, Container, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Row, Table, UncontrolledDropdown } from 'reactstrap'
import { filterOrders, getOrders, updateOrder } from '../../services/order-service'

function ManageOrders() {

  const [orders,setOrders]=useState(null)

    useEffect(()=>{
    getOrders().then(data=>{
    setOrders(data)
    })
    .catch(error=>{
      console.log(error)
      toast.error("Failed to load orders")
    })
  },[])


function checkPaymentStatus(status){
  console.log(status+"")
if(status==='CREATED'){
  return false
}else{
  return true
}
}

const updateOrderStatus=(o)=>{
console.log(o.orderId)
updateOrder(o.orderId).then(data=>{
getOrders().then(data=>{
console.log("from update"+data)

setOrders(data)  
}).catch(error=>{
  console.log(error)
})
  
toast.success("Delivered ")

})
.catch(error=>{
  console.log(error)
})
}

const formData=(time)=>{

  
  return new Date(time).toDateString()
  }
  
const filterAllOrders=(filter)=>{
filterOrders(filter).then(data=>{
console.log(data)
setOrders(data)
})
.catch(error=>{
  console.log(error)
})
}


  return (
  <div>
    
    <Container>
      <Card>
         <CardBody>
          <Row>
            <Col md={5}>
            <h2>Here is all orders!!</h2>
            </Col>
            <Col md={7}>
            <UncontrolledDropdown>
            <DropdownToggle caret color='warning'>
              Filter
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem onClick={event=>filterAllOrders('ALL')}>All</DropdownItem>
              <DropdownItem onClick={event=>filterAllOrders('DATE')}>Date-Wise</DropdownItem>
              <DropdownItem onClick={event=>filterAllOrders('PAID')}>Paid</DropdownItem>
              <DropdownItem onClick={event=>filterAllOrders('NOT-PAID')}>Not-Paid</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>

             
            </Col>


          </Row>

        
         <Table
         bordered
        borderless
        responsive
        hover
        className={'bg-white text-center'}  
         >
            <thead>
              <tr>
                <th>OrderId</th>
                <th>UserId</th>
                <th>OrderAmount</th>
                <th>BillingAddress</th>
                <th>OrderCreatedAt</th>
               <th>PaymentStatus</th>
                <th>OrderStatus</th>
                <th>Delivered At</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders && orders.content.map((o,index)=>{
                return(
                  <tr key={index}>
                    <td>{o.orderId}</td>
                    <td>{o.user.userId}</td>
                    <td>{o.orderAmount}</td>
                    <td>{o.billingAddress}</td>
                    <td>{formData(o.orderCreated)}</td>
                    <td>{o.paymentStatus}</td>
                    <td>{o.orderStatus}</td>
                    <td>{o.orderDelivered && formData(o.orderDelivered)}</td>
                    <td>

                   {checkPaymentStatus(o.orderStatus)?'':<Button size='sm' color='primary' onClick={event=>updateOrderStatus(o)}>Deliver</Button>}
                   
                   </td>

                  </tr>
                )
              })}
            </tbody>
            </Table>
        </CardBody>
      </Card>
    </Container>


   
  </div>
    )
}

export default ManageOrders