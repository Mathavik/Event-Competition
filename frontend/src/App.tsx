import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
// import RegistrationForm from "./pages/RegistrationForm";
// import HomePage from "./pages/HomePage";
// import RegisterPage from "./pages/RegisterPage";
// import AdminPage from "./pages/AdminPage";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <Routes>
            {/* <Route path="/" element={<HomePage />} /> */}
            {/* <Route path="/register" element={<RegistrationForm />} /> */}
            {/* <Route path="/admin" element={<AdminPage />} /> */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;