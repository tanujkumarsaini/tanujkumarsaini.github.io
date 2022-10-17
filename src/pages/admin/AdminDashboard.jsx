import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { Col, ListGroup, ListGroupItem, Row } from 'reactstrap'
import { checkAdminUser } from '../../auth'
import Base from '../../components/Base'

function AdminDashboard() {
  return (
    <>
   <Base>

<div className='container-fluid'>
<Row className='p-4'>
   
    <Col md={2}>
    <ListGroup>
        <ListGroupItem tag={Link} to={'/admin-dashboard/home'} action='true'>Home</ListGroupItem>
        <ListGroupItem tag={Link} to={'/admin-dashboard/view-products'} action='true'>View Products</ListGroupItem>
        <ListGroupItem tag={Link} to={'/admin-dashboard/add-product'} action='true'>Add Product</ListGroupItem>
        <ListGroupItem tag={Link} to={'/admin-dashboard/view-categories'} action='true'>View Categories</ListGroupItem>
        <ListGroupItem tag={Link} to={'/admin-dashboard/add-category'} action='true'>Add Category</ListGroupItem>
        <ListGroupItem tag={Link} to={'/admin-dashboard/orders'} action='true'>Manage Order</ListGroupItem>
        <ListGroupItem tag={Link} to={'/admin-dashboard/users'} action='true'>Manage Users</ListGroupItem>
        <ListGroupItem tag={Link} to={'/admin-dashboard/'} action='true'>Logout</ListGroupItem>
    </ListGroup>
    </Col>

    <Col md={10}>
    <Outlet/>
    </Col>


   </Row>


</div>

   
   </Base>
  
    </>
    
  )
}

export default AdminDashboard