import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Layout } from "./components";
import { PrivateRoute } from "./components/PrivateRoute";
import { Feed, Profile, SignupLogin } from "./pages";
import { Create } from "./pages/Create";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Feed />} />
        <Route
          path="/Profile/:userId"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route path="/Signup-Login" element={<SignupLogin />} />
        <Route
          path="/Create"
          element={
            <PrivateRoute>
              <Create />
            </PrivateRoute>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
