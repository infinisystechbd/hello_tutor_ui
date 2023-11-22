import React from 'react';
import Image from 'next/image';
import bgimg from '../public/pic_1.jpg';
import { IoIosContact } from 'react-icons/io';
import { MdOutlineContactPage } from 'react-icons/md';
import { IoIosSearch } from 'react-icons/io';
import { IoIosSend } from 'react-icons/io';
// _app.js or _app.tsx
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from '../components/HomePages/NavBar';
import Footer from '../components/HomePages/Footer';

function Home() {
  const tutionCategories = [
    { type: 'Bangla Medium' },
    { type: 'English Medium' },
    { type: 'English Version' },
    { type: 'Madrasha Medium' },
    { type: 'Admission Test' },
    { type: 'Test Preparation' },
  ];

  const processes = [
    { img: <IoIosContact />, title: 'Create an Account' },
    { img: <MdOutlineContactPage />, title: 'CV/Resume' },
    { img: <IoIosSearch />, title: 'Find Your Job' },
    { img: <IoIosSend />, title: 'Save & Apply' },
  ];

  return (
    <div className="">
<div className="d-flex align-items-center justify-content-center mt-6 mb-5" style={{ height: "92vh" }}>
  <img src="/pic_1.jpg" className="img-fluid" alt="Background Image" />
  {/* content */}
  <div className="position-absolute top-0 mt-5 w-100 mb-5" style={{ background: "rgba(0,0,0,0.45)", height: "100%" }}>
    <h1 className="text-7xl mt-5 text-white font-bold mx-auto" style={{ width: "50%" }}>
      Hello Tutor,
      <br /> The Best Tutoring Platform for Home Tutor
    </h1>
  </div>
</div>




      {/* tution type */}
      <div className=" px-32 mx-auto my-20">
      <div className="px-5 py-5 mt-5">
        <h1 className="text-5xl font-bold text-center mb-4">Tuition Category</h1>
        <div className="row row-cols-4 g-3 justify-content-center text-center">
          {tutionCategories.map((category, index) => (
            <div key={index} className={`col btn btn-outline-dark mb-3 ${index !== tutionCategories.length - 1 ? 'me-3' : ''} btn-hover-success`}>
              {category.type}
            </div>
          ))}
        </div>
      </div>
      </div>


      {/* how does it work */}
      <div className="container px-32 mx-auto my-20">
        <h1 className="text-5xl font-bold text-center mb-20">
          How does it work?
        </h1>
        <div className="row justify-content-between">
          {processes.map((process, index) => (
            <div key={index} className="col-md-3 mb-4 d-flex align-items-center justify-content-center">
              <div className="card bg-light shadow-lg">
                <figure className="text-5xl  m-4 text-center">
                  <div className="hover-success">{process.img}</div>
                </figure>
                <div className="card-body text-center">
                  <h2 className="card-title">{process.title}</h2>
                  <p className="card-text">{process.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>


      <Footer/>





    </div>
  );
}

export default Home;
