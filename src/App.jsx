import React from 'react'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import RootLayout from './layouts/RootLayout';
import './styles.css'
import Home from './pages/Home';
import Chatbot from './pages/Chatbot';
import BMI from './pages/BMI';
import Nutrition from './pages/Nutrition';
import NotFound from './pages/NotFound';

const App = () => {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<RootLayout />} >
        <Route index element={<Home />}/>
        <Route path='chatbot' element={<Chatbot />}/>
        <Route path='bmi' element={<BMI />}/>
        <Route path='nutrition' element={<Nutrition />}/>
        <Route path='*' element={<NotFound />}/>
      </Route>
    )
  )

  return (
   <RouterProvider router = {router}/>
  )
}

export default App
