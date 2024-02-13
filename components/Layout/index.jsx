import React, { useState } from 'react'
import Sidebar from '../Sidebar';
import Header from '../Header';
import Axios from '@/utils/axios';

const Layout = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { http, setToken, token } = Axios();

    const [loading, setLoading] = useState(true);
  return (

      <div className="dark:bg-boxdark-2 dark:text-bodydark">

          <div className="flex h-screen overflow-hidden">
            {/* <!-- ===== Sidebar Start ===== --> */}
            {token !== null && 
            <Sidebar
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
            />}
            {/* <!-- ===== Sidebar End ===== --> */}

            {/* <!-- ===== Content Area Start ===== --> */}
            <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
              {/* <!-- ===== Header Start ===== --> */}
              <Header
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
              />
              {/* <!-- ===== Header End ===== --> */}

              {/* <!-- ===== Main Content Start ===== --> */}
              <main id="mainContainer" className='overflow-y-auto overflow-x-hidden h-[calc(100vh-80px)]'>
                <div className={token ? "mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10" : ""}>
                  {children}
                </div>
              </main>
              {/* <!-- ===== Main Content End ===== --> */}
            </div>
            {/* <!-- ===== Content Area End ===== --> */}
          </div>
       
      </div>

  )
}

export default Layout