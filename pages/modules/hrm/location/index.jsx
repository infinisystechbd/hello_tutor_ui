import Link from 'next/link';
import React, { useCallback, useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import Axios from '../../../';
import ToastMessage from '../../../../components/Toast';
import DeleteIcon from '../../../../components/elements/DeleteIcon';
import EditIcon from '../../../../components/elements/EditIcon';
import ViewIcon from '../../../../components/elements/ViewIcon';
import { LOCATION_END_POINT } from "../../../../constants/api_endpoints/locationEndPoints";
import { QUERY_KEYS } from "../../../../constants/queryKeys";
import { del, get } from '../../../../helpers/api_helper';
import { useGetAllData } from "../../../../utils/hooks/useGetAllData";
import HeadSection from '../../../../components/HeadSection';


//Delete component
const DeleteComponent = ({ onSubmit, id, pending }) => {

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchLocatin = useCallback(async () => {

    let isSubscribed = true;
    const getTheLocation = await get(LOCATION_END_POINT.info(id));
    setName(getTheLocation?.data?.name)

    setLoading(true);
    return () => (isSubscribed = false);
  }, [id]);


  useEffect(() => {
    fetchLocatin();
  }, [fetchLocatin]);

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




const ManageLocation = () => {

  const { http } = Axios;
  const notify = useCallback((type, message) => {
    ToastMessage({ type, message });
  }, []);
  const [pending, setPending] = useState(false);
  const { data: locationList, isLoading, refetch: fetchLocationList } = useGetAllData(QUERY_KEYS.GET_ALL_SUBJECT_LIST, LOCATION_END_POINT.get())
  //Delete  Modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [location_id, setLocationId] = useState('');
  console.log(location_id);
  const handleExitDelete = () => setShowDeleteModal(false);
  const handleOpenDelete = (id) => {
    setShowDeleteModal(true);
    setLocationId(id);
    // console.log(id);
  }




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
      <ul className="action align-items-center">

        <li>
          <Link href={`/modules/hrm/location/update/${id}`}>
            <a >
              <EditIcon />
            </a>
          </Link>

        </li>

        <li>
          <Link href={`/modules/hrm/location/view/${id}`}>
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




  //Delete Subject
  const handleDelete = async (id) => {

    let isSubscribed = true;
    // setPending(true);
    const deleteLocation = await del(LOCATION_END_POINT.delete(id))

    if (deleteLocation.status === "SUCCESS") {
      notify("success", "successfully deleted!");
      handleExitDelete();
      setPending(false);

    }
    else {
      notify("error", "something went wron");
    }

    fetchLocationList();
    return () => isSubscribed = false;
  }



  return (
    <>
      <HeadSection title="All Location-Details" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="card shadow">

              <div className="d-flex border-bottom title-part-padding align-items-center">
                <div>
                  <h4 class="card-title mb-0">All Location</h4>
                </div>
                <div className="ms-auto flex-shrink-0">
                  <Link href="/modules/hrm/location/create">
                    <a
                      className="shadow rounded btn btn-primary"

                    >
                      Add New Location
                    </a>
                  </Link>

                </div>
              </div>


              {/* Delete Modal Form */}
              <Modal show={showDeleteModal} onHide={handleExitDelete}>
                <Modal.Header closeButton></Modal.Header>
                <DeleteComponent onSubmit={handleDelete} id={location_id} pending={pending} />
              </Modal>




              <div className="card-body">
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
    </>
  )
}

export default ManageLocation