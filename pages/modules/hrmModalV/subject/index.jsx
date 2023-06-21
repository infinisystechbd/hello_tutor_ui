import { ExclamationCircleFilled } from '@ant-design/icons';
import { Button, Modal, Tag, Row, Breadcrumb, Layout, theme } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import DataTable from 'react-data-table-component';
import ToastMessage from '../../../../components/Toast';
import { SUBJECT_END_POINT } from '../../../../constants/index';
import { QUERY_KEYS } from '../../../../constants/queryKeys';
import { del } from '../../../../helpers/api_helper';
import { useGetAllData } from '../../../../utils/hooks/useGetAllData';
import DebouncedSearchInput from './../../../../components/elements/DebouncedSearchInput';
import SubjectForm from './form/SubjectForm';
import SubjectView from './view/SubjectView';
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import HeadSection from '../../../../components/HeadSection';

const AllSubject = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const { confirm } = Modal;
  const { Content } = Layout;
  const router = useRouter();
  const notify = useCallback((type, message) => {
    ToastMessage({ type, message });
  }, []);
  const [search, setSearch] = useState('');
  console.log(search);
  const [itemList, setItemList] = useState([]);
  const [pending, setPending] = useState(false);
  const handleExitDelete = () => setShowDeleteModal(false);
  //Form validation
  const [validated, setValidated] = useState(false);
  const [subject_id, setSubjectId] = useState('');
  //   Create Modal
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false)
  const handleClose = () => setShow(false);
  const [totalRows, setTotalRows] = useState(0);
  const [editData, setEditData] = useState({});
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10)
  const handleShow = () => {
    setIsModalOpen(true)
    setEditData(null);
  };
  const handleOpen = (data) => {
    setEditData(data);
    setIsModalOpen(true)
  }


  const showDeleteConfirm = (id, name) => {
    confirm({
      title: `Are you sure delete this Subject?`,
      icon: <ExclamationCircleFilled />,
      content: name,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      async onOk() {
        const deleteSubject = await del(SUBJECT_END_POINT.delete(id));
        try {
          if (deleteSubject.status === 'SUCCESS') {
            notify('success', deleteSubject.message);
          } else {
            notify('error', 'something went wrong');
          }
        } catch (error) {
          notify('error', error.message);
        }

        fetchSubjectList();
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  //View  Modal form
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [subject, setSubject] = useState({});

  const handleViewOpen = (data) => {
    setIsViewModalOpen(true);
    setSubject(data);
  };

  //Delete  Modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const handleOpenDelete = (id) => {
    setShowDeleteModal(true);
    setSubjectId(id);
  };
  const {
    data: subjectList,
    isLoading,
    refetch: fetchSubjectList,
  } = useGetAllData(QUERY_KEYS.GET_ALL_SUBJECT_LIST, SUBJECT_END_POINT.get(page, limit, search));

  const reFetchHandler = (isRender) => {
    if (isRender) fetchSubjectList();
  };

  const handlePageChange = (page) => {
    setPage(page)
  };

  const handlePerRowsChange = (newLimit, page) => {
    setPage(page);
    setLimit(newLimit);
  };
  const columns = [
    {
      name: <span className="fw-bold">SL</span>,
      selector: (row, index) => index + 1,
      sortable: true,
      width: '70px',
    },
    {
      name: 'Subject Code',
      selector: (row) => row.subjectId,
      sortable: true,
    },
    {
      name: 'Name',
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: 'Status',
      selector: (row) => (row.status == true ? <Tag color='green'>ACTIVE</Tag> : <Tag color='volcano'>INACTIVE</Tag>),
      sortable: true,
    },
    {
      name: 'Action',
      selector: (row) => actionButton(row),
    },
  ];


  const actionButton = (row) => {
    return (
      <>
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
    );
  };

  return (
    <>
      <HeadSection title="All Subject-Details" />


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
          <Breadcrumb.Item>Subject</Breadcrumb.Item>
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
                      <h4 class="card-title mb-0">All Subject</h4>
                    </div>
                    <div className="ms-auto flex-shrink-0">
                      <Button
                        className="shadow rounded"
                        type="primary"
                        onClick={handleShow}
                        block
                      >
                        Add Subject
                      </Button>
                    </div>
                  </div>


                  <SubjectForm
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                    isParentRender={reFetchHandler}
                    setEditData={editData}
                  />


                  <SubjectView
                    isViewModalOpen={isViewModalOpen}
                    setIsViewModalOpen={setIsViewModalOpen}
                    subject={subject} />


                  <div className="">
                    <DataTable
                      columns={columns}
                      data={subjectList?.data}
                      pagination
                      paginationServer
                      highlightOnHover
                      subHeader
                      progressPending={isLoading}
                      paginationTotalRows={subjectList?.total}
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
                    />


                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>





      </Content>

    </>
  );
};

export default AllSubject;
