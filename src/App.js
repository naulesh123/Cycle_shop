import Card from './components/Card';
import Navbar from './components/Navbar';
import Registration_Modal from './components/Registration_Modal';
import Switcher1 from './components/Switcher1';
import Homepage from './pages/Homepage';


function App() {

  // need to change the allignment of toggle ///
  return (
    <>
      <Navbar/>
      <div style={{ marginLeft: '90%' }}>         
        <Switcher1/>
      </div>
      <div style={{display:'flex'}}>
      {/* <Card/>
      <Card/>
      <Card/>
      <Card/> */}
     <Homepage/>
      </div>
      
    </>
  );
}

export default App;
