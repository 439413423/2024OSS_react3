import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ShowList from "./components/Pages/ShowList";
import EditUser from "./components/User/EditUser";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/list" element={<ShowList />} />
        <Route path="/update" element={<EditUser />} />
      </Routes>
    </Router>
  );
}

export default App;
