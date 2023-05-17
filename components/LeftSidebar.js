import React from 'react'
import Link from 'next/link';
const LeftSidebar = () => {
  return (
    <>
      <aside className="left-sidebar">
        <div className="scroll-sidebar">

          <nav className="sidebar-nav">
            <ul id="sidebarnav">

              {/* ADMIN */}

              <li className={`sidebar-item `}>

                <a
                  className="sidebar-link has-arrow waves-effect waves-dark"
                  href="#" onClick={(e) => e.preventDefault()}
                  aria-expanded="false"
                >
                  <i data-feather="file-text" className="feather-icon" />
                  <span className="hide-menu">Admin</span>
                </a>

                <ul aria-expanded="false" className="collapse first-level">
                  {/* Employee */}
                  <li className="sidebar-item">
                    <a
                      className="sidebar-link has-arrow waves-effect waves-dark"
                      href="#" onClick={(e) => e.preventDefault()}
                      aria-expanded="false"
                    >
                      <i className="mdi mdi-dns" />
                      <span className="hide-menu">Employee</span>
                    </a>
                    <ul aria-expanded="false" className="collapse second-level">
                      <li className={`sidebar-item`}>


                      </li>
                      <li className={`sidebar-item`}>

                        <a href="#" onClick={(e) => e.preventDefault()}>
                          <a className="sidebar-link">
                            <i className="mdi mdi-drawing" />
                            <span className="hide-menu">All Employees</span>
                          </a>
                        </a>

                      </li>
                    </ul>
                  </li>
                  {/* End Employee */}

                  {/* Teacher */}
                  <li className="sidebar-item">

                    <a
                      className="sidebar-link has-arrow waves-effect waves-dark"
                      href="#" onClick={(e) => e.preventDefault()}
                      aria-expanded="false"
                    >
                      <i className="mdi mdi-dns" />
                      <span className="hide-menu">Teacher</span>
                    </a>
                    <ul aria-expanded="false" className="collapse second-level">
                      <li className="sidebar-item">
                        {/* <a href=""></a> */}
                        <Link href="/modules/hr/teacher/create">
                          <a className="sidebar-link">
                            <i className="mdi mdi-drawing" />
                            <span className="hide-menu">Add Teacher</span>
                          </a>
                        </Link>

                      </li>
                      <li className="sidebar-item">

                        <a href="#" onClick={(e) => e.preventDefault()}>
                          <a className="sidebar-link">
                            <i className="mdi mdi-drawing" />
                            <span className="hide-menu">All Teacher</span>
                          </a>
                        </a>

                      </li>
                    </ul>
                  </li>
                  {/* End Teacher */}
                  {/* Students */}
                  <li className="sidebar-item">
                    <a
                      className="sidebar-link has-arrow waves-effect waves-dark"
                      href="#" onClick={(e) => e.preventDefault()}
                      aria-expanded="false"
                    >
                      <i className="mdi mdi-dns" />
                      <span className="hide-menu">Students</span>
                    </a>
                    <ul aria-expanded="false" className="collapse second-level">
                      <li className="sidebar-item">

                        <Link href="/modules/hr/student/create">
                          <a className="sidebar-link">
                            <i className="mdi mdi-drawing" />
                            <span className="hide-menu">Add Student</span>
                          </a>
                        </Link>

                      </li>
                      <li className="sidebar-item">

                        <a href="#" onClick={(e) => e.preventDefault()}>
                          <a className="sidebar-link">
                            <i className="mdi mdi-drawing" />
                            <span className="hide-menu">All Students</span>
                          </a>
                        </a>

                      </li>
                    </ul>
                  </li>
                  {/* End Students */}

                </ul>
              </li>
              {/* End ADMIN */}


              {/* ADMIN */}

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

                        <a href="#" onClick={(e) => e.preventDefault()}>
                          <a className="sidebar-link">
                            <i className="mdi mdi-drawing" />
                            <span className="hide-menu">All Classes</span>
                          </a>
                        </a>

                      </li>
                    </ul>
                  </li>
                  {/* End class */}


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

                        <a href="#" onClick={(e) => e.preventDefault()}>
                          <a className="sidebar-link">
                            <i className="mdi mdi-drawing" />
                            <span className="hide-menu">All Subject</span>
                          </a>
                        </a>

                      </li>
                    </ul>
                  </li>
                  {/* End subject */}

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

                        <a href="#" onClick={(e) => e.preventDefault()}>
                          <a className="sidebar-link">
                            <i className="mdi mdi-drawing" />
                            <span className="hide-menu">All Categories</span>
                          </a>
                        </a>

                      </li>
                    </ul>
                  </li>
                  {/* End Categories */}


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

                        <a href="#" onClick={(e) => e.preventDefault()}>
                          <a className="sidebar-link">
                            <i className="mdi mdi-drawing" />
                            <span className="hide-menu">All Guardians</span>
                          </a>
                        </a>

                      </li>
                    </ul>
                  </li>
                  {/* End Guardian */}

                </ul>
              </li>
              {/* End ADMIN */}
            </ul>
          </nav>

        </div>
      </aside>
    </>
  )
}

export default LeftSidebar