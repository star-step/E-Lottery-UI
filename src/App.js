import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./components/Main-page";
import Login from "./components/Login-modal";
import Register from "./components/Register-modal";
import './App.css';

function App() {

  return (
    // <div className="App">
    //   <header className="App-header">
    //       {/* <MainPage/> */}
    //       <Login/>
    //   </header>
    // </div>
    <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />}/>
      <Route index element={<Login />} />
      <Route path="/register" element={<Register />}/>
      <Route path="/main" element={<MainPage />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
