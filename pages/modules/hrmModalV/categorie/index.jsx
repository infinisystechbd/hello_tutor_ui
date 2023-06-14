import { ExclamationCircleFilled } from '@ant-design/icons';
import { Button, Modal, Tag } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import DataTable from 'react-data-table-component';
import ToastMessage from '../../../../components/Toast';
import DeleteIcon from '../../../../components/elements/DeleteIcon';
import EditIcon from '../../../../components/elements/EditIcon';
import ViewIcon from '../../../../components/elements/ViewIcon';
import { CATEGORIE_END_POINT } from '../../../../constants/index';
import { QUERY_KEYS } from '../../../../constants/queryKeys';
import { del } from '../../../../helpers/api_helper';
import { useGetAllData } from '../../../../utils/hooks/useGetAllData';
import DebouncedSearchInput from './../../../../components/elements/DebouncedSearchInput';
import HeadSection from '../../../../components/HeadSection';

const AllCategory = () => {
    const notify = useCallback((type, message) => {
        ToastMessage({ type, message });
    }, []);

    const [search, setSearch] = useState('');
    const [pending, setPending] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editData, setEditData] = useState({});
    const { confirm } = Modal;


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
    const handlePerRowsChange = async (newPerPage, page) => {
        setPage(page);
        setPerPage(newPerPage);
    };

    const handlePageChange = (page) => {
        setPage(page)
    };

    const {
        data: CategoryList,
        isLoading,
        refetch: fetchCategoryList,
    } = useGetAllData(QUERY_KEYS.GET_ALL_CATEGORY_LIST, CATEGORIE_END_POINT.get(search));



    const reFetchHandler = (isRender) => {
        if (isRender) fetchCategoryList();
    };


    const columns = [
        {
            name: <span className="fw-bold">SL</span>,
            selector: (row, index) => index + 1,
            sortable: true,
            width: "70px",
        },
        {
            name: 'Category Id',
            selector: row => row.categoryId,
            sortable: true,
        },
        {
            name: 'Category Name',
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


    const actionButton = (row) => {
        // console.log(id);
        return <>
            <ul className="action align-items-center">

                <li>
                    <Link href="#" >
                        <a onClick={() => handleOpen(row)}>
                            <EditIcon />
                        </a>
                    </Link>

                </li>

                <li>
                    <Link href="#">
                        <a onClick={() => handleViewOpen(id)}>
                            <ViewIcon />
                        </a>
                    </Link>

                </li>
                <li>
                    <Link href="#">
                        <a onClick={() => showDeleteConfirm(row._id, row.name)} >
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
                                <h4 class="card-title mb-0">All Category</h4>
                            </div>
                            <div className="ms-auto flex-shrink-0">
                                <Button
                                    className="shadow rounded"
                                    type="primary"
                                    onClick={handleShow}
                                    block
                                >
                                    Add Category
                                </Button>
                            </div>
                        </div>

                        {/* <TutorForm
                            isModalOpen={isModalOpen}
                            setIsModalOpen={setIsModalOpen}
                            isParentRender={reFetchHandler}
                            setEditData={editData}


                        /> */}



                        <div className="card-body">
                            <div className="">
                                <DataTable
                                    columns={columns}
                                    data={CategoryList?.data}
                                    pagination
                                    paginationServer
                                    highlightOnHover
                                    subHeader
                                    progressPending={isLoading}
                                    paginationTotalRows={CategoryList?.total}
                                    subHeaderComponent={
                                        <DebouncedSearchInput
                                            allowClear
                                            placeholder="Search category name "
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
    </>
    )
}

export default AllCategory