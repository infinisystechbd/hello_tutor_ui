import Link from 'next/link';
import React, { useCallback, useEffect, useState, Fragment } from 'react';
import { Button, Modal, Form, Table } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import Axios from '../../../';
import ToastMessage from '../../../../components/Toast';
import DeleteIcon from '../../../../components/elements/DeleteIcon';
import EditIcon from '../../../../components/elements/EditIcon';
import ViewIcon from '../../../../components/elements/ViewIcon';
import { GUARDIAN_END_POINT } from '../../../../constants/api_endpoints/guardianEndPoints';
import { CATEGORIE_END_POINT } from '../../../../constants/api_endpoints/categorieEndPoints';
import { LOCATION_END_POINT } from "../../../../constants/api_endpoints/locationEndPoints";
import { CITY_END_POINT } from "../../../../constants/api_endpoints/cityEndPoints";
import { CLASS_END_POINT } from "../../../../constants/api_endpoints/classEndPoints";
import { TUTOR_END_POINT } from "../../../../constants/api_endpoints/tutorEndPoints";
import { SUBJECT_END_POINT } from "../../../../constants/api_endpoints/subectEndPoints";
import { JOB_REQUEST_END_POINT } from "../../../../constants/api_endpoints/jobRequestEndPoints";
import { QUERY_KEYS } from "../../../../constants/queryKeys";
import { del, get, post, put } from '../../../../helpers/api_helper';
import { useGetAllData } from "../../../../utils/hooks/useGetAllData";
import HeadSection from '../../../../components/HeadSection';
import Select from '../../../../components/elements/Select';
import Select2 from '../../../../components/elements/Select2';
import TextInput from '../../../../components/elements/TextInput';
import Label from '../../../../components/elements/Label';
import moment from 'moment';
import RadioButton from '../../../../components/elements/RadioButton';
import { DatePicker } from 'antd';
import { TimePicker } from 'antd';
import { format } from 'date-fns';
import dayjs from 'dayjs';







