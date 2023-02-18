import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Employee from "./Employee";
import Organization from "./Organization";

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/employee" element={<Employee />} />
        <Route path="/organization" element={<Organization />} />
      </Routes>
    </>
  )
}

export default App;
