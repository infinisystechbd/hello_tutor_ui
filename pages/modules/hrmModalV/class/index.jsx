import Link from 'next/link';
import React, { useCallback, useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import Axios from '../../../';
import ToastMessage from '../../../../components/Toast';
import DeleteIcon from '../../../../components/elements/DeleteIcon';
import EditIcon from '../../../../components/elements/EditIcon';
import ViewIcon from '../../../../components/elements/ViewIcon';
import { SUBJECT_END_POINT } from "../../../../constants/index";
import { CLASS_END_POINT } from "../../../../constants/api_endpoints/classEndPoints";
import { QUERY_KEYS } from "../../../../constants/queryKeys";
import { del, get, post, put } from '../../../../helpers/api_helper';
import { useGetAllData } from "../../../../utils/hooks/useGetAllData";
import Label from "../../../../components/elements/Label";
import Select from '../../../../components/elements/Select';
import TextInput from "../../../../components/elements/TextInput";
import Select2 from "../../../../components/elements/Select2";
import { useRouter } from "next/router";
import HeadSection from '../../../../components/HeadSection';
import moment from 'moment';




//Create Component
const CreateForm = ({ onSubmit, loading, validated }) => {
    const notify = React.useCallback((type, message) => {
        toast({ type, message });
    }, []);

    const [classDetails, setClassDetails] = useState({
        name: "",
        status: "" || "true",
    });

    const [subjectList, setAllSubjectList] = useState([]);
    const [subject, setSubject] = useState([]);

    useEffect(() => {
        const controller = new AbortController();
        const fetchTotalSubjects = async () => {
            let isSubscribed = true;
            try {
                const getAllList = await get(SUBJECT_END_POINT.get());
                setAllSubjectList(getAllList?.data);

            } catch (error) {
                console.log("find the error");
            }

            return () => isSubscribed = false;
        }
        fetchTotalSubjects();
    }, [])


    const handleChange = (e) => {
        setClassDetails(prev => ({
            ...prev, [e.target.name]: e.target.value
        }))
    }


    const onSelectSubject = (e) => {
        setSubject([])
        e.map((x) => {
            setSubject(subject => [
                ...subject,
                { subjectId: x.value }
            ])
        })

    }

    let dataset = { ...classDetails, subject };


    return (

        <Form validated={validated}>

            <div className="row">
                <div className="card-body">

                    <TextInput name="name" label="Class Name" placeholder="Class Name" onChange={handleChange} value={classDetails.name} />
                    <div className="mb-3 row">
                        <Label text="Subjects" />
                        <div className="col-sm-6">
                            <Select2 placeholder="Select Subjects" isMulti
                                options={subjectList && subjectList.map(({ _id, name }) => ({
                                    value: _id,
                                    label: name,
                                }))}
                                onChange={onSelectSubject}
                            />
                        </div>
                    </div>

                    <div className="mb-3 row">
                        <Label text="Status" />
                        <div className="col-sm-6">
                            <Select name="status" value={classDetails.status} onChange={handleChange}>
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


//Update component
const EditForm = ({ onSubmit, id, pending, validated }) => {
    const [loading, setLoading] = useState(true);
    const [classDetails, setClassDetails] = useState({});
    const [subjectList, setAllSubjectList] = useState([]);
    const [subject, setSubject] = useState([]);



    useEffect(() => {
        const controller = new AbortController();
        const fetchTotalSubjects = async () => {
            let isSubscribed = true;
            try {
                const getAllList = await get(SUBJECT_END_POINT.get());
                // console.log(getAllList);
                setAllSubjectList(getAllList?.data);

            } catch (error) {
                console.log("find the error");
            }

            return () => isSubscribed = false;
        }
        fetchTotalSubjects();
    }, [])





    const handleChange = (e) => {
        setClassDetails(prev => ({
            ...prev, [e.target.name]: e.target.value
        }))
    }


    const fetchclass = useCallback(async () => {
        let isSubscribed = true;
        setLoading(true);
        if (id) {
            const getTheClass = await get(CLASS_END_POINT.info(id));
            setClassDetails(prev => ({
                ...prev,
                name: getTheClass?.data?.name,
                status: getTheClass?.data?.status,
                subject: getTheClass?.data?.subject
            }));
            setLoading(false);
        }

        // setLoading(true);
        return () => (isSubscribed = false);
    }, [id]);


    useEffect(() => {
        fetchclass();
    }, [fetchclass]);

    const onSelectSubject = (e) => {
        setSubject([])
        e.map((x) => {
            setSubject(subject => [
                ...subject,
                { subjectId: x.value }
            ])
        })

    }

    let dataset = { ...classDetails, subject };


    return (
        <Form validated={validated}>

            <div className="row">
                <div className="col-md-10">







                    <TextInput name="name" label="Class Name" placeholder="Class Name" onChange={handleChange} value={classDetails.name} />
                    <div className="mb-3 row">
                        <Label text="Subjects" />
                        <div className="col-sm-6">

                            {
                                classDetails?.subject?.length > 0 &&
                                <Select2
                                    isMulti
                                    options={subjectList && subjectList.map(({ _id, name }) => ({
                                        value: _id,
                                        label: name,
                                    }))}
                                    onChange={onSelectSubject} subjectId
                                    defaultValue={classDetails?.subject?.map((subjectId, index) => ({ value: subjectId?.subjectId?._id, label: subjectId?.subjectId?.name }))}
                                />
                            }


                            {
                                classDetails?.subject?.length <= 0 &&
                                <Select2
                                    isMulti
                                    options={classDetails && classDetails?.subject?.map((subjectId, index) => ({ value: subjectId?.subjectId?._id, label: subjectId?.subjectId?.name }))}
                                    onChange={onSelectSubject}


                                />
                            }
                        </div>
                    </div>

                    <div className="mb-3 row">
                        <Label text="Status" />
                        <div className="col-sm-6">
                            <Select name="status" value={classDetails.status} onChange={handleChange}>
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



//view component
const ViewForm = ({ id, pending, validated }) => {


    const [loading, setLoading] = useState(true);
    const [classDetails, setClassDetails] = useState({});
    const fetchClass = useCallback(async () => {
        let isSubscribed = true;
        if (id) {
            const getTheClass = await get(CLASS_END_POINT.info(id));
            setClassDetails(getTheClass?.data);
        }

        return () => (isSubscribed = false);
    }, [id]);


    useEffect(() => {
        fetchClass();
    }, [fetchClass]);


    return (
        <div className="container-fluid ">
            <div className="row">

                <div className="col-lg-6">
                    <div className="card">
                        <div className="card-body">

                            <div className="row">
                                <div className="col-lg-12 col-md-12 col-sm-12">
                                    <h3 className="box-title mt-5">Class Basic Info</h3>
                                    <div className="table-responsive">
                                        <table className="table">
                                            <tbody>
                                                <tr>
                                                    <td width={390}>Name</td>
                                                    <td>{classDetails?.name}</td>
                                                </tr>
                                                <tr>
                                                    <td>Status</td>
                                                    <td>
                                                        {classDetails?.status == true ?
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
                                                    <td>{moment(classDetails?.createdAt).format('DD-MM-YYYY')}</td>
                                                </tr>

                                                <tr>
                                                    <td>Updated At</td>
                                                    <td>{moment(classDetails?.updatedAt).format('DD-MM-YYYY')}</td>
                                                </tr>

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6">

                    <div className="card">
                        <div className="border-bottom title-part-padding">
                            <h4 className="card-title mb-0">Subject’s under the Class</h4>
                        </div>
                        <div className="card-body">
                            <div className="table-responsive">
                                <table
                                    id="multi_col_order"
                                    className="table table-striped table-bordered display"
                                    style={{ width: "100%" }}
                                >
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Status</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            classDetails?.subject?.map((sub, index) => (
                                                <tr key={index}>
                                                    {/* <th>name</th> */}
                                                    <th>{sub?.subjectId?.name}</th>
                                                    <td>
                                                        {sub?.subjectId?.status == true ?
                                                            <button className="btn btn-primary">Active</button> :
                                                            <button className="btn btn-danger">Inactive</button>
                                                        }
                                                    </td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
};




//Delete component
const DeleteComponent = ({ onSubmit, id, pending }) => {

    const [name, setName] = useState("");
    const [loading, setLoading] = useState(true);

    const fetchClass = useCallback(async () => {

        let isSubscribed = true;
        const getThelass = await get(CLASS_END_POINT.info(id));
        setName(getThelass?.data?.name)

        setLoading(true);
        return () => (isSubscribed = false);
    }, [id]);


    useEffect(() => {
        fetchClass();
    }, [fetchClass]);

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





const ManageClass = () => {


    const notify = useCallback((type, message) => {
        ToastMessage({ type, message });
    }, []);


    const [classList, setClassList] = useState([]);
    const [itemList, setItemList] = useState([]);
    const [search, setSearch] = useState("");
    const [pending, setPending] = useState(false);
    const data = itemList?.data;

    //Form validation
    const [validated, setValidated] = useState(false);
    const [class_id, setClassId] = useState('');


    //   Create Modal
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    //Update  Modal form
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const handleExit = () => setShowUpdateModal(false);
    const handleOpen = (id) => {
        setShowUpdateModal(true);
        setClassId(id);
    };


    //View Tower Modal form
    const [showViewModal, setShowViewModal] = useState(false);
    const handleExitView = () => setShowViewModal(false);
    const handleViewOpen = (id) => {
        setShowViewModal(true);
        setClassId(id);
    };


    //Delete  Modal
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    console.log(classList);
    const handleExitDelete = () => setShowDeleteModal(false);
    const handleOpenDelete = (id) => {
        setShowDeleteModal(true);
        setClassId(id);

    }




    React.useEffect(() => {
        const timeout = setTimeout(() => {
            fetchClassList();
        });
        return () => clearTimeout(timeout);
    }, []);


    const fetchClassList = async () => {
        let isSubscribed = true;
        try {
            const getAllList = await get(CLASS_END_POINT.get());
            setClassList(getAllList?.data);
            setItemList(getAllList);

        } catch (error) {
            console.log("find the error");
        }

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
            selector: row => row.classId,
            sortable: true,
        },
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'Status',
            selector: row => row.status === true ? "Active" : "Inactive",
            sortable: true,
        },
        {
            name: 'Action',
            selector: row => actionButton(row._id),
        }

    ];



    const conditionalRowStyles = [
        {
            when: row => row.status == false,
            style: {
                color: 'red',
            }
        },


    ];




    const actionButton = (id) => {

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




    //create floor form
    const submitForm = async (items) => {
        let isSubscribed = true;
        setLoading(true);
        const response = await post(CLASS_END_POINT.create(), items);
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

        fetchClassList();

        return () => (isSubscribed = false);
    };


    //Update floor form
    const updateForm = async (formData) => {
        let isSubscribed = true;
        setPending(true);
        const updateTheClass = await put(CLASS_END_POINT.update(class_id), formData);
        if (updateTheClass.status === 'SUCCESS') {
            notify("success", updateTheClass.message);
            // router.push(`/modules/hrmModalV/subject`);
            handleExit();
            setPending(false);
            setValidated(false);
        }

        else {
            notify("error", updateTheClass.message);
            setPending(false);
            setValidated(true);
        }

        fetchClassList();

        return () => (isSubscribed = false);
    };





    //Delete Subject
    const handleDelete = async (id) => {

        let isSubscribed = true;
        const deleteClass = await del(CLASS_END_POINT.delete(id))

        if (deleteClass.status === "SUCCESS") {
            notify("success", "successfully deleted!");
            handleExitDelete();
            setPending(false);

        }
        else {
            notify("error", "something went wron");
        }

        fetchClassList();
        return () => isSubscribed = false;
    }



    return (
        <>
            <HeadSection title="All Class-Details" />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="card shadow">

                            <div className="d-flex border-bottom title-part-padding align-items-center">
                                <div>
                                    <h4 class="card-title mb-0">All Classes</h4>
                                </div>
                                <div className="ms-auto flex-shrink-0">

                                    <Button
                                        className="shadow rounded"
                                        variant="primary"
                                        type="button"
                                        onClick={handleShow}
                                        block
                                    >
                                        Add Subject
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
                                    <Modal.Title>Create Subjects</Modal.Title>
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
                                        id={class_id}
                                        pending={pending}
                                        validated={validated}
                                    />
                                </Modal.Body>
                            </Modal>
                            {/* End Update Modal Form */}



                            {/* View Modal Form */}
                            <Modal dialogClassName="modal-lg" show={showViewModal} onHide={handleExitView}>
                                <Modal.Header closeButton></Modal.Header>
                                <ViewForm id={class_id} pending={pending} />
                            </Modal>
                            {/* view Modal Form end */}


                            {/* Delete Modal Form */}
                            <Modal show={showDeleteModal} onHide={handleExitDelete}>
                                <Modal.Header closeButton></Modal.Header>
                                <DeleteComponent onSubmit={handleDelete} id={class_id} pending={pending} />
                            </Modal>



                            <div className="card-body">
                                <div className="">
                                    <DataTable
                                        columns={columns}
                                        data={classList}
                                        pagination
                                        highlightOnHover
                                        subHeader
                                        conditionalRowStyles={conditionalRowStyles}
                                        subHeaderComponent={
                                            <input
                                                type="text"
                                                placeholder="search by subject code"
                                                className="w-25 form-control search-input_RESERVATIONS"
                                                value={search}
                                                onChange={(e) => setSearch(e.target.value)}
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

export default ManageClass