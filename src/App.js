import "./App.css";
import LoginPrompt from "./components/Pre-Login/LoginPrompt";
import ProfilePage from "./components/Profile/ProfilePage";
import Notifications from "./components/Notifications/Notifications";
import Home from "./components/Home/Home";
import PostForm from "./components/Post/PostForm";
import PostDetails from "./components/Post/PostDetails";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";

function App() {
	const [userData, setUserData] = useState([{}]);
	const [email, setEmail] = useState("");

	useEffect(() => {
		if (email) {
			fetch(`http://localhost:8080/user/${email}`)
				.then((response) => response.json())
				.then((data) => {
					setUserData(data);
					window.localStorage.setItem("userData", JSON.stringify(data[0]));
				});
		}
	}, [email]);

	const login = window.localStorage.getItem("isLoggedIn");

	useEffect(() => {
		const existingUserData = window.localStorage.getItem("userData");
  		if (existingUserData) {
			const data = JSON.parse(existingUserData);
      		setUserData([data]);
			console.log(userData);
  		}
	}, [])

	return (
		<BrowserRouter>
			<Layout username={userData[0].username || ""}>
				<Routes>
					<Route path="/" element={ login ? (<Home />) : (<LoginPrompt setUser={(email) => setEmail(email)} userData={userData[0]}/>)}
					/>
					<Route path="/home" element={login ? <Home /> : (<LoginPrompt setUser={(email) => setEmail(email)} userData={userData[0]}/>)} />
					<Route path="/post" element={login ? <PostForm userId={userData[0].user_id} username={userData[0].username} /> : (<LoginPrompt setUser={(email) => setEmail(email)} userData={userData[0]}/>)}/>
					<Route path="/post/:post_id" element={login ? <PostDetails userId={userData[0].user_id} /> : (<LoginPrompt setUser={(email) => setEmail(email)} userData={userData[0]}/>)}/>
					<Route path="/profile" element={login ? <ProfilePage /> : (<LoginPrompt setUser={(email) => setEmail(email)} userData={userData[0]}/>)} />
					<Route path="/notifications" element={login ? <Notifications /> : (<LoginPrompt setUser={(email) => setEmail(email)} userData={userData[0]}/>)} />
				</Routes>
			</Layout>
		</BrowserRouter>
	);
}

export default App;
