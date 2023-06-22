import React from 'react'
import { ExclamationCircleFilled } from '@ant-design/icons';
import { Button, Modal, Tag, Row, Breadcrumb, Layout, theme } from 'antd';
import { useCallback, useState, useEffect } from 'react';
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import HeadSection from '../../../../components/HeadSection';
import TutorRequestFrom from './form/TutorRequestFrom';
// TutorRequestFrom
const TutorDetails = () => {

    const { confirm } = Modal;
    const { Content } = Layout;
    const {token: { colorBgContainer }} = theme.useToken();
    const [pending, setPending] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editData, setEditData] = useState({});


        /** Creation modal  */
        const handleShow = () => {
            setIsModalOpen(true)
            setEditData(null);
        };
        /** Creation modal end  */

  return (
    <>
    <HeadSection title="All City-Details" />


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
                                    <h4 class="card-title mb-0">All Job</h4>
                                </div>
                                <div className="ms-auto flex-shrink-0">
                                    <Button
                                        className="shadow rounded"
                                        type="primary"
                                        onClick={handleShow}
                                        block
                                    >
                                        Add Job
                                    </Button>
                                </div>
                            </div>


                            <TutorRequestFrom
                                isModalOpen={isModalOpen}
                                setIsModalOpen={setIsModalOpen}
                                // isParentRender={reFetchHandler}
                                setEditData={editData}
                            />





                            <div className="">
                                {/* <DataTable
                                    columns={columns}
                                    data={cityList?.data}
                                    pagination
                                    paginationServer
                                    highlightOnHover
                                    subHeader
                                    progressPending={isLoading}
                                    paginationTotalRows={cityList?.total}
                                    onChangeRowsPerPage={handlePerRowsChange}
                                    onChangePage={handlePageChange}
                                    subHeaderComponent={
                                        <DebouncedSearchInput
                                            allowClear
                                            placeholder="Search subject name "
                                            onChange={setSearch}
                                        />
                                    }
                                    striped
                                /> */}


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

export default TutorDetails