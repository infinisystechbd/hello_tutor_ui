import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faCog, faComments, faHeart, faDashboard, faUser, faUserGroup, faGear, faSync } from '@fortawesome/free-solid-svg-icons';
import { faWpforms } from '@fortawesome/free-brands-svg-icons';

const BottomNavigation = () => {
    return (
        <div className="fixed inset-x-0 bottom-0 bg-white dark:bg-boxdark-2 shadow-lg block md:hidden">
            <div className="flex justify-around items-center h-14">
                <button className="focus:text-indigo-500 focus:outline-none">
                    <FontAwesomeIcon icon={faDashboard} className="h-6 w-6" />
                </button>
                <button className="focus:text-indigo-500 focus:outline-none">
                    <FontAwesomeIcon icon={faUser} className="h-6 w-6" />
                </button>
                <button className="focus:text-indigo-500 focus:outline-none">
                    <FontAwesomeIcon icon={faWpforms} className="h-6 w-6" />
                </button>
                <button className="focus:text-indigo-500 focus:outline-none">
                    <FontAwesomeIcon icon={faUserGroup} className="h-6 w-6" />
                </button>
                <button className="focus:text-indigo-500 focus:outline-none">
                    <FontAwesomeIcon icon={faSync} className="h-6 w-6" />
                </button>
                <button className="focus:text-indigo-500 focus:outline-none">
                    <FontAwesomeIcon icon={faGear} className="h-6 w-6" />
                </button>
            </div>
        </div>
    );
};

export default BottomNavigation;
