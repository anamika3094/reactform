import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./component/Header";
import RegistrationForm from "./component/studentform";
import RegistrationTable from "./component/studenttable";
import "./App.css"; // Add global styles if needed

function App() {
  return (
    <Router> {/* ✅ Wrap everything inside Router */}
      <Header />
      <Routes>
        <Route path="/" element={<RegistrationForm />} /> {/* ✅ Show form on home */}
        <Route path="/table" element={<RegistrationTable />} />
      </Routes>
    </Router>
  );
}

export default App;
