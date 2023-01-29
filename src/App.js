import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import MainPage from "./components/Main-page";
import Login from "./components/Login-modal";
import Register from "./components/Register-modal";
import AdminLogin from "./components/Admin-login";
import AdminPage from "./components/Admin-page";
import { AuthProvider } from "./contexts/Auth";
import './App.css';

function App() {
  const [userLogged, setUserLogged] = useState(false);
  const [adminLogged, setAdminLogged] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token") != null) {
      setUserLogged(true)
    } else {
      setUserLogged(false)
    }
  }, [])

  return (
    // <div className="App">
    //   <header className="App-header">
    //       {/* <MainPage/> */}
    //       <Login/>
    //   </header>
    // </div>
    <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login setUserLogged={setUserLogged} userLogged={userLogged} />}/>
        <Route index element={<MainPage />} />
        <Route path="/register" element={<Register setUserLogged={setUserLogged} userLogged={userLogged} />}/>
        <Route path="/main" element={<MainPage setUserLogged={setUserLogged} userLogged={userLogged} />} />
        <Route path="/admin-pnlog" element={<AdminLogin setAdminLogged={setAdminLogged} adminLogged={adminLogged} />} />
        <Route path="/admin-pn" element={<AdminPage setAdminLogged={setAdminLogged} adminLogged={adminLogged} />} />
      </Routes>
    </AuthProvider>
  </BrowserRouter>
  );
}

export default App;
