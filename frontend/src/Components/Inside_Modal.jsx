import React from 'react';
import { Input, Card, CardBody, Typography } from "@material-tailwind/react";
import {Carousel_scroller} from './Corousel_scroller' 

const Inside_Modal = (props) => {
  return (<>
  <div className='flex justify-centre items-center h-screen '>
    <div className="flex justify-start items-center h-screen ">
      <Card className="w-96">
        <CardBody className='flex justify-centre items-center w-auto py-6'>
          <Typography variant="h5" color="blue-gray" className="mb-4">
            
          </Typography>
          <div className="space-y-4 overflow-y-auto h-64">
            <div>
              <Typography variant="small" color="blue-gray" className="mb-1">
                Price
              </Typography>
              {props.product_price}
              {/* <Input type="text" placeholder="Enter price" /> */}
            </div>
            <div>
              <Typography variant="small" color="blue-gray" className="mb-1">
                Brand Name
              </Typography>
              {props.product_title}
            </div>
            <div>
              <Typography variant="small" color="blue-gray" className="mb-1">
                Phone Number
              </Typography>
              {/* <Input type="text" placeholder="Enter number" /> */}
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
    <div className='px-20'>
    <Carousel_scroller product_photo={props.product_photo} product_title={props.product_title}/>
    </div>




    </div>
    </>);
};

export default Inside_Modal;

