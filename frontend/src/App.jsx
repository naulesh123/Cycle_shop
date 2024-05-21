import Navbar from "./Components/Navbar";
import Switcher1 from "./Components/Switcher1";
import Homepage from "./pages/HomePage";


function App() {

  // need to change the allignment of toggle ///
  return (
    <>
      <Navbar/>
      <div style={{ marginLeft: '90%' }}>         
        <Switcher1/>
      </div>
      <div style={{display:'flex'}}>
     <Homepage/>
      </div>
      
    </>
  );
}

export default App;