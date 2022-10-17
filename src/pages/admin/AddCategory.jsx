import React from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { Button, Card, CardBody, Col, Container, Form, FormGroup, Input, Label, Row } from 'reactstrap'
import { addCategory } from '../../services/category-service'

function AddCategory() {

  const [category,setCategory]=useState({
    catgoryTitle:''
  })

  const onFieldChange=(event,fieldName)=>{
   
    setCategory({...category,[fieldName]:event.target.value})
   
  }

  const submitForm=(event=>{
    event.preventDefault()
  
    //console.log(category.title)
    category.catgoryTitle && addCategory(category).then((data)=>{
      console.log(data)
      toast.success("Category created")

    }).catch(error =>{
      console.log(error)
      toast.error("error in adding category")
    })
  })

  function addCategoryForm(){
    return (
      <>
      <Row>
        <Col>
        <h3>Add Category</h3>
        <Form onSubmit={submitForm}>
          <FormGroup>
            <Label>
              Category Title
            </Label>
            <Input
            placeholder='Enter here'
            type='text'
            id='catgoryTitle'
            value={category.catgoryTitle}
            onChange={(event)=> onFieldChange(event,'catgoryTitle')}
            />
            

          </FormGroup>

          <Container className={'text-center'}>
            <Button type='submit' color='success'>Add Category</Button>

          </Container>


        </Form>
        </Col>
      </Row>

      </>
    )
  }

  return (
    <Container>
      <Card>
        <CardBody>
          {
            addCategoryForm()
          }
        </CardBody>
      </Card>
    </Container>
  )
}

export default AddCategory