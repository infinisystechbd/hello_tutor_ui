import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faGooglePlay, faAppStoreIos, faFacebook, faYoutube, faLinkedin, faInstagram, faInstagramSquare, faGraduationCap, faPersonChalkboard, faUsers, faChalkboardUser, faBrain, faArrowRight, faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { Carousel, Col, Container, Row } from 'react-bootstrap';
import Footer from '../components/HomePages/Footer';
import { IoIosContact } from 'react-icons/io';
import { MdOutlineContactPage } from 'react-icons/md';
import { IoIosSearch } from 'react-icons/io';
import { IoIosSend } from 'react-icons/io';
const Home = () => {



  const processes = [
    { img: <IoIosContact />, title: 'Create an Account' },
    { img: <MdOutlineContactPage />, title: 'CV/Resume' },
    { img: <IoIosSearch />, title: 'Find Your Job' },
    { img: <IoIosSend />, title: 'Save & Apply' },
  ];


  return (




    <>

      <>
        {/* <div className="sticky-top"> */}



        <div className="banner max-w-6xl mx-auto mb-15 relative">
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


        </div>
      </>

      <section className="tution-type">
        <div className="bg-[#f2f5fc]">
          <div className="content max-w-6xl mx-auto ">
            <h1 className="text-center text-black text-5xl font-semibold">
            Tuition Category
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



      {/* How does it work for guardians/students? */}


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


      <Footer />
    </>


  )
}

export default Home