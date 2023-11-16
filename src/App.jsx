// import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import ProfilPage from "./pages/ProfilPage";
import HomePage from "./pages/HomePage";
import CreateActivity from "./pages/CreateActivityPage";
import OneActivityPage from "./pages/OneActivityPage";
import EditProfile from "./pages/EditProfile";
import CreateComment from "./pages/CreateComment";
import UpdateActivity from "./pages/UpdateActivity";
// Navigation
import LoggedOutUser from "./navigation/LoggedOutUser";
import LoggedInUser from "./navigation/LoggedInUser";

import Layout from "./layouts/Layout";
import UserLayout from "./layouts/UserLayout";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <>
      <div className="App">
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            {/* is Logged in */}
            <Route element={<LoggedInUser />}>
              <Route path="/users" element={<UserLayout />} />
              <Route path="/:id" element={<ProfilPage />} />
              <Route path="/:id/edit" element={<EditProfile />} />
              <Route path="/new-activity" element={<CreateActivity />} />
              <Route path="/activities/:id" element={<OneActivityPage />} />
              <Route path="/activities/:id/edit" element={<UpdateActivity />} />
              <Route
                path="/activities/:id/comment"
                element={<CreateComment />}
              />
            </Route>

            {/* Login / Signup routes should be accessible to Logged out users */}

            <Route element={<LoggedOutUser />}>
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/login" element={<LoginPage />} />
            </Route>
            <Route path="*" element={<h2>Error page</h2>} />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
