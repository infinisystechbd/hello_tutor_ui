import React, { useState } from 'react';
import Sidebar from '../Sidebar';
import Header from '../Header';
import Axios from '@/utils/axios';
import { parseJwt } from '@/helpers/common_Helper';
import BottomNavigation from '../BottomNavigation/BottomNavigation';
// import BottomNavigation from './BottomNavigation';  // Import the new component

const Layout = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { http, setToken, token } = Axios();

    return (
        <div className="dark:bg-boxdark-2 dark:text-bodydark">
            <div className="flex h-screen overflow-hidden">
                {token !== null && <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />}
                <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                    <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                    <main id="mainContainer" className='overflow-y-auto overflow-x-hidden h-[calc(100vh-80px)]'>
                        <div className={token ? "mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10" : ""}>
                            {children}
                        </div>
                    </main>
                    <BottomNavigation />  {/* Add Bottom Navigation here */}
                </div>
            </div>
        </div>
    );
}

export default Layout;
