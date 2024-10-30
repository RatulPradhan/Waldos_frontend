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

	return (
		<BrowserRouter>
			<Layout username={userData[0].username || ""}>
				<Routes>
					<Route
						path="/"
						element={
							login ? (
								<Home userData={userData[0]} />
							) : (
								<LoginPrompt
									setUser={(email) => setEmail(email)}
									userData={userData[0]}
								/>
							)
						}
					/>
					<Route path="/home" element={<Home userData={userData[0]}/>} />
					<Route
						path="/post"
						element={
							<PostForm
								userId={userData[0].user_id}
								username={userData[0].username}
							/>
						}
					/>
					<Route
						path="/post/:post_id"
						element={<PostDetails userId={userData[0].user_id} />}
					/>
					<Route path="/profile" element={<ProfilePage />} />
					<Route path="/notifications" element={<Notifications />} />
				</Routes>
			</Layout>
		</BrowserRouter>
	);
}

export default App;
