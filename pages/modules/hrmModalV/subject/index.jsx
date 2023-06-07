import { Button, Form, Input, Select } from 'antd';
import moment from 'moment';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import ToastMessage from '../../../../components/Toast';
import DeleteIcon from '../../../../components/elements/DeleteIcon';
import EditIcon from '../../../../components/elements/EditIcon';
import ViewIcon from '../../../../components/elements/ViewIcon';
import { SUBJECT_END_POINT } from '../../../../constants/index';
import { QUERY_KEYS } from '../../../../constants/queryKeys';
import { del, get, post, put } from '../../../../helpers/api_helper';
import { useGetAllData } from '../../../../utils/hooks/useGetAllData';

//Create Component
const CreateForm = ({  validated }) => {
  const notify = React.useCallback((type, message) => {
    toast({ type, message });
  }, []);
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm();
  const { Option } = Select;
  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  };
  const onFinish = async (values) => {
    console.log('Success:', values);
    setLoading(true);
    const response = await post(SUBJECT_END_POINT.create(), values);
    if (response.status === 'SUCCESS') {
      notify('success', response.message);
      
      
    } else {
      notify('error', response.errorMessage);
    }
    setLoading(false);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
        <Form
          {...layout}
          form={form}
          name="control-hooks"
          onFinish={onFinish}
          style={{
            maxWidth: 600,
          }}
        >
          <Form.Item
            name="name"
            label="Subject Name"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="status"
            label="Status"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select placeholder="Select a option" allowClear>
              <Option value="true">Active</Option>
              <Option value="false">Inactive</Option>
            </Select>
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit" loading={loading}>
              Submit
            </Button>
          </Form.Item>
        </Form>
    </>
  );
};

