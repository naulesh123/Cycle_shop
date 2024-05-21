import { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../Components/Card';


export default function Homepage() {
const [product_array, setproduct_array] = useState()  
const [Card_array, setCard_array] = useState([])
let new_array=[];
  
const options = {
  method: 'GET',
  url: 'https://real-time-amazon-data.p.rapidapi.com/search',
  params: {
    query: 'Shirt',
    page: '1',
    country: 'US'
  },
  headers: {
    'X-RapidAPI-Key': 'b2e66c0017mshb40949c12e9dac6p1e060ajsn2fb021081bb5',
    'X-RapidAPI-Host': 'real-time-amazon-data.p.rapidapi.com'
  }
};

  const getting_data = async () => {
    try {
      const response = await axios.request(options);
      // console.log(response.data.data.products);
      setproduct_array(response.data.data.products);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getting_data();
  }, []);

console.log(product_array,'product_array')

if(product_array)
  {
console.log('hero')
for(let i=0;i<product_array.length;i++){
console.log(product_array[i].product_title.split(',')[0]);
new_array.push(<Card product_title={product_array[i].product_title.split(',')[0]} product_photo={product_array[i].product_photo}/>)


}  



}






  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
      {new_array.map((item, index) => (
        <div key={index} className="grid-item">
          {item}
        </div>
      ))}
    </div>
  );
}