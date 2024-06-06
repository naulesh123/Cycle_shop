import { Carousel } from "@material-tailwind/react";
import Corousel_scroller_element from "./Corousel_scroller_element";

export function Carousel_scroller(props) {

console.log(props.product_photo)

const arr=[];

for(let i=0;i<props.product_photo.length;i++)
  {
  const imgurl=`http://localhost:5000/uploads/${props.product_photo[i]}`;
  arr.push(<Corousel_scroller_element products_url={imgurl}/>)
  
  
  }

  return (
    <Carousel className="rounded-l w-96 justify-centre">
      
      {arr}

    </Carousel>
  );
}