//Update component
const EditForm = ({ onSubmit, id, pending, validated }) => {
  const [loading, setLoading] = useState(true);

  const [subjectDetails, setSubjectDetails] = useState({
    name: '',
    status: '',
  });
  const handleChange = (e) => {
    setSubjectDetails((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const fetchSubject = useCallback(async () => {
    let isSubscribed = true;
    setLoading(true);
    if (id) {
      const getTheSubject = await get(SUBJECT_END_POINT.info(id));
      setSubjectDetails((prev) => ({
        ...prev,
        name: getTheSubject?.data?.name,
        status: getTheSubject?.data?.status,
      }));
      setLoading(false);
    }

    // setLoading(true);
    return () => (isSubscribed = false);
  }, [id]);

  useEffect(() => {
    fetchSubject();
  }, [fetchSubject]);

  let dataset = { ...subjectDetails };

  return (
    <Form validated={validated}>
      <div className="row">
        <div>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Subject name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Subject Name"
              name="name"
              onChange={handleChange}
              required
              defaultValue={subjectDetails?.name}
            />
          </Form.Group>

          <Form.Group controlId="formBasicDesc">
            <Form.Label>Activation Type</Form.Label>
            <Select
              name="status"
              value={subjectDetails.status}
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
          </Form.Group>
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
  const [subjectDetails, setSubjectDetails] = useState({});
  const fetchSubject = useCallback(async () => {
    let isSubscribed = true;
    if (id) {
      const getTheSubject = await get(SUBJECT_END_POINT.info(id));
      setSubjectDetails(getTheSubject?.data);
    }

    return () => (isSubscribed = false);
  }, [id]);

  useEffect(() => {
    fetchSubject();
  }, [fetchSubject]);

  return (
    <div className="container-fluid ">
      <div className="row mt-3">
        <div className="col-lg-10 col-md-10 col-sm-10">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12">
                  <h3 className="box-title mt-5">Subject Basic Info</h3>
                  <div className="table-responsive">
                    <table className="table">
                      <tbody>
                        <tr>
                          <td width={390}>Name</td>
                          <td>{subjectDetails.name}</td>
                        </tr>

                        <tr>
                          <td>Status</td>
                          <td>
                            {subjectDetails.status == true ? (
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
                            {moment(subjectDetails?.createdAt).format(
                              'DD-MM-YYYY'
                            )}
                          </td>
                        </tr>
                        <tr>
                          <td>Updated At</td>
                          <td>
                            {moment(subjectDetails?.updatedAt).format(
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
      </div>
    </div>
  );
};

//Delete component
const DeleteComponent = ({ onSubmit, id, pending }) => {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchSubject = useCallback(async () => {
    let isSubscribed = true;
    const getTheSubject = await get(SUBJECT_END_POINT.info(id));
    setName(getTheSubject?.data?.name);

    setLoading(true);
    return () => (isSubscribed = false);
  }, [id]);

  useEffect(() => {
    fetchSubject();
  }, [fetchSubject]);

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
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

 // const [loading, setLoading] = useState(false)
  const [form] = Form.useForm();
  const { Option } = Select;
  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  };


  //Update Tower Modal form
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const handleExit = () => setShowUpdateModal(false);
  const handleOpen = (id) => {
    setShowUpdateModal(true);
    setSubjectId(id);
  };

  //View  Modal form
  const [showViewModal, setShowViewModal] = useState(false);
  const handleExitView = () => setShowViewModal(false);
  const handleViewOpen = (id) => {
    setShowViewModal(true);
    setSubjectId(id);
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
  } = useGetAllData(QUERY_KEYS.GET_ALL_SUBJECT_LIST, SUBJECT_END_POINT.get());


  // create subject form
  const onFinish = async (values) => {
    setLoading(true);
    const response = await post(SUBJECT_END_POINT.create(), values);
    if (response.status === 'SUCCESS') {
      notify('success', response.message);
      handleClose();
      setValidated(false);
      fetchSubjectList()
    } else {
      notify('error', response.errorMessage);
    }
    setLoading(false);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  //create floor form
  const submitForm = async (items) => {
    let isSubscribed = true;
    setLoading(true);
    const response = await post(SUBJECT_END_POINT.create(), items);
    if (response.status === 'SUCCESS') {
      notify('success', response.message);
      // router.push(`/modules/hrmModalV/subject`);
      handleClose();
      setLoading(false);
      setValidated(false);
    } else {
      notify('error', response.errorMessage);
      setLoading(false);
      setValidated(true);
    }

    fetchSubjectList();

    return () => (isSubscribed = false);
  };

  //Update  form
  const updateForm = async (formData) => {
    let isSubscribed = true;
    setPending(true);
    const updateTheSubject = await put(
      SUBJECT_END_POINT.update(subject_id),
      formData
    );
    if (updateTheSubject.status === 'SUCCESS') {
      notify('success', updateTheSubject.message);
      // router.push(`/modules/hrmModalV/subject`);
      handleExit();
      setPending(false);
      setValidated(false);
    } else {
      notify('error', updateTheSubject.message);
      setPending(false);
      setValidated(true);
    }

    fetchSubjectList();

    return () => (isSubscribed = false);
  };

  //Delete Subject
  const handleDelete = async (id) => {
    let isSubscribed = true;
    // setPending(true);
    const deleteSubject = await del(SUBJECT_END_POINT.delete(id));

    if (deleteSubject.status === 'SUCCESS') {
      notify('success', 'successfully deleted!');
      handleExitDelete();
      setPending(false);
    } else {
      notify('error', 'something went wron');
    }

    fetchSubjectList();
    return () => (isSubscribed = false);
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
      selector: (row) => actionButton(row._id),
    },
  ];

  const actionButton = (id) => {
    return (
      <>
        <ul className="action align-items-center">
          <li>
            <Link href="#">
              <a onClick={() => handleViewOpen(id)}>
                <ViewIcon />
              </a>
            </Link>
          </li>

          <li>
            <Link href="#">
              <a onClick={() => handleOpen(id)}>
                <EditIcon />
              </a>
            </Link>
          </li>

          <li>
            <Link href="#">
              <a onClick={() => handleOpenDelete(id)}>
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

            <Modal dialogClassName="modal-sm" centered show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Create Subjects</Modal.Title>
              </Modal.Header>
              <Modal.Body>
        <Form
          {...layout}
          form={form}
          name="control-hooks"
          onFinish={onFinish}
          style={{
            maxWidth: 600,
          }}
        >
          <Form.Item
            name="name"
            label="Subject Name"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="status"
            label="Status"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select placeholder="Select a option" allowClear>
              <Option value="true">Active</Option>
              <Option value="false">Inactive</Option>
            </Select>
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit" loading={loading}>
              Submit
            </Button>
          </Form.Item>
        </Form>
    
              </Modal.Body>
            </Modal>
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
                  id={subject_id}
                  pending={pending}
                  validated={validated}
                />
              </Modal.Body>
            </Modal>
            {/* End Update Modal Form */}

            {/* View Modal Form */}
            <Modal
              dialogClassName="modal-sm"
              show={showViewModal}
              onHide={handleExitView}
            >
              <Modal.Header closeButton></Modal.Header>
              <ViewForm id={subject_id} pending={pending} />
            </Modal>
            {/* view Modal Form end */}

            {/* Delete Modal Form */}
            <Modal show={showDeleteModal} onHide={handleExitDelete}>
              <Modal.Header closeButton></Modal.Header>
              <DeleteComponent
                onSubmit={handleDelete}
                id={subject_id}
                pending={pending}
              />
            </Modal>
            {/* Delete Modal Form end */}

            <div className="card-body">
              <div className="">
                <DataTable
                  columns={columns}
                  data={subjectList?.data}
                  pagination
                  highlightOnHover
                  subHeader
                  progressPending={isLoading}
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
  );
};

export default AllSubject;