//Create Component
const CreateForm = ({ onSubmit, loading, validated }) => {
  const notify = React.useCallback((type, message) => {
    toast({ type, message });
  }, []);


  const [cityList, setAllCityList] = useState([]);
  const [locationList, setAllLocationList] = useState([]);
  const [hireDate, setHireDate] = useState(null);
  const [hireTime, setHireTime] = useState(null);
  const [allGuardianList, setAllGuardianList] = useState([]);
  const [allCategoryList, setAllCategoryList] = useState([]);
  const [allClassesList, setAllClassesList] = useState([]);
  const [allClasses, setAllClasses] = useState([]);
  const [allSubjectList, setAllSubjectList] = useState([]);
  const [allSubjects, setAllSubjects] = useState([]);

  const [guardianDetails, setGuardianDetails] = useState({
    guardian: "",
    category: "",
    noOfStudent: null,
    // class: "",
    // subject:"",
    // class:allClasses,
    // subject:allSubjects,
    studentGender: "",
    city: "",
    location: "",
    address: "",
    teacherGender: "",
    daysPerWeek: "",
    preferenceInstitute: "",
    salary: "",
    // hireDate:hireDate,
    // tutoringTime:hireTime,
    requirement: "",
    status: "",

  });


  const [tutorDetails, setTutorDetails] = useState({
    teacherGender: "",
    daysPerWeek: "",
    preferenceInstitute: "",
    salary: "",
    hireDate: hireDate,
    tutoringTime: hireTime,
    requirement: "",
    status: "",


    // class:allClasses

  });
  // console.log(tutorDetails);

  const handleChange = (e) => {
    setGuardianDetails(prev => ({
      ...prev, [e.target.name]: e.target.value
    }));

    setTutorDetails(prev => ({
      ...prev, [e.target.name]: e.target.value
    }))
  }

  const onSelectCLass = (e) => {
    setAllClasses([])
    e.map((x) => {
      setAllClasses(cls => [
        ...cls,
        { classId: x.value }
      ])
    })

  }

  const onSelectSubject = (e) => {
    setAllSubjects([])
    e.map((x) => {
      setAllSubjects(cls => [
        ...cls,
        { classId: x.value }
      ])
    })

  }


  useEffect(() => {
    const controller = new AbortController();
    const fetchTotalGuardian = async () => {
      let isSubscribed = true;
      try {
        const getAllGuardianList = await get(GUARDIAN_END_POINT.get());
        setAllGuardianList(getAllGuardianList?.data);

      } catch (error) {
        console.log("find the error");
      }

      return () => isSubscribed = false;
    }
    fetchTotalGuardian();
  }, [])


  useEffect(() => {
    const controller = new AbortController();
    const fetchTotalCategory = async () => {
      let isSubscribed = true;
      try {
        const getAllCategoryList = await get(CATEGORIE_END_POINT.get());
        setAllCategoryList(getAllCategoryList?.data);

      } catch (error) {
        console.log("find the error");
      }

      return () => isSubscribed = false;
    }
    fetchTotalCategory();
  }, [])

  useEffect(() => {
    const controller = new AbortController();
    const fetchTotalClasses = async () => {
      let isSubscribed = true;
      try {
        const getAllClassList = await get(CLASS_END_POINT.get());
        setAllClassesList(getAllClassList?.data);

      } catch (error) {
        console.log("find the error");
      }

      return () => isSubscribed = false;
    }
    fetchTotalClasses();
  }, [])


  useEffect(() => {
    const controller = new AbortController();
    const fetchTotalSubject = async () => {
      let isSubscribed = true;
      try {
        const getAllSubjectList = await get(SUBJECT_END_POINT.get());
        setAllSubjectList(getAllSubjectList?.data);

      } catch (error) {
        console.log("find the error");
      }

      return () => isSubscribed = false;
    }
    fetchTotalSubject();
  }, [])



  useEffect(() => {
    const controller = new AbortController();
    const fetchTotalCities = async () => {
      let isSubscribed = true;
      try {
        const getAllList = await get(CITY_END_POINT.get());
        setAllCityList(getAllList?.data);

      } catch (error) {
        console.log("find the error");
      }

      return () => isSubscribed = false;
    }
    fetchTotalCities();
  }, [])



  useEffect(() => {
    const controller = new AbortController();
    const fetchTotalLocation = async () => {
      let isSubscribed = true;
      try {
        const getAllLocationList = await get(LOCATION_END_POINT.get());
        setAllLocationList(getAllLocationList?.data);

      } catch (error) {
        console.log("find the error");
      }

      return () => isSubscribed = false;
    }
    fetchTotalLocation();
  }, [])


  let dataset = { ...guardianDetails, class:allClasses, subject:allSubjects, hireDate, hireTime };

  console.log("dataset", dataset);


  return (

    <div className="container-fluid ">
      <Form id="customerForm" noValidate >

        <div className="row">
          <div className="col-12 col-md-7">
            <div className="row">
              <div className="col-12">
                <div className="card shadow">
                  <div className="card-body">
                    <h4 className="card-title border-bottom"> Guardian Information</h4>

                    <Form.Group >
                      <Form.Label>Guardian  <span className="text-danger">*</span></Form.Label>


                      <Select name="guardian" value={guardianDetails.guardian} onChange={handleChange}>
                        <option value="" disabled>Select guardian</option>
                        {
                          allGuardianList?.map((guardian, index) => (
                            <Fragment key={index}>
                              <option value={guardian._id} selected>{guardian.fullName}</option>
                            </Fragment>
                          ))
                        }
                      </Select>
                    </Form.Group>




                    <div className="row">
                      <Form.Group className="mb-2 col-6" >
                        <Form.Label>Category  <span className="text-danger">*</span></Form.Label>
                        <Select name="category" value={guardianDetails.category} onChange={handleChange}>
                          <option value="" disabled>Select guardian</option>
                          {
                            allCategoryList?.map((category, index) => (
                              <Fragment key={index}>
                                <option value={category._id} selected>{category.name}</option>
                              </Fragment>
                            ))
                          }
                        </Select>
                      </Form.Group>

                      <Form.Group className="mb-2 col-6" >
                        <Form.Label>Number of Students  <span className="text-danger">*</span></Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Enter expected salary per month"
                          name="noOfStudent"
                          value={guardianDetails.noOfStudent}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </div>

                    <Form.Group >
                      <Form.Label>Class/Course  <span className="text-danger">*</span></Form.Label>
                      <Select2 placeholder="Select class" isMulti
                        options={allClassesList && allClassesList.map(({ _id, name }) => ({
                          value: _id,
                          label: name,
                        }))}
                        onChange={onSelectCLass}
                      />

                      {/* <Select name="class" value={guardianDetails.class} onChange={handleChange}>
                        <option value="" disabled>Select guardian</option>
                        {
                          allClassesList?.map((classes, index) => (
                            <Fragment key={index}>
                              <option value={classes._id} selected>{classes.name}</option>
                            </Fragment>
                          ))
                        }
                      </Select> */}
                    </Form.Group>

                    <Form.Group >
                      <Form.Label>Required Subjects  <span className="text-danger">*</span></Form.Label>
                      <Select2 placeholder="Select class" isMulti
                        options={allSubjectList && allSubjectList.map(({ _id, name }) => ({
                          value: _id,
                          label: name,
                        }))}
                        onChange={onSelectSubject}
                      />

                      {/* <Select name="subject" value={guardianDetails.subject} onChange={handleChange}>
                        <option value="" disabled>Select Subjects</option>
                        {
                          allSubjectList?.map((subject, index) => (
                            <Fragment key={index}>
                              <option value={subject._id} selected>{subject.name}</option>
                            </Fragment>
                          ))
                        }
                      </Select> */}

                    </Form.Group>



                    <div className="row mb-2">

                      <Form.Group className="mb-2" >
                        <Form.Label>Gender <span className="text-danger">*</span></Form.Label>

                        <div className="flex-gap align-items-center">

                          <RadioButton
                            id="male"
                            label="Male"
                            name="studentGender"
                            value="male"
                            checked={guardianDetails?.studentGender == "male"}
                            onChange={handleChange}

                          />

                          <RadioButton
                            id="female"
                            label="Female"
                            name="studentGender"
                            value="female"
                            checked={guardianDetails?.studentGender == "female"}
                            onChange={handleChange}

                          />

                          <RadioButton
                            id="other"
                            label="Other"
                            name="studentGender"
                            value="other"
                            checked={guardianDetails?.studentGender == "other"}
                            onChange={handleChange}

                          />

                        </div>

                      </Form.Group>



                    </div>



                    {/* show state city or selected */}
                    <div className="row">
                      <Form.Group className="mb-2 col-6">
                        <Form.Label>City <span className="text-danger">*</span></Form.Label>
                        <Select name="city" value={guardianDetails.city} onChange={handleChange}>
                          <option value="" disabled>Select City</option>
                          {
                            cityList?.map((city, index) => (
                              <Fragment key={index}>
                                <option value={city._id} selected>{city.name}</option>
                              </Fragment>
                            ))
                          }
                        </Select>

                      </Form.Group>

                      <Form.Group className="mb-2 col-6">
                        <Form.Label>Location <span className="text-danger">*</span></Form.Label>

                        <Select name="location" value={guardianDetails.location} onChange={handleChange}>
                          <option value="" disabled>Select Location</option>
                          {
                            locationList?.map((location, index) => (
                              <Fragment key={index}>
                                <option value={location._id} selected>{location.name}</option>
                              </Fragment>
                            ))
                          }
                        </Select>

                      </Form.Group>
                    </div>



                    <Form.Group className="mb-2">
                      <Form.Label>Address <span className="text-danger">*</span></Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Enter Full Address"
                        name="address"
                        value={guardianDetails.address}
                        onChange={handleChange}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Please enter full permanent address.
                      </Form.Control.Feedback>
                    </Form.Group>


                    <div className='mb-5'></div>

                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* teacherGender */}

          <div className="col-12 col-md-5">
            <div className="row">
              <div className="col-12">
                <div className="card shadow">
                  <div className="card-body">
                    <h4 className="card-title border-bottom">Tutor Information</h4>
                    <div className="row mb-2">

                      <Form.Group className="mb-2" >
                        <Form.Label>Gender <span className="text-danger">*</span></Form.Label>

                        <div className="flex-gap align-items-center">

                          <RadioButton
                            id="male"
                            label="Male"
                            value="male"
                            name="teacherGender"
                            checked={guardianDetails?.teacherGender == "male"}
                            onChange={handleChange}

                          />

                          <RadioButton
                            id="female"
                            label="Female"
                            value="female"
                            name="teacherGender"
                            checked={guardianDetails?.teacherGender == "female"}
                            onChange={handleChange}

                          />

                          <RadioButton
                            id="other"
                            label="Other"
                            value="other"
                            name="teacherGender"
                            checked={guardianDetails?.teacherGender == "other"}
                            onChange={handleChange}

                          />

                        </div>

                      </Form.Group>






                    </div>
                    <Form.Group className="mb-2">
                      <Form.Label>Days / Week <span className="text-danger">*</span></Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Enter expected salary per month"
                        name="daysPerWeek"
                        value={guardianDetails.daysPerWeek}
                        onChange={handleChange}
                        required
                      />

                    </Form.Group>


                    <Form.Group className="mb-2">
                      <Form.Label>Preference Institute Name <span className="text-danger">*</span></Form.Label>

                      <Form.Control
                        type="text"
                        placeholder="Enter expected salary per month"
                        name="preferenceInstitute"
                        value={guardianDetails.preferenceInstitute}
                        onChange={handleChange}

                        required
                      />

                    </Form.Group>



                    <Form.Group className="mb-2">
                      <Form.Label>Salary (BDT) <span className="text-danger">*</span></Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Enter expected salary per month"
                        name="salary"
                        value={guardianDetails.salary}
                        onChange={handleChange}

                        required
                      />

                    </Form.Group>

                    <Form.Group className="mb-2">
                      <Form.Label>Hire Date <span className="text-danger">*</span></Form.Label>
                      <DatePicker
                        style={{ width: '320px', height: '40px' }}
                        onChange={(event) => {
                          setHireDate(format(new Date(event), 'yyyy-MM-dd'));
                        }} />

                    </Form.Group>

                    <Form.Group className="mb-2">
                      <Form.Label>Hire Date <span className="text-danger">*</span></Form.Label>
                      <TimePicker
                        onChange={(event) => {
                          setHireTime(format(new Date(event), 'HH:mm'));
                        }} />
                      {/* defaultOpenValue={dayjs('00:00:00', 'HH:mm:ss')}  */}



                    </Form.Group>




                    <Form.Group className="mb-2">
                      <Form.Label>More Requirement <span className="text-danger">*</span></Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={2}
                        placeholder="Enter Full requirement"
                        name="requirement"
                        value={guardianDetails.requirement}
                        onChange={handleChange}

                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Please enter Requirement.
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group >
                      <Form.Label>Status  <span className="text-danger">*</span></Form.Label>
                      <Select name="status" value={guardianDetails.status} onChange={handleChange} >
                        <option value="" disabled>select activation type</option>
                        <option value="true" selected>Active</option>
                        <option value="false">Inactive</option>
                      </Select>
                    </Form.Group>



                  </div>
                </div>
              </div>
            </div>



          </div>
        </div>


        <div className="row">
          <div className="col-12">
            <div className="text-end ">
              <Button
                variant="primary"
                className="shadow rounded mb-3"
                disabled={loading}
                style={{ marginTop: "5px" }}
                type="button"
                onClick={() => onSubmit(dataset)}
                block

              >
                Create
              </Button>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
};



