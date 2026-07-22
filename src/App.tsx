import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Header from './components/Header'
import AccessManagement from './components/AccessManagement';
import Home from './components/Home';
import GxP from './components/GxP';
import EmergencyContact from './components/EmergencyContact';
import ChangeMnagement from './components/ChangeMnagement';
import Reportanincident from './components/Reportanincident';
import ReleaseMangement from './components/ReleaseMangement';
import InventoryData from './components/InventoryData';
import Sox from './components/Sox';

// import Home from './components/Home/Home'

function App() {
  const [_count, _setCount] = useState(0)

  return (
    <>
 
    <BrowserRouter>
      <Header/>
        <Routes>
          <Route path="/access-management" element={<AccessManagement />} />
          <Route path="/" element={<Home />} />
          <Route path="/gxp" element={<GxP/>} />
          <Route path="/emergency-contact" element={<EmergencyContact/>} />
          <Route path="/change-management" element={<ChangeMnagement/>} />
          <Route path="/report-an-incident" element={<Reportanincident/>} />
          <Route path="/release_management" element={<ReleaseMangement/>} />
          <Route path="/data-inventory" element={<InventoryData/>} />
          <Route path="/sox-audit" element={<Sox/>} />

        </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
