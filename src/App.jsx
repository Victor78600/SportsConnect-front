import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import ProfilPage from "./pages/ProfilPage";
import HomePage from "./pages/HomePage";
import CreateActivity from "./pages/CreateActivityPage";
import OneActivityPage from "./pages/OneActivityPage";
// Navigation
import LoggedOutUser from "./navigation/LoggedOutUser";
import LoggedInUser from "./navigation/LoggedInUser";
// import AdminRoute from "./navigation/AdminRoute";

import Layout from "./layouts/Layout";
import UserLayout from "./layouts/UserLayout";
// import AboutPage from "./pages/AboutPage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";

function App() {
  // const [user, setUser] = useState(null)

  // useEffect(() => {
  // 	axios
  // 		.get("http://localhost:5005/api/auth/verify", {
  // 			headers: {
  // 				Authorization: `Bearer ${localStorage.getItem("authToken")}`,
  // 			},
  // 		})
  // 		.then((res) => {
  // 			console.log("success")
  // 			console.log(res)
  // 		})
  // 		.catch((error) => console.log(error))
  // }, [])

  return (
    <>
      <div className="App">
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            {/* <Route path="/about" element={<AboutPage />} /> */}
            {/* The conversations routes should be accessible only if a user */}
            {/* is Logged in */}
            <Route element={<LoggedInUser />}>
              <Route path="/users" element={<UserLayout />} />
              <Route path="/:id" element={<ProfilPage />} />
              <Route path="/new-activity" element={<CreateActivity />} />
              <Route path="/activities/:id" element={<OneActivityPage />} />
            </Route>
            {/* Login / Signup routes should be accessible to Logged out users */}

            <Route element={<LoggedOutUser />}>
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/login" element={<LoginPage />} />
            </Route>
            {/* <Route element={<AdminRoute />}>
              <Route path="/secret" element={<h1>Shhhhhh.....</h1>} />
            </Route> */}
            <Route path="*" element={<h2>Error page</h2>} />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
