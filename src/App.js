import { BrowserRouter, Routes, Route, Navigate   } from "react-router-dom";
import { useState, useEffect } from "react";
import MainPage from "./components/Main-page";
import Login from "./components/Login-modal";
import Register from "./components/Register-modal";
import AdminLogin from "./components/Admin-login";
import AdminPage from "./components/Admin-page";
import UserProfile from "./components/User-profile";
import Checkout from "./components/Billing-page";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./contexts/Auth";
import './App.css';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

function App() {
  const [userLogged, setUserLogged] = useState(false);
  const [adminLogged, setAdminLogged] = useState(false);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(parseInt(localStorage.getItem('total_payable')));
  const [currentView, setCurrentView] = useState('list');
  useEffect(() => {
    if (localStorage.getItem("token") === 'null' || localStorage.getItem("token") === 'undefined') {
      setUserLogged(false)
    } else {
      setUserLogged(true)
    }
    setLoading(false)
  }, [])

  const updateLink = (val)=>{
    setCurrentView(val)
  }
  
  return (
    <BrowserRouter>
    {loading ? (
              <div className="loader-div">
                <span className="loader">
                  <span></span>
                  <span></span>
                </span>
              </div>
            ) : (
              <>
              <Navbar userLogged={userLogged} setUserLogged={setUserLogged} total={total} adminLogged={adminLogged} setAdminLogged={setAdminLogged} />
              <AuthProvider>
                <Routes>
                  <Route path="/" element={<MainPage setUserLogged={setUserLogged} userLogged={userLogged} total={total} setTotal={setTotal} currentView={currentView} />}  />
                  <Route path="/main" element={<MainPage setUserLogged={setUserLogged} userLogged={userLogged} total={total} setTotal={setTotal} currentView={currentView}   />} />
                  <Route path="/login" element={<Login setUserLogged={setUserLogged} userLogged={userLogged} />}/>
                  <Route path="/register" element={<Register setUserLogged={setUserLogged} userLogged={userLogged} />}/>
                  <Route path="/admin-pnlog" element={<AdminLogin setAdminLogged={setAdminLogged} adminLogged={adminLogged} />} />
                  <Route path="/admin-pn" element={<AdminPage setAdminLogged={setAdminLogged} adminLogged={adminLogged} />} />
                  <Route path="/profile" element={<UserProfile setUserLogged={setUserLogged} userLogged={userLogged} setLoading={setLoading} />} />
                  <Route path="/checkout" element={<Checkout total={total} setTotal={setTotal} userLogged={userLogged} setLoading={setLoading} />} />
                </Routes>
              </AuthProvider>
              </>
            )}
  </BrowserRouter>
  );
}

export default App;
