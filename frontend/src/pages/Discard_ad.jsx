import {
  Card,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useState, useEffect } from "react";
import axios from "axios";
import { NewModal } from "../Components/NewModal";
import { Delete_warning } from "../Components/Delete_warning";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { increment, decrement, incrementByAmount, index_of_delete, number_of_delete, updating_array, updating_sellername, updating_user_name, updating_user_title, updating_user_phone_no,updating_user_id } from '../store/counter/counterSlice';

export function Discard_ad() {
  const [productArray, setProductArray] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState('');
  const dispatch = useDispatch();
  const updatedArray = useSelector(state => state.counter.updated_array);
  const nameOfSeller = useSelector(state => state.counter.name_of_seller);
  const navigate = useNavigate();

  useEffect(() => {
    if (phoneNumber) {
      getData();
    }
  }, [phoneNumber]);

  const getData = async () => {
    try {
      const response = await axios.get('http://localhost:5001/cycles');
      setProductArray(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const change_ad = (name, title, phone_no,user_id) => {
    dispatch(updating_user_name(name));
    dispatch(updating_user_title(title));
    dispatch(updating_user_phone_no(phone_no));
    dispatch(updating_user_id(user_id));
    navigate('/Sell2');
  };

  const handleChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  // const trimmer = (string) => {
  //   let str = string[0];
  //   str = str.split("\\");
  //   return str[str.length - 1];
  // };

  const renderProducts = () => {
    if (productArray.length && nameOfSeller === '') {
      return productArray
        .filter(product => product.sellerPhone === phoneNumber)
        .map((product, i) => (
          <div key={product._id}>
            <NewModal
              profile_image={product.pics[0]}
              product_title={product.name}
              product_photo={product.pics}
              product_price={product.price}
              sellerName={product.sellerName}
              sellerPhone={product.sellerPhone}
            />
            <div className="flex" style={{ justifyContent: 'space-between' }}>
              <Button color="amber" onClick={() => change_ad(product.sellerName, product.name, product.sellerPhone,product._id)}>Change Ad</Button>
              <Delete_warning index={i} id={product._id} sellerPhone={product.sellerPhone}>Delete Ad</Delete_warning>
            </div>
          </div>
        ));
    }
    return null;
  };

  const renderUpdatedArray = () => {
    if (updatedArray.length) {
      return updatedArray.map((product, i) => (
        <div key={product._id}>
          <NewModal
            profile_image={product.pics[0]}
            product_title={product.name}
            product_photo={product.pics}
            product_price={product.price}
            sellerName={nameOfSeller}
            sellerPhone={product.sellerPhone}
          />
  


          <div className="flex" style={{ justifyContent: 'space-between' }}>
            <Button color="amber" onClick={() => change_ad(nameOfSeller, product.name, product.sellerPhone,product._id)}>Change Ad</Button>
            <Delete_warning index={i} id={product._id} sellerPhone={product.sellerPhone}>Delete Ad</Delete_warning>
          </div>
        </div>
      ));
    }
    return null;
  };

  return (
    <>
      <Card color="transparent" shadow={false} style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Typography variant="h4" color="blue-gray">
          Enter Your Phone Number
        </Typography>
        <div style={{ display: 'flex', gap: '10px' }}>
          <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
            <div className="mb-1 flex flex-col gap-6">
              <Input
                onChange={handleChange}
                size="lg"
                placeholder="Phone number"
                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            </div>
          </form>
          <Button className="mt-8 mb-2" onClick={getData}>Search</Button>
        </div>
      </Card>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
        {renderProducts()}
        {renderUpdatedArray()}
      </div>
    </>
  );
}
