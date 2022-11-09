import React, { useState } from 'react'
import {Link, NavLink as ReactLink, useNavigate} from 'react-router-dom';
import { checkAdminUser, checkLogin,getCurrentUser, logout } from '../auth';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText,
  } from 'reactstrap';
import Base from './Base';
import { context1,userNameContext } from '../context';
  
function CustomNavbar() {
    const [isOpen, setIsOpen] = useState(false)

    const toggle = () => setIsOpen(!isOpen);
   
    const navigate=useNavigate()

    const doLogout=()=>{
      logout(()=>{
    navigate('/')
      })
    }

    const openInstagram = url => {
      window.open(url, '_blank', 'noopener,noreferrer');
    };

const navbarHtml=(value,uname)=>{
  return ( <div>

    <Navbar
    color='dark'
    fixed='top'
    dark
    expand="md"
    className='px-5 shadow'
    >
      <NavbarBrand tag={ReactLink} to="/">MyShop</NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="me-auto" navbar>
          <NavItem>
            <NavLink tag={ReactLink} to="/store/all">Store</NavLink>
          </NavItem>
         

          <NavItem>
<NavLink tag={ReactLink} to="/user/cart">
Cart(<b>{value.cart.items.length}</b>)
</NavLink>
</NavItem>


<NavItem>
            <NavLink tag={ReactLink} to="/user/orders">
           Orders
            </NavLink>
          </NavItem>


            </Nav>
        
        <Nav navbar>
       


{
                (!checkLogin())&&(
          <>
          <NavItem>
            <NavLink tag={ReactLink} to="/login">
              Login
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink tag={ReactLink} to="/signup">
              Signup
            </NavLink>
          </NavItem>
          </>
        )
                }



     {
        (checkLogin())&&(
          <>
         {
  (checkAdminUser()&&(
    <NavItem>
            <NavLink tag={ReactLink} to="/admin-dashboard/home">
           Admin_Dashboard
            </NavLink>
          </NavItem>
  ))
}


       

         

          
          <NavItem>
            <NavLink tag={ReactLink} to="/user/dashboard">
      {uname.names.name}
            </NavLink>
          </NavItem>


          <NavItem>
            <NavLink onClick={doLogout}>
              Logout
            </NavLink>
          </NavItem>
          </>
        )
        }
 <NavItem>
            <NavLink tag={ReactLink} to="/about">
              About
            </NavLink>
          </NavItem>

          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
              Follow Me
            </DropdownToggle>
            <DropdownMenu>
    
              <DropdownItem  onClick={()=>openInstagram('https://www.instagram.com/_tanuj_saini/')}>Instagram</DropdownItem>
            
              
            </DropdownMenu>
          </UncontrolledDropdown>
     

        </Nav>
      </Collapse>
    </Navbar>
  </div>
    )
}


  return (
       <userNameContext.Consumer>
        {uname=> (
       <context1.Consumer>
        {value =>(
         
         navbarHtml(value,uname)
          )
        }
       </context1.Consumer>
        )}
       </userNameContext.Consumer>
      )
}

export default CustomNavbar