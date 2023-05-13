import React, { useState, useCallback, useEffect } from 'react'
import BarChart from '../components/chart/BarChart';
import LineChart from '../components/chart/LineChart';
import DoughnutChart from '../components/chart/Doughnut';
// import Axios from '../utils/axios';

function Home() {
  
  return (
    <>
      <div className="container-fluid">
        <div className="row page-titles">
          <div className="col-md-5 col-12 align-self-center">
            <h3 className="text-themecolor mb-0">Dashboard</h3>
          </div>
          <div
            className="
              col-md-7 col-12
              align-self-center
              d-none d-md-flex
              justify-content-end
            "
          >
            <ol className="breadcrumb mb-0 p-0 bg-transparent">
              <li className="breadcrumb-item">
                <a href="#">Home</a>
              </li>
              <li className="breadcrumb-item active">Dashboard</li>0
            </ol>
          </div>
        </div>
        {/* -------------------------------------------------------------- */}
        {/* End Bread crumb and right sidebar toggle */}
        {/* -------------------------------------------------------------- */}
        {/* Start row */}
        <div className="row">
          <div className="col-lg-3 col-md-6">
            <div className="card bg-info">
              <div className="card-body">
                <div className="d-flex no-block">
                  <div className="me-3 align-self-center">
                    <img src="/assets/images/icon/income-w.png" alt="Income" />
                  </div>
                  <div className="align-self-center">
                    <h6 className="text-white mt-2 mb-0">Total Income</h6>
                    <h2 className="mt-0 text-white">9999999</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="card bg-success">
              <div className="card-body">
                <div className="d-flex no-block">
                  <div className="me-3 align-self-center">
                    <img src="/assets/images/icon/expense-w.png" alt="Income" />
                  </div>
                  <div className="align-self-center">
                    <h6 className="text-white mt-2 mb-0">Total Expense</h6>
                    <h2 className="mt-0 text-white">90009</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="card bg-primary">
              <div className="card-body">
                <div className="d-flex no-block">
                  <div className="me-3 align-self-center">
                    <img src="/assets/images/icon/assets-w.png" alt="Income" />
                  </div>
                  <div className="align-self-center">
                    <h6 className="text-white mt-2 mb-0">Total Assets</h6>
                    <h2 className="mt-0 text-white">987,563</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="card bg-danger">
              <div className="card-body">
                <div className="d-flex no-block">
                  <div className="me-3 align-self-center">
                    <img src="/assets/images/icon/staff-w.png" alt="Income" />
                  </div>
                  <div className="align-self-center">
                    <h6 className="text-white mt-2 mb-0">Total Employees</h6>
                    <h2 className="mt-0 text-white">1000</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* End row */}





        {/* Start row */}
        <div className="row">
          <div className="col-lg-6 d-flex align-items-stretch">
            <div className="card w-100">
              <div className="card-body">
                <div className="d-md-flex">
                  <div>
                    <h3 className="card-title mb-1">
                      <span className="lstick d-inline-block align-middle" />
                      Sales Overview
                    </h3>
                  </div>
                  <div className="ms-auto">
                    <select className="form-select" defaultValue="">
                      <option value="">January 2021</option>
                      <option value={1}>February 2021</option>
                      <option value={2}>March 2021</option>
                      <option value={3}>April 2021</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="bg-info stats-bar">
                <div className="row">
                  <div className="col-lg-4 col-md-4">
                    <div className="p-3 active">
                      <h6 className="text-white">Total Sales</h6>
                      <h3 className="text-white mb-0">$10,345</h3>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4">
                    <div className="p-3">
                      <h6 className="text-white">This Month</h6>
                      <h3 className="text-white mb-0">$7,589</h3>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4">
                    <div className="p-3">
                      <h6 className="text-white">This Week</h6>
                      <h3 className="text-white mb-0">$1,476</h3>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-body mt-4">

                <div id="Sales-Overview" className="position-relative" style={{ height: 340 }}>
                  <LineChart />
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 d-flex align-items-stretch">
            <div className="card w-100">
              <img
                className="card-img-top blog-img3"
                src="/assets/images/big/img1.jpg"
                alt="Card image cap"
              />
              <div className="card-body">
                <h3 className="font-weight-normal">
                  Business development of rules 2021
                </h3>
                <span className="badge bg-info rounded-pill">Technology</span>
                <p className="mb-0 mt-3">
                  Titudin venenatis ipsum aciat. Vestibu ullamer quam. nenatis ipsum
                  ac feugiat. Ibulum ullamcorper.aciat. Vestibu ullamer quam. nenatis
                </p>
                <div className="d-flex mt-2">
                  <button className="btn ps-0 btn-link">Read more</button>
                  <div className="ms-auto align-self-center">
                    <a href='#' onClick={e => e.preventDefault()} className="link me-2">
                      <i className="ri-heart-fill" />
                    </a>
                    <a href='#' onClick={e => e.preventDefault()} className="link me-2">
                      <i className="ri-share-fill" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* -------------------------------------------------------------- */}
          {/* visit charts*/}
          {/* -------------------------------------------------------------- */}
          <div className="col-lg-3 col-md-6 d-flex align-items-stretch">
            <div className="card w-100">
              <div className="card-body">
                <h4 className="card-title">
                  <span className="lstick d-inline-block align-middle" />
                  Visit Separation
                </h4>
                <div
                  id="Visit-Separation"
                  style={{ height: 270, width: "100%" }}
                  className="d-flex justify-content-center align-items-center"
                >
                  <DoughnutChart />
                </div>
                <table className="table v-middle fs-3 mb-0 mt-4">
                  <tbody>
                    <tr>
                      <td>Mobile</td>
                      <td className="text-end font-weight-medium">38.5%</td>
                    </tr>
                    <tr>
                      <td>Tablet</td>
                      <td className="text-end font-weight-medium">30.8%</td>
                    </tr>
                    <tr>
                      <td>Desktop</td>
                      <td className="text-end font-weight-medium">7.7%</td>
                    </tr>
                    <tr>
                      <td>Other</td>
                      <td className="text-end font-weight-medium">23.1%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        {/* End row */}
        {/* Start row */}
        <div className="row">
          <div className="col-lg-4">
            <div className="card bg-success text-white">
              <div className="card-body">
                <div className="d-flex">
                  <div className="stats">
                    <h1 className="text-white">9062+</h1>
                    <h6 className="text-white">Subscribe</h6>
                    <button
                      className="
                        btn btn-rounded btn-outline btn-light
                        m-t-10
                        fs-3
                      "
                    >
                      Check list
                    </button>
                  </div>
                  <div className="stats-icon text-end ms-auto">
                    <i className="ri-mail-line display-5 op-3 text-dark" />
                  </div>
                </div>
              </div>
            </div>
            <div className="card bg-primary text-white">
              <div className="card-body">
                <div className="d-flex">
                  <div className="stats">
                    <h1 className="text-white">6509+</h1>
                    <h6 className="text-white">Facebook Likes</h6>
                    <button
                      className="
                        btn btn-rounded btn-outline btn-light
                        m-t-10
                        fs-3
                      "
                    >
                      Check list
                    </button>
                  </div>
                  <div className="stats-icon text-end ms-auto">
                    <i className="ri-facebook-fill display-5 op-3 text-dark" />
                  </div>
                </div>
              </div>
            </div>
            <div className="card bg-info text-white">
              <div className="card-body">
                <div className="d-flex">
                  <div className="stats">
                    <h1 className="text-white">3257+</h1>
                    <h6 className="text-white">Twitter Followers</h6>
                    <button
                      className="
                        btn btn-rounded btn-outline btn-light
                        m-t-10
                        fs-3
                      "
                    >
                      Check list
                    </button>
                  </div>
                  <div className="stats-icon text-end ms-auto">
                    <i className="ri-twitter-fill display-5 op-3 text-dark" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-8">
            <div className="card">
              <div className="card-body">
                <div className="d-md-flex">
                  <h4 className="card-title">
                    <span className="lstick d-inline-block align-middle" />
                    Website Visit
                  </h4>
                  <ul className="list-inline mb-0 ms-auto">
                    <li className="list-inline-item">
                      <h6 className="text-success">
                        <i
                          className="
                            ri-checkbox-blank-circle-fill
                            align-middle
                            fs-4
                            font-10
                            me-2
                          "
                        />
                        Site A view
                      </h6>
                    </li>
                    <li className="list-inline-item">
                      <h6 className="text-info">
                        <i
                          className="
                            ri-checkbox-blank-circle-fill
                            align-middle
                            fs-4
                            font-10
                            me-2
                          "
                        />
                        Site B view
                      </h6>
                    </li>
                  </ul>
                </div>
                <div className="text-center mt-3">
                  <div className="btn-group" role="group" aria-label="Basic example">
                    <button
                      type="button"
                      className="
                        btn btn-sm btn-outline-secondary
                        shadow-sm
                        fs-2
                        me-0
                      "
                    >
                      PAGEVIEWS
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-secondary shadow-sm fs-2"
                    >
                      REFERRALS
                    </button>
                  </div>
                </div>
                <div
                  id="Website-Visit"
                  className="position-relative mt-3"
                  style={{ height: 350, width: "100%" }}
                >
                  <BarChart />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* End row */}
        {/* Start Row */}
        <div className="row">
          <div className="col-lg-6 d-flex align-items-stretch">
            <div className="card w-100">
              <div className="card-body">
                <div className="d-md-flex">
                  <div>
                    <h4 className="card-title">
                      <span className="lstick d-inline-block align-middle" />
                      Projects of the Month
                    </h4>
                  </div>
                  <div className="ms-auto">
                    <select className="form-select" defaultValue="">
                      <option value="">January 2021</option>
                      <option value={1}>February 2021</option>
                      <option value={2}>March 2021</option>
                      <option value={3}>April 2021</option>
                    </select>
                  </div>
                </div>
                <div className="table-responsive mt-3">
                  <table className="table v-middle no-wrap mb-0">
                    <thead>
                      <tr>
                        <th className="border-0" colSpan={2}>
                          Assigned
                        </th>
                        <th className="border-0">Name</th>
                        <th className="border-0">Priority</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td style={{ width: 50 }}>
                          <span>
                            <img
                              src="/assets/images/users/1.jpg"
                              alt="user"
                              width={50}
                              className="rounded-circle"
                            />
                          </span>
                        </td>
                        <td>
                          <h6 className="mb-0 font-weight-medium">Sunil Joshi</h6>
                          <small className="text-muted">Web Designer</small>
                        </td>
                        <td>Elite Admin</td>
                        <td>
                          <span className="badge bg-success rounded-pill">Low</span>
                        </td>
                      </tr>
                      <tr className="active">
                        <td>
                          <span>
                            <img
                              src="/assets/images/users/2.jpg"
                              alt="user"
                              width={50}
                              className="rounded-circle"
                            />
                          </span>
                        </td>
                        <td>
                          <h6 className="mb-0 font-weight-medium">Andrew</h6>
                          <small className="text-muted">Project Manager</small>
                        </td>
                        <td>Real Homes</td>
                        <td>
                          <span className="badge bg-info rounded-pill">Medium</span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span>
                            <img
                              src="/assets/images/users/3.jpg"
                              alt="user"
                              width={50}
                              className="rounded-circle"
                            />
                          </span>
                        </td>
                        <td>
                          <h6 className="mb-0 font-weight-medium">Bhavesh patel</h6>
                          <small className="text-muted">Developer</small>
                        </td>
                        <td>MedicalPro Theme</td>
                        <td>
                          <span className="badge bg-primary rounded-pill">High</span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span>
                            <img
                              src="/assets/images/users/4.jpg"
                              alt="user"
                              width={50}
                              className="rounded-circle"
                            />
                          </span>
                        </td>
                        <td>
                          <h6 className="mb-0 font-weight-medium">Nirav Joshi</h6>
                          <small className="text-muted">Frontend Eng</small>
                        </td>
                        <td>Elite Admin</td>
                        <td>
                          <span className="badge bg-danger rounded-pill">Low</span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span>
                            <img
                              src="/assets/images/users/5.jpg"
                              alt="user"
                              width={50}
                              className="rounded-circle"
                            />
                          </span>
                        </td>
                        <td>
                          <h6 className="mb-0 font-weight-medium">Micheal Doe</h6>
                          <small className="text-muted">Content Writer</small>
                        </td>
                        <td>Helping Hands</td>
                        <td>
                          <span className="badge bg-success rounded-pill">High</span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span>
                            <img
                              src="/assets/images/users/6.jpg"
                              alt="user"
                              width={50}
                              className="rounded-circle"
                            />
                          </span>
                        </td>
                        <td>
                          <h6 className="mb-0 font-weight-medium">Johnathan</h6>
                          <small className="text-muted">Graphic</small>
                        </td>
                        <td>Digital Agency</td>
                        <td>
                          <span className="badge bg-info rounded-pill">High</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          {/* -------------------------------------------------------------- */}
          {/* Activity widget find scss into widget folder*/}
          {/* -------------------------------------------------------------- */}
          <div className="col-lg-6 d-flex align-items-stretch">
            <div className="card w-100">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <h4 className="card-title">
                    <span className="lstick d-inline-block align-middle" />
                    Activity
                  </h4>
                  <div className="dropdown ms-auto">
                    <a
                      href="#"
                      className="icon-options-vertical link"
                      id="dropdownMenuLink"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    />
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                      <li>
                        <a className="dropdown-item" href="#">
                          Action
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Another action
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Something else here
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="activity-box table-responsive">
                <div className="card-body pt-0">
                  {/* Activity item*/}
                  <div className="activity-item mb-4 d-flex">
                    <div className="me-3">
                      <img
                        src="/assets/images/users/2.jpg"
                        alt="user"
                        width={50}
                        className="rounded-circle"
                      />
                    </div>
                    <div className="mt-2">
                      <h5 className="mb-0 font-weight-medium">
                        Mark Freeman
                        <span className="text-muted fs-3 ms-2">| &nbsp; 6:30 PM</span>
                      </h5>
                      <h6 className="text-muted">uploaded this file</h6>
                      <div className="row">
                        <div className="col-4">
                          <img src="/assets/images/icon/zip.png" alt="user" />
                        </div>
                        <div className="col-8 d-flex align-items-center">
                          <div>
                            <h5 className="mb-0 font-weight-medium">Homepage.zip</h5>
                            <h6>54 MB</h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Activity item*/}
                  {/* Activity item*/}
                  <div className="activity-item mb-4 d-flex">
                    <div className="me-3">
                      <img
                        src="/assets/images/users/3.jpg"
                        alt="user"
                        width={50}
                        className="rounded-circle"
                      />
                    </div>
                    <div className="mt-2">
                      <h5 className="mb-1 font-weight-medium">
                        Emma Smith
                        <span className="text-muted fs-3 ms-2">| &nbsp; 6:30 PM</span>
                      </h5>
                      <h6 className="text-muted">
                        joined projectname, and invited
                        <a href='#' onClick={e => e.preventDefault()}>
                          @maxcage, @maxcage, @maxcage,
                          <br />
                          @maxcage, @maxcage,+3
                        </a>
                      </h6>
                      <span className="image-list mt-2">
                        <a
                          href='#' onClick={e => e.preventDefault()}
                          className="align-middle position-relative"
                        >
                          <img
                            src="/assets/images/users/1.jpg"
                            className="rounded-circle"
                            alt="user"
                            width={40}
                          />
                        </a>
                        <a
                          href='#' onClick={e => e.preventDefault()}
                          className="align-middle position-relative"
                        >
                          <img
                            src="/assets/images/users/4.jpg"
                            className="rounded-circle"
                            alt="user"
                            width={40}
                          />
                        </a>
                        <a
                          href='#' onClick={e => e.preventDefault()}
                          className="align-middle position-relative"
                        >
                          <span
                            className="
                              round
                              rounded-circle
                              text-white
                              d-inline-block
                              text-center
                              bg-warning
                            "
                            style={{ height: 40, width: 40 }}
                          >
                            C
                          </span>
                        </a>
                        <a
                          href='#' onClick={e => e.preventDefault()}
                          className="align-middle position-relative"
                        >
                          <span
                            className="
                              round
                              rounded-circle
                              text-white
                              d-inline-block
                              text-center
                              bg-danger
                            "
                            style={{ height: 40, width: 40 }}
                          >
                            S
                          </span>
                        </a>
                        <a
                          href='#' onClick={e => e.preventDefault()}
                          className="align-middle position-relative"
                        >
                          +3
                        </a>
                      </span>
                    </div>
                  </div>
                  {/* Activity item*/}
                  {/* Activity item*/}
                  <div className="activity-item mb-4 d-flex">
                    <div className="me-3">
                      <img
                        src="/assets/images/users/4.jpg"
                        alt="user"
                        width={50}
                        className="rounded-circle"
                      />
                    </div>
                    <div className="mt-2">
                      <h5 className="mb-0 font-weight-medium">
                        David R. Jones
                        <span className="text-muted fs-3 ms-2">| &nbsp; 6:30 PM</span>
                      </h5>
                      <h6 className="text-muted">uploaded this file</h6>
                      <span>
                        <a href='#' onClick={e => e.preventDefault()} className="me-2">
                          <img
                            src="/assets/images/big/img1.jpg"
                            alt="user"
                            width={60}
                          />
                        </a>
                        <a href='#' onClick={e => e.preventDefault()} className="me-2">
                          <img
                            src="/assets/images/big/img2.jpg"
                            alt="user"
                            width={60}
                          />
                        </a>
                      </span>
                    </div>
                  </div>
                  {/* Activity item*/}
                  {/* Activity item*/}
                  <div className="activity-item d-flex mb-2">
                    <div className="me-3">
                      <img
                        src="/assets/images/users/6.jpg"
                        alt="user"
                        width={50}
                        className="rounded-circle"
                      />
                    </div>
                    <div className="mt-2">
                      <h5 className="mb-1 font-weight-medium">
                        David R. Jones
                        <span className="text-muted fs-3 ms-2">| &nbsp; 6:30 PM</span>
                      </h5>
                      <h6 className="text-muted">
                        Commented on<a href='#' onClick={e => e.preventDefault()}>Test Project</a>
                      </h6>
                      <p className="mb-0">
                        It has survived not only five centuries, but also the leap
                        into
                      </p>
                    </div>
                  </div>
                  {/* Activity item*/}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* End Row */}
        {/* Start row */}
        <div className="row">
          <div className="col-lg-6">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">
                  <span className="lstick d-inline-block align-middle" />
                  Recent Comments
                </h4>
              </div>
              <div
                className="comment-widgets scrollable mb-2 common-widget"
                style={{ height: 450 }}
              >
                {/* Comment Row */}
                <div className="d-flex flex-row comment-row border-bottom p-3">
                  <div className="p-2">
                    <span className="">
                      <img
                        src="/assets/images/users/1.jpg"
                        className="rounded-circle"
                        alt="user"
                        width={50}
                      />
                    </span>
                  </div>
                  <div className="comment-text w-100 p-3">
                    <h5 className="font-weight-medium">James Anderson</h5>
                    <p className="mb-1 fs-3 text-muted">
                      Lorem Ipsum is simply dummy text of the printing and type etting
                      industry
                    </p>
                    <div className="comment-footer d-md-flex align-items-center mt-2">
                      <span
                        className="
                          badge
                          bg-light-info
                          text-info
                          rounded-pill
                          font-weight-medium
                          fs-1
                          py-1
                        "
                      >
                        Pending
                      </span>
                      <span className="action-icons">
                        <a href='#' onClick={e => e.preventDefault()} className="ps-3">
                          <i className="ri-edit-box-line fs-6" />
                        </a>
                        <a href='#' onClick={e => e.preventDefault()} className="ps-3">
                          <i className="ri-check-line fs-6" />
                        </a>
                        <a href='#' onClick={e => e.preventDefault()} className="ps-3">
                          <i className="ri-heart-line fs-6" />
                        </a>
                      </span>
                      <span className="text-muted ms-auto fw-normal fs-2">
                        April 14, 2021
                      </span>
                    </div>
                  </div>
                </div>
                {/* Comment Row */}
                <div className="d-flex flex-row comment-row border-bottom active p-3">
                  <div className="p-2">
                    <span>
                      <img
                        src="/assets/images/users/2.jpg"
                        className="rounded-circle"
                        alt="user"
                        width={50}
                      />
                    </span>
                  </div>
                  <div className="comment-text active w-100 p-3">
                    <h5 className="font-weight-medium">Michael Jorden</h5>
                    <p className="mb-1 fs-3 text-muted">
                      Lorem Ipsum is simply dummy text of the printing and type
                      setting industry.
                    </p>
                    <div className="comment-footer d-md-flex align-items-center mt-2">
                      <span
                        className="
                          badge
                          bg-light-success
                          text-success
                          rounded-pill
                          font-weight-medium
                          fs-1
                          py-1
                        "
                      >
                        Approved
                      </span>
                      <span className="action-icons active">
                        <a href='#' onClick={e => e.preventDefault()} className="ps-3">
                          <i className="ri-edit-box-line fs-6" />
                        </a>
                        <a href='#' onClick={e => e.preventDefault()} className="ps-3">
                          <i className="ri-close-circle-line fs-6" />
                        </a>
                        <a href='#' onClick={e => e.preventDefault()} className="ps-3">
                          <i className="ri-heart-line fs-6 text-danger" />
                        </a>
                      </span>
                      <span className="text-muted ms-auto fw-normal fs-2">
                        April 14, 2021
                      </span>
                    </div>
                  </div>
                </div>
                {/* Comment Row */}
                <div className="d-flex flex-row comment-row border-bottom p-3">
                  <div className="p-2">
                    <span>
                      <img
                        src="/assets/images/users/3.jpg"
                        className="rounded-circle"
                        alt="user"
                        width={50}
                      />
                    </span>
                  </div>
                  <div className="comment-text w-100 p-3">
                    <h5 className="font-weight-medium">Johnathan Doeting</h5>
                    <p className="mb-1 fs-3 text-muted">
                      Lorem Ipsum is simply dummy text of the printing and type
                      setting industry.
                    </p>
                    <div className="comment-footer d-md-flex align-items-center mt-2">
                      <span
                        className="
                          badge
                          bg-light-danger
                          text-danger
                          rounded-pill
                          font-weight-medium
                          fs-1
                          py-1
                        "
                      >
                        Rejected
                      </span>
                      <span className="action-icons">
                        <a href='#' onClick={e => e.preventDefault()} className="ps-3">
                          <i className="ri-edit-box-line fs-6" />
                        </a>
                        <a href='#' onClick={e => e.preventDefault()} className="ps-3">
                          <i className="ri-check-line fs-6" />
                        </a>
                        <a href='#' onClick={e => e.preventDefault()} className="ps-3">
                          <i className="ri-heart-line fs-6" />
                        </a>
                      </span>
                      <span className="text-muted ms-auto fw-normal fs-2">
                        April 14, 2021
                      </span>
                    </div>
                  </div>
                </div>
                {/* Comment Row */}
                <div className="d-flex flex-row comment-row p-3">
                  <div className="p-2">
                    <span>
                      <img
                        src="/assets/images/users/4.jpg"
                        className="rounded-circle"
                        alt="user"
                        width={50}
                      />
                    </span>
                  </div>
                  <div className="comment-text w-100 p-3">
                    <h5 className="font-weight-medium">James Anderson</h5>
                    <p className="mb-1 fs-3 text-muted">
                      Lorem Ipsum is simply dummy text of the printing and type
                      setting industry.
                    </p>
                    <div className="comment-footer d-md-flex align-items-center mt-2">
                      <span
                        className="
                          badge
                          bg-light-info
                          text-info
                          rounded-pill
                          font-weight-medium
                          fs-1
                          py-1
                        "
                      >
                        Pending
                      </span>
                      <span className="action-icons">
                        <a href='#' onClick={e => e.preventDefault()} className="ps-3">
                          <i className="ri-edit-box-line fs-6" />
                        </a>
                        <a href='#' onClick={e => e.preventDefault()} className="ps-3">
                          <i className="ri-check-line fs-6" />
                        </a>
                        <a href='#' onClick={e => e.preventDefault()} className="ps-3">
                          <i className="ri-heart-line fs-6" />
                        </a>
                      </span>
                      <span className="text-muted ms-auto fw-normal fs-2">
                        April 14, 2021
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">
                  <span className="lstick d-inline-block align-middle" />
                  Recent Chats
                </h4>
                <div className="chat-box scrollable" style={{ height: 357 }}>
                  {/*chat Row */}
                  <ul className="chat-list m-0 p-0">
                    {/*chat Row */}
                    <li className="mt-4">
                      <div className="chat-img d-inline-block align-top">
                        <img
                          src="/assets/images/users/1.jpg"
                          alt="user"
                          className="rounded-circle"
                        />
                      </div>
                      <div className="chat-content ps-3 d-inline-block">
                        <h5 className="text-muted fs-3 font-weight-medium">
                          James Anderson
                        </h5>
                        <div
                          className="
                            message
                            font-weight-medium
                            fs-3
                            bg-light-info
                            d-inline-block
                            mb-2
                            text-dark
                          "
                        >
                          Lorem Ipsum is simply dummy text of the printing &amp; type
                          setting industry.
                        </div>
                      </div>
                      <div
                        className="
                          chat-time
                          d-inline-block
                          text-end
                          fs-2
                          font-weight-medium
                        "
                      >
                        10:56 am
                      </div>
                    </li>
                    {/*chat Row */}
                    <li className="mt-4">
                      <div className="chat-img d-inline-block align-top">
                        <img
                          src="/assets/images/users/2.jpg"
                          alt="user"
                          className="rounded-circle"
                        />
                      </div>
                      <div className="chat-content ps-3 d-inline-block">
                        <h5 className="text-muted fs-3 font-weight-medium">
                          Bianca Doe
                        </h5>
                        <div
                          className="
                            message
                            font-weight-medium
                            fs-3
                            bg-light-success
                            d-inline-block
                            mb-2
                            text-dark
                          "
                        >
                          It’s Great opportunity to work.
                        </div>
                      </div>
                      <div
                        className="
                          chat-time
                          d-inline-block
                          text-end
                          fs-2
                          font-weight-medium
                        "
                      >
                        10:57 am
                      </div>
                    </li>
                    {/*chat Row */}
                    <li className="odd mt-4">
                      <div className="chat-content ps-3 d-inline-block text-end">
                        <div
                          className="
                            message
                            font-weight-medium
                            fs-3
                            bg-light-inverse
                            d-inline-block
                            mb-2
                            text-dark
                          "
                        >
                          I would love to join the team.
                        </div>
                      </div>
                      <div
                        className="
                          chat-time
                          d-inline-block
                          text-end
                          fs-2
                          font-weight-medium
                        "
                      >
                        10:58 am
                      </div>
                    </li>
                    {/*chat Row */}
                    <li className="odd mt-4">
                      <div className="chat-content ps-3 d-inline-block text-end">
                        <div
                          className="
                            message
                            font-weight-medium
                            fs-3
                            bg-light-inverse
                            d-inline-block
                            mb-2
                            text-dark
                          "
                        >
                          Whats budget of the new project.
                        </div>
                      </div>
                      <div
                        className="
                          chat-time
                          d-inline-block
                          text-end
                          fs-2
                          font-weight-medium
                        "
                      >
                        10:59 am
                      </div>
                    </li>
                    {/*chat Row */}
                    <li className="mt-4">
                      <div className="chat-img d-inline-block align-top">
                        <img
                          src="/assets/images/users/3.jpg"
                          alt="user"
                          className="rounded-circle"
                        />
                      </div>
                      <div className="chat-content ps-3 d-inline-block">
                        <h5 className="text-muted fs-3 font-weight-medium">
                          Angelina Rhodes
                        </h5>
                        <div
                          className="
                            message
                            font-weight-medium
                            fs-3
                            bg-light-primary
                            d-inline-block
                            mb-2
                            text-dark
                          "
                        >
                          Well we have good budget for the project
                        </div>
                      </div>
                      <div
                        className="
                          chat-time
                          d-inline-block
                          text-end
                          fs-2
                          font-weight-medium
                        "
                      >
                        11:00 am
                      </div>
                    </li>
                    {/*chat Row */}
                    <li className="mt-4">
                      <div className="chat-img d-inline-block align-top">
                        <img
                          src="/assets/images/users/1.jpg"
                          alt="user"
                          className="rounded-circle"
                        />
                      </div>
                      <div className="chat-content ps-3 d-inline-block">
                        <h5 className="text-muted fs-3 font-weight-medium">
                          James Anderson
                        </h5>
                        <div
                          className="
                            message
                            font-weight-medium
                            fs-3
                            bg-light-info
                            d-inline-block
                            mb-2
                            text-dark
                          "
                        >
                          Lorem Ipsum is simply dummy text of the printing &amp; type
                          setting industry.
                        </div>
                      </div>
                      <div
                        className="
                          chat-time
                          d-inline-block
                          text-end
                          fs-2
                          font-weight-medium
                        "
                      >
                        10:56 am
                      </div>
                    </li>
                    {/*chat Row */}
                    <li className="odd mt-4">
                      <div className="chat-content ps-3 d-inline-block text-end">
                        <div
                          className="
                            message
                            font-weight-medium
                            fs-3
                            bg-light-inverse
                            d-inline-block
                            mb-2
                            text-dark
                          "
                        >
                          Whats budget of the new project.
                        </div>
                      </div>
                      <div
                        className="
                          chat-time
                          d-inline-block
                          text-end
                          fs-2
                          font-weight-medium
                        "
                      >
                        10:59 am
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="card-body border-top">
                <div className="row">
                  <div className="col-8">
                    <textarea
                      placeholder="Type your message here"
                      className="form-control border-0"
                      defaultValue={""}
                    />
                  </div>
                  <div className="col-4 text-end">
                    <button type="button" className="btn btn-info btn-circle btn-lg">
                      <i data-feather="send" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* End row */}



      </div>
    </>
  )
}

export default Home

