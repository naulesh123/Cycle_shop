import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import axios from "axios";
import { useSelector,useDispatch } from "react-redux"; 
import { increment, decrement, incrementByAmount,index_of_delete,number_of_delete,updating_array ,updating_sellername} from '../store/counter/counterSlice'

export function Delete_warning(props) {
  const [open, setOpen] = React.useState(false);
  // console.log(props.id)

  const dispatch=useDispatch()
  // console.log(useSelector(state=>state.counter.deleted_index))
  const curr_no=useSelector(state=>state.counter.deleted_number)


  const handleOpen = async(e) => {
    console.log(e.currentTarget.name)
    
    

    if(e.currentTarget.name=='confirm')
        {
          dispatch(index_of_delete(props.index));

          if(curr_no)
          dispatch(number_of_delete(props.sellerPhone))
          
          // console.log(useSelector(state=>state.counter.deleted_index))
    // console.log(props.index)
         try{
            const res=await axios.post('https://cycle-shop-hpxr4-dxnl3qv7q-naulesh123s-projects.vercel.app/delete',{_id:props.id,phone:props.sellerPhone})
            // dispatch()
            console.log(res.data.result.cycles)
            dispatch(updating_array(res.data.result.cycles))
            dispatch(updating_sellername(res.data.result.name))

            
            /////////////////////////
          } 
          
         catch(e){
          console.log(e)
         }


        }    
    setOpen(!open)};

  
  
  
  return (
    <>
      <Button onClick={handleOpen} variant="gradient" color="red">
        Delete Ad
      </Button>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Are u sure want to delete your Ad.</DialogHeader>
        <DialogBody>
          By clicking confirm your Ad will be removed from our database
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
            name='cancel'
          >
            <span>Cancel</span>
          </Button>
          <Button name='confirm'  variant="gradient" color="green" onClick={handleOpen}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}