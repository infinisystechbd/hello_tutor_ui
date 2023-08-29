import { DeleteOutlined, EditOutlined, ExclamationCircleFilled, EyeOutlined } from '@ant-design/icons';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Breadcrumb, Button, Input, Layout, Modal, Row, Table, Tag, theme } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import HeadSection from '../../components/HeadSection';
import ToastMessage from '../../components/Toast';
import DebouncedSearchInput from '../../components/elements/DebouncedSearchInput';
import withAuth from '../../components/withAuth';
import { SUBJECT_END_POINT } from '../../constants/index';
import { QUERY_KEYS } from '../../constants/queryKeys';
import { del } from '../../helpers/api_helper';
import Axios from '../../utils/axios';
import { useGetAllData } from '../../utils/hooks/useGetAllData';
import SubjectForm from './form/SubjectForm';
import SubjectView from './view/SubjectView';

const AllSubject = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const { confirm } = Modal;
  const { Content } = Layout;

  const notify = useCallback((type, message) => {
    ToastMessage({ type, message });
  }, []);
  const { http, setToken, token } = Axios();

  useEffect(() => {
    if (!token) {
      router.replace('/login');
    }
  }, [token])
  const [search, setSearch] = useState('');
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
  } = useGetAllData(QUERY_KEYS.GET_ALL_SUBJECT_LIST, SUBJECT_END_POINT.get(page, limit, search, ""));

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



  const data = subjectList?.data?.map((row, index) => ({
    ...row,
    index: index + 1,
  }));


  const columns = [
    {
      title: 'SL',
      dataIndex: 'index',
      // width: '70px',
      fixed: 'left',
    },
    {
      title: 'Subject Code',
      dataIndex: 'subjectId',
      // fixed: 'left',
    },
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (status) => (
        status ? <Tag color='green'>ACTIVE</Tag> : <Tag color='volcano'>INACTIVE</Tag>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      fixed: 'right',
      width: 100,
      render: (row) => actionButton(row), // You need to define actionButton function
    },
  ];





  console.log("data", data);


  const actionButton = (row) => {
    return (
      <>
        <Row justify="space-between" style={{ display: 'flex', alignItems: 'center' }}>
          <a onClick={() => handleViewOpen(row)} style={{ color: 'green' }}>
            <EyeOutlined style={{ fontSize: '22px' }} />
          </a>

          <a onClick={() => handleOpen(row)} className="text-primary" >
            <EditOutlined style={{ fontSize: '22px' }} />
          </a>

          <a onClick={() => showDeleteConfirm(row._id, row.name)} className="text-danger" >
            <DeleteOutlined style={{ fontSize: '22px' }} />
          </a>
        </Row>
      </>
    );
  };

  return (
    <>
      <HeadSection title="All Subject-Details" />


      <Content className="custom-content">
        <div className="responsive-fixed-container">
          <div style={{ padding: '15px', background: colorBgContainer }}>
            <div className="container-fluid">
              <div className="row">
                <div className="col-12">
                  <div className=" ">
                    <div className="d-flex border-bottom title-part-padding align-items-center">
                      <div>
                        <h4 className="card-title mb-0">All Subject</h4>
                      </div>
                      <div className="ms-auto flex-shrink-0">
                        <Button
                          className="shadow rounded"
                          type="primary"
                          onClick={handleShow}
                          block
                        >
                          <span style={{ marginRight: '8px' }}>Add</span>
                          <span className="button-icon-space ml-10">


                            <FontAwesomeIcon icon={faPlusCircle} />
                          </span>
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


                    <div style={{ overflowX: 'auto' }}>
                      <div style={{ minWidth: '100%' }}>


                        <>

                          <Table
                            columns={columns}
                            dataSource={data}
                            scroll={{ x: 'max-content' }}
                            // scroll={{ x: 1500, y: 300 }}
                    
                          />
                        </>
                      </div>
                    </div>
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

export default withAuth(AllSubject);
