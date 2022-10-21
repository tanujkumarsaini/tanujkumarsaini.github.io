import React, { useState } from 'react'
import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import Base from './Base'
import {getProduct} from '../services/product-service'
import { Button, Card, CardBody, CardText, Col, Container, Row } from 'reactstrap'
import { BASE_URL } from '../services/axios-helper'
import {addItemToCart as addCart} from '../services/cart-service'
import { toast } from 'react-toastify'
import { context1 } from '../context'
import { useContext } from 'react'
function ViewProduct() {


    const value=useContext(context1)

    const {productId}=useParams()
const [product,setProduct]=useState(null)

useEffect(()=>{
    //load the product of given id
    getProduct(productId).then((data)=>{
        console.log(data)
        setProduct(data)

    }).catch(error=>{
        console.log(error)
    })
},[])



//add  item to cart
const addItemToCart=(product)=>{

    if(!product.stock){
        toast.error("product is not in stock")
        return;
    }

    console.log(product)
    addCart(product.productId,1).then((data)=>{
        console.log(data)
        value.setCart(data)
        toast.success("Item Added to Cart")
    }).catch(error=>{
        console.log(error)
    })
}   

const productHtml=()=>{
    return (
        <Card>
        <CardBody>
            <h1>{product.productName}</h1>
            <CardText className='text-muted'>
                {product.category.catgoryTitle}

            </CardText>

            <div className='image-container text-center'>
                <img style={{maxHeight:'200px'}} className='img-fluid' src={BASE_URL+'products/images/'+product.productId}/>

            </div>

            <CardText>
                Price : <b>₹{product.productPrice}</b>
            </CardText>

            <CardText dangerouslySetInnerHTML={{__html:product.productDesc}}>
             </CardText>
             <Container className='text-center'>
                <Button onClick={()=>addItemToCart(product)} color='success' size='lg'>Add to cart</Button>
                <Button  tag={Link} to="/store/all" color='secondary'  className='ms-2' size='lg'>Go Back</Button>

             </Container>
        </CardBody>
    </Card>

    )
}

  return (
  <Base>
  <Container>
    <Row>

        <Col md={{size:10,offset:1}}>
            {product && product.stock?productHtml():<h1 className='text-center textt-danger my-5'>Product is not in stock..</h1>}
            

        </Col>
            
    </Row>
  </Container>

  </Base>


  )
}

export default ViewProduct