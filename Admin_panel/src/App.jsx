import { React } from "react";

import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Admin from "./pages/admin/Admin";

function App() {
  return (
    <div>
      <Navbar></Navbar>
      <Admin></Admin>
    </div>
  );
}

export default App;
