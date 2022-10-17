import React, { useEffect } from 'react'
import { useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Link, useParams } from 'react-router-dom'
import { Row ,Col, ListGroup, ListGroupItem, Input} from 'reactstrap'
import { loadCategories } from '../services/category-service'
import { loadProducts, loadProductsByCategory, loadProductsBySearch } from '../services/product-service'
import Base from './Base'
import Product from './Product'
import {addItemToCart as addCart} from '../services/cart-service'
import { toast } from 'react-toastify'
import { useContext } from 'react'
import { context1 } from '../context'

function Store() {

    const value=useContext(context1)

    const {categoryId}=useParams()
    const [categories,setCategories]=useState(null)
    const [productDetail,setProductDetail]=useState(null)
    const [pageNumber,setPageNumber]=useState({
        count:0
    })

    const [flag,setFlag]=useState(true)



    const [searchData,setSearchData]=useState('')
    

    const onFieldChange=(event)=>{
     
if(event.target.value===''){
   
setPageNumber({count:0})
setProductDetail(null)
getInfiniteScrollWithoutContent()


}

    
      else{
        console.log("else c")
        loadProductsBySearch(event.target.value).then(data=>{
            setProductDetail(data)
         {/* searchedProducts() */}
    console.log(data)
           }).catch(error=>{
            console.log(error)
           })
      }

       
       
    }


    useEffect(()=>{

       if(flag){
        console.log("initial time")
        getCategories()
        setFlag(false)
       }
       else{
        console.log("not initial time")
        setProductDetail(null)
        setPageNumber({count:0})
      
       }

    },[categoryId])

    const getProducts=(pageNumber)=>{

        let ob=null;
        if(categoryId==='all'){
            ob=loadProducts(pageNumber)
        }
        else{
            ob=loadProductsByCategory(categoryId,pageNumber)

        }

        ob .then(data=>{
            console.log("one time")
            console.log(data);
            if(productDetail){
                setProductDetail({
                    content:[...productDetail.content,...data.content],
                    lastPage:data.lastPage,
                    pageNumber:data.pageNumber,
                    pageSize:data.pageSize,
                    totalElements:data.totalElements,
                    totalPages:data.totalPages


                })

            }
            else{
                setProductDetail(data)
            }
            
        })
        .catch(error=>{
            console.log(error)
        })

    }

    const getCategories=()=>{
        loadCategories().then(data=>{
            console.log(data);
            setCategories(data)
        })
        .catch(error=>{
            console.log(error)
        })

    }

   
    const loadMoreProducts=()=>{

        setPageNumber({count:pageNumber.count+1})
        console.log(pageNumber)
       
    }

    useEffect(()=>{
        console.log("page number"+pageNumber.count)
        getProducts(pageNumber.count)
    },[pageNumber])

//add  item to cart
    const addItemToCart=(product)=>{
        if(!product.stock){
            toast.error("product is not in stock")
            return;
        }
        console.log(product)
        addCart(product.productId,1).then((data)=>{
            console.log(data)
            value.setCart(data)
            toast.success("Item Added to Cart")
        }).catch(error=>{
            console.log(error)
        })
    }

const getInfiniteScrollWithoutContent=()=>{
return    ( <InfiniteScroll
        dataLength={productDetail.content.length}
        next={loadMoreProducts}
        hasMore={!productDetail.lastPage}
        loader={<h4>Loading...</h4>}
        >

<Row>

{
(productDetail)&&
    
productDetail.content.map((item,index)=>(
    <Col md="6" lg="4" key={index}>
        <Product addToCart={addItemToCart}  product={item}/>
    </Col>
))
}
</Row>
</InfiniteScroll>)
}

const searchedProducts=()=>{
return(
        <Row>
{
(searchData)&&
    
searchData.content.map((item,index)=>(
    <Col md="6" lg="4" key={index}>
        <Product addToCart={addItemToCart}  product={item}/>
    </Col>
))
}
</Row>
    )
}


  return (
    <Base> 
       <div className='container-fluid px-5 '>

        <Row className='mt-3'>
            <Col md="3" className='mt-3'>
                <h1>Categories</h1>
                <ListGroup>
                    <ListGroupItem action tag={Link} to="/store/all">All</ListGroupItem>
                    {
                        (categories)&& categories.map(cat=>(
                           <ListGroupItem action tag={Link} to={'/store/'+cat.categoryId} key={cat.categoryId}>{cat.catgoryTitle}</ListGroupItem>
                           //console.log(cat.catgoryTitle)
                        ))
                    }
                   
                   
                </ListGroup>
            </Col>

            <Col md="9" className='mt-3'>
                <Row>
                    <Col md={3}>
                    <h1>Products</h1>
                    </Col>

                    <Col md={9}>
                        <Input type='text'
                         placeholder='Search here'
                         className='mt-1'
                         id='search'
                         onChange={(event)=>onFieldChange(event)}
                        // value={searchData}
                         >
                        
                         </Input>
                    </Col>
                </Row>
               {
                  productDetail &&  getInfiniteScrollWithoutContent()
               }
                 
               
              
              

            </Col>
        
        </Row>
      </div>
   
    </Base>
  )
}

export default Store