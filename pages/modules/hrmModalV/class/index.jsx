import Link from 'next/link';
import React, { useCallback, useEffect, useState } from 'react';
import { Form, } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import ToastMessage from '../../../../components/Toast';
import { SUBJECT_END_POINT, CLASS_END_POINT } from "../../../../constants/index";
import { QUERY_KEYS } from "../../../../constants/queryKeys";
import { del, get, post, put } from '../../../../helpers/api_helper';
import { useGetAllData } from "../../../../utils/hooks/useGetAllData";
import { useRouter } from "next/router";
import HeadSection from '../../../../components/HeadSection';
import moment from 'moment';
import { EditOutlined, DeleteOutlined, EyeOutlined, ExclamationCircleFilled } from '@ant-design/icons';
import { Button, Modal, Tag, Row, Breadcrumb, Layout, theme } from 'antd';
import DebouncedSearchInput from './../../../../components/elements/DebouncedSearchInput';
import ClassForm from './form/ClassForm';
import ClassView from './view/ClassView';

ClassView
const ManageClass = () => {

  const notify = useCallback((type, message) => {
    ToastMessage({ type, message });
  }, []);
  const { token: { colorBgContainer }, } = theme.useToken();
  const { confirm } = Modal;
  const { Content } = Layout;
  const [search, setSearch] = useState('');
  const [pending, setPending] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editData, setEditData] = useState({});
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10)


  /** Creation modal  */
  const handleShow = () => {
    setIsModalOpen(true)
    setEditData(null);
  };
  /** Creation modal end  */

  /** Update modal  */
  const handleOpen = (data) => {
    setEditData(data);
    setIsModalOpen(true)
  }
  /** Update modal end  */


  /**View  Modal form */

  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [classes, setClass] = useState({});

  const handleViewOpen = (data) => {
    setIsViewModalOpen(true);
    setClass(data);
  };
  /**View  Modal form end */

  const handlePerRowsChange = async (newPerPage, page) => {
    setPage(page);
    setPerPage(newPerPage);
  };



  const {
    data: classList,
    isLoading,
    refetch: fetchClassList,
  } = useGetAllData(QUERY_KEYS.GET_ALL_ClASS_LIST, CLASS_END_POINT.get(page, limit, search));



  const reFetchHandler = (isRender) => {
    if (isRender) fetchClassList();
  };

  const handlePageChange = (page) => {
    setPage(page)
  };





  // handle delete
  const showDeleteConfirm = (id, name) => {
    confirm({
      title: `Are you sure delete this CLass?`,
      icon: <ExclamationCircleFilled />,
      content: name,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      async onOk() {
        const deleteClass = await del(CLASS_END_POINT.delete(id));
        try {
          if (deleteClass.status === 'SUCCESS') {
            notify('success', deleteClass.message);
          } else {
            notify('error', 'something went wrong');
          }
        } catch (error) {
          notify('error', error.message);
        }

        fetchClassList();
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };






  const columns = [
    {
      name: <span className="fw-bold">SL</span>,
      selector: (row, index) => index + 1,
      sortable: true,
      width: "70px",
    },
    {
      name: 'Class Code',
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
      selector: row => (row.status == true ? <Tag color='green'>ACTIVE</Tag> : <Tag color='volcano'>INACTIVE</Tag>),
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




  const actionButton = (row) => {

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


                  <ClassForm
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                    isParentRender={reFetchHandler}
                    setEditData={editData}
                  />

                  <ClassView
                    isViewModalOpen={isViewModalOpen}
                    setIsViewModalOpen={setIsViewModalOpen}
                    classes={classes} />

                  <div className="">
                    <DataTable
                      columns={columns}
                      data={classList?.data}
                      pagination
                      paginationServer
                      highlightOnHover
                      subHeader
                      progressPending={isLoading}
                      paginationTotalRows={classList?.total}
                      onChangeRowsPerPage={handlePerRowsChange}
                      onChangePage={handlePageChange}
                      subHeaderComponent={
                        <DebouncedSearchInput
                          allowClear
                          placeholder="Search class name "
                          onChange={setSearch}
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