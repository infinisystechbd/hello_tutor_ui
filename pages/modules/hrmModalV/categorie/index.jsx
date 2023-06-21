import { ExclamationCircleFilled } from '@ant-design/icons';
import { Button, Modal, Tag, Row, Breadcrumb, Layout, theme } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import DataTable from 'react-data-table-component';
import ToastMessage from '../../../../components/Toast';
import { CATEGORIE_END_POINT } from '../../../../constants/index';
import { QUERY_KEYS } from '../../../../constants/queryKeys';
import { del } from '../../../../helpers/api_helper';
import { useGetAllData } from '../../../../utils/hooks/useGetAllData';
import DebouncedSearchInput from './../../../../components/elements/DebouncedSearchInput';
import HeadSection from '../../../../components/HeadSection';
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
const AllCategory = () => {
    const notify = useCallback((type, message) => {
        ToastMessage({ type, message });
    }, []);

        const {
        token: { colorBgContainer },
    } = theme.useToken();
    const { confirm } = Modal;
    const { Content } = Layout;

    const [search, setSearch] = useState('');
    const [pending, setPending] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editData, setEditData] = useState({});
    


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
                      <Row justify="space-between">
                <a onClick={() => handleViewOpen(row)} style={{ color: 'green', marginRight: '10px' }}>
                    <EyeOutlined style={{ fontSize: '24px' }} />
                </a>

                <a onClick={() => handleOpen(row)} className="text-primary" style={{ marginRight: '10px' }}>
                    <EditOutlined style={{ fontSize: '24px' }} />
                </a>

                <a onClick={() => showDeleteConfirm(row._id, row.name)} className="text-danger" style={{ marginRight: '10px' }}>
                    <DeleteOutlined style={{ fontSize: '24px' }} />
                </a>
            </Row>
        </>
    }
    return (
<>
            <HeadSection title="All Guardian-Details" />


            <Content
                style={{
                    margin: '0 16px',
                }}
            >
                <Breadcrumb
                    style={{
                        margin: '16px 0',
                    }}
                >
                    <Breadcrumb.Item>User</Breadcrumb.Item>
                    <Breadcrumb.Item>Category</Breadcrumb.Item>
                </Breadcrumb>
                <div
                    style={{
                        padding: 15,
                        minHeight: 360,
                        background: colorBgContainer,
                    }}
                >
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <div className=" ">
                                    <div className="d-flex border-bottom title-part-padding align-items-center">
                                        <div>
                                            <h4 class="card-title mb-0">All Category</h4>
                                        </div>
                                        <div className="ms-auto flex-shrink-0">
                                            <Button
                                                className="shadow rounded"
                                                type="primary"
                                                // onClick={handleShow}
                                                block
                                            >
                                                Add Categoty
                                            </Button>
                                        </div>
                                    </div>

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





            </Content>
            
        </>
    )
}

export default AllCategory
