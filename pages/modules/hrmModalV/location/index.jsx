import Link from 'next/link';
import React, { useCallback, useEffect, useState, Fragment } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import Axios from '../../../';
import ToastMessage from '../../../../components/Toast';
import DeleteIcon from '../../../../components/elements/DeleteIcon';
import EditIcon from '../../../../components/elements/EditIcon';
import ViewIcon from '../../../../components/elements/ViewIcon';
import { LOCATION_END_POINT } from "../../../../constants/api_endpoints/locationEndPoints";
import { CITY_END_POINT } from "../../../../constants/api_endpoints/cityEndPoints";
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

    const [locationDetails, setLocationDetails] = useState({
        name: "",
        status: "" || "true",
        city: ""
    });
    console.log(locationDetails);
    const [cityList, setAllCityList] = useState([]);

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


    const handleChange = (e) => {
        setLocationDetails(prev => ({
            ...prev, [e.target.name]: e.target.value
        }))
    }



    let dataset = { ...locationDetails };


    return (

        <Form validated={validated}>

            <div className="row">



                <div className="card-body">

                    <TextInput name="name" label="Location Name" placeholder="Location Name" onChange={handleChange} value={locationDetails.name} />
                    <div className="mb-3 row">
                        <Label text="City" />
                        <div className="col-sm-6">
                            <Select name="city" value={locationDetails.city} onChange={handleChange}>
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
                        <Label text="Status" />
                        <div className="col-sm-6">
                            <Select name="status" value={locationDetails.status} onChange={handleChange}>
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
    const [locationDetails, setLocationDetails] = useState({});
    const fetchLocation = useCallback(async () => {
        let isSubscribed = true;
        if (id) {
            const getTheLocation = await get(LOCATION_END_POINT.info(id));
            setLocationDetails(getTheLocation?.data);
        }

        return () => (isSubscribed = false);
    }, [id]);


    useEffect(() => {
        fetchLocation();
    }, [fetchLocation]);


    return (
        <div className="container-fluid ">
            <div className="row mt-3">

                <div className="col-lg-10 col-md-10 col-sm-10">
                    <div className="card">
                        <div className="card-body">

                            <div className="row">
                                <div className="col-lg-12 col-md-12 col-sm-12">
                                    <h3 className="box-title mt-5">Location Basic Info</h3>
                                    <div className="table-responsive">
                                        <table className="table">
                                            <tbody>
                                                <tr>
                                                    <td width={390}>Name</td>
                                                    <td>{locationDetails.name}</td>
                                                </tr>

                                                <tr>
                                                    <td>Status</td>
                                                    <td>
                                                        {locationDetails.status == true ?
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
                                                    <td>{moment(locationDetails?.createdAt).format('DD-MM-YYYY')}</td>
                                                </tr>
                                                <tr>
                                                    <td>Updated At</td>
                                                    <td>{moment(locationDetails?.updatedAt).format('DD-MM-YYYY')}</td>
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

    const [locationDetails, setLocationDetails] = useState({
        name: "",
        status: "" || "true",
    });
    const [cityList, setAllCityList] = useState([]);
    const handleChange = (e) => {
        setLocationDetails(prev => ({
            ...prev, [e.target.name]: e.target.value
        }))
    }


    useEffect(() => {
        const controller = new AbortController();
        const fetchTotalCities = async () => {
            let isSubscribed = true;
            try {
                const getAllList = await get(LOCATION_END_POINT.get());
                setAllCityList(getAllList?.data);

            } catch (error) {
                console.log("find the error");
            }

            return () => isSubscribed = false;
        }
        fetchTotalCities();
    }, [])


    const fetchLocation = useCallback(async () => {
        let isSubscribed = true;
        setLoading(true);
        if (id) {
            const getTheLocation = await get(LOCATION_END_POINT.info(id));
            setLocationDetails(prev => ({
                ...prev,
                name: getTheLocation?.data?.name,
                status: getTheLocation?.data?.status,
                city: getTheLocation?.data?.city?._id,
                // name: getTheLocation?.data?.city?.name,
            }));
            setLoading(false);
        }

        // setLoading(true);
        return () => (isSubscribed = false);
    }, [id]);


    useEffect(() => {
        fetchLocation();
    }, [fetchLocation]);

    let dataset = { ...locationDetails };


    return (
        <Form validated={validated}>

            <div className="row">






                <div className="card-body">

                    <TextInput name="name" label="Location Name" placeholder="Location Name" onChange={handleChange} defaultValue={locationDetails.name} />
                    <div className="mb-3 row">
                        <Label text="City" />
                        <div className="col-sm-6">
                            <Select name="city" defaultValue={{
                                value: locationDetails?.city?._id,
                                label: locationDetails?.city?.name,
                            }} onChange={handleChange}>
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
                        <Label text="Status" />
                        <div className="col-sm-6">
                            <Select name="status" value={locationDetails.status} onChange={handleChange}>
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

    const fetchLocatin = useCallback(async () => {

        let isSubscribed = true;
        const getTheLocation = await get(LOCATION_END_POINT.info(id));
        setName(getTheLocation?.data?.name)

        setLoading(true);
        return () => (isSubscribed = false);
    }, [id]);


    useEffect(() => {
        fetchLocatin();
    }, [fetchLocatin]);

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


const Managelocation = () => {


    const notify = useCallback((type, message) => {
        ToastMessage({ type, message });
    }, []);

    const [pending, setPending] = useState(false);
    const { data: locationList, isLoading, refetch: fetchLocationList } = useGetAllData(QUERY_KEYS.GET_ALL_LOCATION_LIST, LOCATION_END_POINT.get())

    //Form validation
    const [validated, setValidated] = useState(false);
    const [location_id, setLocationId] = useState('');

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
        setLocationId(id);
    };



    //Update Tower Modal form
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const handleExit = () => setShowUpdateModal(false);
    const handleOpen = (id) => {
        setShowUpdateModal(true);
        setLocationId(id);
    };


    //Delete  Modal
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    console.log(location_id);
    const handleExitDelete = () => setShowDeleteModal(false);
    const handleOpenDelete = (id) => {
        setShowDeleteModal(true);
        setLocationId(id);
        // console.log(id);
    }



    //create floor form
    const submitForm = async (items) => {
        let isSubscribed = true;
        setLoading(true);
        const response = await post(LOCATION_END_POINT.create(), items);
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

        fetchLocationList();


        return () => (isSubscribed = false);
    };






    //Update  form
    const updateForm = async (formData) => {
        let isSubscribed = true;
        setPending(true);
        const updateTheSubject = await put(LOCATION_END_POINT.update(location_id), formData);
        if (updateTheSubject.status === 'SUCCESS') {
            notify("success", updateTheSubject.message);
            // router.push(`/modules/hrmModalV/subject`);
            handleExit();
            setPending(false);
            setValidated(false);
        }

        else {
            notify("error", updateTheSubject.message);
            setPending(false);
            setValidated(true);
        }

        fetchLocationList();

        return () => (isSubscribed = false);
    };

    //Delete Subject
    const handleDelete = async (id) => {

        let isSubscribed = true;
        // setPending(true);
        const deleteLocation = await del(LOCATION_END_POINT.delete(id))

        if (deleteLocation.status === "SUCCESS") {
            notify("success", "successfully deleted!");
            handleExitDelete();
            setPending(false);

        }
        else {
            notify("error", "something went wron");
        }

        fetchLocationList();
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
            name: 'Location Code',
            selector: row => row.locationId,
            sortable: true,
        },
        {
            name: 'Name',
            selector: row => row.name,
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
                    <Link href="#" onClick={(e) => e.preventDefault()}>
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
            <HeadSection title="All Location-Details" />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="card shadow">

                            <div className="d-flex border-bottom title-part-padding align-items-center">
                                <div>
                                    <h4 class="card-title mb-0">All Location</h4>
                                </div>
                                <div className="ms-auto flex-shrink-0">
                                    <Button
                                        className="shadow rounded"
                                        variant="primary"
                                        type="button"
                                        // onClick={handleShow}
                                        onClick={(e) => e.preventDefault(), handleShow}
                                        block
                                    >
                                        Add Location
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
                                    <Modal.Title>Create Location</Modal.Title>
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
                                <ViewForm id={location_id} pending={pending} />
                            </Modal>
                            {/* view Modal Form end */}



                            {/* Update Modal Form */}
                            <Modal
                                dialogClassName="modal-sm"
                                show={showUpdateModal}
                                onHide={handleExit}
                            >
                                <Modal.Header closeButton>
                                    <Modal.Title>Update Subject</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <EditForm
                                        onSubmit={updateForm}
                                        id={location_id}
                                        pending={pending}
                                        validated={validated}
                                    />
                                </Modal.Body>
                            </Modal>
                            {/* End Update Modal Form */}


                            {/* Delete Modal Form */}
                            <Modal show={showDeleteModal} onHide={handleExitDelete}>
                                <Modal.Header closeButton></Modal.Header>
                                <DeleteComponent onSubmit={handleDelete} id={location_id} pending={pending} />
                            </Modal>




                            <div className="card-body">
                                <div className="">
                                    <DataTable
                                        columns={columns}
                                        data={locationList?.data}
                                        pagination
                                        highlightOnHover
                                        subHeader
                                        // conditionalRowStyles={conditionalRowStyles}
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

export default Managelocation