import Link from 'next/link';
import React, { useCallback, useEffect, useState, Fragment } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import Axios from '../../../';
import ToastMessage from '../../../../components/Toast';
import DeleteIcon from '../../../../components/elements/DeleteIcon';
import EditIcon from '../../../../components/elements/EditIcon';
import ViewIcon from '../../../../components/elements/ViewIcon';
import { GUARDIAN_END_POINT } from '../../../../constants/api_endpoints/guardianEndPoints';
import { LOCATION_END_POINT } from "../../../../constants/api_endpoints/locationEndPoints";
import { CITY_END_POINT } from "../../../../constants/api_endpoints/cityEndPoints";
import { TUTOR_END_POINT } from "../../../../constants/api_endpoints/tutorEndPoints";
import { QUERY_KEYS } from "../../../../constants/queryKeys";
import { del, get, post, put } from '../../../../helpers/api_helper';
import { useGetAllData } from "../../../../utils/hooks/useGetAllData";
import HeadSection from '../../../../components/HeadSection';
import Select from '../../../../components/elements/Select';
import Select2 from '../../../../components/elements/Select2';
import TextInput from '../../../../components/elements/TextInput';
import Label from '../../../../components/elements/Label';
import moment from 'moment';


//Create Component
const CreateForm = ({ onSubmit, loading, validated }) => {
    const notify = React.useCallback((type, message) => {
        toast({ type, message });
    }, []);

    const [cityList, setAllCityList] = useState([]);
    const [locationList, setAllLocationList] = useState([]);
    const [tutorDetails, setTutorDetails] = useState({
        fullName: "",
        phone: "",
        city: "",
        location: "",
        address: "",
        email: "",
        isPortalAccess: "false",
        status: "" || "true"
    });


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


    const handleChange = (e) => {
        setTutorDetails(prev => ({
            ...prev, [e.target.name]: e.target.value
        }))
    }


    let dataset = { ...tutorDetails };


    return (

        <Form validated={validated}>

            <div className="row">
                <div className="card-body">

                    <TextInput label="Student Name" value={tutorDetails.name} placeholder="Student Name" name="fullName" onChange={handleChange} />
                    <TextInput label="Phone Number" value={tutorDetails.phone} placeholder="Phone Number" name="phone" onChange={handleChange} />
                    <div className="mb-3 row">
                        <Label text="City" />
                        <div className="col-sm-6">
                            <Select name="city" value={tutorDetails.city} onChange={handleChange}>
                                <option value="" disabled>Select country</option>
                                {
                                    cityList?.map((city, index) => (
                                        <Fragment key={index}>
                                            <option value={city._id} selected>{city.name}</option>
                                        </Fragment>
                                    ))
                                }
                            </Select>
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <Label text="Location" />
                        <div className="col-sm-6">
                            <Select name="location" value={tutorDetails.location} onChange={handleChange}>
                                <option value="" disabled>Select Location</option>
                                {
                                    locationList?.map((locn, index) => (
                                        <Fragment key={index}>
                                            <option value={locn._id} selected>{locn.name}</option>
                                        </Fragment>
                                    ))
                                }
                            </Select>
                        </div>
                    </div>
                    <TextInput label="Address" value={tutorDetails.address} placeholder="Phone Number" name="address" onChange={handleChange} />
                    <TextInput label="Email" value={tutorDetails.email} placeholder="Email" name="email" onChange={handleChange} />
                    <div className="mb-3 row">
                        <Label text="Status" />
                        <div className="col-sm-6">
                            <Select name="status" value={tutorDetails.status} onChange={handleChange} >
                                <option value="" disabled>select activation type</option>
                                <option value="true" selected>Active</option>
                                <option value="false">Inactive</option>
                            </Select>
                        </div>
                    </div>
                </div>

            </div>


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
        </Form>
    );
};


