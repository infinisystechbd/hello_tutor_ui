import { ExclamationCircleFilled } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import DataTable from 'react-data-table-component';
import ToastMessage from '../../../../components/Toast';
import DeleteIcon from '../../../../components/elements/DeleteIcon';
import EditIcon from '../../../../components/elements/EditIcon';
import ViewIcon from '../../../../components/elements/ViewIcon';
import { SUBJECT_END_POINT } from '../../../../constants/index';
import { QUERY_KEYS } from '../../../../constants/queryKeys';
import { del } from '../../../../helpers/api_helper';
import { useGetAllData } from '../../../../utils/hooks/useGetAllData';
import DebouncedSearchInput from './../../../../components/elements/DebouncedSearchInput';
import SubjectForm from './form/SubjectForm';
import SubjectView from './view/SubjectView';


const AllSubject = () => {
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
  const [perPage,setPerPage] = useState(10)
  const handleShow = () =>{
    setIsModalOpen(true)
    setEditData(null);
  };
  const handleOpen = (data) => {
    setEditData(data);
    setIsModalOpen(true)
  }

  // handle delete
  const { confirm } = Modal;
const showDeleteConfirm = (id,name) => {
  confirm({
    title: `Are you sure delete this Subject?`,
    icon: <ExclamationCircleFilled />,
    content: name,
    okText: 'Yes',
    okType: 'danger',
    cancelText: 'No',
    async onOk()  {
      const deleteSubject = await del(SUBJECT_END_POINT.delete(id));
        try{
          if (deleteSubject.status === 'SUCCESS') {
            notify('success', deleteSubject.message);
          } else {
            notify('error', 'something went wrong');
          }
        }catch(error){
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
  const [subject , setSubject] = useState({});
  
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
  const handlePerRowsChange = async (newPerPage, page) => {
    setPage(page);
    setPerPage(newPerPage);
  };
  const handlePageChange = (page) => {
    setPage(page)
  };
  const {
    data: subjectList,
    isLoading,
    refetch: fetchSubjectList,
  } = useGetAllData(QUERY_KEYS.GET_ALL_SUBJECT_LIST, SUBJECT_END_POINT.get(search));
  const reFetchHandler = (isRender) => {
    if (isRender) fetchSubjectList();
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
      selector: (row) => (row.status = true ? 'Active' : 'Inactive'),
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
        <ul className="action align-items-center">
          <li>
            <Link href="#">
              <a onClick={() => handleViewOpen(row)}>
                <ViewIcon />
              </a>
            </Link>
          </li>

          <li>
            <Link href="#">
              <a onClick={() => handleOpen(row)}>
                <EditIcon />
              </a>
            </Link>
          </li>

          <li>
            <Link href="#">
              <a onClick={() => showDeleteConfirm(row._id, row.name)}>
                <DeleteIcon />
              </a>
            </Link>
          </li>
        </ul>
      </>
    );
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="card shadow">
            <div className="d-flex border-bottom title-part-padding align-items-center">
              <div>
                <h4 class="card-title mb-0">All Subjects</h4>
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

            {/* Create Modal Form */}
           <SubjectForm 
           isModalOpen={isModalOpen} 
           setIsModalOpen={setIsModalOpen}
           isParentRender={reFetchHandler}
           setEditData={editData}
            />
            {/* End Create Modal Form */}

            {/* View Modal Form */}

            <SubjectView isViewModalOpen={isViewModalOpen} setIsViewModalOpen={setIsViewModalOpen} subject={subject}  />
            {/* view Modal Form end */}

            <div className="card-body">
              <div className="">
                <DataTable
                  columns={columns}
                  data={subjectList?.data}
                  pagination
                  highlightOnHover
                  subHeader
                  progressPending={isLoading}
                  paginationTotalRows={subjectList?.total}
                  /* onChangeRowsPerPage={handlePerRowsChange}
                  onChangePage={handlePageChange} */
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
  );
};

export default AllSubject;
