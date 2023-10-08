import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import {
  AddEditTour,
  Home,
  Login,
  Register,
  SingleTour,
  TagTours,
} from "./pages";
import Header from "./components/Header";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/features/authSlice";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import PageNotFound from "./pages/PageNotFound";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("profile"));
    dispatch(setUser(userData));
  }, []);

  return (
    <BrowserRouter>
      <Header />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tours/search" element={<Home />} />
        <Route path="/tours/tag/:tag" element={<TagTours />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/addTour"
          element={
            <PrivateRoute>
              <AddEditTour />
            </PrivateRoute>
          }
        />
        <Route
          path="/editTour/:id"
          element={
            <PrivateRoute>
              <AddEditTour />
            </PrivateRoute>
          }
        />
        <Route path="/tour/:id" element={<SingleTour />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        {/* for all random url show not found page (eg: http://localhost:3000/adaasdas) */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
