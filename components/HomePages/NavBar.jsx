import React from 'react';
import { FaPlus } from 'react-icons/fa';

const NavBar = () => {
  const navItems = [
    { item: 'Sign In', link: '/sign' },
    { item: 'Job Board', link: '/jobboard' },
  ];

  return (
    <div className="container mx-auto px-5">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <a className="navbar-brand text-xl font-bold">Hello Tutor</a>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            {navItems.map((navItem, index) => (
              <li key={index} className="nav-item">
                <a href={navItem.link} className="nav-link uppercase font-semibold">
                  {navItem.item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="navbar-end">
          <a href="#" className="btn btn-success text-white">
            <FaPlus /> Become a Tutor
          </a>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
