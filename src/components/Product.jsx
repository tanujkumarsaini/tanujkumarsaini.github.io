import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Card, CardBody, CardText, Container } from 'reactstrap'
import { BASE_URL } from '../services/axios-helper'

function Product({product,addToCart }) {
    let imageStyle={
        width:'100%',
        height:'200px',
        objectFit:'contain',
        margin:'15px 0 '
    }

  const getProductHtml=()=> {
    return(
      <Card className='mt-2 border-0 shadow-sm'>
      <img style={imageStyle} src={BASE_URL+'/products/images/'+product.productId}/>
        <CardBody>
          <CardText><span className='text-mutted'>{product.category.catgoryTitle}</span></CardText>
          <h5>{product.productName}</h5>
          <CardText>
              <span>{product.productDesc.slice(0,10)}...</span>
          </CardText>
  
          <CardText>
              Price: <b>₹ {product.productPrice}</b>
          </CardText>
  
          <Container className='text-center'>
              <Button onClick={(event)=>addToCart(product)} size='sm' color={product.stock?'success':'danger'}>{product.stock?'Add to cart':'Out of stock'}</Button>
              <Button tag={Link} to={'/view-product/'+product.productId}  size='sm' className='ms-2' color='primary'>View Product</Button>
          </Container>
        </CardBody>
     </Card>
    )
  }

  return (
   (product) && getProductHtml()
  )
}

export default Product