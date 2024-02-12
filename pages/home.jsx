// components/HomePage.js
import React, { useEffect, useState } from 'react';
import { Carousel } from "@material-tailwind/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAppStoreIos, faFacebook, faGooglePlay, faInstagram, faLinkedin, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faBrain, faChalkboardUser, faGraduationCap, faPersonChalkboard, faUserGroup, faUsersRectangle } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faFacebook } from '@fortawesome/free-brands-svg-icons'; 

const HomePage = () => {
  const items = [
    { title: 'Religious Studies', imageUrl: 'https://img.freepik.com/premium-vector/islamic-character-reading-quran-koran_188398-38.jpg' },
    { title: 'Science', imageUrl: 'https://img.freepik.com/premium-vector/islamic-character-reading-quran-koran_188398-38.jpg' },
    { title: 'Mathematics', imageUrl: 'https://img.freepik.com/premium-vector/islamic-character-reading-quran-koran_188398-38.jpg' },
    { title: 'Religious Studies', imageUrl: 'https://img.freepik.com/premium-vector/islamic-character-reading-quran-koran_188398-38.jpg' },
    { title: 'Science', imageUrl: 'https://img.freepik.com/premium-vector/islamic-character-reading-quran-koran_188398-38.jpg' },
    { title: 'Mathematics', imageUrl: 'https://img.freepik.com/premium-vector/islamic-character-reading-quran-koran_188398-38.jpg' },
    { title: 'Religious Studies', imageUrl: 'https://img.freepik.com/premium-vector/islamic-character-reading-quran-koran_188398-38.jpg' },
    { title: 'Science', imageUrl: 'https://img.freepik.com/premium-vector/islamic-character-reading-quran-koran_188398-38.jpg' },
    { title: 'Mathematics', imageUrl: 'https://img.freepik.com/premium-vector/islamic-character-reading-quran-koran_188398-38.jpg' }
    // Add more items as needed
  ];



  const data = [
    { count: '2913385', description: 'Active Tutors' },
    { count: '2913385', description: 'Active Tutors' },
    { count: '2913385', description: 'Active Tutors' },
    { count: '2913385', description: 'Active Tutors' }
  ];
  const chunkSize = 3;
  const chunkedItems = items.reduce((resultArray, item, index) => {
    const chunkIndex = Math.floor(index / chunkSize);
    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = [];
    }
    resultArray[chunkIndex].push(item);
    return resultArray;
  }, []);

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(current => (current === chunkedItems.length - 1 ? 0 : current + 1));
    }, 3000); // Change slide every 3 seconds (adjust as needed)

    return () => clearInterval(interval);
  }, []);



  return (
    <div>
      <header>
        {/* <div className="nav-container sticky">
          <div className="bg-[#0675C1] text-white py-2">
            <div className="flex justify-between max-w-6xl mx-auto">
              <div className="">
                <p>
                  {" "}
                  <i className="fa-solid fa-phone" />{" "}
                  <span className="font-semibold">+88 09613 441122</span>
                </p>
              </div>
              <div className="space-x-4 text-xl">
                <FontAwesomeIcon icon={faFacebook} />
                <FontAwesomeIcon icon={faYoutube} />
                <FontAwesomeIcon icon={faLinkedin} />
                <FontAwesomeIcon icon={faInstagram} />
                <i className="fa-brands fa-square-instagram" />
              </div>
            </div>
          </div>
          <nav className=" py-4 bg-[#f2f5fc]">
            <div className="flex justify-between max-w-6xl mx-auto">
              <div>
                <h1 className="text-2xl font-bold text-[#0675C1]">Hello Tutors</h1>
              </div>
              <div className="space-x-4 ">
                <button className="hover:text-[#0675C1]">Sign In</button>
                <button className="hover:text-[#0675C1]">Job Board</button>
                <button className="bg-[#0675C1] text-white p-2 rounded-md font-semibold border border-[#0675C1] hover:bg-inherit hover:text-[#0675C1] hover:border border-[#0675C1] duration-300 font-sm">
                  Become a Tutor
                </button>
              </div>
            </div>
          </nav>
        </div> */}


        <div className="banner max-w-6xl mx-auto mb-20 relative">
          <div className="flex justify-between items-center ">
            <div className="mt-14">
              <h1 className="text-5xl font-semibold py-4">
                Hire the Right Tutor Today
              </h1>
              <p className="text-2xl py-2 font-medium">
                Book one-on-one lessons with verified tutors in your area
              </p>
              <div>
                <button className="bg-[#0675C1] text-white p-2 rounded-md font-semibold border border-[#0675C1] hover:bg-inherit hover:text-[#0675C1] hover:border border-[#0675C1] duration-300 font-sm">
                  Hire a Tutor (Its Free!)
                </button>
              </div>
              <p className="text-sm py-2">
                Want to become a Tutor?{" "}
                <span className="text-[#0675C1] font-medium">
                  <a href="">Sign Up</a>
                </span>{" "}
                now
              </p>
            </div>
            <div>
              <img
                className=""
                src="https://png.pngtree.com/png-vector/20220630/ourmid/pngtree-online-tutor-abstract-concept-vector-illustration-png-image_5644395.png"
                alt=""
                srcSet=""
              />
            </div>
          </div>



          {/* <div className="bg-[#0675C1] rounded-3xl py-8">
      <div className="grid grid-cols-4 justify-between w-6xl mx-auto">
        {data.map((item, index) => (
          <div key={index} className="flex items-center space-x-4 justify-center">
            <div>
              <FontAwesomeIcon icon={faGraduationCap} style={{ fontSize: '6xl', color: 'white' }} />
            </div>
            <div>
              <h1 className="text-4xl text-white">{item.count}</h1>
              <p className="text-white">{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center p-4 pt-12">
        <div>
          <h1 className="text-white">Live Tuition Jobs</h1>
        </div>
        <div className="w-4/5">
          <div className="carousel w-full">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} id={`slide${index + 1}`} className="carousel-item relative w-full">
                <div className="w-full grid grid-cols-3 gap-4 justify-between px-20">
                  {Array.from({ length: 3 }).map((_, idx) => (
                    <button key={idx} className="text-white bg-none border border-white rounded-xl py-2">
                      Riyadh (2)
                    </button>
                  ))}
                </div>
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                  <a href={`#slide${index === 0 ? 4 : index}`} className="text-2xl text-white">❮</a>
                  <a href={`#slide${index === 3 ? 1 : index + 2}`} className="text-2xl text-white">❯</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div> */}


        </div>

      </header>
      <main className="">
        <section className="tution-type">
          <div className="bg-[#f2f5fc]">
            <div className="content max-w-6xl mx-auto pb-24">
              <h1 className="text-center text-black text-5xl font-semibold">
                Tuition Types
              </h1>
              <div className="grid grid-cols-2 gap-4 pt-12">
                <div className="flex items-center p-4 space-x-4 border border-[#0675C1] rounded-md hover:bg-white hover:border-2">
                  <FontAwesomeIcon icon={faPersonChalkboard} className="text-7xl" />                  <div>
                    <h1 className="text-2xl font-semibold text-[#0675C1]">
                      Home Tutoring
                    </h1>
                    <p className="text-gray-500">
                      Home tutoring allows students to learn various subjects in their
                      own home.{" "}
                    </p>
                  </div>
                </div>
                <div className="flex items-center p-4 space-x-4 border border-[#0675C1] rounded-md hover:bg-white hover:border-2">
                  <FontAwesomeIcon icon={faUsersRectangle} className="text-7xl" />
                  <div>
                    <h1 className="text-2xl font-semibold text-[#0675C1]">
                      Group Tutoring
                    </h1>
                    <p className="text-gray-500">
                      Group tutoring allows students to learn together and solve
                      problems at an affordable cost.{" "}
                    </p>
                  </div>
                </div>
                <div className="flex items-center p-4 space-x-4 border border-[#0675C1] rounded-md hover:bg-white hover:border-2">
                  <FontAwesomeIcon icon={faChalkboardUser} className="text-7xl" />
                  <div>
                    <h1 className="text-2xl font-semibold text-[#0675C1]">
                      Online Tutoring
                    </h1>
                    <p className="text-gray-500">
                      Find the best tutors from anywhere and take online classes by
                      using tools such as Google Meet, Zoom, Skype, and more.{" "}
                    </p>
                  </div>
                </div>
                <div className="flex items-center p-4 space-x-4 border border-[#0675C1] rounded-md hover:bg-white hover:border-2">
                  <FontAwesomeIcon icon={faBrain} className="text-7xl" />                  <div>
                    <h1 className="text-2xl font-semibold text-[#0675C1]">
                      Package Tutoring
                    </h1>
                    <p className="text-gray-500">
                      Package tutoring helps a students to complete their studies
                      within a specific time frame.{" "}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="how-it-works-for-gurdian">
          <div className="how-it-works py-12 max-w-6xl mx-auto">
            <h1 className="text-5xl font-medium text-center">
              How does it work for guardians/students?
            </h1>
            <div className="flex gap-4 items-center border border-[#0675C1] max-w-2xl p-4 mt-8 rounded-xl shadow-lg shadow-blue-500/50">
              <img
                className="w-56"
                src="https://resumekraft.com/wp-content/uploads/2023/08/CV-Maker.png"
                alt=""
                srcSet=""
              />
              <div>
                <h1 className="text-2xl text-[#0675C1] font-semibold">1</h1>
                <p className="text-gray-500">
                  Fill out all the required fields and submit your request.
                </p>
              </div>
            </div>
            <div className="border border-[#0675C1] max-w-2xl mt-8 rounded-xl ml-auto shadow-lg shadow-blue-500/50">
              <div className="flex gap-4 items-center p-4">
                <img
                  className="w-56"
                  src="https://resumekraft.com/wp-content/uploads/2023/08/CV-Maker.png"
                  alt=""
                  srcSet=""
                />
                <div>
                  <h1 className="text-2xl text-[#0675C1] font-semibold">2</h1>
                  <p className="text-gray-500">
                    Fill out all the required fields and submit your request.
                  </p>
                </div>
              </div>
            </div>
            <div className="border border-[#0675C1] max-w-2xl mt-8 rounded-xl shadow-lg shadow-blue-500/50">
              <div className="flex gap-4 items-center p-4">
                <img
                  className="w-56"
                  src="https://resumekraft.com/wp-content/uploads/2023/08/CV-Maker.png"
                  alt=""
                  srcSet=""
                />
                <div>
                  <h1 className="text-2xl text-[#0675C1] font-semibold">3</h1>
                  <p className="text-gray-500">
                    Fill out all the required fields and submit your request.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="serving-category-container">
          <div className="bg-[#f2f5fc]">
            <div className="content max-w-6xl mx-auto py-12">
              <h1 className="text-5xl font-semibold text-center pb-12">
                Serving Categories
              </h1>
              <Carousel
                className="rounded-xl"
                index={currentSlide}
                transition={{ duration: 2 }}
                controls
                arrowColor="black"
              >
                {chunkedItems.map((chunk, index) => (
                  <div key={index} className="grid grid-cols-3 gap-4">
                    {chunk.map((item, idx) => (
                      <div key={idx} className="bg-white items-center rounded-md p-2 shadow-xl">
                        <div className="w-56 h-64 relative">
                          <img
                            src={item.imageUrl}
                            alt={item.title}
                            className="w-56 absolute my-auto"
                          />
                        </div>
                        <div>
                          <h1 className="text-center font-medium">{item.title}</h1>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </Carousel>
            </div>
          </div>
        </section>
        <section className="what-gurdia-say-about-us max-w-6xl mx-auto text-center">
          <div className="space-y-4">
            <h1 className="text-4xl font-semibold ">
              What Some Awesome Guardian/Student Says about Us
            </h1>
            <p className="text-gray-500">Hire a tutor today and start learning!</p>
            <button className="bg-[#0675C1] text-white items-center px-12 py-2 rounded-md font-semibold border border-[#0675C1] hover:bg-inherit hover:text-[#0675C1] hover:border border-[#0675C1] duration-300 font-sm">
              Hire a Tutor{" "}
              <span className="items-center">
                <i className="fa-solid fa-arrow-right" />
              </span>
            </button>
          </div>
        </section>
      </main>
      <footer className="bg-[#0675C1] mt-12">
        <div className="max-w-6xl mx-auto pt-8">
          <div className="header grid grid-cols-4 pb-8 space-x-4">
            <div>
              <h1 className="text-2xl font-bold text-white">Hello Tutors</h1>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Useful Links</h1>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Social</h1>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Office Address</h1>
            </div>
          </div>
          <div className="grid grid-cols-4 text-white space-x-4">
            <div>
              <p>
                Hello Tutors w. It is Bangladeshs first, most trusted
                and leading online platform for guardians, students, and tutors to
                hire verified tutors or find tuition jobs in 13 different categories
                from anywhere in the country.
              </p>
            </div>
            <div>
              <p>
                <a href="">Terms and Conditions</a>
              </p>
              <p>
                <a href="">Become a Tutor</a>
              </p>
              <p>
                <a href="">Hire a Tutor</a>
              </p>
              <p>
                <a href="">Tutorials</a>
              </p>
              <p>
                <a href="">FAQ</a>
              </p>
              <p>
                <a href="">Hello Tutors Merchant</a>
              </p>
            </div>
            <div>
              <p>
                <a href="">
                  <span>
                    <FontAwesomeIcon icon={faFacebook} />
                  </span>{" "}
                  Facebook
                </a>
              </p>
              <p>
                <a href="">
                  <span>
                    <FontAwesomeIcon icon={faYoutube} />
                  </span>{" "}
                  Youtube
                </a>
              </p>
              <p>
                <a href="">
                  <span>
                    <FontAwesomeIcon icon={faLinkedin} />
                  </span>{" "}
                  Linkedin
                </a>
              </p>
              <p>
                <a href="">
                  <span>
                    <FontAwesomeIcon icon={faInstagram} />
                  </span>{" "}
                  Instagram
                </a>
              </p>
              <p className="font-bold">Join Our Community</p>
              <div className="grid grid-cols-2 gap-2 justify-between">
                <div className="bg-black flex items-center pt-0 pb-1 px-2 space-x-2 rounded-lg">
                  <FontAwesomeIcon icon={faUserGroup} style={{ color: '#fbb040' }} />
                  <div>
                    <h1 className="text-xs">Guardians</h1>
                    <h2 className="text-xs font-semibold">Community</h2>
                  </div>
                </div>
                <div className="bg-black flex items-center pt-0 pb-1 px-2 space-x-2 rounded-lg">
                  <FontAwesomeIcon icon={faUserGroup} style={{ color: '#02ccc0' }} />
                  <div>
                    <h1 className="text-xs">Tutors</h1>
                    <h2 className="text-xs font-semibold">Community</h2>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing , Uttara, Dhaka,
                  Bangladesh.
                </p>
                <h1 className="font-bold pt-6">Download Our App</h1>
                <div className="grid grid-cols-2 gap-2 justify-between">
                  <div className="bg-black flex items-center pt-0 pb-1 px-2 space-x-2 rounded-lg">
                    {/* <i className="fa-brands fa-google-play" /> */}
                    <FontAwesomeIcon icon={faGooglePlay} />

                    <div>
                      <h1 className="text-xs">GET IT ON</h1>
                      <h2 className="text-xs font-semibold">Google Play</h2>
                    </div>
                  </div>
                  <div className="bg-black flex items-center pt-0 pb-1 px-2 space-x-2 rounded-lg">
                    <FontAwesomeIcon icon={faAppStoreIos} />
                    <div>
                      <h1 className="text-xs">Download on</h1>
                      <h2 className="text-xs font-semibold">App Store</h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="py-12 text-white text-center">
            <p className="font-semibold">
              Copyright © 2023-2024 infinisystechbd. All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>


    </div>
  );
};

export default HomePage;
