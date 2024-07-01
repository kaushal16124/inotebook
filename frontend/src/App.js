import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Signup from './components/Signup';
import Login from './components/Login';
import { useState } from 'react';
import LoadingBar from 'react-top-loading-bar';

function App() {
  const [alert, setAlert] = useState(null);
  const [progress,setProgress] = useState(0);

  const showAlert = (message, type)=>{
      setAlert({
        msg: message,
        type: type
      })
      setTimeout(() => {
          setAlert(null);
      }, 1500);
  }

  
  return (
    <>
    <NoteState>
      <BrowserRouter>
      <Navbar setProgress={setProgress}/>
      <LoadingBar
        color='#8BF174'
        progress={progress}
        height={4}
      />
      <Alert alert={alert}/>
      <div className="container">
      
        {/* <div> */}
          
          <Routes>

            <Route exact path="/" element={<Home setProgress={setProgress} showAlert={showAlert} />}></Route>
            <Route exact path="/about" element={<About setProgress={setProgress} />}></Route>
            <Route exact path="/signup" element={<Signup setProgress={setProgress} showAlert={showAlert}/>}></Route>
            <Route exact path="/login" element={<Login setProgress={setProgress} showAlert={showAlert}/>}></Route>
          </Routes>
        {/* </div> */}
        </div>
      </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;
