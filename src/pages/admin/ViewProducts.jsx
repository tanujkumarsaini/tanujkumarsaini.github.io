import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { toast } from 'react-toastify';
import { Button, Card, CardBody, Col, Container, FormGroup, Input, Pagination, PaginationItem, PaginationLink, Row, Table,CardTitle } from 'reactstrap';
import { deleteProduct, loadProducts, loadProductsBySearch } from '../../services/product-service';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {BASE_URL} from '../../services/axios-helper'
import {Link} from 'react-router-dom'
function ViewProducts() {

 
  let imageStyle={
    width:'150%',
    height:'150px',
    objectFit:'contain',
    margin:'15px 0 '
}


   const [product,setProduct]=useState(null);
   useEffect(()=>{
     loadProductFromServer(0);
   },[])

   const loadProductFromServer=(pageNumber)=>{
    loadProducts(pageNumber,5).then(data=>{
      console.log(data);
      setProduct(data)
    }).catch(error=>{
      console.log(error)
      toast.error("Error in loading products")
    })
   }

 
   const [item,setItem]=useState(null)

   const [modal, setModal] = useState(false);

   const toggle = () => setModal(!modal);
 
  const openModal=(p)=>{
   setItem(p)
    setModal(true);
  }

   const deleteProductFromServer=(p)=>{
    deleteProduct(p.productId).then(res =>{
      console.log(res)
      let newProducts=product.content.filter(pr => pr.productId !==p.productId)
      setProduct({
        ...product,
        content:newProducts
      })
      toast.success("Product is deleted")
    }).catch(error =>{
      console.log(error)
      toast.error("Error in deleting product")
    })
   }

  const updateProductHtml=()=>{
    return (
      <h1>Update product</h1>
    )
    
  }
 

  const searchProduct=(event,fieldName)=>{
    console.log(event.target.value)
    if(event.target.value===''){
      loadProducts().then(data=>{
        setProduct(data)
      })
      .catch(error=>{
        console.log(error)
      }) 
    }
    else{
    loadProductsBySearch(event.target.value).then(data=>{
      setProduct(data)
    })
    .catch(error=>{
      console.log(error)
    })
  }
   }


  const productModal=()=>{
    return(
<Modal isOpen={modal} toggle={toggle} size='lg'>
        <ModalHeader toggle={toggle}>Product        Id: {item && item.productId}</ModalHeader>
        <ModalBody>
      
        { item && 
        <Card className='mt-3 border-0 shadow-sm'>
          <CardTitle></CardTitle>
          <CardBody >
         
            <Row>
            <Col md={4} >
            <h3>{item.productName}</h3>
            <h4>Price :<b>{item.productPrice}</b></h4>
            <h5>Category: {item.category.catgoryTitle}</h5>
            <h5>Quantity: {item.productQuantity}</h5>
            <h5>Stock: {item.stock ?'True':'False'}</h5>

            </Col>
           

              <Col md={8} >
              <img style={imageStyle} src={BASE_URL+'/products/images/'+item.productId}/>
              </Col>
              </Row>
           
           <Row>
            <Col md={7}>
              <p>
                {item.productDesc}
                </p>

            </Col>
            
            <Col md={5}>
            </Col>
            
            </Row>
         
        
       
        </CardBody>
        
        </Card>
        }
          
        </ModalBody>
       
      </Modal>
      )
  }

   const viewProductHtml=()=>{
    return (
<div>
   <Row>
        <Col md={12}>
        <h3>Here is all products</h3>

        <FormGroup>
          <Input  name='search' onChange={event=>searchProduct(event,'search')} placeholder={'search product'} type={'text'}/>
        </FormGroup>


        <Table bordered
         borderless
          responsive 
          hover 
          className={'bg-white text-center'}  
          >
          <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Action</th>

          </tr>
          </thead>              
          <tbody>
          { product.content.map((p,index)=>{
            return (
              <tr key={index}>
                <td>{p.productId}</td>
                <td>{p.productName}</td>
                <td>{p.productPrice}</td>
                <td>{p.stock?"True":"False"}</td>
                <td>{p.category.catgoryTitle}</td>
                <td>{p.productQuantity}</td>

                

                <td>
                  <Button onClick={event => deleteProductFromServer(p)} color={'danger'} size={'sm'}>Delete</Button>
                  <Button tag={Link} to={`/admin-dashboard/update-product/${p.productId}`}  color={'warning'} size={'sm'} className={'ms-2'}>Update</Button>
                  <Button onClick={event=>openModal(p)} color={'primary'} size={'sm'} className={'ms-2'}>View</Button>
                </td>
              </tr>
            )
          })}
          </tbody>         
                        
          </Table>


<Pagination>

{
  Array.from(Array(product.totalPages),(e,i)=>(
    <PaginationItem active={i===product.pageNumber}>
      <PaginationLink onClick={(()=> loadProductFromServer(i))}>
        {i}
      </PaginationLink>
    </PaginationItem>
  ))
}

<PaginationItem disabled={product.lastPage}>
  <PaginationLink onClick={(event => loadProductFromServer(product.pageNumber +1))}
  next
  />

  </PaginationItem>

</Pagination>



        </Col>
      </Row>
   </div>
    )
   }



  return (
   
    <Container>
      <Card>
        <CardBody>
          {product && viewProductHtml()}
           
        </CardBody>

      </Card>
      {productModal()}
    </Container>
   
   
  )
}

export default ViewProducts