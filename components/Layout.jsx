import React from 'react'
import LeftSidebar from './LeftSidebar'
import Navbar from './NavBar'
import Footer from './Footer'
import Customizer from './Customizer'

const Layout = ({children}) => {
  return (
    <>
     <div id="main-wrapper">
      <Navbar/>
        <LeftSidebar/>

        <div className="page-wrapper">
        {children}
        <Footer/>
        </div>
     </div>

     <div>
        <Customizer />
        <div className="chat-windows" />
        </div>
    
    </>
  )
}

export default Layout