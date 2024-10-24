import "./App.css";
import LoginPrompt from "./components/Pre-Login/LoginPrompt";
import ProfilePage from "./components/Profile/ProfilePage";
import Notifications from "./components/Notifications/Notifications";
import Home from "./components/Home/Home";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";

function App() {
  const [userData, setUserData] = useState([{}]);
  const [email, setEmail] = useState("");

  useEffect(() => {
    if(email) {fetch(`http://localhost:8080/user/${email}`)
      .then((response) => response.json())
      .then((data) => {
        setUserData(data);
      });
    }
  }, [email]);

  const login = window.localStorage.getItem("isLoggedIn")

  return (
    <BrowserRouter>
      <Layout username={userData[0].username || ""}>
        <Routes>
          <Route
            path="/"
            element={
              login ? (
                <Home />
              ) : (
                <LoginPrompt setUser={(email) => setEmail(email)} />
              )
            }
          />
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/notifications" element={<Notifications />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
