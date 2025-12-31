import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import HomePage from "./pages/homePage";
import LoginPage from "./pages/loginPage";
import RegisterPage from "./pages/registerPage";
import AdminPage from "./pages/adminPage";
import { GoogleOAuthProvider } from "@react-oauth/google";


import TestPage from "./pages/testPage.jsx";

// 374856593474-cjn173qbgmkhvd4pfbnvo67m14s78hmn.apps.googleusercontent.com


function App() {
  return (
    <GoogleOAuthProvider clientId="374856593474-cjn173qbgmkhvd4pfbnvo67m14s78hmn.apps.googleusercontent.com">
    <BrowserRouter>
    <Toaster position="top-right" />
      <div className="w-full h-screen bg-primary text-secondary">
        <Routes>
          
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/admin/*" element={<AdminPage />} />
          
          <Route path="/test" element={<TestPage />} />
          
          
          
          <Route path="/*" element={<HomePage />} />
        </Routes>
      </div>
    </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;