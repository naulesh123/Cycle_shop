import { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../Components/Card';
import { New_Card } from '../Components/New_Card';
import { NewModal } from '../Components/NewModal';
import Search_box from '../Components/Search_box';
import Big_searchBar from '../Components/Big_searchbar';

export default function HomePage() {
const [product_array, setproduct_array] = useState()  
const [Card_array, setCard_array] = useState([])
const [selling_image, setselling_image] = useState()

const trimmer=(string)=>{
let str=string[0];
str=str.split("\\")

console.log(str[str.length-1])
return str[str.length-1]

}

let new_array=[];


  const getting_data = async () => {
  
  try {
    const response = await axios.get('http://localhost:5000/cycles')
    console.log(response.data);
    setproduct_array(response.data);
    
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

for(let i=0;i<product_array.length;i++){
console.log(product_array[i].name);

new_array.push(<NewModal profile_image={trimmer(product_array[i].pics)}  product_title={product_array[i].name} product_photo={product_array[i].pics} product_price={product_array[i].price} sellerName={product_array[i].sellerName} sellerPhone={product_array[i].sellerPhone}/>)

}  

}

  return (<>
<div style={{display: 'flex',alignItems:'center',justifyContent: 'center',height: '30vh'}}><Big_searchBar/></div>
  
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
      {new_array.map((item, index) => (
        <div key={index} className="grid-item">
          {item}
        </div>
      ))}
     
    </div>
    </>);
}