import React, { useState } from 'react'
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { Button, Card, CardBody, Col, Container, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import { loadCategories } from '../../services/category-service';
import { addProduct, uploadProductImage } from '../../services/product-service';

function AddProduct() {
  const [categories,setCategories]=useState([])
  const [product,setProduct]=useState({
    productName:'',
    productDesc:'',
    productPrice: 0,
    productQuantity:0,
    live:true,
    stock:true,
    imageName:'',
    categoryId:0
  });

  const [image,setImage]=useState(null)

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
  
  function addProductFormSubmit(event){
    event.preventDefault()
    addProduct(product).then(data =>{
      console.log(data)
       
      uploadProductImage(image,data.productId).then(data=>{
      
      }).catch(error=>{
        toast.error("Error in uploading image")
        console.log(error)
      })
       

      toast.success("Product added success")
      setProduct({
        productName:'',
        productDesc:'',
        productPrice:0,
        productQuantity:0,
        live : true,
        stock: true,
        imageName:'',
        categoryId:0
      })

    }).catch(error =>{
      console.log(error)
      toast.error("error in adding product")
    })
  }

  //handling file change event
  const handleFileChange=(event)=>{
    console.log(event.target.files[0] )
    setImage(event.target.files[0])
  }


  function addProductHtml(){
    return (
      <Row>
        <Col>
        <h3>Add New Product</h3>

        <Form onSubmit={addProductFormSubmit}>

          {/*name*/}
          <FormGroup>
            <Label>
              Product Name
            </Label>

            <Input type={'text'} value={product.productName} onChange={event => setProduct({...product,productName : event.target.value})} />

          </FormGroup>

          {/*description*/}
          <FormGroup>
            <Label>Product description</Label>
            <Input type={'textarea'} value={product.productDesc} onChange={event => setProduct({...product,productDesc:event.target.value})} />
            
            </FormGroup>

            {/*price*/}
            <FormGroup>
            <Label>
              Product Price
            </Label>

            <Input type={'text'} value={product.productPrice} onChange={event => setProduct({...product,productPrice : event.target.value})} />

            </FormGroup>

             {/*quantity*/}
             <FormGroup>
            <Label>
              Product Quantity
            </Label>

            <Input type={'text'} value={product.productQuantity} onChange={event => setProduct({...product,productQuantity : event.target.value})} />

            </FormGroup>

             {/*live*/}
             <FormGroup>
            <Label for={'live'}>
              Product Live
            </Label>

            <Input className={'ms-2'} id={'live'} type={'checkbox'} checked={product.live} onChange={event => setProduct({...product,live : !product.live})} />

            </FormGroup>
            

            {/*stock*/}
            <FormGroup>
            <Label for={'stock'}>
              Product Stock
            </Label>

            <Input className={'ms-2'} id={'stock'} type={'checkbox'} checked={product.stock} onChange={event => setProduct({...product,stock : !product.stock})} />

            </FormGroup>

                        {/*image*/}
                        <FormGroup>
            <Label for={'image'}>
              Product Banner
            </Label>

            <Input className={'ms-2'} id='image' type='file' onChange={handleFileChange}   />

            </FormGroup>

              {/*product category*/}
              <FormGroup>
            <Label for={'cate'}>
              Category
            </Label>

            <Input className={'ms-2'} id='cate' type='select'  onChange={event=> setProduct({...product,categoryId:event.target.value})}>
              <option>Select Category</option>
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
              <Button type={'submit'}  color={'success'}>Add Product</Button>
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
          {addProductHtml()}
        </CardBody>
      </Card>

    </Container>
  )
}

export default AddProduct