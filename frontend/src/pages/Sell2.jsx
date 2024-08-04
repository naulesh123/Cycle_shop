import React, { useState } from 'react';
import { Button, Input } from "@material-tailwind/react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import {increment, decrement, incrementByAmount ,index_of_delete,number_of_delete,updating_array,updating_sellername,updating_user_name,updating_user_title,updating_user_phone_no} from '../store/counter/counterSlice'         



const Sell2 = (props) => {
  
const user_name=useSelector(state=>state.counter.user_name)
const user_title=useSelector(state=>state.counter.user_title)
const user_phone_no=useSelector(state=>state.counter.user_phone_no)
const user_id=useSelector(state=>state.counter.user_id)

  
  const [brand, setBrand] = useState('');
  const [title, setTitle] = useState(user_title);
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [photos, setPhotos] = useState([]);
  const [phone, setPhone] = useState('');
  const [name, setName] = useState(user_name);
  const [user_phone, setuser_phone] = useState(user_phone_no)


  
// console.log(user_name,user_title,user_title,"bbb")

  const navigate = useNavigate(); 
  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    setPhotos(files);
  };

  const handleNumber = (e) => {
    setPhone(e.target.value);
  };

  const Post_button = async () => {
    // const formData = new FormData();
    // formData.append('new_name', name);
    // formData.append('new_phone', phone);
    // formData.append('new_title', title);
    // formData.append('description', description); // Append description
    // formData.append('new_price', price);
    // formData.append('user_id',user_id);
    // photos.forEach((photo, index) => {
    //   formData.append('pics', photo, `photo-${index}.jpg`);
    // });

    const formData={'new_name':name ,'new_phone': phone ,'new_title': title , 'description': description ,'new_price': price ,'user_id':user_id,'pics':[]}


    // Log FormData content for debugging
    // for (let [key, value] of formData.entries()) {
    //   console.log(key, value);
    // }

    for (const photo of photos) {
      const data = new FormData();
      data.append("file", photo);
      data.append("upload_preset", "Cycle_shop1");
      data.append("cloud_name", "dq3dmgk5e");
  
      try {
        const res = await axios.post(`https://api.cloudinary.com/v1_1/dq3dmgk5e/image/upload`, data);
        console.log('File uploaded successfully', res.data.url);
        // formData.append('pics', res.data.url);  // Append the URL from the response to formData
        formData.pics.push(res.data.url)
      } catch (e) {
        console.error('Error uploading file:', e);
      }

    }
    




    try {
      const response = await axios.post('https://cycle-shop5.vercel.app/change', formData);
      console.log('Response:', response.data);
      navigate(-1); // Go back to the previous page
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };

  const for_name=(e)=>{
  if(e.target.value===''){setName('')}
   else{
    setName(e.target.value)
   }
  }
  const for_title=(e)=>{
    if(e.target.value===''){setTitle('')}
     else{
      setTitle(e.target.value)
     }
    }
    




  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-6">Change Your Ad</h1>
      <div className="mb-6">
        {/* <h2 className="text-xl font-semibold mb-3">Bicycles</h2> */}
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-3">Include Some Details</h2>

        <div className="mb-4">
          
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Enter your Name</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded"
            value={name}
            onChange={for_name}
            placeholder={name}
            maxLength={70}
          />
          <label className="block text-gray-700 mb-2">Ad Title *</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded"
            value={title}
            onChange={for_title}
            placeholder={title}
            maxLength={70}
          />
          <span className="text-gray-500">{title.length} / 70</span>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Description *</label>
          <textarea
            className="w-full px-4 py-2 border rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Include condition, features, and reason for selling"
            maxLength={4096}
          />
          <span className="text-gray-500">{description.length} / 4096</span>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-3">Set a Price</h2>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Price *</label>
          <input
            type="number"
            className="w-full px-4 py-2 border rounded"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
      </div>

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
          {photos.map((photo, index) => (
            <div key={index} className="w-full h-32 border rounded flex items-center justify-center overflow-hidden">
              <img src={URL.createObjectURL(photo)} alt="uploaded" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <Input label="Phone Number" onChange={handleNumber} />
      </div>

      <Button color="blue" onClick={Post_button}>POST</Button>
    </div>
  );
};

export default Sell2;
