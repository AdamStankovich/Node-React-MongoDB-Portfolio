import Topbar from "./components/topbar/Topbar"
import Intro from "./components/intro/Intro"
import Portfolio from "./components/portfolio/Portfolio"
import Works from "./components/works/Works"
import Contact from "./components/contact/Contact"
import Menu from "./components/menu/Menu"
import Login from "./components/login/Login"
import Admin from "./components/admin/Admin"
import "./app.scss"
import { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Routes } from 'react-router-dom'

function App() {
  const [menuOpen, setMenuOpen] = useState(false) //set hamburger menu to be closed by default
  return (

    <div className="app">
      <Topbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <Menu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <div className="sections">
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<Admin />} />
          </Routes >
        </Router>
        <Intro />
        <Portfolio />
        <Works />
        <Contact />

      </div>
    </div>

  );
}

export default App;
