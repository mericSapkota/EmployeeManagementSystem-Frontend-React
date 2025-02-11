
import './App.css'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import 'bootstrap/dist/js/bootstrap.bundle.min';
import ListEmployee from './components/admin/ListEmployee'
import Header from './components/Header'
import {BrowserRouter, Routes , Route} from 'react-router-dom'
import Footer from './components/Footer';
import EmployeeComponent from './components/admin/EmployeeComponent';
import AdminPanel from './components/admin/AdminPanel';
import { useState } from 'react';

import ListLeave from './components/admin/ListLeave';
import LeaveComponent from './components/user/LeaveComponent';


function App() {
  const [navOn,setNavOn]=useState(false);
  const showNavBar= ()=>{
    console.log(navOn);
    const navbar = document.querySelector('.sidebar');
    navbar.classList.toggle('d-none');
    
    setNavOn(!navOn);
  }

  

  return (
    <>
    <BrowserRouter>
      <Header showNavBar={showNavBar}/>
      <Routes>
        <Route path='/' element={<AdminPanel  showNavBar={showNavBar}/>} > </Route>
        <Route path="/list-employee" element={<ListEmployee showNavBar={showNavBar}/>}></Route>
        <Route path='/add-employee' element={<EmployeeComponent />} ></Route>
        <Route path='/update-employee/:id' element={<EmployeeComponent/>}></Route>
        <Route path="/list-leave" element={<ListLeave  showNavBar={showNavBar}/>}></Route>
        <Route path='/add-leave' element={<LeaveComponent/>}></Route>
      </Routes>
      <Footer/>
    </BrowserRouter>
    </>
  )
}

export default App;
