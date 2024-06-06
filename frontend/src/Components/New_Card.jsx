import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
  } from "@material-tailwind/react";
   
  export function New_Card(props) {
    
    
    const imageUrl = `http://localhost:5000/uploads/${props.profile_image}`;

    console.log(imageUrl)
    
    
    return (
      <Card className="mt-6 w-90">
        <CardHeader color="blue-gray" className="relative h-56">
          {/* <img
            src={props.product_photo}  alt="card-image"
          /> */}


          <img style={{width:'100%',height:'100%'}} src={imageUrl}></img>


        </CardHeader>
        <CardBody>
          <Typography variant="h5" color="blue-gray" className="mb-2">
          {props.product_title}
          </Typography>
          <Typography>
            Rs {props.product_price}
          </Typography>
        </CardBody>
        <CardFooter className="pt-0">
          {/* <Button>Read More</Button> */}
        </CardFooter>
      </Card>
    );
  }