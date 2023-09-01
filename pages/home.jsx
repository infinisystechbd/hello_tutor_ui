import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone,faGooglePlay ,faAppStoreIos, faFacebook, faYoutube, faLinkedin, faInstagram,faInstagramSquare, faGraduationCap, faPersonChalkboard, faUsers, faChalkboardUser, faBrain, faArrowRight, faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { Carousel, Col, Container, Row } from 'react-bootstrap';
const Home = () => {


  return (




    <>

      <>
        {/* <div className="sticky-top"> */}
        <div >
          <div className="bg-primary text-white mt-20 py-2">
            <div className="container">
              <div className="d-flex justify-content-between max-w-6xl mx-auto">
                <div className="">
                  <p>
                    <FontAwesomeIcon icon={faPhone} />{" "}
                    <span className="font-weight-semibold">+88 09613 441122</span>
                  </p>
                </div>
                <div className="d-flex space-4 text-xl">
                  <FontAwesomeIcon icon={faFacebook} />
                  <FontAwesomeIcon icon={faYoutube} />
                  <FontAwesomeIcon icon={faLinkedin} />
                  <FontAwesomeIcon icon={faInstagram} />
                </div>
              </div>
            </div>
          </div>
          <nav className="py-4 bg-light">
            <div className="container d-flex justify-content-between max-w-6xl mx-auto">
              <div>
                <h1 className="h2 font-weight-bold text-primary">Hellotutors</h1>
              </div>
              <div className="d-flex space-4">
                <button className="btn btn-link text-primary">Sign In</button>
                <button className="btn btn-link text-primary">Job Board</button>
                <button className="btn btn-primary rounded-md font-weight-semibold">
                  Become a Tutor
                </button>
              </div>
            </div>
          </nav>
        </div>






        <div className="banner max-w-6xl mx-auto mb-36 relative">
          <div className="flex justify-between items-center ">
            <div className="mt-14">
              <h1 className="display-3 font-weight-bold py-4">
                Hire the Right Tutor Today
              </h1>
              <p className="lead py-2 font-weight-medium">
                Book one-on-one lessons with verified tutors in your area
              </p>
              <div>
                <button className="btn btn-primary btn-lg rounded-md border-0">
                  Hire a Tutor (Its Free!)
                </button>
              </div>
              <p className="small py-2">
                Want to become a Tutor?{" "}
                <span className="text-primary font-weight-medium">
                  <a href="#">Sign Up</a>
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








          <div className=" rounded-3xl py-12 mt-10 "  style={{ backgroundColor: '#0675c1' }}>
            <div className="container">
              <div className="row">
                <div className="col-md-3 col-sm-6 mb-4">
                  <div className="d-flex align-items-center space-4 ">

                    <div>
                      <FontAwesomeIcon icon={faGraduationCap} className="text-6xl text-white" />
                    </div>
                    <div>
                      <h1 class="text-4xl text-white">2913385</h1>
                      <p class="text-white">Active Tutors</p>
                    </div>


                  </div>
                </div>
                <div className="col-md-3 col-sm-6 mb-4">
                  <div className="d-flex align-items-center space-4 ">

                    <div>
                      <FontAwesomeIcon icon={faGraduationCap} className="text-6xl text-white" />
                    </div>
                    <div>
                      <h1 className="text-4xl text-white">2913385</h1>
                      <p className="text-white">Active Tutors</p>
                    </div>


                  </div>
                </div>
                <div className="col-md-3 col-sm-6 mb-4">
                  <div className="d-flex align-items-center space-4 ">

                    <div>
                      <FontAwesomeIcon icon={faGraduationCap} className="text-6xl text-white" />
                    </div>
                    <div>
                      <h1 className="text-4xl text-white">2913385</h1>
                      <p className="text-white">Active Tutors</p>
                    </div>


                  </div>
                </div>

                <div className="col-md-3 col-sm-6 mb-4">
                  <div className="d-flex align-items-center space-4 ">

                    <div>
                      <FontAwesomeIcon icon={faGraduationCap} className="text-6xl text-white" />
                    </div>
                    <div>
                      <h1 className="text-4xl text-white">2913385</h1>
                      <p className="text-white">Active Tutors</p>
                    </div>


                  </div>
                </div>


              </div>
            </div>
            <div className    ="d-flex justify-between align-items-center p-4 pt-12">
              <div>
                <h1 className    ="text-white">Live Tuition Jobs</h1>
              </div>
              <div className    ="w-4/5">

                <Carousel>
                  <Carousel.Item>

                    <div className="container">
                      <div className="row">
                        <div className="col-md-4">
                          <button className="btn btn-outline-white rounded-xl py-2 w-100 border border-white text-white">
                            Riyadh (2)
                          </button>
                        </div>


                        <div className="col-md-4">
                          <button className="btn btn-outline-white rounded-xl py-2 w-100 border border-white text-white">
                            Riyadh (2)
                          </button>
                        </div>

                        <div className="col-md-4">
                          <button className="btn btn-outline-white rounded-xl py-2 w-100 border border-white text-white">
                            Riyadh (2)
                          </button>
                        </div>

                      </div>
                    </div>

                  </Carousel.Item>

                  <Carousel.Item>

                    <div className="container">
                      <div className="row">
                        <div className="col-md-4">
                          <button className="btn btn-outline-white rounded-xl py-2 w-100 border border-white text-white">
                            Riyadh (2)
                          </button>
                        </div>
                        <div className="col-md-4">
                          <button className="btn btn-outline-white rounded-xl py-2 w-100 border border-white text-white">
                            Riyadh (2)
                          </button>
                        </div>
                        <div className="col-md-4">
                          <button className="btn btn-outline-white rounded-xl py-2 w-100 border border-white text-white">
                            Riyadh (2)
                          </button>
                        </div>
                      </div>
                    </div>

                  </Carousel.Item>

                </Carousel>
              </div>
            </div>
          </div>

        </div>
      </>

      <section className="tution-type">
        <div className="bg-[#f2f5fc]">
          <div className="content max-w-6xl mx-auto ">
            <h1 className="text-center text-black text-5xl font-semibold">
              Tuition Types
            </h1>
            <div className="grid grid-cols-2 gap-4 pt-12">
              <div className="d-flex align-items-center p-4 gap-4 border border-primary rounded-md hover-bg-white hover-border-2">

                <FontAwesomeIcon icon={faPersonChalkboard} className="text-7xl" />
                <div>
                  <h1 className="text-2xl font-semibold text-primary">
                    Home Tutoring
                  </h1>
                  <p className="text-gray-500">
                    Home tutoring allows students to learn various subjects in
                    their own home.{" "}
                  </p>
                </div>
              </div>
              <div className="d-flex align-items-center p-4 gap-4 border border-primary rounded-md hover-bg-white hover-border-2">

                <FontAwesomeIcon icon={faUsers} className="text-7xl" />
                <div>
                  <h1 className="text-2xl font-semibold text-primary">
                    Group Tutoring
                  </h1>
                  <p className="text-gray-500">
                    Group tutoring allows students to learn together and solve
                    problems at an affordable cost.{" "}
                  </p>
                </div>
              </div>
              <div className="d-flex align-items-center p-4 gap-4 border border-primary rounded-md hover-bg-white hover-border-2">
                <FontAwesomeIcon icon={faChalkboardUser} className="text-7xl" />
                <div>
                  <h1 className="text-2xl font-semibold text-primary">
                    Online Tutoring
                  </h1>
                  <p className="text-gray-500">
                    Find the best tutors from anywhere and take online classes by
                    using tools such as Google Meet, Zoom, Skype, and more.{" "}
                  </p>
                </div>
              </div>
              <div className="d-flex align-items-center p-4 gap-4 border border-primary rounded-md hover-bg-white hover-border-2">
                <FontAwesomeIcon icon={faBrain} className="text-7xl" />
                <div>
                  <h1 className="text-2xl font-semibold text-primary">
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
          <div className="d-flex gap-4 align-items-center border border-primary max-w-2xl p-4 mt-8 rounded-xl shadow-lg shadow-blue">
            <img
              className="w-56"
              src="https://resumekraft.com/wp-content/uploads/2023/08/CV-Maker.png"
              alt=""
              srcSet=""
            />
            <div>
              <h1 className="text-2xl text-primary font-semibold">1</h1>
              <p className="text-secondary">
                Fill out all the required fields and submit your request.
              </p>
            </div>
          </div>
          <div className="border border-primary max-w-2xl mt-8 rounded-xl ml-auto shadow-lg shadow-blue">
            <div className="d-flex gap-4 align-items-center p-4">
              <img
                className="w-56"
                src="https://resumekraft.com/wp-content/uploads/2023/08/CV-Maker.png"
                alt=""
                srcSet=""
              />
              <div>
                <h1 className="text-2xl text-primary font-semibold">2</h1>
                <p className="text-secondary">
                  Fill out all the required fields and submit your request.
                </p>
              </div>
            </div>
          </div>
          <div className="border border-primary max-w-2xl mt-8 rounded-xl shadow-lg shadow-blue">
            <div className="d-flex gap-4 align-items-center p-4">
              <img
                className="w-56"
                src="https://resumekraft.com/wp-content/uploads/2023/08/CV-Maker.png"
                alt=""
                srcSet=""
              />
              <div>
                <h1 className="text-2xl text-primary font-semibold">3</h1>
                <p className="text-secondary">
                  Fill out all the required fields and submit your request.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="serving-category-container">
        <div className="bg-light">
          <div className="content container max-w-6xl mx-auto py-12">
            <h1 className="text-5xl font-weight-bold text-center pb-4">
              Serving Categories
            </h1>
            <Carousel>
              <Carousel.Item>
                <Container fluid>
                  <Row className="grid-cols-4 gap-12">
                    {/* Add your carousel items here */}
                    <Col>
                      <div className="bg-white items-center rounded-md p-2 shadow-xl">
                        <div className="w-56 h-64 relative">
                          <img
                            className="w-100 absolute my-auto"
                            src="https://img.freepik.com/premium-vector/islamic-character-reading-quran-koran_188398-38.jpg"
                            alt=""
                          />
                        </div>
                        <div>
                          <h1 className="text-center font-medium">Religious Studies</h1>
                        </div>
                      </div>
                    </Col>

                    <Col>
                      <div className="bg-white items-center rounded-md p-2 shadow-xl">
                        <div className="w-56 h-64 relative">
                          <img
                            className="w-100 absolute my-auto"
                            src="https://img.freepik.com/premium-vector/islamic-character-reading-quran-koran_188398-38.jpg"
                            alt=""
                          />
                        </div>
                        <div>
                          <h1 className="text-center font-medium">Religious Studies</h1>
                        </div>
                      </div>
                    </Col>


                    <Col>
                      <div className="bg-white items-center rounded-md p-2 shadow-xl">
                        <div className="w-56 h-64 relative">
                          <img
                            className="w-100 absolute my-auto"
                            src="https://img.freepik.com/premium-vector/islamic-character-reading-quran-koran_188398-38.jpg"
                            alt=""
                          />
                        </div>
                        <div>
                          <h1 className="text-center font-medium">Religious Studies</h1>
                        </div>
                      </div>
                    </Col>


                    {/* Repeat this structure for other carousel items */}
                  </Row>
                </Container>
              </Carousel.Item>

              <Carousel.Item>
                <Container fluid>
                  <Row className="grid-cols-4 gap-12">
                    {/* Add your carousel items here */}
                    <Col>
                      <div className="bg-white items-center rounded-md p-2 shadow-xl">
                        <div className="w-56 h-64 relative">
                          <img
                            className="w-100 absolute my-auto"
                            src="https://img.freepik.com/premium-vector/islamic-character-reading-quran-koran_188398-38.jpg"
                            alt=""
                          />
                        </div>
                        <div>
                          <h1 className="text-center font-medium">Religious Studies</h1>
                        </div>
                      </div>
                    </Col>

                    <Col>
                      <div className="bg-white items-center rounded-md p-2 shadow-xl">
                        <div className="w-56 h-64 relative">
                          <img
                            className="w-100 absolute my-auto"
                            src="https://img.freepik.com/premium-vector/islamic-character-reading-quran-koran_188398-38.jpg"
                            alt=""
                          />
                        </div>
                        <div>
                          <h1 className="text-center font-medium">Religious Studies</h1>
                        </div>
                      </div>
                    </Col>
                    <Col>
                      <div className="bg-white items-center rounded-md p-2 shadow-xl">
                        <div className="w-56 h-64 relative">
                          <img
                            className="w-100 absolute my-auto"
                            src="https://img.freepik.com/premium-vector/islamic-character-reading-quran-koran_188398-38.jpg"
                            alt=""
                          />
                        </div>
                        <div>
                          <h1 className="text-center font-medium">Religious Studies</h1>
                        </div>
                      </div>
                    </Col>

                    {/* Repeat this structure for other carousel items */}
                  </Row>
                </Container>
              </Carousel.Item>



              <Carousel.Item>
                <Container fluid>
                  <Row className="grid-cols-4 gap-12">
                    {/* Add your carousel items here */}
                    <Col>
                      <div className="bg-white items-center rounded-md p-2 shadow-xl">
                        <div className="w-56 h-64 relative">
                          <img
                            className="w-100 absolute my-auto"
                            src="https://img.freepik.com/premium-vector/islamic-character-reading-quran-koran_188398-38.jpg"
                            alt=""
                          />
                        </div>
                        <div>
                          <h1 className="text-center font-medium">Religious Studies</h1>
                        </div>
                      </div>
                    </Col>

                    <Col>
                      <div className="bg-white items-center rounded-md p-2 shadow-xl">
                        <div className="w-56 h-64 relative">
                          <img
                            className="w-100 absolute my-auto"
                            src="https://img.freepik.com/premium-vector/islamic-character-reading-quran-koran_188398-38.jpg"
                            alt=""
                          />
                        </div>
                        <div>
                          <h1 className="text-center font-medium">Religious Studies</h1>
                        </div>
                      </div>
                    </Col>

                    <Col>
                      <div className="bg-white items-center rounded-md p-2 shadow-xl">
                        <div className="w-56 h-64 relative">
                          <img
                            className="w-100 absolute my-auto"
                            src="https://img.freepik.com/premium-vector/islamic-character-reading-quran-koran_188398-38.jpg"
                            alt=""
                          />
                        </div>
                        <div>
                          <h1 className="text-center font-medium">Religious Studies</h1>
                        </div>
                      </div>
                    </Col>



                    {/* Repeat this structure for other carousel items */}
                  </Row>
                </Container>
              </Carousel.Item>
              {/* Add more Carousel.Item elements for other sets of items */}
            </Carousel>
          </div>
        </div>
      </section>




      <section className="what-gurdia-say-about-us max-w-6xl mx-auto text-center mt-10">
    <div className="space-y-4">
        <h1 className="text-4xl font-weight-bold">
            What Some Awesome Guardian/Student Says about Us
        </h1>
        <p className="text-secondary">Hire a tutor today and start learning!</p>
        <button className="btn btn-primary px-4 py-2 rounded-md font-weight-bold">
            Hire a Tutor
            <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
        </button>
    </div>
</section>


      <footer className=" mt-12" style={{ backgroundColor: '#0675c1' }}>
        <div className="max-w-6xl mx-auto pt-8">
          <div className="header grid grid-cols-4 pb-8 space-x-4">
            <div>
              <h1 className="text-2xl font-bold text-white">Caretutors</h1>
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
                Caretutors was founded in 2012. It is Bangladeshs first, most
                trusted and leading online platform for guardians, students, and
                tutors to hire verified tutors or find tuition jobs in 13 different
                categories from anywhere in the country.
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
                <a href="">Caretutors Merchant</a>
              </p>
            </div>
            <div>
              <p>
                <a href="">
                  <span>
                  <FontAwesomeIcon icon={faFacebook} className="text-7xl" />
                  </span>{" "}
                  Facebook
                </a>
              </p>
              <p>
                <a href="">
                  <span>
                  <FontAwesomeIcon icon={faYoutube} className="text-7xl" />
                  </span>{" "}
                  Youtube
                </a>
              </p>
              <p>
                <a href="">
                  <span>
                  <FontAwesomeIcon icon={faLinkedin} className="text-7xl" />
                  </span>{" "}
                  Linkedin
                </a>
              </p>
              <p>
                <a href="">
                  <span>
                  <FontAwesomeIcon icon={faInstagramSquare} className="text-7xl" />
                  </span>{" "}
                  Instagram
                </a>
              </p>
              <p className="font-bold">Join Our Community</p>
              <div className="grid grid-cols-2 gap-2 justify-between">
                <div className="bg-black flex items-center pt-0 pb-1 px-2 space-x-2 rounded-lg">
                <FontAwesomeIcon icon={faUserGroup} className="text-[#fbb040]" />
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
                  Flat: 3A, House: 26, Alaol Avenue, Sector 6, Uttara, Dhaka 1230,
                  Bangladesh.
                </p>
                <h1 className="font-bold pt-6">Download Our App</h1>
                <div className="grid grid-cols-2 gap-2 justify-between">
                  <div className="bg-black flex items-center pt-0 pb-1 px-2 space-x-2 rounded-lg">
                    
                    <FontAwesomeIcon icon={faGooglePlay} />
                    <div>
                      <h1 className="text-xs">GET IT ON</h1>
                      <h2 className="text-xs font-semibold">Google Play</h2>
                    </div>
                  </div>
                  <div className="bg-black flex items-center pt-0 pb-1 px-2 space-x-2 rounded-lg">
                         {/* <i className="fa-brands fa-app-store-ios" /> */}
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
              Copyright © 2012-2023 Caretutors Technologies Ltd. All Rights
              Reserved.
            </p>
            <p className="font-bold">Web App Version: 4.13.17</p>
          </div>
        </div>
      </footer>
    </>


  )
}

export default Home