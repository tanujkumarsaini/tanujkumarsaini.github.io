
import { Button, Card, CardBody, CardFooter, Col, Container, Row, UncontrolledCarousel } from "reactstrap";
import Base from "./Base";

const Home=({title,description,buttonName,myFun})=>{
    let styleOb={
        padding:'20px',
        background:'#e2e2e2',
        border:'1px solid blue',
        margin:'10px'

    };
    return(
      <Base>
       <div>
        <UncontrolledCarousel className="carousel-inner tales" 
  items={[
    {
    
      key: 1,
      src: '/images/c4.jpg',
      
    },
    {
      key: 2,
      src: '/images/ip2.jpg'
    },
    {
      key: 3,
      src: '/images/l1.jpg'
    }
  ]}
 />

        </div>
      
</Base>

    ) ;
       
};
export default Home;