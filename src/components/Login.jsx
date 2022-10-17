import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import { Button, Card, CardBody, CardTitle, Col, Container, Form, Input, Label, Row } from 'reactstrap'
import { login } from '../auth'
import { generateToken } from '../services/user-service'
import Base from './Base'

function Login() {

const navigate=useNavigate()
const [loginData,setLoginData]=useState({
    username:'',
    password:''
})


const setValue=(event,fileName)=>{
    setLoginData({...loginData,[fileName]:event.target.value})
}

const loginFormSubmit=(event)=>{
    event.preventDefault();
    if(loginData.username.trim()===''){
        toast.error("Username is required!!")
        return
    }

    if(loginData.password.trim()===''){
        toast.error("Password is required!!")
        return
    }

    //send the request to serverr to generate  token
    generateToken(loginData)
    .then((data)=>{
        console.log(data);
        toast.success("Login success")
        login(data,()=>{
            //redirect user to user dashboard
            navigate("/store/all")
            
        })
    }).catch(error=>{
        if(error.response.status==400 || error.response.status==404){
            toast.error(error.response.data.message)
        }
        else{
            toast.error("Login error")
        }
        console.log(error)
        
    })

}

const resetData=()=>{
setLoginData({
    username:'',
    password:''
})
}

  return (
    
    <Base>
    <Container>
        <Row>
            <Col md={{

                size:6,
                offset:3
            }}
            
            
            >
            <Card className='border-1 shadow-sm mt-5'  color="light">
                <CardBody>
                    <CardTitle>Login Herre!</CardTitle>
                    
                    <Form onSubmit={loginFormSubmit} id="login-form">
                        <div className='my-3'>
                            <Label for='username'>Username</Label>
                            <Input id='username'
                             className="rounded-0" 
                             placeholder='Enter your username'
                             value={loginData.username}
                             onChange={(event)=>setValue(event,'username')}
                            
                             />
                        </div>

                        <div className='mb-3'>
                            <Label for='password'>Password</Label>
                            <Input id='password'
                            type='password'
                            className="rounded-0"
                             placeholder='Enter your password'
                             value={loginData.password}
                             onChange={(event)=>setValue(event,'password')}
                             />
                        </div>

                        <Container className='text-center'>
                            <Button block color='primary' className='rounded-0'>Login</Button>
                            <Button block color='warning' className='mt-2 rounded-0' onClick={resetData}>Reset</Button>
                        
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

export default Login