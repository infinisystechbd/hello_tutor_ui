import Link from 'next/link';
import React, { useCallback, useEffect, useState } from 'react';
import { Form, } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import ToastMessage from '../../../../components/Toast';
import { SUBJECT_END_POINT } from "../../../../constants/index";
import { CLASS_END_POINT } from "../../../../constants/api_endpoints/classEndPoints";
import { QUERY_KEYS } from "../../../../constants/queryKeys";
import { del, get, post, put } from '../../../../helpers/api_helper';
import { useGetAllData } from "../../../../utils/hooks/useGetAllData";
import { useRouter } from "next/router";
import HeadSection from '../../../../components/HeadSection';
import moment from 'moment';
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { Button, Modal, Tag, Row, Breadcrumb, Layout, theme } from 'antd';


const ManageClass = () => {
    const { confirm } = Modal;
    const { Content } = Layout;
    const {
        token: { colorBgContainer },
    } = theme.useToken();

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
            selector: row => actionButton(row),
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
            <Row justify="space-between">
                <a onClick={() => handleViewOpen(row)} style={{ color: 'green', marginRight: '10px' }}>
                    <EyeOutlined style={{ fontSize: '24px' }} />
                </a>

                <a onClick={() => handleOpen(row)} className="text-primary" style={{ marginRight: '10px' }}>
                    <EditOutlined style={{ fontSize: '24px' }} />
                </a>

                <a onClick={() => showDeleteConfirm(row._id, row.name)} className="text-danger" style={{ marginRight: '10px' }}>
                    <DeleteOutlined style={{ fontSize: '24px' }} />
                </a>
            </Row>
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




            <Content
                style={{
                    margin: '0 16px',
                }}
            >
                <Breadcrumb
                    style={{
                        margin: '16px 0',
                    }}
                >
                    <Breadcrumb.Item>class</Breadcrumb.Item>
                    <Breadcrumb.Item>Bill</Breadcrumb.Item>
                </Breadcrumb>
                <div
                    style={{
                        padding: 15,
                        minHeight: 360,
                        background: colorBgContainer,
                    }}
                >
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <div className=" ">
                                    <div className="d-flex border-bottom title-part-padding align-items-center">
                                        <div>
                                            <h4 class="card-title mb-0">All Class</h4>
                                        </div>
                                        <div className="ms-auto flex-shrink-0">
                                            <Button
                                                className="shadow rounded"
                                                type="primary"
                                                onClick={handleShow}
                                                block
                                            >
                                                Add Class
                                            </Button>
                                        </div>
                                    </div>


                                    {/* <CityForm
                                        isModalOpen={isModalOpen}
                                        setIsModalOpen={setIsModalOpen}
                                        isParentRender={reFetchHandler}
                                        setEditData={editData}
                                    /> */}





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





            </Content>
        </>
    )
}

export default ManageClass