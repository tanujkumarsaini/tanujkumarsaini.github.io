import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Button, Card, CardBody, CardTitle, Col, Container, Form, FormGroup, Input, Label, Row } from 'reactstrap'

import { getCurrentUser, logout } from '../auth'
import { getUserByEmail, updateUserDetails } from '../services/user-service'
import Base from './Base'
import { login } from '../auth'
import { userNameContext } from '../context'
function Dashboard() {
  const [user,setUser]=useState(null)
  const navigate=useNavigate()
  useEffect(()=>{
   
    getUserByEmail(getCurrentUser().userEmail).then(data1=>{
      console.log(data1)
      setUser(data1.data)
    }).catch(error=>{
    console.log(error)
    
    })
    console.log(user)
  },[])

  const logoutUser=()=>{
    logout(()=>{
      navigate("/")
    })
  }
  const value=useContext(userNameContext)

  

  const onFieldChange=(event,fieldName)=>{
    setUser({...user,[fieldName]:event.target.value})
   
  }

  const updateUser=(event)=>{
    event.preventDefault()
   updateUserDetails(user).then(data=>{
   value.names.name=data.data.userName;
   toast.success("User updated")

   }).catch(error=>{
    toast.error("error in updating")
   })
  }


  return (
   <Base>
    <div>
    {user &&(
      <div>
      <Container>
      <Row>
        <Col md={{
          size:6,
          offset:3
        }} >
        <Card className='border-0 mt-3 shadow-sm'>
          <CardBody>
            <h2>Hey Welcome!! {user.userName}</h2>
            <h4>User Id:{user.userEmail}</h4>
            
            <Form onSubmit={updateUser}>

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

               
               {/*about field*/}
               <div className='mb-2'>
                <Label for='userPincode'>Pincode</Label>
                <Input type='number'
                 id='userPincode'
                  placeholder='Something about yourself'
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
                <Input type='userMobile' 
                id='userMobile' 
                placeholder='Enter mobile number'
                onChange={(event)=>onFieldChange(event,'userMobile')} 
                  value={user.userMobile}
                />
              </div>

              <Container className='mt-3 text-center'>
                <Button color='warning'>Update Details</Button>
          
              </Container>


             


            
 

            </Form>
          </CardBody>
        </Card>

         

        </Col>



      </Row>


    </Container>
   {/* <Button onClick={logoutUser} color="success">Logout</Button>*/}
        
      </div>
    )}
    </div>
   </Base>
  )
}

export default Dashboard