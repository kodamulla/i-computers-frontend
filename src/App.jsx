import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import HomePage from "./pages/homePage";
import LoginPage from "./pages/loginPage";
import RegisterPage from "./pages/registerPage";
import AdminPage from "./pages/adminPage";
import AdminProductsPage from "./pages/admin/adminProductsPage.jsx";
import TestPage from "./pages/testPage.jsx";

function App() {
  return (
    <BrowserRouter>
    <Toaster position="top-right" />
      <div className="w-full h-screen bg-primary text-secondary">
        <Routes>
          
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/admin/*" element={<AdminPage />} />
          <Route path="/admin/products" element={<AdminProductsPage />} />
          <Route path="/test" element={<TestPage />} />
          
          
          <Route path="/*" element={<HomePage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;