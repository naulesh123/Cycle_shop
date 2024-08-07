import React, { useEffect } from "react";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { NewNavbar } from "./Components/NewNavbar";
import Switcher1 from "./Components/Switcher1";
import Sell from "./pages/Sell";
import Search_box from "./Components/Search_box";
import {Discard_ad} from "./pages/Discard_ad";
import { increment, decrement, incrementByAmount } from './store/counter/counterSlice'
import { useSelector,useDispatch } from "react-redux";
import Sell2 from "./pages/Sell2";
import Cloud_approach from "./pages/Cloud_approach";


function App() {
  
const dispatch=useDispatch()

// const items=[' M bike', 'bicycle','bik']
// const arr=items.filter(product=>product.includes('bik'))
// console.log(arr)




  return (
    <>
{/* {useSelector(state=>state.counter.value)} */}

      <NewNavbar />
      <div style={{ marginLeft: '90%', padding: '20px', display: 'flex', gap: '5px' }}>
        {/* <span className="py-3 text-blue-400">M</span>
        <Switcher1 />
        <span className="py-3 text-pink-400">F</span> */}
      </div>
      <Routes>
        {/* <Route path="/" element={<Cloud_approach/>} /> */}
        <Route path="/" element={<HomePage />} />
        <Route path="/Sell" element={<Sell />} />
        <Route path="/Discard" element={<Discard_ad />} />
        <Route path='/Sell2' element={<Sell2/>} />
      </Routes>
      




      
    </>
  );
}

export default App;
