import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import Link from 'next/link';
import Axios from '../../../';
import { get,del } from '../../../../helpers/api_helper';
import { SUBJECT_END_POINT } from "../../../../constants/index";
import DataTable from 'react-data-table-component';
import DeleteIcon from '../../../../components/elements/DeleteIcon';
import EditIcon from '../../../../components/elements/EditIcon';
import ViewIcon from '../../../../components/elements/ViewIcon';






//Delete component
const DeleteComponent = ({ onSubmit,id, pending }) => {
console.log("clicked::",onSubmit,id,pending);

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchSubject = useCallback(async () => {
    let isSubscribed = true;
    setLoading(true);
    

    return () => (isSubscribed = false);
  }, [id]);

  useEffect(() => {
    fetchSubject();
  }, [fetchRcvBckSlip]);

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
          disabled={pending || loading}
          onClick={() => onSubmit(myFormData)}
        >
          Delete
        </Button>
      </Modal.Footer>
    </>
  );
};






const AllSubject = () => {
  const { http } = Axios
  const [subjectList, setAllSubjectList] = useState([]);
  const [search, setSearch] = useState("");
  const [itemList, setItemList] = useState([]);
  const [pending, setPending] = useState(false);

  //Delete Tower Modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [subject_id, setSubjectId] = useState(''); 
  console.log(subject_id);
  const handleExitDelete = () => setShowDeleteModal(false);
  const handleOpenDelete = (id) =>{
    setShowDeleteModal(true);
    setSubjectId(id);
  } 

  const data = itemList?.data;


  React.useEffect(() => {
    const timeout = setTimeout(() => {
      fetchSubjectList();
    });
    return () => clearTimeout(timeout);
}, []);


    const fetchSubjectList = async () => {
      let isSubscribed = true;
      try {
        const getAllList = await get(SUBJECT_END_POINT.get());
        setAllSubjectList(getAllList?.data);
        setItemList(getAllList)
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
    return <>
      <ul className="action align-items-center">

        <li>
          <Link href="#">
            <a >
              <EditIcon />
            </a>
          </Link>

        </li>

        <li>
          <Link href="#">
            <a >
              <ViewIcon />
            </a>
          </Link>

        </li>
        <li>
          <Link href="#">
            <a >
              <DeleteIcon onClick={()=>handleOpenDelete(id)} />
            </a>
          </Link>

        </li>

      </ul>
    </>
  }







      //Delete booking  form
      const handleDelete = async (id) => {
        
        let isSubscribed = true;
        setPending(true);
        await del(`${process.env.NEXT_PUBLIC_API_URL}/subject/${id}`)
            .then((res) => {
                if (isSubscribed) {
                    notify("success", "successfully deleted!");
                    handleExitDelete();
                    setPending(false);

                }

            })
            .catch((e) => {
                console.log('error delete !')
                setPending(false);
            });

            fetchSubjectList();

        return () => isSubscribed = false;
    }







  useEffect(() => {
    let controller = new AbortController();
    const result = data?.filter((item) => {
      return item.subjectId.toLowerCase().match(search.toLocaleLowerCase())
    });

    setAllSubjectList(result);
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
              <DeleteComponent  onSubmit={handleDelete} id={subject_id} pending={pending} />
            </Modal>


            <div className="card-body">
              <div className="">
                <DataTable
                  columns={columns}
                  data={subjectList}
                  pagination
                  highlightOnHover
                  subHeader
                  subHeaderComponent={
                    <input
                      type="text"
                      placeholder="search by mobile or invoice no."
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