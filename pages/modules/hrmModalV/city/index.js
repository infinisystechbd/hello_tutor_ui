import Link from 'next/link';
import React, { useCallback, useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import Axios from '../../../';
import ToastMessage from '../../../../components/Toast';
import DeleteIcon from '../../../../components/elements/DeleteIcon';
import EditIcon from '../../../../components/elements/EditIcon';
import ViewIcon from '../../../../components/elements/ViewIcon';
import HeadSection from '../../../../components/HeadSection';
import { del, get, post, put } from '../../../../helpers/api_helper';
import { CITY_END_POINT } from '../../../../constants/api_endpoints/cityEndPoints';
import { QUERY_KEYS } from "../../../../constants/queryKeys";
import { useGetAllData } from "../../../../utils/hooks/useGetAllData";
import Select from '../../../../components/elements/Select';
import TextInput from '../../../../components/elements/TextInput';
import Label from "../../../../components/elements/Label";
import moment from 'moment';






//Create Component
const CreateForm = ({ onSubmit, loading, validated }) => {
    const notify = React.useCallback((type, message) => {
        toast({ type, message });
    }, []);

    const [cityDetails, setCityDetails] = useState({
        name: "",
        status: "" || "true",
    });


    const handleChange = (e) => {
        setCityDetails(prev => ({
            ...prev, [e.target.name]: e.target.value
        }))
    }


    let dataset = { ...cityDetails };


    return (

        <Form validated={validated}>

            <div className="row">
                <div className="col-md-10">




                    <div className="card-body">

                        <TextInput name="name" label="City Name" placeholder="City Name" onChange={handleChange} value={cityDetails.name} />


                        <div className="mb-3 row">
                            <Label text="Status" />
                            <div className="col-sm-6">
                                <Select name="status" value={cityDetails.status} onChange={handleChange}>
                                    <option value="" disabled>select activation type</option>
                                    <option value="true" selected>Active</option>
                                    <option value="false">Inactive</option>
                                </Select>
                            </div>
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
    const [cityDetails, setCityDetails] = useState({});
    const fetchCity = useCallback(async () => {
        let isSubscribed = true;
        if (id) {
            const getTheCity = await get(CITY_END_POINT.info(id));
            setCityDetails(getTheCity?.data);
        }

        return () => (isSubscribed = false);
    }, [id]);


    useEffect(() => {
        fetchCity();
    }, [fetchCity]);


    return (
        <div className="container-fluid ">
            <div className="row mt-3">

                <div className="col-lg-10 col-md-10 col-sm-10">
                    <div className="card">
                        <div className="card-body">

                            <div className="row">
                                <div className="col-lg-12 col-md-12 col-sm-12">
                                    <h3 className="box-title mt-5">Subject Basic Info</h3>
                                    <div className="table-responsive">
                                        <table className="table">
                                            <tbody>
                                                <tr>
                                                    <td width={390}>Name</td>
                                                    <td>{cityDetails.name}</td>
                                                </tr>

                                                <tr>
                                                    <td>Status</td>
                                                    <td>
                                                        {cityDetails.status == true ?
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
                                                    <td>{moment(cityDetails?.createdAt).format('DD-MM-YYYY')}</td>
                                                </tr>
                                                <tr>
                                                    <td>Updated At</td>
                                                    <td>{moment(cityDetails?.updatedAt).format('DD-MM-YYYY')}</td>
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

    const [cityDetails, setCityDetails] = useState(
        {
            name: "",
            status: ""
        }
    );
    const handleChange = (e) => {
        setCityDetails(prev => ({
            ...prev, [e.target.name]: e.target.value
        }))
    }
    const fetchCity = useCallback(async () => {
        let isSubscribed = true;
        setLoading(true);
        if (id) {
            const getTheCity = await get(CITY_END_POINT.info(id));
            setCityDetails(prev => ({
                ...prev,
                name: getTheCity?.data?.name,
                status: getTheCity?.data?.status
            }));
            setLoading(false);
        }

        // setLoading(true);
        return () => (isSubscribed = false);
    }, [id]);


    useEffect(() => {
        fetchCity();
    }, [fetchCity])

    let dataset = { ...cityDetails };


    return (
        <Form validated={validated}>

            <div className="row">




                <div className="card-body">
                    <TextInput name="name" label="City" placeholder="City Name" value={cityDetails?.name} onChange={handleChange} />


                    <div className="mb-3 row">
                        <Label text="Status" />
                        <div className="col-sm-6">
                            <Select name="status" value={cityDetails?.status} onChange={handleChange}  >
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

    const fetchCity = useCallback(async () => {

        let isSubscribed = true;
        const getTheCity = await get(CITY_END_POINT.info(id));
        setName(getTheCity?.data?.name)

        setLoading(true);
        return () => (isSubscribed = false);
    }, [id]);


    useEffect(() => {
        fetchCity();
    }, [fetchCity]);

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
const ManageCity = () => {
    const notify = useCallback((type, message) => {
        ToastMessage({ type, message });
    }, []);

    const [pending, setPending] = useState(false);
    const { data: cityList, isLoading, refetch: fetchCityList } = useGetAllData(QUERY_KEYS.GET_ALL_CITY_LIST, CITY_END_POINT.get());



    //Form validation
    const [validated, setValidated] = useState(false);
    const [city_id, setCityId] = useState('');
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
        setCityId(id);
    };



    //Update Tower Modal form
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const handleExit = () => setShowUpdateModal(false);
    const handleOpen = (id) => {
        setShowUpdateModal(true);
        setCityId(id);
    };

    //Delete  Modal
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const handleExitDelete = () => setShowDeleteModal(false);
    const handleOpenDelete = (id) => {
        setShowDeleteModal(true);
        setCityId(id);
        // console.log(id);
    }


    //create floor form
    const submitForm = async (items) => {
        let isSubscribed = true;
        setLoading(true);
        const response = await post(CITY_END_POINT.create(), items);
        if (response.status === "SUCCESS") {
            notify("success", response.message);
            handleClose();
            setLoading(false);
            setValidated(false);
        }
        else {
            notify("error", response.errorMessage);
            setLoading(false);
            setValidated(true);
        }

        fetchCityList();

        return () => (isSubscribed = false);
    };




    //Update  form
    const updateForm = async (formData) => {
        let isSubscribed = true;
        setPending(true);
        const updateTheCity = await put(CITY_END_POINT.update(city_id), formData);
        if (updateTheCity.status === 'SUCCESS') {
            notify("success", updateTheCity.message);
            // router.push(`/modules/hrmModalV/subject`);
            handleExit();
            setPending(false);
            setValidated(false);
        }

        else {
            notify("error", updateTheCity.message);
            setPending(false);
            setValidated(true);
        }

        fetchCityList();

        return () => (isSubscribed = false);
    };


    //Delete Subject
    const handleDelete = async (id) => {

        let isSubscribed = true;
        const deleteCity = await del(CITY_END_POINT.delete(id))

        if (deleteCity.status === "SUCCESS") {
            notify("success", "successfully deleted!");
            handleExitDelete();
            setPending(false);

        }
        else {
            notify("error", "something went wron");
        }

        fetchCityList();
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
            name: 'Subject Code',
            selector: row => row.cityId,
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
                    <Link href="#">
                        <a onClick={() => handleViewOpen(id)}>
                            <ViewIcon />
                        </a>
                    </Link>

                </li>
                <li>
                    <Link href="#" >
                        <a onClick={() => handleOpen(id)}>
                            <EditIcon />
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
            <HeadSection title="All City-Details" />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="card shadow">

                            <div className="d-flex border-bottom title-part-padding align-items-center">
                                <div>
                                    <h4 class="card-title mb-0">All City</h4>
                                </div>
                                <div className="ms-auto flex-shrink-0">

                                    <Button
                                        className="shadow rounded"
                                        variant="primary"
                                        type="button"
                                        onClick={handleShow}
                                        block
                                    >
                                        Add City
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
                                    <Modal.Title>Create City</Modal.Title>
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
                                <ViewForm id={city_id} pending={pending} />
                            </Modal>
                            {/* view Modal Form end */}






                            {/* Update Modal Form */}
                            <Modal
                                dialogClassName="modal-sm"
                                show={showUpdateModal}
                                onHide={handleExit}
                            >
                                <Modal.Header closeButton>
                                    <Modal.Title>Update City</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <EditForm
                                        onSubmit={updateForm}
                                        id={city_id}
                                        pending={pending}
                                        validated={validated}
                                    />
                                </Modal.Body>
                            </Modal>
                            {/* End Update Modal Form */}

                            {/* Delete Modal Form */}
                            <Modal show={showDeleteModal} onHide={handleExitDelete}>
                                <Modal.Header closeButton></Modal.Header>
                                <DeleteComponent onSubmit={handleDelete} id={city_id} pending={pending} />
                            </Modal>


                            <div className="card-body">
                                <div className="">
                                    <DataTable
                                        columns={columns}
                                        data={cityList?.data}
                                        pagination
                                        highlightOnHover
                                        subHeader
                                        progressPending={isLoading}
                                        subHeaderComponent={
                                            <input
                                                type="text"
                                                placeholder="search by subject code"
                                                className="w-25 form-control search-input_RESERVATIONS"
                                            //   value={search}
                                            //   onChange={(e) => setSearch(e.target.value)}
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

export default ManageCity