import React, { useState } from 'react'
import { Button, Card, CardBody, CardTitle, Col, Container, Form, FormGroup, Input, Label, Row } from 'reactstrap'
import { createUser } from '../services/user-service'
import {toast} from 'react-toastify'
import Base from './Base'
function Signup() {

 // const[name,setName]=useState('')
const [user,setUser]= useState({
  userName:'',
  userEmail:'',
  userPassword:'',
  userPincode:'',
  userAddress:'',
  userMobile:'',
  gender:''
 })
  const onFieldChange=(event,fieldName)=>{
   
    setUser({...user,[fieldName]:event.target.value})
   
  }

  const registerUser=(event=>{
    event.preventDefault()
    console.log(event)
    if(user.userName.trim()===''){
      //alert("Username is required")
      toast.error("Username is required !!")
      return
    }
    if(user.userEmail.trim()===''){
     // alert("Email is required")
     toast.error("Email is required !!")
      return
    }

    if(user.userPincode.trim()===''){
      toast.error("Pincode is required !!")
       return
     }

     if(user.userPassword.trim()===''){
      toast.error("UserPassword is required !!")
       return
     }

     if(user.userMobile.trim()===''){
      toast.error("Mobile is required !!")
       return
     }

     if(user.gender.trim()===''){
      toast.error("Gender is required !!")
       return
     }
 


    //submit the form
    createUser(user).then((data)=>{
      console.log(data)
      //alert("User registered successfully!!")
      toast.success("User registered successfully")
    }).catch(error=>{
      if(error.response.status===400){
        //alert("validation error")
        var messages=``
        for(let i in error.response.data){
          messages=messages+`${i.toUpperCase()} ${error.response.data[i]} \n`
        }
        toast.error(messages)
      }
      else{
        //alert("seerver error")
        toast.error("server error")
      }
      console.log(error)
    })


  })

const resetData=()=>{
  setUser(
    { userName:'',
    userEmail:'',
    userPassword:'',
    userPincode:'',
    userAddress:'',
    userMobile:'',
    gender:''}
  )
}

  return (
   <Base>
    <Container>
      <Row>
        <Col md={{
          size:6,
          offset:3
        }} >
        <Card className='border-0 mt-3 shadow-sm'>
          <CardBody>
            <h3>Signup here</h3>
            <CardTitle>Please fill the correct details</CardTitle>

            <Form onSubmit={registerUser}>

              {/*name field*/} 
              <div className='mb-2 mt-4'>
                <Label for='userName'>Your name</Label>
                <Input type='text'
                 id='userName' 
                 placeholder='Enter name'
                 onChange={(event)=>onFieldChange(event,'userName')}
                 value={user.userName}
                 />
              </div>

               {/*email field*/}
               <div className='mb-2'>
                <Label for='userEmail'>Email</Label>
                <Input type='email'
                 id='userEmail'
                  placeholder='userEmail' 
                  onChange={(event)=>onFieldChange(event,'userEmail')} 
                  value={user.userEmail}/>
              </div>

             {/*password field*/}
              <div className='mb-2'>
                <Label for='userPassword'>Password</Label>
                <Input type='password'
                 id='userPassword'
                
                  placeholder='Enter password'
                  onChange={(event)=>onFieldChange(event,'userPassword')} 
                  value={user.userPassword}
                  />
                  
              </div>

               {/*about field*/}
               <div className='mb-2'>
                <Label for='userPincode'>Pincode</Label>
                <Input type='number'
                 id='userPincode'
                 
                  onChange={(event)=>onFieldChange(event,'userPincode')} 
                  value={user.userPincode}
                  />
              </div>

              {/*address field*/}
              <div className='mb-2'>
                <Label for='userAddress'>Address</Label>
                <Input type='textarea' 
                id='userAddress'
                 placeholder='Your  address'
                 onChange={(event)=>onFieldChange(event,'userAddress')} 
                  value={user.userAddress}
                 />
              </div>

              <FormGroup>
                <Input type='radio' name='gender'
                checked={user.gender==='MALE'}
                onChange={(event)=>onFieldChange(event,'gender')} 
                value={'MALE'}
                />
                {' '}
                <Label>Male</Label>
                

                <Input type='radio' className='ms-3' name='gender'
                checked={user.gender==='FEMALE'}
                onChange={(event)=>onFieldChange(event,'gender')} 
                value={'FEMALE'}
                />
                {' '}
                <Label>Female</Label>
              
              </FormGroup>

              {/*phone field*/}
              <div className='mb-2'>
                <Label for='userMobile'>Mobile No.</Label>
                <Input type='number' 
                id='userMobile' 
                placeholder='Enter mobile number'
                onChange={(event)=>onFieldChange(event,'userMobile')} 
                  value={user.userMobile}
                />
              </div>

              <Container className='mt-3 text-center'>
                <Button color='primary'>Register</Button>
                <Button color='danger ms-2' type='reset' onClick={resetData}>Reset</Button>
              </Container>
    
            
 

            </Form>
          </CardBody>
        </Card>

         

        </Col>



      </Row>


    </Container>
  
   </Base>
   )
}

export default Signup