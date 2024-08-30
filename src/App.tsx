import MyNavbar from './components/layouts/MyNavbar';
import './index.css';
import Routing from './routes/Routing';
import MyFooter from './components/layouts/MyFooter';
import React from 'react';

function App() {
  return (
    <React.Fragment>
      <MyNavbar/> 
      <main className='w-full min-h-screen px-10 py-5 text-slate-500 mt-16'>
        <Routing/>
      </main>
      <MyFooter content="© Revou FSSE Berlin Section - Project Milestone 2 By Galuh Baskoro"/>
    </React.Fragment>
  )
}

export default App
