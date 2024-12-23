import "./App.css";
import LoginPrompt from "./components/Pre-Login/LoginPrompt";
import ProfilePage from "./components/Profile/ProfilePage";
import UserProfilePage from "./components/Profile/UserProfilePage";
import Notifications from "./components/Notifications/Notifications";
import Home from "./components/Home/Home";
import PostForm from "./components/Post/PostForm";
import PostDetails from "./components/Post/PostDetails";
import Ceramic from "./components/Channel/Ceramic";
import Printmaking from "./components/Channel/Printmaking";
import Film from "./components/Channel/Film";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import AdminTools from "./components/AdminTools/AdminTools";
// import { NotificationProvider } from "./components/Notifications/NotificationContext";

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
  		}
	}, [])

	return (
		<BrowserRouter>
		{/* <NotificationProvider userData={userData[0]}> */}
			<Layout username={userData[0].username || ""}>
				<Routes>
					<Route path="/"     element={ login ? (<Home userData={userData[0]} />) : (<LoginPrompt setUser={(email) => setEmail(email)} userData={userData[0]} />)} />
					<Route path="/home" element={ login ? (<Home userData={userData[0]} userRole={userData[0].user_type} />) : (<LoginPrompt setUser={(email) => setEmail(email)} userData={userData[0]} />)} />
					<Route path="/post" element={ <PostForm userId={userData[0].user_id} username={userData[0].username} profile_picture={userData[0].profile_picture} />}/>
					<Route
						path="/post/:post_id"
						element={<PostDetails userId={userData[0].user_id } />}

					/>
					<Route path="/post" element={login ? <PostForm userId={userData[0].user_id} username={userData[0].username} /> : (<LoginPrompt setUser={(email) => setEmail(email)} userData={userData[0]}/>)}/>
					<Route path="/post/:post_id" element={login ? <PostDetails userId={userData[0].user_id} /> : (<LoginPrompt setUser={(email) => setEmail(email)} userData={userData[0]}/>)}/>
					<Route path="/ceramic" element={login ? <Ceramic userData={userData[0]} userRole={userData[0].user_type} channel_id={2}/> : (<LoginPrompt setUser={(email) => setEmail(email)} userData={userData[0]}/>)} />
					<Route path="/printmaking" element={login ? <Printmaking userData={userData[0]} userRole={userData[0].user_type} channel_id={3}/> : (<LoginPrompt setUser={(email) => setEmail(email)} userData={userData[0]}/>)} />
					<Route path="/film" element={login ? <Film userData={userData[0]} userRole={userData[0].user_type}  channel_id={4}/> : (<LoginPrompt setUser={(email) => setEmail(email)} userData={userData[0]}/>)} />
					<Route path="/profile" element={login ? <ProfilePage userData={userData[0]} /> : (<LoginPrompt setUser={(email) => setEmail(email)} userData={userData[0]}/>)} />
					<Route path="/profile/:user_id" element={<UserProfilePage />} />
					<Route path="/notifications" element={login ? <Notifications userData={userData[0]} /> : (<LoginPrompt setUser={(email) => setEmail(email)} userData={userData[0]}/>)} />
					<Route path="/admin-tools" element={login ? (userData[0].user_type === 'admin' ? <AdminTools userData={userData[0]} /> : <Home userData={userData[0]} />) : (<LoginPrompt setUser={(email) => setEmail(email)} userData={userData[0]}/>)} /> 
				
				</Routes>
			</Layout>
		{/* </NotificationProvider> */}
		</BrowserRouter>
	);
}

export default App;
