import { BrowserRouter, Routes, Route, Navigate   } from "react-router-dom";
import { useState, useEffect } from "react";
import MainPage from "./components/Main-page";
import Login from "./components/Login-modal";
import Register from "./components/Register-modal";
import AdminLogin from "./components/Admin-login";
import AdminPage from "./components/Admin-page";
import UserProfile from "./components/User-profile";
import { AuthProvider } from "./contexts/Auth";
import './App.css';

function App() {
  const [userLogged, setUserLogged] = useState(false);
  const [adminLogged, setAdminLogged] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("loading");
    if (localStorage.getItem("token") === 'null') {
      setUserLogged(false)
    } else {
      setUserLogged(true)
    }
    setLoading(false)
  }, [])

  return (
    <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path="/" element={<MainPage setUserLogged={setUserLogged} userLogged={userLogged} />} />
        <Route path="/main" element={<MainPage setUserLogged={setUserLogged} userLogged={userLogged} />} />
        <Route path="/login" element={<Login setUserLogged={setUserLogged} userLogged={userLogged} />}/>
        <Route path="/register" element={<Register setUserLogged={setUserLogged} userLogged={userLogged} />}/>
        <Route path="/admin-pnlog" element={<AdminLogin setAdminLogged={setAdminLogged} adminLogged={adminLogged} />} />
        <Route path="/admin-pn" element={<AdminPage setAdminLogged={setAdminLogged} adminLogged={adminLogged} />} />
        <Route path="/profile" element={<UserProfile setAdminLogged={setAdminLogged} adminLogged={adminLogged} />} />
      </Routes>
    </AuthProvider>
  </BrowserRouter>
  );
}

export default App;
