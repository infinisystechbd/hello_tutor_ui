import { Button, Form } from "react-bootstrap";
// import HeadSection from "../../../components/HeadSection";
import Table from "react-bootstrap/Table";
import HeadSection from "../../../../components/HeadSection";
import RadioButton from "../../../../components/elements/RadioButton";
import Select2 from "../../../../components/elements/Select2";
import { TEST_1 } from '../../../../constants/api_endpoints/test1';
import { post } from '../../../../helpers/api_helper';
const Teacher = () => {

    const login = ()=>
    {
        const loginuser = post(TEST_1.test1(), {userid:'01999999999',password:'asd123'});
        console.log(loginuser);
    }
 

  function submitForm(e) { }
  return (
    <>
      <HeadSection title="Add New Teacher" />
      <Button onClick={login}>tes</Button>
      <div className="container-fluid ">
        <Form onSubmit={submitForm} id="customerForm" noValidate >
          <h4>Add New Teacher</h4>
          <div className="row">
            <div className="col-12 col-md-7">
              <div className="row">
                <div className="col-12">
                  <div className="card shadow">
                    <div className="card-body">


                      <h4 className="card-title border-bottom">TUTOR PROFILE</h4>


                      <div className="row">
                        <Form.Group className="mb-2 col-4">
                          <Form.Label>Title <span className="text-danger">*</span></Form.Label>
                          <Form.Select
                            name="title"
                            required
                          >
                            <option disabled value="">
                              Select Title
                            </option>
                            <option value="Mr.">Mr.</option>
                            <option value="Ms.">Ms.</option>
                            <option value="Mrs.">Mrs.</option>
                            <option value="others">Others</option>
                          </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-2 col-4">
                          <Form.Label>First Name <span className="text-danger">*</span></Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter First Name"
                            name="fName"
                            required
                          />
                        </Form.Group>

                        <Form.Group className="mb-2 col-4">
                          <Form.Label>Last Name <span className="text-danger">*</span></Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter Last Name"
                            name="lName"
                            required
                          />
                        </Form.Group>
                      </div>

                      <div className="row mb-3">

                        <Form.Group className="col-4">
                          <Form.Label>Gender <span className="text-danger">*</span></Form.Label>
                          <div className="row">
                            <div className="flex-gap align-items-center">

                              <RadioButton
                                id="male"
                                label="Male"
                                name="gender"
                                value="male"

                              />

                              <RadioButton
                                id="female"
                                label="Female"
                                name="gender"
                                value="female"

                              />

                              <RadioButton
                                id="other"
                                label="Other"
                                name="gender"
                                value="other"

                              />

                            </div>
                          </div>
                        </Form.Group>

                        <Form.Group className="col-4">
                          <Form.Label>ID Type <span className="text-danger">*</span></Form.Label>
                          <Form.Select
                            name="id_type"
                            required
                          >
                            <option disabled value="">
                              Choose Option
                            </option>
                            <option value="NID">NID</option>
                            <option value="Passport">Passport</option>
                            <option value="Driving Licence">Driving Licence</option>
                          </Form.Select>
                        </Form.Group>

                        <Form.Group className="col-4">
                          <Form.Label>ID <span className="text-danger">*</span></Form.Label>
                          <Form.Control
                            type="text"
                            name="personal_id"
                            required
                          />
                        </Form.Group>

                      </div>

                      <div className="row">


                        <Form.Group className="mb-2 col-6">
                          <Form.Label >Mobile Number <span className="text-danger">*</span></Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter Mobile Number"
                            name="fName"
                            required
                          />


                        </Form.Group>

                        <Form.Group className="mb-2 col-6">
                          <Form.Label>Contact Type <span className="text-danger">*</span></Form.Label>
                          <Form.Select
                            name="contact_type"
                            required
                          >
                            <option disabled value="">
                              Select Contact Type
                            </option>
                            <option value="home">Home</option>
                            <option value="work">Work</option>
                          </Form.Select>
                        </Form.Group>
                      </div>


                      <div className="row mb-2">
                        <Form.Group className="mb-2 col-6">




                        </Form.Group>

                        <Form.Group className="mb-2 col-6">


                        </Form.Group>
                      </div>

                      <div className="row">
                        <Form.Group className="mb-2 col-6">
                          <Form.Label>Nationality <span className="text-danger">*</span></Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter Nationality"
                            name="nationality"
                            required
                          />
                        </Form.Group>

                        {/* Show country or selected country */}
                        <Form.Group className="mb-2 col-6">
                          <Form.Label>Country <span className="text-danger">*</span></Form.Label>

                          <Select2
                            className="select-bg"

                          />



                        </Form.Group>
                      </div>

                      {/* show state city or selected */}
                      <div className="row">
                        <Form.Group className="mb-2 col-6">
                          <Form.Label>State <span className="text-danger">*</span></Form.Label>
                          <Select2

                          />


                        </Form.Group>

                        <Form.Group className="mb-2 col-6">
                          <Form.Label>City <span className="text-danger">*</span></Form.Label>


                          <Select2

                          />


                        </Form.Group>
                      </div>

                      <div className="row">
                        <Form.Group className="mb-2 col-6">
                          <Form.Label>Pin Code <span className="text-danger">*</span></Form.Label>
                          <Form.Control
                            type="number"
                            placeholder="Enter Pin Code"
                            name="pin_code"

                            required
                          />
                        </Form.Group>

                        <Form.Group className="mb-2 col-6">
                          <Form.Label>Arrival From <span className="text-danger">*</span></Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Where did come from?"
                            name="arrival_from"

                            required
                          />
                        </Form.Group>
                      </div>

                      <Form.Group className="mb-2">
                        <Form.Label>Present Address <span className="text-danger">*</span></Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          placeholder="Enter Full Address"
                          name="address"

                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          Please enter full present address.
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group className="mb-2">
                        <Form.Label>Permanent Address <span className="text-danger">*</span></Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          placeholder="Enter Full Address"
                          name="address"

                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          Please enter full permanent address.
                        </Form.Control.Feedback>
                      </Form.Group>

                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Info Start */}

              <div className="row">
                <div className="col-12">
                  <div className="card shadow">
                    <div className="card-body">
                      <h4 className="card-title border-bottom">Add Educational Information</h4>

                      <div className="row">

                        <Form.Group className="mb-2 col-6">
                          <Form.Label>Select Discount</Form.Label>
                          <Select2

                          />

                        </Form.Group>


                        <Form.Group className="mb-2 col-6">
                          <Form.Label>Additional Discount</Form.Label>
                          <Form.Control
                            type="number"
                            placeholder="Enter additional discount Amount"
                            name="additional_discount"

                          />
                        </Form.Group>



                      </div>

                      <div className="row">
                        <Form.Group className="mb-2 col-6">
                          <Form.Label>Payment Amount</Form.Label>
                          <Form.Control
                            type="number"
                            placeholder="Enter Payment Amount"
                            name="total_paid"
                          />
                        </Form.Group>

                        <Form.Group className="mb-2 col-6">
                          <Form.Label>Payment Account</Form.Label>
                          <Select2

                          />
                        </Form.Group>
                      </div>

                      <Form.Group className="mb-2">
                        <Form.Label>Payment Reference</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter Payment Reference"
                          name="reference"
                        />
                      </Form.Group>

                      <Form.Group className="mb-2">
                        <Form.Label>Comments</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows="3"
                          placeholder="Enter Comments..."
                          name="remark"
                        />
                      </Form.Group>
                    </div>
                  </div>
                </div>
              </div>

              {/* End Payment Info */}
            </div>



            <div className="col-12 col-md-5">
              <div className="row">
                <div className="col-12">
                  <div className="card shadow">
                    <div className="card-body">
                      <h4 className="card-title border-bottom">Tuition Information</h4>
                      <Form.Group className="mb-2">
                        <Form.Label>Expected Minimum Salary <span className="text-danger">*</span></Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Enter expected salary per month"
                          name="pin_code"

                          required
                        />

                      </Form.Group>


                      <Form.Group className="mb-2">
                        <Form.Label>Select Days per week <span className="text-danger">*</span></Form.Label>

                        <Form.Select
                          name="id_type"
                          required
                        >
                          <option disabled value="">
                            Choose Option
                          </option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                          <option value="7">7</option>
                        </Form.Select>



                      </Form.Group>


                      <div className="row mb-3">
                        <Form.Group className="mb-2 col-6">
                          <Form.Label>Preferred Medium Of Education<span className="text-danger">*</span></Form.Label>
                          <Form.Select
                            name="id_type"
                            required
                          >
                            <option disabled value="">
                              Choose Option
                            </option>
                            <option value="3">Bangla Medium</option>
                            <option value="4">English Medium</option>
                            <option value="5">Bangla & English Both</option>

                          </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3 col-6">
                          <Form.Label>Preferred Tuition Time <span className="text-danger">*</span></Form.Label>
                          <Form.Select
                            name="id_type"
                            required
                          >
                            <option disabled value="">
                              Choose Option
                            </option>
                            <option value="3">Morning</option>
                            <option value="4">Afternoon</option>
                            <option value="5">Evening</option>
                            <option value="5">After Magrib</option>

                          </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3 col-6">
                          <Form.Label>Preferred Tutoring Style <span className="text-danger">*</span></Form.Label>
                          <Form.Select
                            name="id_type"
                            required
                          >
                            <option disabled value="">
                              Choose Option
                            </option>
                            <option value="3"> Group Tuition</option>
                            <option value="4">Private Tuition</option>

                          </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-2">
                          <Form.Label>Preferred Classes <span className="text-danger">*</span></Form.Label>

                          <Form.Select
                            name="id_type"
                            required
                          >
                            <option disabled value="">
                              Choose Option
                            </option>
                            <option value="3">1</option>
                            <option value="3">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="7">8</option>
                            <option value="7">9</option>
                            <option value="7">10</option>
                            <option value="7">HSC 1st year</option>
                            <option value="7"> HSC 2nd year</option>
                          </Form.Select>



                        </Form.Group>
                      </div>


                      <Form.Group className="mb-3">
                        <Form.Label>Preferred Subjects <span className="text-danger">*</span></Form.Label>
                        <Form.Select
                          name="checkout_type"
                        >
                          <option disabled value="">
                            Select Subjects
                          </option>
                          <option value="24hrs">Bangla</option>
                          <option value="12pm">English</option>
                          <option value="hourly">General Math</option>
                          <option value="hourly">Higher Math</option>
                          <option value="hourly">Physics</option>
                          <option value="hourly">Chemistry</option>
                          <option value="hourly">Biology</option>
                        </Form.Select>
                      </Form.Group>
                      <>
                        <Form.Group className="mb-3">
                          <Form.Label>Preferred Areas to Teach <span className="text-danger">*</span></Form.Label>
                          <Form.Select
                            name="checkout_type"
                          >
                            <option disabled value="">
                              Select Area
                            </option>
                            <option value="24hrs">Uttora</option>
                            <option value="12pm">Mohakhali</option>
                            <option value="hourly">Adabor</option>
                            <option value="hourly">Mirpur</option>
                            <option value="hourly">Moghbazar</option>
                            <option value="hourly">Malibag</option>
                          </Form.Select>
                        </Form.Group>
                      </>


                      <div className="row">

                        <Form.Group className='mb-2 col-12'>

                        </Form.Group>


                      </div>

                    </div>
                  </div>
                </div>
              </div>

              {/* Educational Qualification */}
              <div className="row">
                <div className="col-12">
                  <div className="card shadow">
                    <div className="card-body">
                      <h4 className="card-title border-bottom">Educational Qualification</h4>

                      <div className="p-3">
                        <Table striped bordered hover>
                          <thead className="bg-light border-0">
                            <tr className="text-center">
                              <th className="fw-bolder">Exam Name</th>
                              <th className="fw-bolder">Year</th>
                              <th className="fw-bolder">Institute</th>
                              <th className="fw-bolder">Group/Subject</th>
                              <th className="fw-bolder">Result</th>
                            </tr>
                          </thead>
                          <tbody>
                          
                           
                                  <tr className="text-center" >
                                    {/* <td>{item.id}</td> */}
                                    <td>S.S.C</td>
                                    <td>2016</td>
                                    <td>Sristy Academic school</td>
                                    <td>Science</td>
                                    <td>5.00</td>
                                  </tr>

                                  <tr className="text-center" >
                                    {/* <td>{item.id}</td> */}
                                    <td>H.S.C</td>
                                    <td>2018</td>
                                    <td>Major General Mahmudul Hasan Adarsha College</td>
                                    <td>Science</td>
                                    <td>5.00</td>
                                  </tr>

                                  <tr className="text-center" >
                                    {/* <td>{item.id}</td> */}
                                    <td>Honours</td>
                                    <td>2nd year</td>
                                    <td>Hajee Mohammad Danesh Science and Technology University</td>
                                    <td>Chemistry</td>
                                    <td>3.5</td>
                                  </tr>
                               
                              
                          </tbody>
                        </Table>
                        {/* <hr /> */}
 

                      </div>

                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>


          <div className="row">
            <div className="col-12">
              <div className="text-end ">
                <Button type="submit" color="warning">
                  Create New Booking
                </Button>
              </div>
            </div>
          </div>
        </Form>
      </div>
    </>
  )
}

export default Teacher