import React from 'react'
import Link from 'next/link';
const LeftSidebar = () => {
  return (
    <>
      <aside className="left-sidebar">
        <div className="scroll-sidebar">

          <nav className="sidebar-nav">
            <ul id="sidebarnav">
              {/* hrm */}
              <li className={`sidebar-item `}>

                <a
                  className="sidebar-link has-arrow waves-effect waves-dark"
                  href="#" onClick={(e) => e.preventDefault()}
                  aria-expanded="false"
                >
                  <i data-feather="file-text" className="feather-icon" />
                  <span className="hide-menu">HRM</span>
                </a>

                <ul aria-expanded="false" className="collapse first-level">



                  {/* subject */}
                  <li className="sidebar-item">
                    <a
                      className="sidebar-link has-arrow waves-effect waves-dark"
                      href="#" onClick={(e) => e.preventDefault()}
                      aria-expanded="false"
                    >
                      <i className="mdi mdi-dns" />
                      <span className="hide-menu">Subject</span>
                    </a>
                    <ul aria-expanded="false" className="collapse second-level">
                      <li className="sidebar-item">

                        <Link href="/modules/hrm/subject/create">
                          <a className="sidebar-link">
                            <i className="mdi mdi-drawing" />
                            <span className="hide-menu">Add Subject</span>
                          </a>
                        </Link>

                      </li>
                      <li className="sidebar-item">
                        <Link href="/modules/hrm/subject" onClick={(e) => e.preventDefault()}>
                          <a className="sidebar-link">
                            <i className="mdi mdi-drawing" />
                            <span className="hide-menu">All Subject</span>
                          </a>
                          {/* </a> */}
                        </Link>
                      </li>
                    </ul>
                  </li>
                  {/* End subject */}


                  {/* class */}
                  <li className="sidebar-item">
                    <a
                      className="sidebar-link has-arrow waves-effect waves-dark"
                      href="#" onClick={(e) => e.preventDefault()}
                      aria-expanded="false"
                    >
                      <i className="mdi mdi-dns" />
                      <span className="hide-menu">Class</span>
                    </a>
                    <ul aria-expanded="false" className="collapse second-level">
                      <li className="sidebar-item">

                        <Link href="/modules/hrm/class/create">
                          <a className="sidebar-link">
                            <i className="mdi mdi-drawing" />
                            <span className="hide-menu">Add Class</span>
                          </a>
                        </Link>

                      </li>
                      <li className="sidebar-item">

                        <Link href="/modules/hrm/class" onClick={(e) => e.preventDefault()}>
                          <a className="sidebar-link">
                            <i className="mdi mdi-drawing" />
                            <span className="hide-menu">All Classes</span>
                          </a>
                        </Link>

                      </li>
                    </ul>
                  </li>
                  {/* End class */}

                  {/* Categories */}


                  <li className="sidebar-item">
                    <a
                      className="sidebar-link has-arrow waves-effect waves-dark"
                      href="#" onClick={(e) => e.preventDefault()}
                      aria-expanded="false"
                    >
                      <i className="mdi mdi-dns" />
                      <span className="hide-menu">Categories</span>
                    </a>
                    <ul aria-expanded="false" className="collapse second-level">
                      <li className="sidebar-item">

                        <Link href="/modules/hrm/categorie/create">
                          <a className="sidebar-link">
                            <i className="mdi mdi-drawing" />
                            <span className="hide-menu">Add Categorie</span>
                          </a>
                        </Link>

                      </li>
                      <li className="sidebar-item">

                        <Link href="/modules/hrm/categorie" onClick={(e) => e.preventDefault()}>
                          <a className="sidebar-link">
                            <i className="mdi mdi-drawing" />
                            <span className="hide-menu">All Categories</span>
                          </a>
                        </Link>

                      </li>
                    </ul>
                  </li>

                  {/* End Categories */}



                  {/** city */}

                  <li className="sidebar-item">
                    <a
                      className="sidebar-link has-arrow waves-effect waves-dark"
                      href="#" onClick={(e) => e.preventDefault()}
                      aria-expanded="false"
                    >
                      <i className="mdi mdi-dns" />
                      <span className="hide-menu">City</span>
                    </a>
                    <ul aria-expanded="false" className="collapse second-level">
                      <li className="sidebar-item">

                        <Link href="/modules/hrm/city/create">
                          <a className="sidebar-link">
                            <i className="mdi mdi-drawing" />
                            <span className="hide-menu">Add City</span>
                          </a>
                        </Link>

                      </li>
                      <li className="sidebar-item">

                        <Link href="/modules/hrm/city" onClick={(e) => e.preventDefault()}>
                          <a className="sidebar-link">
                            <i className="mdi mdi-drawing" />
                            <span className="hide-menu">All City</span>
                          </a>
                        </Link>

                      </li>
                    </ul>
                  </li>
                  {/*End city*/}


                  {/** Location */}
                  <li className="sidebar-item">
                    <a
                      className="sidebar-link has-arrow waves-effect waves-dark"
                      href="#" onClick={(e) => e.preventDefault()}
                      aria-expanded="false"
                    >
                      <i className="mdi mdi-dns" />
                      <span className="hide-menu">Location</span>
                    </a>
                    <ul aria-expanded="false" className="collapse second-level">
                      <li className="sidebar-item">

                        <Link href="/modules/hrm/location/create">
                          <a className="sidebar-link">
                            <i className="mdi mdi-drawing" />
                            <span className="hide-menu">Add Location</span>
                          </a>
                        </Link>

                      </li>
                      <li className="sidebar-item">

                        <Link href="/modules/hrm/location" onClick={(e) => e.preventDefault()}>
                          <a className="sidebar-link">
                            <i className="mdi mdi-drawing" />
                            <span className="hide-menu">All Location</span>
                          </a>
                        </Link>

                      </li>
                    </ul>
                  </li>

                  {/**End Location */}


                  {/* Guardian */}
                  <li className="sidebar-item">
                    <a
                      className="sidebar-link has-arrow waves-effect waves-dark"
                      href="#" onClick={(e) => e.preventDefault()}
                      aria-expanded="false"
                    >
                      <i className="mdi mdi-dns" />
                      <span className="hide-menu">Guardian</span>
                    </a>
                    <ul aria-expanded="false" className="collapse second-level">
                      <li className="sidebar-item">

                        <Link href="/modules/hrm/guardian/create">
                          <a className="sidebar-link">
                            <i className="mdi mdi-drawing" />
                            <span className="hide-menu">Add Guardian</span>
                          </a>
                        </Link>

                      </li>
                      <li className="sidebar-item">

                        <Link href="/modules/hrm/guardian" onClick={(e) => e.preventDefault()}>
                          <a className="sidebar-link">
                            <i className="mdi mdi-drawing" />
                            <span className="hide-menu">All Guardians</span>
                          </a>
                        </Link>

                      </li>
                    </ul>
                  </li>
                  {/* End Guardian */}


                </ul>
              </li>
              {/* End hrm */}

              {/* hrm modal version */}
              <li className={`sidebar-item `}>

                <a
                  className="sidebar-link has-arrow waves-effect waves-dark"
                  href="#" onClick={(e) => e.preventDefault()}
                  aria-expanded="false"
                >
                  <i data-feather="file-text" className="feather-icon" />
                  <span className="hide-menu">HRM MODAL</span>
                </a>

                <ul aria-expanded="false" className="collapse first-level">



                  {/* subject */}
                  <li className="sidebar-item">
                    <a
                      className="sidebar-link has-arrow waves-effect waves-dark"
                      href="#" onClick={(e) => e.preventDefault()}
                      aria-expanded="false"
                    >
                      <i className="mdi mdi-dns" />
                      <span className="hide-menu">Subject</span>
                    </a>
                    <ul aria-expanded="false" className="collapse second-level">

                      <li className="sidebar-item">
                        <Link href="/modules/hrmModalV/subject" onClick={(e) => e.preventDefault()}>
                          <a className="sidebar-link">
                            <i className="mdi mdi-drawing" />
                            <span className="hide-menu">Subject</span>
                          </a>
                          {/* </a> */}
                        </Link>
                      </li>
                    </ul>
                  </li>
                  {/* End subject */}

                  {/* class */}
                  <li className="sidebar-item">
                    <a
                      className="sidebar-link has-arrow waves-effect waves-dark"
                      href="#" onClick={(e) => e.preventDefault()}
                      aria-expanded="false"
                    >
                      <i className="mdi mdi-dns" />
                      <span className="hide-menu">Class</span>
                    </a>
                    <ul aria-expanded="false" className="collapse second-level">

                      <li className="sidebar-item">

                        <Link href="/modules/hrmModalV/class" onClick={(e) => e.preventDefault()}>
                          <a className="sidebar-link">
                            <i className="mdi mdi-drawing" />
                            <span className="hide-menu">Classes</span>
                          </a>
                        </Link>

                      </li>
                    </ul>
                  </li>
                  {/* End class */}


                  {/* class */}
                  <li className="sidebar-item">
                    <a
                      className="sidebar-link has-arrow waves-effect waves-dark"
                      href="#" onClick={(e) => e.preventDefault()}
                      aria-expanded="false"
                    >
                      <i className="mdi mdi-dns" />
                      <span className="hide-menu">Category</span>
                    </a>
                    <ul aria-expanded="false" className="collapse second-level">

                      <li className="sidebar-item">

                        <Link href="/modules/hrmModalV/categorie" onClick={(e) => e.preventDefault()}>
                          <a className="sidebar-link">
                            <i className="mdi mdi-drawing" />
                            <span className="hide-menu">Categories</span>
                          </a>
                        </Link>

                      </li>
                    </ul>
                  </li>
                  {/* End class */}



                                    {/* city */}
                                    <li className="sidebar-item">
                    <a
                      className="sidebar-link has-arrow waves-effect waves-dark"
                      href="#" onClick={(e) => e.preventDefault()}
                      aria-expanded="false"
                    >
                      <i className="mdi mdi-dns" />
                      <span className="hide-menu">City</span>
                    </a>
                    <ul aria-expanded="false" className="collapse second-level">

                      <li className="sidebar-item">

                        <Link href="/modules/hrmModalV/city" onClick={(e) => e.preventDefault()}>
                          <a className="sidebar-link">
                            <i className="mdi mdi-drawing" />
                            <span className="hide-menu">Cities</span>
                          </a>
                        </Link>

                      </li>
                    </ul>
                  </li>
                  {/* End city */}




                </ul>
              </li>
            </ul>
          </nav>

        </div>
      </aside>
    </>
  )
}

export default LeftSidebar