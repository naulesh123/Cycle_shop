import {React ,useState,useEffect} from 'react'
import { Button } from '@material-tailwind/react'
import axios from 'axios'



export default function Cloud_approach() {

const [image, setimage] = useState("")
const handlePhotoUpload=(e)=>{
setimage(e.target.files[0])
console.log(e.target.files[0],"hii")

}

const submit=async()=>{
const data=new FormData();
data.append("file",image);
data.append("upload_preset","Cycle_shop1")
data.append("cloud_name","dq3dmgk5e")




try {
    const response = await axios.post(`https://api.cloudinary.com/v1_1/dq3dmgk5e/image/upload`, data);
    console.log('File uploaded successfully', response.data.url);
  } catch (error) {
    console.error('Error during file upload:', error);
  }
};


    return (<>
    <div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-3">Upload Photos</h2>
        <div className="grid grid-cols-3 gap-4">
          <label className="w-full h-32 border rounded flex items-center justify-center cursor-pointer">
            <input
              type="file"
              multiple
              className="hidden"
              onChange={handlePhotoUpload}
              accept="image/*"
            />
            <span className="text-gray-500">Add Photo</span>
          </label>
          {/* {photos.map((photo, index) => (
            <div key={index} className="w-full h-32 border rounded flex items-center justify-center overflow-hidden">
              <img src={URL.createObjectURL(photo)} alt="uploaded" className="w-full h-full object-cover" />
            </div>
          ))} */}



        </div>
      </div>
      <Button color='blue' onClick={submit}>POST</Button>





    </div>
    </>)
}
