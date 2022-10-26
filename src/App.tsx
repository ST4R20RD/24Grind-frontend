import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Layout } from "./components";
import { PrivateRoute } from "./components/PrivateRoute";
import { Feed, Groups, Profile, InsideGroup, SignupLogin } from "./pages";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Feed />} />
        <Route path="/Groups" element={<Groups />} />
        <Route path="/Groups/:id" element={<InsideGroup />} />
        <Route
          path="/Profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route path="/Signup-Login" element={<SignupLogin />} />
      </Route>
    </Routes>
  );
}

export default App;
