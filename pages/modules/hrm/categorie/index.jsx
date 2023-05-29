import Link from 'next/link';
import React, { useCallback, useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import Axios from '../../../';
import ToastMessage from '../../../../components/Toast';
import DeleteIcon from '../../../../components/elements/DeleteIcon';
import EditIcon from '../../../../components/elements/EditIcon';
import ViewIcon from '../../../../components/elements/ViewIcon';
import HeadSection from '../../../../components/HeadSection';
import { del, get } from '../../../../helpers/api_helper';
import { CATEGORIE_END_POINT } from '../../../../constants/api_endpoints/categorieEndPoints';
import { QUERY_KEYS } from "../../../../constants/queryKeys";
import { useGetAllData } from "../../../../utils/hooks/useGetAllData";

const ManageCategorie = () => {

    const notify = useCallback((type, message) => {
        ToastMessage({ type, message });
    }, []);


    const { data: categoryList, isLoading, refetch: fetchCategoryList } = useGetAllData(QUERY_KEYS.GET_ALL_CATEGORY_LIST, CATEGORIE_END_POINT.get());


    const columns = [
        {
            name: <span className="fw-bold">SL</span>,
            selector: (row, index) => index + 1,
            sortable: true,
            width: "70px",
        },
        {
            name: 'Subject Code',
            selector: row => row.categoryId,
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
                    <Link href={`/modules/hrm/categorie/update/${id}`}>
                        <a >
                            <EditIcon />
                        </a>
                    </Link>

                </li>

                <li>
                    <Link href={`/modules/hrm/categorie/view/${id}`}>
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
    return (
        <>
            <HeadSection title="All Category-Details" />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="card shadow">

                            <div className="d-flex border-bottom title-part-padding align-items-center">
                                <div>
                                    <h4 class="card-title mb-0">All categories</h4>
                                </div>
                                <div className="ms-auto flex-shrink-0">
                                    <Link href="/modules/hrm/categorie/create">
                                        <a
                                            className="shadow rounded btn btn-primary"

                                        >
                                            Add New category
                                        </a>
                                    </Link>

                                </div>
                            </div>


                            <div className="card-body">
                                <div className="">
                                    <DataTable
                                        columns={columns}
                                        data={categoryList?.data}
                                        pagination
                                        highlightOnHover
                                        subHeader
                                        progressPending={isLoading}
                                        subHeaderComponent={
                                            <input
                                                type="text"
                                                placeholder="search by subject code"
                                                className="w-25 form-control search-input_RESERVATIONS"
                                            //   value={search}
                                            //   onChange={(e) => setSearch(e.target.value)}
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

export default ManageCategorie