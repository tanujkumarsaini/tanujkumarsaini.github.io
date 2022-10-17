import React, { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getProduct } from '../../services/product-service'
import { toast } from 'react-toastify';
import { Button, Card, CardBody, Col, Container, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import { loadCategories } from '../../services/category-service';
import { addProduct, uploadProductImage,updateProductDetails } from '../../services/product-service';
import { BASE_URL } from '../../services/axios-helper';
import { wait } from '@testing-library/user-event/dist/utils';

function UpdateProducts() {
  const {productId}=useParams()

  const [image,setImage]=useState(null)

  const [categories,setCategories]=useState([])

  const [product,setProduct]=useState(null)

  const [newProduct,setNewProduct]=useState(null);

  const [image1,setImage1]=useState(null)

  useEffect(()=>{
    
    loadCategories().then(cats =>{
      console.log(cats)
      setCategories([...cats])
    })
    .catch(error =>{
      console.log(error)
      toast.error("error in loading categorie")
    })
  },[]);


  useEffect(()=>{
    getProduct(productId).then(data=>{
      console.log(data)
  setNewProduct(data)
  })
    .catch(error=>{
      console.log(error)
    })
    },[])
  
   const updateProductFormSubmit=(event)=>{
    event.preventDefault()
    console.log(newProduct.productName)
    updateProductDetails(newProduct.productId,newProduct).then(data=>{
      console.log(data)
     
      uploadProductImage(image,data.productId).then(data=>{
        
      }).catch(error=>{
       
        console.log(error)
      })
      toast.success("Product Details Updated")
    }).catch(error=>{
      console.log(error)
    })

  }


  //handling file change event
  const handleFileChange=(event)=>{
    console.log(event.target.files[0] )
    setImage(event.target.files[0])
  }

  


  function updateProductHtml(){
   
    return (
      
      <Row>
        <Col>
        <h3>Add New Product</h3>

        <Form onSubmit={updateProductFormSubmit}>
<Row>
<Col md={6}>
          {/*name*/}
          <FormGroup>
            <Label>
              Product Name
            </Label>

            <Input type={'text'} value={newProduct.productName} onChange={event => setNewProduct({...newProduct,productName : event.target.value})} />

          </FormGroup>

 {/*price*/}
 <FormGroup>
            <Label>
              Product Price
            </Label>

            <Input type={'text'} value={newProduct.productPrice} onChange={event => setNewProduct({...newProduct,productPrice : event.target.value})} />

            </FormGroup>

   {/*quantity*/}
   <FormGroup>
            <Label>
              Product Quantity
            </Label>

            <Input type={'text'} value={newProduct.productQuantity} onChange={event => setNewProduct({...newProduct,productQuantity : event.target.value})} />

            </FormGroup>
           </Col>
<Col md={6}>
<Card className='mt-2 text-center'>
  <CardBody>
    <img style={{maxHeight:'200px'}} className='img-fluid' src={BASE_URL+'/products/images/'+newProduct.productId}/>
   
    <FormGroup className={'mt-2'}>
            
            <Input  id='image'  type='file' onChange={handleFileChange}   />

            </FormGroup>

  </CardBody>
  

</Card>


</Col>

            </Row>


          {/*description*/}
          <FormGroup>
            <Label>Product description</Label>
            <Input type={'textarea'} value={newProduct.productDesc} onChange={event => setNewProduct({...newProduct,productDesc:event.target.value})} />
            
            </FormGroup>

           
          
             {/*live*/}
             <FormGroup>
            <Label for={'live'}>
              Product Live
            </Label>

            <Input className={'ms-2'} id={'live'} type={'checkbox'} checked={newProduct.live} onChange={event => setNewProduct({...newProduct,live : !newProduct.live})} />

            </FormGroup>
            

            {/*stock*/}
            <FormGroup>
            <Label for={'stock'}>
              Product Stock
            </Label>

            <Input className={'ms-2'} id={'stock'} type={'checkbox'} checked={newProduct.stock} onChange={event => setNewProduct({...newProduct,stock : !newProduct.stock})} />

            </FormGroup>

                        
                     

              {/*product category*/}
              <FormGroup>
            <Label for={'cate'}>
              Category
            </Label>

            <Input className={'ms-2'} id='cate' type='select' onChange={event=> setNewProduct({...newProduct,category:{...newProduct.category,categoryId:event.target.value} })}>
               
              {
              categories &&  categories.map((cat,i)=>{
                  return (
                   <option value={cat.categoryId} key={i}>{cat.catgoryTitle}</option> 
                  )
                })
              }
              </Input>
             </FormGroup>

             <Container className={'text-center'}>
              <Button type={'submit'}  color={'success'}>Update Product</Button>
             </Container>


        </Form>
        </Col>

      </Row>
          )
  }


  return (
    <Container>
    <Card>
      <CardBody>
        {newProduct && updateProductHtml()}
      </CardBody>
    </Card>

  </Container>
 
  )
}

export default UpdateProducts