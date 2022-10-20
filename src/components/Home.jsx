
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
      src: 'https://github.com/tanujkumarsaini/my_shop/blob/main/public/images/c4.jpg?raw=true',
      
    },
    {
      key: 2,
      src: 'https://github.com/tanujkumarsaini/my_shop/blob/main/public/images/ip2.jpg?raw=true'
    },
    {
      key: 3,
      src: 'https://github.com/tanujkumarsaini/my_shop/blob/main/public/images/l1.jpg?raw=true'
    }
  ]}
 />

        </div>

</Base>

    ) ;
       
};
export default Home;