const ManageRequestTutor = () => {
  const notify = useCallback((type, message) => {
    ToastMessage({ type, message });
  }, []);

  const [pending, setPending] = useState(false);
  const { data: tutorRequestList, isLoading, refetch: fetchTutorRequestList } = useGetAllData(QUERY_KEYS.GET_ALL_TUTOR_REQUEST_LIST, JOB_REQUEST_END_POINT.get());

  //Form validation
  const [validated, setValidated] = useState(false);
  const [tutor_request_id, setTutorRequestId] = useState('');

  //   Create Modal
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


      //create floor form
      const submitForm = async (items) => {
        let isSubscribed = true;
        setLoading(true);
        const response = await post(JOB_REQUEST_END_POINT.create(), items);
        if (response.status === "SUCCESS") {
            notify("success", response.message);
            // router.push(`/modules/hrmModalV/subject`);
            handleClose();
            setLoading(false);
            setValidated(false);
        }
        else {
            notify("error", response.errorMessage);
            setLoading(false);
            setValidated(true);
        }

        fetchTutorRequestList();

        return () => (isSubscribed = false);
    };





  const columns = [
    {
      name: <span className="fw-bold">SL</span>,
      selector: (row, index) => index + 1,
      sortable: true,
      width: "70px",
    },
    {
      name: 'Tutor Id',
      selector: row => row.tutorId,
      sortable: true,
    },
    {
      name: 'Tutor Name',
      selector: row => row.fullName,
      sortable: true,
    },
    {
      name: 'Tutor Phone',
      selector: row => row.phone,
      sortable: true,
    },
    {
      name: 'Tutor Address',
      selector: row => row.address,
      sortable: true,
    },
    {
      name: 'Status',
      selector: row => row.status = true ? "Active" : "Inactive",
      sortable: true,
    },
    {
      name: 'Action',
      selector: row => actionButton(row._id),
    }

  ];


  const actionButton = (id) => {
    // console.log(id);
    return <>
      <ul className="action align-items-center">

        <li>
          <Link href="#" >
            <a onClick={() => handleOpen(id)}>
              <EditIcon />
            </a>
          </Link>

        </li>

        <li>
          <Link href="#">
            <a onClick={() => handleViewOpen(id)}>
              <ViewIcon />
            </a>
          </Link>

        </li>
        <li>
          <Link href="#">
            <a onClick={() => handleOpenDelete(id)} >
              <DeleteIcon />
            </a>
          </Link>

        </li>

      </ul>
    </>
  }

  return (
    <>
      <HeadSection title="All TUTOR-Details" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="card shadow">

              <div className="d-flex border-bottom title-part-padding align-items-center">
                <div>
                  <h4 class="card-title mb-0">All TUTOR</h4>
                </div>
                <div className="ms-auto flex-shrink-0">
                  <Button
                    className="shadow rounded"
                    variant="primary"
                    type="button"
                    onClick={handleShow}
                    block
                  >
                    Add TUTOR
                  </Button>

                </div>
              </div>

              {/* Create Modal Form */}

              <Modal
                dialogClassName="modal-lg"
                show={show}
                onHide={handleClose}
              >
                <Modal.Header closeButton>
                  <Modal.Title>Create Tutor Request</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <CreateForm
                  onSubmit={submitForm}
                  loading={loading}
                  validated={validated}
                  />
                </Modal.Body>
              </Modal>
              {/* End Create Modal Form */}




              <div className="card-body">
                <div className="">
                  <DataTable
                    columns={columns}
                    data={tutorRequestList?.data}
                    pagination
                    highlightOnHover
                    subHeader
                    progressPending={isLoading}
                    subHeaderComponent={
                      <input
                        type="text"
                        placeholder="search by subject code"
                        className="w-25 form-control search-input_RESERVATIONS"
                      />
                    }
                    striped
                  />
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ManageRequestTutor