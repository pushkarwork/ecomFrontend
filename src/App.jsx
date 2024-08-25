import React from 'react'
import Header from './components/Layout/Header'
import "./App.css"
import Footer from './components/Layout/Footer'

import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Toaster } from 'react-hot-toast';
import UserRoutes from './components/Routes/UserRoutes'
import AdminRoutes from './components/Routes/AdminRoutes'
import NotFound from './components/Layout/NotFound'
const App = () => {
  const userRoutes = UserRoutes();
  const adminRoutes = AdminRoutes();
  return (
    <BrowserRouter>
      <div className='App'>
        <Toaster position='top-center' />
        <Header />
        <div className="container">
          <Routes>{userRoutes}{adminRoutes}
            <Route path='*' element={<NotFound />} />
          </Routes>

        </div>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
