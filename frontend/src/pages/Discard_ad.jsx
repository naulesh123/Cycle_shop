import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
    Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { useState } from "react";
import axios from "axios";
import { NewModal } from "../Components/NewModal";
import { Delete_warning } from "../Components/Delete_warning";


export function Discard_ad() {


    
const [product_array, setproduct_array] = useState()

    const getdata = async () => {
  
        try {
          const response = await axios.get('http://localhost:5000/cycles')
          console.log(response.data);
          setproduct_array(response.data);
          
        } catch (error) {
          console.error(error);
        }
      };
      
      const trimmer=(string)=>{
        let str=string[0];
        str=str.split("\\")
        
        console.log(str[str.length-1])
        return str[str.length-1]
        
        }
      

    
    const [phone_number, setphone_number] = useState('')
     
    const change=(e)=>{
    setphone_number(e.target.value)

    }

    const arr=[]

    if(product_array)
        {
            for(let i=0;i<product_array.length;i++)
                {
                    if(product_array[i].sellerPhone==phone_number)
                        {
                            arr.push(<div><NewModal profile_image={trimmer(product_array[i].pics)}  product_title={product_array[i].name} product_photo={product_array[i].pics} product_price={product_array[i].price} sellerName={product_array[i].sellerName} sellerPhone={product_array[i].sellerPhone}/><div className="flex" style={{justifyContent: 'space-between'}}>
                            <Button color="amber">Change Ad</Button><Delete_warning index={i} id={product_array[i]._id} sellerPhone={product_array[i].sellerPhone} >Delete Ad</Delete_warning></div></div>)
                            
                            ////
                        }

                }




        }











    return (<>
        <Card color="transparent" shadow={false} style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Typography variant="h4" color="blue-gray">
                Enter Your Phone Number
            </Typography>
  <div style={{display:'flex', gap:'10px'}}>
            <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                <div className="mb-1 flex flex-col gap-6">

                    <Input onChange={change}
                        size="lg"
                        placeholder="Phone number"
                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                            className: "before:content-none after:content-none",
                            
                        }}

                    />
                    {/* <Button></Button> */}

                </div>
            </form>
            <Button className="mt-8 mb-2 " onClick={getdata}>Search</Button>
            </div>
        </Card>


{
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
    {arr.map((item, index) => (
      <div key={index} className="grid-item">
        {item}
        {index}
      </div>
    ))}
   
  </div>
}
{/* <div className="flex">
      <Button color="amber">Change Ad</Button><Button color="red">Delete Ad</Button></div>
      */}
      {
        // arr
      }

    </>);
}