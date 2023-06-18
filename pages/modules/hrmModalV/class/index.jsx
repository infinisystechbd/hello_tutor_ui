import { PlusCircleOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import moment from 'moment';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { Form, Modal } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import HeadSection from '../../../../components/HeadSection';
import ToastMessage from '../../../../components/Toast';
import DeleteIcon from '../../../../components/elements/DeleteIcon';
import EditIcon from '../../../../components/elements/EditIcon';
import Label from '../../../../components/elements/Label';
import Select from '../../../../components/elements/Select';
import Select2 from '../../../../components/elements/Select2';
import TextInput from '../../../../components/elements/TextInput';
import ViewIcon from '../../../../components/elements/ViewIcon';
import { CLASS_END_POINT } from '../../../../constants/api_endpoints/classEndPoints';
import { SUBJECT_END_POINT } from '../../../../constants/index';
import { QUERY_KEYS } from '../../../../constants/queryKeys';
import { del, get, put } from '../../../../helpers/api_helper';
import { useGetAllData } from '../../../../utils/hooks/useGetAllData';
import ClassForm from './form/ClassForm';

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
        console.log('find the error');
      }

      return () => (isSubscribed = false);
    };
    fetchTotalSubjects();
  }, []);

  const handleChange = (e) => {
    setClassDetails((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const fetchclass = useCallback(async () => {
    let isSubscribed = true;
    setLoading(true);
    if (id) {
      const getTheClass = await get(CLASS_END_POINT.info(id));
      setClassDetails((prev) => ({
        ...prev,
        name: getTheClass?.data?.name,
        status: getTheClass?.data?.status,
        subject: getTheClass?.data?.subject,
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
    setSubject([]);
    e.map((x) => {
      setSubject((subject) => [...subject, { subjectId: x.value }]);
    });
  };

  let dataset = { ...classDetails, subject };

  return (
    <Form validated={validated}>
      <div className="row">
        <div className="col-md-10">
          <TextInput
            name="name"
            label="Class Name"
            placeholder="Class Name"
            onChange={handleChange}
            value={classDetails.name}
          />
          <div className="mb-3 row">
            <Label text="Subjects" />
            <div className="col-sm-6">
              {classDetails?.subject?.length > 0 && (
                <Select2
                  isMulti
                  options={
                    subjectList &&
                    subjectList.map(({ _id, name }) => ({
                      value: _id,
                      label: name,
                    }))
                  }
                  onChange={onSelectSubject}
                  subjectId
                  defaultValue={classDetails?.subject?.map(
                    (subjectId, index) => ({
                      value: subjectId?.subjectId?._id,
                      label: subjectId?.subjectId?.name,
                    })
                  )}
                />
              )}

              {classDetails?.subject?.length <= 0 && (
                <Select2
                  isMulti
                  options={
                    classDetails &&
                    classDetails?.subject?.map((subjectId, index) => ({
                      value: subjectId?.subjectId?._id,
                      label: subjectId?.subjectId?.name,
                    }))
                  }
                  onChange={onSelectSubject}
                />
              )}
            </div>
          </div>

          <div className="mb-3 row">
            <Label text="Status" />
            <div className="col-sm-6">
              <Select
                name="status"
                value={classDetails.status}
                onChange={handleChange}
              >
                <option value="" disabled>
                  select activation type
                </option>
                <option value="true" selected>
                  Active
                </option>
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
        style={{ marginTop: '5px' }}
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
                            {classDetails?.status == true ? (
                              <button className="btn btn-primary">
                                Active
                              </button>
                            ) : (
                              <button className="btn btn-danger">
                                Inactive
                              </button>
                            )}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12">
                  <h3 className="box-title mt-5">
                    Creation/updation related info
                  </h3>
                  <div className="table-responsive">
                    <table className="table">
                      <tbody>
                        <tr>
                          <td>Created At</td>
                          <td>
                            {moment(classDetails?.createdAt).format(
                              'DD-MM-YYYY'
                            )}
                          </td>
                        </tr>

                        <tr>
                          <td>Updated At</td>
                          <td>
                            {moment(classDetails?.updatedAt).format(
                              'DD-MM-YYYY'
                            )}
                          </td>
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
                  style={{ width: '100%' }}
                >
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {classDetails?.subject?.map((sub, index) => (
                      <tr key={index}>
                        {/* <th>name</th> */}
                        <th>{sub?.subjectId?.name}</th>
                        <td>
                          {sub?.subjectId?.status == true ? (
                            <button className="btn btn-primary">Active</button>
                          ) : (
                            <button className="btn btn-danger">Inactive</button>
                          )}
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
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchClass = useCallback(async () => {
    let isSubscribed = true;
    const getThelass = await get(CLASS_END_POINT.info(id));
    setName(getThelass?.data?.name);

    setLoading(true);
    return () => (isSubscribed = false);
  }, [id]);

  useEffect(() => {
    fetchClass();
  }, [fetchClass]);

  let myFormData = new FormData();
  myFormData.append('id', id);

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

  //const [classList, setClassList] = useState([]);
  const [itemList, setItemList] = useState([]);
  const [search, setSearch] = useState('');
  const [pending, setPending] = useState(false);
  const data = itemList?.data;
  const [isModalOpen, setIsModalOpen] = useState(false);

  //Form validation
  const [validated, setValidated] = useState(false);
  const [class_id, setClassId] = useState('');

  const [edit, setEdit] = useState('');

  //   Create Modal
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const AddClass = () => {
    setEdit(null);
    setIsModalOpen(true);
  };

  //Update  Modal form
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const handleExit = () => setShowUpdateModal(false);
  const editClass = (row) => {
    console.log(row);
    setEdit(row)
    setIsModalOpen(true);
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


  const handleExitDelete = () => setShowDeleteModal(false);
  const handleOpenDelete = (id) => {
    setShowDeleteModal(true);
    setClassId(id);
  };
  const {data: classList} = useGetAllData(QUERY_KEYS.GET_ALL_CLASS_LIST,CLASS_END_POINT.get() );


  const columns = [
    {
      name: <span className="fw-bold">SL</span>,
      selector: (row, index) => index + 1,
      sortable: true,
      width: '70px',
    },
    {
      name: 'Subject Code',
      selector: (row) => row.classId,
      sortable: true,
    },
    {
      name: 'Name',
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: 'Status',
      selector: (row) => (row.status === true ? 'Active' : 'Inactive'),
      sortable: true,
    },
    {
      name: 'Action',
      selector: (row) => actionButton(row),
    },
  ];

  const conditionalRowStyles = [
    {
      when: (row) => row.status == false,
      style: {
        color: 'red',
      },
    },
  ];

  const actionButton = (row) => {
    return (
      <>
        <ul className="action align-items-center">
          <li>
            <Link href="#">
              <a onClick={() => handleViewOpen(row._id)}>
                <ViewIcon />
              </a>
            </Link>
          </li>

          <li>
            <Link href="#">
              <a onClick={() => editClass(row)}>
                <EditIcon />
              </a>
            </Link>
          </li>
          <li>
            <Link href="#">
              <a onClick={() => handleOpenDelete(row._id)}>
                <DeleteIcon />
              </a>
            </Link>
          </li>
        </ul>
      </>
    );
  };


  //Update floor form
  const updateForm = async (formData) => {
    let isSubscribed = true;
    setPending(true);
    const updateTheClass = await put(
      CLASS_END_POINT.update(class_id),
      formData
    );
    if (updateTheClass.status === 'SUCCESS') {
      notify('success', updateTheClass.message);
      // router.push(`/modules/hrmModalV/subject`);
      handleExit();
      setPending(false);
      setValidated(false);
    } else {
      notify('error', updateTheClass.message);
      setPending(false);
      setValidated(true);
    }

    fetchClassList();

    return () => (isSubscribed = false);
  };

  //Delete Subject
  const handleDelete = async (id) => {
    let isSubscribed = true;
    const deleteClass = await del(CLASS_END_POINT.delete(id));

    if (deleteClass.status === 'SUCCESS') {
      notify('success', 'successfully deleted!');
      handleExitDelete();
      setPending(false);
    } else {
      notify('error', 'something went wron');
    }

    fetchClassList();
    return () => (isSubscribed = false);
  };

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
                  <Button onClick={AddClass} type='primary' icon={<PlusCircleOutlined /> }>
                    Add
                  </Button>
                </div>
              </div>

              {/* Create Modal Form */}

              <ClassForm
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                edit={edit}
              />
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
              <Modal
                dialogClassName="modal-lg"
                show={showViewModal}
                onHide={handleExitView}
              >
                <Modal.Header closeButton></Modal.Header>
                <ViewForm id={class_id} pending={pending} />
              </Modal>
              {/* view Modal Form end */}

              {/* Delete Modal Form */}
              <Modal show={showDeleteModal} onHide={handleExitDelete}>
                <Modal.Header closeButton></Modal.Header>
                <DeleteComponent
                  onSubmit={handleDelete}
                  id={class_id}
                  pending={pending}
                />
              </Modal>

              <div className="card-body">
                <div className="">
                  <DataTable
                    columns={columns}
                    data={classList?.data}
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
  );
};

export default ManageClass;
