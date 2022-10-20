
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
        <h1>This is homepage</h1>
      </div>
</Base>

    ) ;
       
};
export default Home;