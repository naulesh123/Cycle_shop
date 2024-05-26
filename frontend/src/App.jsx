import React, { useEffect } from "react";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { NewNavbar } from "./Components/NewNavbar";
import Switcher1 from "./Components/Switcher1";
import Sell from "./pages/Sell";

function App() {
  useEffect(() => {
    axios.get('http://localhost:5000/cycles')
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <>
      <NewNavbar />
      <div style={{ marginLeft: '90%', padding: '20px', display: 'flex', gap: '5px' }}>
        <span className="py-3 text-blue-400">M</span>
        <Switcher1 />
        <span className="py-3 text-pink-400">F</span>
      </div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Sell" element={<Sell />} />
      </Routes>
    </>
  );
}

export default App;
