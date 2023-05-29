import Link from 'next/link';
import React, { useCallback, useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import Axios from '../../../';
import ToastMessage from '../../../../components/Toast';
import DeleteIcon from '../../../../components/elements/DeleteIcon';
import EditIcon from '../../../../components/elements/EditIcon';
import ViewIcon from '../../../../components/elements/ViewIcon';
import HeadSection from '../../../../components/HeadSection';
// import { CLASS_END_POINT } from '../../../../constants/api_endpoints/classEndPoints'; HeadSection
import { del, get } from '../../../../helpers/api_helper';
import { CLASS_END_POINT } from '../../../../constants/api_endpoints/classEndPoints';




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



    //Delete  Modal
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [class_id, setClassId] = useState('');
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
                    <Link href={`/modules/hrm/class/update/${id}`}>
                        <a >
                            <EditIcon />
                        </a>
                    </Link>

                </li>

                <li>
                    <Link href={`/modules/hrm/class/view/${id}`}>
                        <a >
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



    useEffect(() => {
        let controller = new AbortController();
        const result = data?.filter((item) => {
            return item?.classId?.toLowerCase().includes(search.toLocaleLowerCase()) || item?.name?.includes(search)
        });

        setClassList(result);
        return () => controller.abort();
    }, [search]);




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
                                    <Link href="/modules/hrm/subject/create">
                                        <a
                                            className="shadow rounded btn btn-primary"

                                        >
                                            Add New class
                                        </a>
                                    </Link>

                                </div>
                            </div>



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