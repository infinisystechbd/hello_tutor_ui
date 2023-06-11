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
import { GUARDIAN_END_POINT } from '../../../../constants/api_endpoints/guardianEndPoints';
import { QUERY_KEYS } from '../../../../constants/queryKeys';
import { del } from '../../../../helpers/api_helper';
import { useGetAllData } from '../../../../utils/hooks/useGetAllData';
import DebouncedSearchInput from './../../../../components/elements/DebouncedSearchInput';
import HeadSection from '../../../../components/HeadSection';
import GuardianForm from './form/GuardianForm';

const AllGuardian = () => {
    const notify = useCallback((type, message) => {
        ToastMessage({ type, message });
    }, []);
    const [search, setSearch] = useState('');
    const [pending, setPending] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editData, setEditData] = useState({});
    const handleShow = () => {
        setIsModalOpen(true)
        setEditData(null);
      };


    // handle delete
    const { confirm } = Modal;
    const showDeleteConfirm = (id, name) => {
        confirm({
            title: `Are you sure delete this Subject?`,
            icon: <ExclamationCircleFilled />,
            content: name,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            async onOk() {
                const deleteGuardian = await del(GUARDIAN_END_POINT.delete(id));
                try {
                    if (deleteGuardian.status === 'SUCCESS') {
                        notify('success', deleteGuardian.message);
                    } else {
                        notify('error', 'something went wrong');
                    }
                } catch (error) {
                    notify('error', error.message);
                }

                fetchGuardianList();
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };


    const handlePerRowsChange = async (newPerPage, page) => {
        setPage(page);
        setPerPage(newPerPage);
    };
    const handlePageChange = (page) => {
        setPage(page)
    };
    const {
        data: guardianList,
        isLoading,
        refetch: fetchGuardianList,
    } = useGetAllData(QUERY_KEYS.GET_ALL_GUARDIAN_LIST, GUARDIAN_END_POINT.get(search));

    const reFetchHandler = (isRender) => {
        if (isRender) fetchGuardianList();
    };
    const columns = [
        {
            name: <span className="fw-bold">SL</span>,
            selector: (row, index) => index + 1,
            sortable: true,
            width: "70px",
        },
        {
            name: 'Guardian Id',
            selector: row => row.guardianId,
            sortable: true,
        },
        {
            name: 'Guardian Name',
            selector: row => row.fullName,
            sortable: true,
        },
        {
            name: 'Guardian Phone',
            selector: row => row.phone,
            sortable: true,
        },
        {
            name: 'Guardian Address',
            selector: row => row.address,
            sortable: true,
        },
        {
            name: 'Status',
            selector: row => row.status = true ? "Active" : "Inactive",
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
                        <a onClick={() => handleOpen(id)}>
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
            <HeadSection title="All Guardian-Details" />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="card shadow">
                            <div className="d-flex border-bottom title-part-padding align-items-center">
                                <div>
                                    <h4 class="card-title mb-0">All Guardian</h4>
                                </div>
                                <div className="ms-auto flex-shrink-0">
                                    <Button
                                        className="shadow rounded"
                                        type="primary"
                                        onClick={handleShow}
                                        block
                                    >
                                        Add Guardian
                                    </Button>
                                </div>
                            </div>

<GuardianForm
    isModalOpen={isModalOpen}
    setIsModalOpen={setIsModalOpen}
    isParentRender={reFetchHandler}
    setEditData={editData}

/>



                            <div className="card-body">
                                <div className="">
                                    <DataTable
                                        columns={columns}
                                        data={guardianList?.data}
                                        pagination
                                        highlightOnHover
                                        subHeader
                                        progressPending={isLoading}
                                        paginationTotalRows={guardianList?.total}
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
        </>
    )
}

export default AllGuardian