import Link from 'next/link';
import React, { useCallback, useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import Axios from '../../../';
import ToastMessage from '../../../../components/Toast';
import DeleteIcon from '../../../../components/elements/DeleteIcon';
import EditIcon from '../../../../components/elements/EditIcon';
import ViewIcon from '../../../../components/elements/ViewIcon';
import { SUBJECT_END_POINT } from "../../../../constants/index";
import { QUERY_KEYS } from "../../../../constants/queryKeys";
import { del, get } from '../../../../helpers/api_helper';
import { useGetAllData } from "../../../../utils/hooks/useGetAllData";

//Delete component
const DeleteComponent = ({ onSubmit, id, pending }) => {

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchSubject = useCallback(async () => {

    let isSubscribed = true;
    const getTheSubject = await get(SUBJECT_END_POINT.info(id));
    setName(getTheSubject?.data?.name)
    
    setLoading(true);
    return () => (isSubscribed = false);
  }, [id]);


  useEffect(() => {
    fetchSubject();
  }, [fetchSubject]);

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






const AllSubject = () => {
  const { http } = Axios;
  const notify = useCallback((type, message) => {
    ToastMessage({ type, message });
  }, []);
  //const [subjectList, setAllSubjectList] = useState([]);
  const [search, setSearch] = useState("");
  const [itemList, setItemList] = useState([]);
  const [pending, setPending] = useState(false);

  //Delete Tower Modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [subject_id, setSubjectId] = useState('');
  console.log(subject_id);
  const handleExitDelete = () => setShowDeleteModal(false);
  const handleOpenDelete = (id) => {
    setShowDeleteModal(true);
    setSubjectId(id);
    // console.log(id);
  }

  const {data : subjectList, isLoading , refetch:fetchSubjectList} = useGetAllData(QUERY_KEYS.GET_ALL_SUBJECT_LIST,SUBJECT_END_POINT.get())

  const data = subjectList?.data;
  console.log("call from subject list",isLoading);

/*   React.useEffect(() => {
    const timeout = setTimeout(() => {
      fetchSubjectList();
    });
    return () => clearTimeout(timeout);
  }, []); */


/*   const fetchSubjectList = async () => {
    let isSubscribed = true;
    try {
      const getAllList = await get(SUBJECT_END_POINT.get());
      setAllSubjectList(getAllList?.data);
      setItemList(getAllList)
    } catch (error) {
      console.log("find the error");
    }

    return () => isSubscribed = false;
  } */


  const columns = [
    {
      name: <span className="fw-bold">SL</span>,
      selector: (row, index) => index + 1,
      sortable: true,
      width: "70px",
    },
    {
      name: 'Subject Code',
      selector: row => row.subjectId,
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
      <ul className="action align-items-center">

        <li>
          <Link href={`/modules/hrm/subject/update/${id}`}>
            <a >
              <EditIcon />
            </a>
          </Link>

        </li>

        <li>
        <Link href={`/modules/hrm/subject/view/${id}`}>
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







  //Delete booking  form
  const handleDelete = async (id) => {

    let isSubscribed = true;
    // setPending(true);
    const deleteSubject = await del(SUBJECT_END_POINT.delete(id))
   
    if (deleteSubject.status === "SUCCESS") {
              notify("success", "successfully deleted!");
              handleExitDelete();
              setPending(false);
  
          }
    else{
      notify("error", "something went wron");
    }      


    // .then((res) => {
    //     if (isSubscribed) {
    //         notify("success", "successfully deleted!");
    //         handleExitDelete();
    //         setPending(false);

    //     }

    // })
    // .catch((e) => {
    //     console.log('error delete !')
    //     setPending(false);
    // });

    fetchSubjectList();

    return () => isSubscribed = false;
  }







  useEffect(() => {
    let controller = new AbortController();
    const result = data?.filter((item) => {
      return item.subjectId.toLowerCase().match(search.toLocaleLowerCase())
    });

   // setAllSubjectList(result);
    return () => controller.abort();
  }, [search])

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
                <Link href="/modules/hrm/subject/create">
                  <a
                    className="shadow rounded btn btn-primary"

                  >
                    Add New Subject
                  </a>
                </Link>

              </div>
            </div>


            {/* Delete Modal Form */}
            <Modal show={showDeleteModal} onHide={handleExitDelete}>
              <Modal.Header closeButton></Modal.Header>
              <DeleteComponent onSubmit={handleDelete} id={subject_id} pending={pending} />
            </Modal>


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
  )
}

export default AllSubject