//view component
const ViewForm = ({ id, pending, validated }) => {


    const [loading, setLoading] = useState(true);
    const [tutorDetails, setTutorDetails] = useState({});
    const fetchTutor = useCallback(async () => {
        let isSubscribed = true;
        if (id) {
            const getTheTutor = await get(TUTOR_END_POINT.info(id));
            setTutorDetails(getTheTutor?.data);
        }

        return () => (isSubscribed = false);
    }, [id]);


    useEffect(() => {
        fetchTutor();
    }, [fetchTutor]);


    return (
        <div className="container-fluid ">
            <div className="row mt-3">

                <div className="col-lg-10 col-md-10 col-sm-10">
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-lg-12 col-md-12 col-sm-12">
                                    <h3 className="box-title mt-5">Tutor Info</h3>
                                    <div className="table-responsive">
                                        <table className="table">
                                            <tbody>
                                                <tr>
                                                    <td width={390}>TutorId Id</td>
                                                    <td>{tutorDetails.tutorId}</td>
                                                </tr>
                                                <tr>
                                                    <td width={390}>Name</td>
                                                    <td>{tutorDetails.fullName}</td>
                                                </tr>

                                                <tr>
                                                    <td width={390}>Phone</td>
                                                    <td>{tutorDetails.phone}</td>
                                                </tr>

                                                <tr>
                                                    <td width={390}>Email</td>
                                                    <td>{tutorDetails.email}</td>
                                                </tr>
                                                <tr>
                                                    <td width={390}>Address</td>
                                                    <td>{tutorDetails.address}</td>
                                                </tr>
                                                <tr>
                                                    <td>Status</td>
                                                    <td>
                                                        {tutorDetails.status == true ?
                                                            <button className="btn btn-primary">Active</button> :
                                                            <button className="btn btn-danger">Inactive</button>
                                                        }
                                                    </td>
                                                </tr>

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-12 col-md-12 col-sm-12">
                                    <h3 className="box-title mt-5">Creation/updation related info</h3>
                                    <div className="table-responsive">
                                        <table className="table">
                                            <tbody>

                                                <tr>
                                                    <td>Created At</td>
                                                    <td>{moment(tutorDetails?.createdAt).format('DD-MM-YYYY')}</td>
                                                </tr>
                                                <tr>
                                                    <td>Updated At</td>
                                                    <td>{moment(tutorDetails?.updatedAt).format('DD-MM-YYYY')}</td>
                                                </tr>

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};



//Update component
const EditForm = ({ onSubmit, id, pending, validated }) => {
    const [loading, setLoading] = useState(true);

    const [cityList, setAllCityList] = useState([]);
    const [locationList, setAllLocationList] = useState([]);

    const [tutorDetails, setTutorDetails] = useState({
        fullName: "",
        phone: "",
        city: "",
        location: "",
        address: "",
        email: "",
        isPortalAccess: "false",
        status: "" || "true"
    });


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


    const handleChange = (e) => {
        setTutorDetails(prev => ({
            ...prev, [e.target.name]: e.target.value
        }))
    }
    const fetchTutor = useCallback(async () => {
        let isSubscribed = true;
        setLoading(true);
        if (id) {
            const getTheTutor = await get(TUTOR_END_POINT.info(id));
            console.log(getTheTutor);
            setTutorDetails(prev => ({
                ...prev,
                fullName: getTheTutor?.data?.fullName,
                phone: getTheTutor?.data?.phone,
                city: getTheTutor?.data?.city?._id,
                location: getTheTutor?.data?.location?._id,
                address: getTheTutor?.data?.address,
                email: getTheTutor?.data?.email,
                isPortalAccess: getTheTutor?.data?.isPortalAccess,
                status: getTheTutor?.data?.status,
                // name: getTheTutor?.data?.city?.name,
            }));
            setLoading(false);
        }

        // setLoading(true);
        return () => (isSubscribed = false);
    }, [id]);


    useEffect(() => {
        fetchTutor();
    }, [fetchTutor]);

    let dataset = { ...tutorDetails };


    return (
        <Form validated={validated}>

            <div className="row">

                <TextInput label="Student Name" value={tutorDetails.fullName} placeholder="Student Name" name="fullName" onChange={handleChange} />
                <TextInput label="Phone Number" value={tutorDetails.phone} placeholder="Phone Number" name="phone" onChange={handleChange} />
                <div className="mb-3 row">
                    <Label text="City" />
                    <div className="col-sm-6">
                        <Select name="city" defaultValue={{
                            value: tutorDetails?.city?._id,
                            label: tutorDetails?.city?.name,
                        }} onChange={handleChange}>
                            <option value="" disabled>Select country</option>
                            {
                                cityList?.map((city, index) => (
                                    <Fragment key={index}>
                                        <option value={city._id} selected>{city.name}</option>
                                    </Fragment>
                                ))
                            }
                        </Select>
                    </div>
                </div>
                <div className="mb-3 row">
                    <Label text="Location" />
                    <div className="col-sm-6">
                        <Select name="location" defaultValue={{
                            value: tutorDetails?.location?._id,
                            label: tutorDetails?.location?.name,
                        }} onChange={handleChange}>
                            <option value="" disabled>Select Location</option>
                            {
                                locationList?.map((locn, index) => (
                                    <Fragment key={index}>
                                        <option value={locn._id} selected>{locn.name}</option>
                                    </Fragment>
                                ))
                            }
                        </Select>
                    </div>
                </div>
                <TextInput label="Address" value={tutorDetails.address} placeholder="Phone Number" name="address" onChange={handleChange} />
                <TextInput label="Email" value={tutorDetails.email} placeholder="Email" name="email" onChange={handleChange} />
                <div className="mb-3 row">
                    <Label text="Status" />
                    <div className="col-sm-6">
                        <Select name="status" value={tutorDetails.status} onChange={handleChange} >
                            <option value="" disabled>select activation type</option>
                            <option value="true" selected>Active</option>
                            <option value="false">Inactive</option>
                        </Select>
                    </div>
                </div>





            </div>


            <Button
                variant="primary"
                className="shadow rounded mb-3"
                // disabled={pending || loading}
                style={{ marginTop: "5px" }}
                type="button"
                onClick={() => onSubmit(dataset)}
                block
            >
                update
            </Button>
        </Form>
    );
};


//Delete component
const DeleteComponent = ({ onSubmit, id, pending }) => {

    const [name, setName] = useState("");
    const [loading, setLoading] = useState(true);

    const fetchTutor = useCallback(async () => {

        let isSubscribed = true;
        const getTheTutor = await get(TUTOR_END_POINT.info(id));
        setName(getTheTutor?.data?.fullName)

        setLoading(true);
        return () => (isSubscribed = false);
    }, [id]);


    useEffect(() => {
        fetchTutor();
    }, [fetchTutor]);

    let myFormData = new FormData();
    myFormData.append("id", id);

    return (
        <>
            <Modal.Body>
                <Modal.Title>Are you sure to delete {name} ?</Modal.Title>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant="danger"
                    disabled={pending}
                    onClick={() => onSubmit(id)}
                >
                    Delete
                </Button>
            </Modal.Footer>
        </>
    );
};



const ManageTutor = () => {

    const notify = useCallback((type, message) => {
        ToastMessage({ type, message });
    }, []);

    const [pending, setPending] = useState(false);
    const { data: tutorList, isLoading, refetch: fetchTutorList } = useGetAllData(QUERY_KEYS.GET_ALL_TUTOR_LIST, TUTOR_END_POINT.get());
    const data = tutorList?.data;


    //Form validation
    const [validated, setValidated] = useState(false);
    const [tutor_id, setTutorId] = useState('');

    //   Create Modal
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    //View  Modal form
    const [showViewModal, setShowViewModal] = useState(false);
    const handleExitView = () => setShowViewModal(false);
    const handleViewOpen = (id) => {
        setShowViewModal(true);
        setTutorId(id);
    };


    //Update  Modal form
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const handleExit = () => setShowUpdateModal(false);
    const handleOpen = (id) => {
        setShowUpdateModal(true);
        setTutorId(id);
    };


    //Delete  Modal
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleExitDelete = () => setShowDeleteModal(false);
    const handleOpenDelete = (id) => {
        setShowDeleteModal(true);
        setTutorId(id);

    }



    //create floor form
    const submitForm = async (items) => {
        let isSubscribed = true;
        setLoading(true);
        const response = await post(TUTOR_END_POINT.create(), items);
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

        fetchTutorList();

        return () => (isSubscribed = false);
    };



    //Update  form
    const updateForm = async (formData) => {
        let isSubscribed = true;
        setPending(true);
        const updateTheTutor = await put(TUTOR_END_POINT.update(tutor_id), formData);
        if (updateTheTutor.status === 'SUCCESS') {
            notify("success", updateTheTutor.message);
            // router.push(`/modules/hrmModalV/subject`);
            handleExit();
            setPending(false);
            setValidated(false);
        }

        else {
            notify("error", updateTheTutor.message);
            setPending(false);
            setValidated(true);
        }

        fetchTutorList();

        return () => (isSubscribed = false);
    };


    //Delete Subject
    const handleDelete = async (id) => {

        let isSubscribed = true;
        const deleteTutor = await del(TUTOR_END_POINT.delete(id))

        if (deleteTutor.status === "SUCCESS") {
            notify("success", "successfully deleted!");
            handleExitDelete();
            setPending(false);

        }
        else {
            notify("error", "something went wrong");
        }

        fetchTutorList();
        return () => isSubscribed = false;
    }


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
                                dialogClassName="modal-sm"
                                show={show}
                                onHide={handleClose}
                            >
                                <Modal.Header closeButton>
                                    <Modal.Title>Create Tutor</Modal.Title>
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



                            {/* View Modal Form */}
                            <Modal dialogClassName="modal-sm" show={showViewModal} onHide={handleExitView}>
                                <Modal.Header closeButton></Modal.Header>
                                <ViewForm id={tutor_id} pending={pending} />
                            </Modal>
                            {/* view Modal Form end */}


                            {/* Update Modal Form */}
                            <Modal
                                dialogClassName="modal-sm"
                                show={showUpdateModal}
                                onHide={handleExit}
                            >
                                <Modal.Header closeButton>
                                    <Modal.Title>Update Guardian</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <EditForm
                                        onSubmit={updateForm}
                                        id={tutor_id}
                                        pending={pending}
                                        validated={validated}
                                    />
                                </Modal.Body>
                            </Modal>
                            {/* End Update Modal Form */}



                            {/* Delete Modal Form */}
                            <Modal show={showDeleteModal} onHide={handleExitDelete}>
                                <Modal.Header closeButton></Modal.Header>
                                <DeleteComponent onSubmit={handleDelete} id={tutor_id} pending={pending} />
                            </Modal>


                            <div className="card-body">
                                <div className="">
                                    <DataTable
                                        columns={columns}
                                        data={tutorList?.data}
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

export default ManageTutor