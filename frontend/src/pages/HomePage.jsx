import { useEffect, useState } from 'react';
import axios from 'axios';
import { NewModal } from '../Components/NewModal';
import Big_searchBar from '../Components/Big_searchbar';
import { useDispatch, useSelector } from 'react-redux';
import {
  updating_product_array_obj,
  updating_database_items,
  updating_search_items,
} from '../store/counter/counterSlice';

export default function HomePage() {
  const [product_array, setproduct_array] = useState([]);
  const [Card_array, setCard_array] = useState([]);
  const [searched_array, setsearched_array] = useState([]);
  const searchValue = useSelector((state) => state.counter.search_value);
  const new_array_obj = useSelector((state) => state.counter.product_array_obj);
  const dispatch = useDispatch();

  useEffect(() => {
    const getting_data = async () => {
      try {
        const response = await axios.get('https://cycle-shop5.vercel.app/cycles');
        setproduct_array(response.data);
        dispatch(updating_product_array_obj(response.data));
      } catch (error) {
        console.error(error);
      }
    };

    getting_data();
  }, [dispatch]);

  useEffect(() => {
    if (product_array.length > 0) {
      const new_array = product_array.map((product) => (
        <NewModal
          key={product._id}
          profile_image={trimmer(product.pics)}
          product_title={product.name}
          product_photo={product.pics}
          product_price={product.price}
          sellerName={product.sellerName}
          sellerPhone={product.sellerPhone}
        />
      ));
      setCard_array(new_array);
      dispatch(updating_database_items(new_array));
    }
  }, [product_array, dispatch]);

  useEffect(() => {
    if (searchValue !== '') {
      const searched_items_array = new_array_obj.filter((o) =>
        o.name.includes(searchValue)
      );
      const new_array2 = searched_items_array.map((product) => (
        <NewModal
          key={product._id}
          profile_image={trimmer(product.pics)}
          product_title={product.name}
          product_photo={product.pics}
          product_price={product.price}
          sellerName={product.sellerName}
          sellerPhone={product.sellerPhone}
        />
      ));
      setsearched_array(new_array2);
    } else {
      setsearched_array(Card_array);
    }
  }, [searchValue, new_array_obj, Card_array]);

  const trimmer = (string) => {
    let str = string[0];
    str = str.split('\\');
    return str[str.length - 1];
  };

  return (
    <>
      {/* <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '30vh' }}>
        <Big_searchBar />
      </div> */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
        {searched_array}
      </div>
    </>
  );
}
