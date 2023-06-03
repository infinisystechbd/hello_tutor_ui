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
import { CATEGORIE_END_POINT } from '../../../../constants/api_endpoints/categorieEndPoints';
import { CLASS_END_POINT } from '../../../../constants/api_endpoints/classEndPoints';
import { QUERY_KEYS } from "../../../../constants/queryKeys";
import { useGetAllData } from "../../../../utils/hooks/useGetAllData";
import Label from "../../../../components/elements/Label";
import Select from '../../../../components/elements/Select';
import TextInput from "../../../../components/elements/TextInput";
import Select2 from "../../../../components/elements/Select2";
import moment from 'moment';

//Create Component
const CreateForm = ({ onSubmit, loading, validated }) => {
    const notify = React.useCallback((type, message) => {
        toast({ type, message });
    }, []);

    const [categorieDetails, setCategorieDetails] = useState({
        name: "",
        status: "" || "true",
    });

    const [allClassesList, setAllClassesList] = useState([]);
    const [allClasses, setAllClasses] = useState([]);



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

    const handleChange = (e) => {
        setCategorieDetails(prev => ({
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


    let dataset = { ...categorieDetails, class: allClasses };


    return (

        <Form validated={validated}>

            <div className="row">
                <div className="card-body">
                    <TextInput name="name" label="Categories" placeholder="Bangla/English Version Name" onChange={handleChange} />

                    <div className="mb-3 row">
                        <Label text="Class" />
                        <div className="col-sm-6">
                            <Select2 placeholder="Select class" isMulti
                                options={allClassesList && allClassesList.map(({ _id, name }) => ({
                                    value: _id,
                                    label: name,
                                }))}
                                onChange={onSelectCLass}
                            />
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <Label text="Status" />
                        <div className="col-sm-6">
                            <Select name="status" onChange={handleChange}  >
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

    const [allClassesList, setAllClassesList] = useState([]);
    const [categorieDetails, setCategorieDetails] = useState({});
    const [allClasses, setAllClasses] = useState([]);


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


    const fetchCategory = useCallback(async () => {
        let isSubscribed = true;
        setLoading(true);
        if (id) {
            const getTheCategory = await get(CATEGORIE_END_POINT.info(id));
            setCategorieDetails(prev => ({
                ...prev,
                name: getTheCategory?.data?.name,
                status: getTheCategory?.data?.status,
                class: getTheCategory?.data?.class
            }));
            setLoading(false);
        }

        // setLoading(true);
        return () => (isSubscribed = false);
    }, [id]);


    useEffect(() => {
        fetchCategory();
    }, [fetchCategory]);


    const handleChange = (e) => {
        setCategorieDetails(prev => ({
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

    let dataset = { ...categorieDetails, class: allClasses };


    return (
        <Form validated={validated}>

            <div className="row">
                <div className="col-md-10">

                    <div className="card-body">
                        <TextInput name="name" label="Categories" value={categorieDetails.name} placeholder="Bangla/English Version Name" onChange={handleChange} />

                        <div className="mb-3 row">
                            <Label text="Class" />
                            <div className="col-sm-6">
                                {
                                    categorieDetails?.class?.length > 0 &&
                                    <Select2
                                        isMulti
                                        options={allClassesList && allClassesList.map(({ _id, name }) => ({
                                            value: _id,
                                            label: name,
                                        }))}
                                        onChange={onSelectCLass}
                                        defaultValue={categorieDetails?.class?.map((classId, index) => ({ value: classId?.classId?._id, label: classId?.classId?.name }))}
                                    />
                                }


                                {
                                    categorieDetails?.class?.length <= 0 &&
                                    <Select2
                                        isMulti
                                        options={allClassesList && allClassesList?.class?.map((classId, index) => ({ value: classId?.classId?._id, label: classId?.classId?.name }))}
                                        onChange={onSelectCLass}


                                    />
                                }
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <Label text="Status" />
                            <div className="col-sm-6">
                                <Select name="status" value={categorieDetails.status} onChange={handleChange}  >
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
    const [categoryDetails, setCategoryDetails] = useState({});
    const fetchCategory = useCallback(async () => {
        let isSubscribed = true;
        if (id) {
            const getTheCategory = await get(CATEGORIE_END_POINT.info(id));
            setCategoryDetails(getTheCategory?.data);
        }

        return () => (isSubscribed = false);
    }, [id]);


    useEffect(() => {
        fetchCategory();
    }, [fetchCategory]);


    return (
        <div className="container-fluid ">
            <div className="row mt-4">

                <div className="col-lg-6">
                    <div className="card">
                        <div className="card-body">

                            <div className="row">
                                <div className="col-lg-12 col-md-12 col-sm-12">
                                    <h3 className="box-title mt-5">Category Basic Info</h3>
                                    <div className="table-responsive">
                                        <table className="table">
                                            <tbody>
                                                <tr>
                                                    <td width={390}>Name</td>
                                                    <td>{categoryDetails?.name}</td>
                                                </tr>
                                                <tr>
                                                    <td>Status</td>
                                                    <td>
                                                        {categoryDetails?.status == true ?
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
                                                    <td>{moment(categoryDetails?.createdAt).format('DD-MM-YYYY')}</td>
                                                </tr>

                                                <tr>
                                                    <td>Updated At</td>
                                                    <td>{moment(categoryDetails?.updatedAt).format('DD-MM-YYYY')}</td>
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
                            <h4 className="card-title mb-0">Class’s under the Category</h4>
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
                                            categoryDetails?.class?.map((catg, index) => (
                                                <tr key={index}>
                                                    <th>{catg?.classId?.name}</th>
                                                    <td>
                                                        {catg?.classId?.status == true ?
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

    const fetchCategory = useCallback(async () => {

        let isSubscribed = true;
        const getTheSubject = await get(CATEGORIE_END_POINT.info(id));
        setName(getTheSubject?.data?.name)

        setLoading(true);
        return () => (isSubscribed = false);
    }, [id]);


    useEffect(() => {
        fetchCategory();
    }, [fetchCategory]);

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

const ManageCategory = () => {


    const notify = useCallback((type, message) => {
        ToastMessage({ type, message });
    }, []);
    const [itemList, setItemList] = useState([]);
    const [pending, setPending] = useState(false);

    const { data: categoryList, isLoading, refetch: fetchCategoryList } = useGetAllData(QUERY_KEYS.GET_ALL_CATEGORY_LIST, CATEGORIE_END_POINT.get());
    //Form validation
    const [validated, setValidated] = useState(false);
    const [category_id, setCategoryId] = useState('');
    //   Create Modal
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);



    //Update Tower Modal form
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const handleExit = () => setShowUpdateModal(false);
    const handleOpen = (id) => {
        setShowUpdateModal(true);
        setCategoryId(id);
    };


    //View Tower Modal form
    const [showViewModal, setShowViewModal] = useState(false);
    const handleExitView = () => setShowViewModal(false);
    const handleViewOpen = (id) => {
        setShowViewModal(true);
        setCategoryId(id);
    };



    //Delete  Modal
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    console.log(category_id);
    const handleExitDelete = () => setShowDeleteModal(false);
    const handleOpenDelete = (id) => {
        setShowDeleteModal(true);
        setCategoryId(id);
        // console.log(id);
    }





    //create floor form
    const submitForm = async (items) => {
        let isSubscribed = true;
        setLoading(true);
        const response = await post(CATEGORIE_END_POINT.create(), items);
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

        fetchCategoryList();

        return () => (isSubscribed = false);
    };




    //Update floor form
    const updateForm = async (formData) => {
        let isSubscribed = true;
        setPending(true);
        const updateTheCategory = await put(CATEGORIE_END_POINT.update(category_id), formData);
        if (updateTheCategory.status === 'SUCCESS') {
            notify("success", updateTheCategory.message);
            // router.push(`/modules/hrmModalV/subject`);
            handleExit();
            setPending(false);
            setValidated(false);
        }

        else {
            notify("error", updateTheCategory.message);
            setPending(false);
            setValidated(true);
        }

        fetchCategoryList();

        return () => (isSubscribed = false);
    };



    //Delete Subject
    const handleDelete = async (id) => {

        let isSubscribed = true;
        // setPending(true);
        const deleteSubject = await del(CATEGORIE_END_POINT.delete(id))

        if (deleteSubject.status === "SUCCESS") {
            notify("success", "successfully deleted!");
            handleExitDelete();
            setPending(false);

        }
        else {
            notify("error", "something went wron");
        }

        fetchCategoryList();
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
            selector: row => row.categoryId,
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
            <HeadSection title="All Category-Details" />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="card shadow">

                            <div className="d-flex border-bottom title-part-padding align-items-center">
                                <div>
                                    <h4 class="card-title mb-0">All CATEGORY</h4>
                                </div>
                                <div className="ms-auto flex-shrink-0">

                                    <Button
                                        className="shadow rounded"
                                        variant="primary"
                                        type="button"
                                        onClick={handleShow}
                                        block
                                    >
                                        Add CATEGORY
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
                                    <Modal.Title>Create CATEGORY</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <CreateForm
                                        onSubmit={submitForm}
                                        loading={loading}
                                        validated={validated}
                                    />
                                </Modal.Body>
                            </Modal>



                            {/* Update Modal Form */}
                            <Modal
                                dialogClassName="modal-sm"
                                show={showUpdateModal}
                                onHide={handleExit}
                            >
                                <Modal.Header closeButton>
                                    <Modal.Title>Update Category</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <EditForm
                                        onSubmit={updateForm}
                                        id={category_id}
                                        pending={pending}
                                        validated={validated}
                                    />
                                </Modal.Body>
                            </Modal>
                            {/* End Update Modal Form */}


                            {/* View Modal Form */}
                            <Modal dialogClassName="modal-lg" show={showViewModal} onHide={handleExitView}>
                                <Modal.Header closeButton></Modal.Header>
                                <ViewForm id={category_id} pending={pending} />
                            </Modal>
                            {/* view Modal Form end */}







                            {/* Delete Modal Form */}
                            <Modal show={showDeleteModal} onHide={handleExitDelete}>
                                <Modal.Header closeButton></Modal.Header>
                                <DeleteComponent onSubmit={handleDelete} id={category_id} pending={pending} />
                            </Modal>


                            <div className="card-body">
                                <div className="">
                                    <DataTable
                                        columns={columns}
                                        data={categoryList?.data}
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

export default ManageCategory