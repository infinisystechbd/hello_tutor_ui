import Link from 'next/link';
import React, { useCallback, useEffect, useState, Fragment } from 'react';
import { Form } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import ToastMessage from '../../../../components/Toast';
import { LOCATION_END_POINT } from "../../../../constants/api_endpoints/locationEndPoints";
import { CITY_END_POINT } from "../../../../constants/api_endpoints/cityEndPoints";
import { QUERY_KEYS } from "../../../../constants/queryKeys";
import { del, get, post, put } from '../../../../helpers/api_helper';
import { useGetAllData } from "../../../../utils/hooks/useGetAllData";
import HeadSection from '../../../../components/HeadSection';
import { Button, Modal, Tag, Row, Breadcrumb, Layout, theme } from 'antd';
import moment from 'moment';
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';




const Managelocation = () => {
    const { confirm } = Modal;
    const { Content } = Layout;
    const {
        token: { colorBgContainer },
    } = theme.useToken();


    const notify = useCallback((type, message) => {
        ToastMessage({ type, message });
    }, []);

    const [pending, setPending] = useState(false);
    const { data: locationList, isLoading, refetch: fetchLocationList } = useGetAllData(QUERY_KEYS.GET_ALL_LOCATION_LIST, LOCATION_END_POINT.get())

    //Form validation
    const [validated, setValidated] = useState(false);
    const [location_id, setLocationId] = useState('');



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







    return (
        <>
            <HeadSection title="All Location-Details" />


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
                    <Breadcrumb.Item>User</Breadcrumb.Item>
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
                                            <h4 class="card-title mb-0">All Location </h4>
                                        </div>
                                        <div className="ms-auto flex-shrink-0">
                                            <Button
                                                className="shadow rounded"
                                                type="primary"
                                                block
                                            >
                                                Add Location
                                            </Button>
                                        </div>
                                    </div>

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

            </Content>

        </>
    )
}

export default Managelocation
