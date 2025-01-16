import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './App.css'

import Navbar from './components/Navbar'
import Home from './pages/Home'
import Register from './pages/Register'
import GetImage from './components/RegisterComponents/GetImage';
import PisSignUp from './components/RegisterComponents/PisSignUp';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import RusheeZoom from './pages/RusheeZoom';
import RusheePage from './pages/RusheePage';
import PIS from './pages/PIS';

import MyError from './components/Error';
import Admin from './pages/Admin';
import Attendance from './pages/Attendance';
import BrotherPIS from './pages/BrotherPIS';

function App() {

  return (

    <div className='m-0 p-0 h-screen w-screen overflow-y-scroll'>

      <BrowserRouter>

        <Routes>

          <Route path='/' element={<Home />} index />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login/>} />
          <Route path='/dashboard' element={<Dashboard/>} />
          <Route path='/brother/rushee/:gtid' element={<RusheeZoom/>} />
          <Route path='/error/:title/:description' element={<MyError/>} />
          <Route path='/admin' element={<Admin/>} />
          <Route path='/rushee/:gtid/:link' element={<RusheePage/>} />
          <Route path='/pis/:gtid' element={<PIS/>} />
          <Route path='/attendance' element={<Attendance/>} />
          <Route path='/brother/pis' element={<BrotherPIS/>} />

          <Route path='/playground' element={<PisSignUp/>} />

        </Routes>

      </BrowserRouter>

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

    </div>

  )
}

export default App
