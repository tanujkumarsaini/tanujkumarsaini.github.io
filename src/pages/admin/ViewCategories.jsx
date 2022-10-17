import React, { useState } from 'react'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { Button, Card, CardBody, Col, Container, Row, Table } from 'reactstrap'
import { deleteCategory, loadCategories } from '../../services/category-service'

function ViewCategories() {
  const [categories,setCategories]=useState([])
  useEffect(()=>{
    loadCategories().then(cats=>{
      setCategories([...cats])
    }).catch(error=>{
      console.log(error)
      toast.error("errror in loading categories")
    })
  },[]);

  function deleteCategoryFormServer(cat){
  deleteCategory(cat.categoryId).then(res=>{
    console.log(res)
    toast.success("category deleted")
    setCategories([...categories.filter(c=>c.categoryId !==cat.categoryId)])
  }).catch(error =>{
    console.log(error)
    toast.error("errror in deleting categories")
  })

  }

  function viewCategoriesForm(){
    return (
      <Row>
        <h3>Categories is here</h3>
        <Col md={12}>
          <Table>
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Action</th>
              
              
              </tr>
            </thead>

            <tbody>
              {
                categories.map((cat,i)=>{
                  return(
                    <tr key={i}>
                      <td>{i+1}</td>
                      <td>{cat.catgoryTitle}</td>
                      <td><Button onClick={event => deleteCategoryFormServer(cat)} color={'danger'} size={'sm'}>Delete</Button></td>
                    </tr>
                  )
                })
              }
            </tbody>
          </Table>
        </Col>

      </Row>

    )
  }

  return (
  <>
  <Container>
    <Card>
      <CardBody>
        {viewCategoriesForm()}
      </CardBody>
    </Card>
  </Container>
  </>
  )
}

export default ViewCategories