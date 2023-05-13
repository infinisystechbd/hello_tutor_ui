import React from 'react'

const LeftSidebar = () => {
  return (
    <>
     <aside className="left-sidebar">
        <div className="scroll-sidebar">

          <nav className="sidebar-nav">
            <ul id="sidebarnav">

              {/* HRM */}

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
                          <a href="/modules/hr/teacher/create">
                            <a className="sidebar-link">
                              <i className="mdi mdi-drawing" />
                              <span className="hide-menu">Add Teacher</span>
                            </a>
                          </a>
                        
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
                        
                          <a href="/modules/hr/student/create">
                            <a className="sidebar-link">
                              <i className="mdi mdi-drawing" />
                              <span className="hide-menu">Add Student</span>
                            </a>
                          </a>
                        
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
                  {/* Leave Applications */}
                  <li className="sidebar-item">
                    <a
                      className="sidebar-link has-arrow waves-effect waves-dark"
                      href="#" onClick={(e) => e.preventDefault()}
                      aria-expanded="false"
                    >
                      <i className="mdi mdi-dns" />
                      <span className="hide-menu">Leave Applications</span>
                    </a>
                    <ul aria-expanded="false" className="collapse second-level">
                      <li className="sidebar-item">
                        
                          <a href="#" onClick={(e) => e.preventDefault()}>
                            <a className="sidebar-link">
                              <i className="mdi mdi-drawing" />
                              <span className="hide-menu">Applications</span>
                            </a>
                          </a>
                        
                      </li>
                      <li className="sidebar-item">
                        
                          <a href="/modules/hr/leaveApplications/myApplications">
                            <a className="sidebar-link">
                              <i className="mdi mdi-drawing" />
                              <span className="hide-menu">My Applications</span>
                            </a>
                          </a>
                        
                      </li>
                      <li className="sidebar-item">
                       
                          <a href="#" onClick={(e) => e.preventDefault()}>
                            <a className="sidebar-link">
                              <i className="mdi mdi-drawing" />
                              <span className="hide-menu">New Application</span>
                            </a>
                          </a>                     
                      </li>
                      <li className="sidebar-item">
                        
                          <a href="#" onClick={(e) => e.preventDefault()}>
                            <a className="sidebar-link">
                              <i className="mdi mdi-drawing" />
                              <span className="hide-menu">Add Leave</span>
                            </a>
                          </a>
                        
                      </li>
                    </ul>
                  </li>
                  {/* End Leave Applications */}
                </ul>
              </li>
              {/* End HRM */}
            </ul>
          </nav>

        </div>
      </aside>
    </>
  )
}

export default LeftSidebar