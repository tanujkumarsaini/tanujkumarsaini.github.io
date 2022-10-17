import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Button, Card, CardBody, CardTitle, Col, Container, Input, Row, Table } from 'reactstrap'
import { getAllUsers, searchUserByName, updateUserRole } from '../../services/user-service'

function ManageUsers() {
  const [users,setUsers]=useState(null)
 
  useEffect(()=>{
  getAllUsers().then(data=>{
  console.log(data)
  setUsers(data)
  })
  .catch(error=>{
    console.log(error)
  })
  },[])

  const addUserRole=(u)=>{
    updateUserRole(u.userEmail).then(data=>{
      console.log(data)
      getAllUsers().then(data=>{
        setUsers(data)
      })
      .catch(error=>{
        console.log(error)
      })
    })
    .catch(error=>{
      console.log(error)
    })
  }

 function checkIfStaff(roles){
  let flag=false;
  roles.map((role)=>{
    if(role.name==='ROLE_STAFF'){
      flag= true
    }
  })
  return flag;
 }

 const searchUsers=(event,fieldName)=>{
  console.log(event.target.value)
  if(event.target.value===''){
    getAllUsers().then(data=>{
      setUsers(data)
    })
    .catch(error=>{
      console.log(error)
    }) 
  }
  else{
  searchUserByName(event.target.value).then(data=>{
    setUsers(data)
  })
  .catch(error=>{
    console.log(error)
  })
}
 }


  return (
  <Card>
    <Container>

    <CardBody>

    <Row>
        <Col md={4}>
        <h2>All User are Here!!</h2>
        </Col>
        <Col md={8}>
          <Input name='search' onChange={event=>searchUsers(event,'search')} type='text' placeholder='search user here'></Input>
        </Col>
      </Row>

      <Table 
      bordered
      borderless
      responsive
      hover
      className={'bg-white text-center'}  
      >
        <thead>
          <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Email</th>
          <th>Mobile</th>
          <th>Gender</th>
          <th>Address</th>
          <th>Pincode</th>
          <th>CreatedAt</th>
          <th>Roles</th>
          <th>Action</th>
          

          </tr>
        </thead>
        <tbody>
          {users && users.map((u,index)=>{
            return(
              <tr>
              <td>{u.userId}</td>
              <td>{u.userName}</td>
        
              <td>{u.userEmail}</td>
              <td>{u.userMobile}</td>
              <td>{u.gender}</td>
              <td>{u.userAddress}</td>
              <td>{u.userPincode}</td>
              <td>{u.createAt}</td>
              <td>{u.roles.map(role=>{return(<h6>{role.name}</h6>)})}</td>
             
              <td>{checkIfStaff(u.roles)?'':<Button onClick={event=>addUserRole(u)} size='sm' color='primary'>Staff</Button>}</td>
            </tr>

            )
          })}


         
        </tbody>
      </Table>

    </CardBody>
    </Container>
  </Card>
  
  )
}

export default ManageUsers