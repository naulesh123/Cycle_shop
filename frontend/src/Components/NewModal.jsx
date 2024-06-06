import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Avatar,
  IconButton,
  Typography,
  Card,
} from "@material-tailwind/react";
import { New_Card } from "./New_Card"; 
import Inside_Modal from "./Inside_Modal";

export function NewModal(props) {
  const [open, setOpen] = React.useState(false);
  const [isFavorite, setIsFavorite] = React.useState(false);
 
  const handleOpen = () => setOpen((cur) => !cur);
  const handleIsFavorite = () => setIsFavorite((cur) => !cur);
 console.log(props.product_photo,"nm")

  return (
    <>
      <Card
        className="cursor-pointer overflow-hidden transition-opacity hover:opacity-90"
        onClick={handleOpen}
      >
       
        <New_Card  product_price={props.product_price} profile_image={props.profile_image}  product_photo={props.product_photo} product_title={props.product_title}/>

      </Card>
       <Dialog size="lg" open={open} handler={handleOpen}>
        
        <DialogBody>
          
          <Inside_Modal product_photo={props.product_photo} product_title={props.product_title} product_price={props.product_price} sellerName={props.sellerName} sellerPhone={props.sellerPhone}/>
        </DialogBody>
        <DialogFooter className="justify-between">
          <div className="flex items-center gap-16">
            <div>
              <Typography variant="small" color="gray" className="font-normal">
                Views
              </Typography>
              <Typography color="blue-gray" className="font-medium">
                44,082,044
              </Typography>
            </div>
            <div>
              <Typography variant="small" color="gray" className="font-normal">
                Downloads
              </Typography>
              <Typography color="blue-gray" className="font-medium">
                553,031
              </Typography>
            </div>
          </div>
          <Button
            size="sm"
            variant="outlined"
            color="blue-gray"
            className="mr-5 flex items-center"
          >
            Share
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}